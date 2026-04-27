from rest_framework import generics, response, status, views
from django.core.cache import cache
from django.utils import timezone
from django.template.loader import render_to_string
from django.http import HttpResponse
from .models import Project, Skill, Experience, Message, AnalyticsHit
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
import hmac
from .serializers import ProjectSerializer, SkillSerializer, ExperienceSerializer, MessageSerializer, AnalyticsHitSerializer
import hashlib

try:
    from weasyprint import HTML
    HAS_WEASYPRINT = True
except (ImportError, OSError):
    HAS_WEASYPRINT = False

class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    def list(self, request, *args, **kwargs):
        cache_key = "projects_list"
        cached = cache.get(cache_key)
        if cached:
            return response.Response(cached)
        
        res = super().list(request, *args, **kwargs)
        cache.set(cache_key, res.data, timeout=3600)
        return res

class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all().order_by('category', 'order')
    serializer_class = SkillSerializer
    
    def list(self, request, *args, **kwargs):
        cache_key = "skills_list_grouped"
        cached = cache.get(cache_key)
        if cached:
            return response.Response(cached)
            
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        
        grouped = {}
        for skill in serializer.data:
            cat_display = skill['get_name_display']
            cat_key = skill['category']
            if cat_key not in grouped:
                grouped[cat_key] = {
                    "name": cat_key,
                    "get_name_display": cat_display,
                    "skills": []
                }
            grouped[cat_key]["skills"].append({
                "name": skill["name"],
                "proficiency": skill["proficiency"],
                "order": skill["order"]
            })
            
        result = list(grouped.values())
        cache.set(cache_key, result, timeout=3600)
        return response.Response(result)

class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    
    def list(self, request, *args, **kwargs):
        cache_key = "experience_list"
        cached = cache.get(cache_key)
        if cached:
            return response.Response(cached)
            
        res = super().list(request, *args, **kwargs)
        cache.set(cache_key, res.data, timeout=3600)
        return res

class MessageCreateView(generics.CreateAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

class MessageStatusView(generics.RetrieveAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    lookup_field = "token"

class AnalyticsHitView(generics.CreateAPIView):
    queryset = AnalyticsHit.objects.all()
    serializer_class = AnalyticsHitSerializer
    
    def perform_create(self, serializer):
        ip = self.request.META.get('REMOTE_ADDR')
        ip_hash = hashlib.sha256(ip.encode()).hexdigest()
        serializer.save(
            ip_hash=ip_hash,
            user_agent=self.request.META.get('HTTP_USER_AGENT', '')
        )

class LiveVisitorCountView(views.APIView):
    def get(self, request):
        five_mins_ago = timezone.now() - timezone.timedelta(minutes=5)
        count = AnalyticsHit.objects.filter(timestamp__gte=five_mins_ago).values('ip_hash').distinct().count()
        return response.Response({"count": max(1, count)})

class ResumeAPIView(views.APIView):
    def get(self, request):
        format_type = request.query_params.get('format', 'json')
        
        projects = Project.objects.all()
        skills = Skill.objects.all()
        experience = Experience.objects.all()
        
        context = {
            "name": "Debrup Banik",
            "title": "ML Engineer",
            "projects": projects,
            "skills": skills,
            "experience": experience,
            "contact": {
                "email": "debrupbanik82@gmail.com",
                "phone": "+91 6376935840",
                "location": "Jaipur, India",
            }
        }
        
        if format_type == 'pdf':
            if not HAS_WEASYPRINT:
                return response.Response(
                    {"error": "PDF generation is currently unavailable. System dependencies (libgobject) missing."},
                    status=status.HTTP_503_SERVICE_UNAVAILABLE
                )
            
            html_string = render_to_string('api/resume_pdf.html', context)
            html = HTML(string=html_string)
            result = html.write_pdf()
            
            response_obj = HttpResponse(result, content_type='application/pdf')
            response_obj['Content-Disposition'] = 'attachment; filename="Debrup_Banik_Resume.pdf"'
            return response_obj
            
        return response.Response(context)

@method_decorator(csrf_exempt, name='dispatch')
class GithubWebhookView(views.APIView):
    def post(self, request):
        # In a real app, verify signature
        # signature = request.headers.get('X-Hub-Signature-256')
        
        payload = request.data
        event = request.headers.get('X-GitHub-Event')
        
        if event == 'push':
            # Trigger sync task
            from .tasks import sync_github_projects
            sync_github_projects.delay()
            return response.Response({"status": "Sync triggered"}, status=status.HTTP_202_ACCEPTED)
            
        return response.Response({"status": "Event ignored"}, status=status.HTTP_200_OK)

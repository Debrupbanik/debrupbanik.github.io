from rest_framework import generics
from rest_framework import response
from django.core.cache import cache
from .models import Project, Skill, Experience
from .serializers import ProjectSerializer, SkillSerializer, ExperienceSerializer


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    
    def list(self, request, *args, **kwargs):
        cache_key = "projects_list"
        cached = cache.get(cache_key)
        if cached:
            return response.Response(cached)
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        cache.set(cache_key, serializer.data, timeout=3600)
        return response.Response(serializer.data)


class SkillListView(generics.ListAPIView):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    
    def list(self, request, *args, **kwargs):
        cache_key = "skills_list"
        cached = cache.get(cache_key)
        if cached:
            return response.Response(cached)
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        cache.set(cache_key, serializer.data, timeout=3600)
        return response.Response(serializer.data)


class ExperienceListView(generics.ListAPIView):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    
    def list(self, request, *args, **kwargs):
        cache_key = "experience_list"
        cached = cache.get(cache_key)
        if cached:
            return response.Response(cached)
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        cache.set(cache_key, serializer.data, timeout=3600)
        return response.Response(serializer.data)

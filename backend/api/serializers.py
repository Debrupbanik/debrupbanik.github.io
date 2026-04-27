from rest_framework import serializers
from .models import Project, Skill, Experience, Tag, Message, AnalyticsHit

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["name"]

class ProjectSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    
    class Meta:
        model = Project
        fields = ["pid", "name", "slug", "description", "status", "github_url", "stars", "tags"]

class SkillSerializer(serializers.ModelSerializer):
    get_name_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Skill
        fields = ["name", "category", "get_name_display", "proficiency", "order"]

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["hash", "date", "message", "org", "description"]

class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ["token", "sender_email", "subject", "body", "status", "created_at"]
        read_only_fields = ["token", "status", "created_at"]

class AnalyticsHitSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsHit
        fields = ["path", "ip_hash", "user_agent", "timestamp", "section"]

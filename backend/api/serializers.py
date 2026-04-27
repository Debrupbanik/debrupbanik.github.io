from rest_framework import serializers
from .models import Project, Skill, Experience


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ["name", "slug", "description", "status", "github_url", "stars"]


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ["name", "category", "proficiency"]


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ["date", "message", "org", "description"]

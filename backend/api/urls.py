from django.urls import path
from .views import ProjectListView, SkillListView, ExperienceListView

urlpatterns = [
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path("skills/", SkillListView.as_view(), name="skill-list"),
    path("experience/", ExperienceListView.as_view(), name="experience-list"),
]

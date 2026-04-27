from django.urls import path
from .views import (
    ProjectListView, 
    SkillListView, 
    ExperienceListView, 
    MessageCreateView, 
    MessageStatusView,
    AnalyticsHitView,
    LiveVisitorCountView,
    ResumeAPIView,
    GithubWebhookView
)

urlpatterns = [
    path("projects/", ProjectListView.as_view(), name="project-list"),
    path("skills/", SkillListView.as_view(), name="skill-list"),
    path("experience/", ExperienceListView.as_view(), name="experience-list"),
    
    # Contact Form
    path("contact/", MessageCreateView.as_view(), name="message-create"),
    path("contact/status/<uuid:token>/", MessageStatusView.as_view(), name="message-status"),
    
    # Analytics
    path("analytics/hit/", AnalyticsHitView.as_view(), name="analytics-hit"),
    path("analytics/live-count/", LiveVisitorCountView.as_view(), name="live-count"),

    # Resume
    path("resume/", ResumeAPIView.as_view(), name="resume-api"),

    # Webhooks
    path("webhooks/github/", GithubWebhookView.as_view(), name="github-webhook"),
]

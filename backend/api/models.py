from django.db import models
import uuid

class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class Project(models.Model):
    STATUS_CHOICES = [
        ("RUNNING", "RUNNING"),
        ("ARCHIVED", "ARCHIVED"),
    ]
    
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    pid = models.CharField(max_length=10, blank=True, null=True, help_text="Process ID for terminal look")
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="RUNNING")
    github_url = models.URLField()
    stars = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag, related_name="projects", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name

class Skill(models.Model):
    CATEGORY_CHOICES = [
        ("ml_ai", "ML & AI"),
        ("tools", "Tools"),
        ("data", "Data"),
        ("languages", "Languages"),
        ("backend", "Backend"),
    ]
    
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(help_text="0-100")
    order = models.IntegerField(default=0)
    
    def __str__(self):
        return self.name

class Experience(models.Model):
    hash = models.CharField(max_length=10, unique=True, null=True, blank=True, help_text="Git commit hash")
    date = models.CharField(max_length=20)
    message = models.CharField(max_length=200)
    org = models.CharField(max_length=100)
    description = models.TextField()
    
    class Meta:
        ordering = ['-date']

    def __str__(self):
        return self.message

class Message(models.Model):
    STATUS_CHOICES = [
        ("SENT", "SENT"),
        ("READ", "READ"),
        ("REPLIED", "REPLIED"),
    ]
    
    token = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    sender_email = models.EmailField()
    subject = models.CharField(max_length=200)
    body = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="SENT")
    created_at = models.DateTimeField(auto_now_add=True)
    read_at = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"{self.sender_email}: {self.subject}"

class AnalyticsHit(models.Model):
    path = models.CharField(max_length=255)
    ip_hash = models.CharField(max_length=64)
    user_agent = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    section = models.CharField(max_length=50, null=True, blank=True)
    
    def __str__(self):
        return f"{self.path} @ {self.timestamp}"

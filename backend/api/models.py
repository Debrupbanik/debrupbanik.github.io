from django.db import models


class Project(models.Model):
    STATUS_CHOICES = [
        ("running", "RUNNING"),
        ("archived", "ARCHIVED"),
    ]
    
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="running")
    github_url = models.URLField()
    stars = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name


class Skill(models.Model):
    CATEGORY_CHOICES = [
        ("ml_ai", "ML & AI"),
        ("tools", "Tools"),
        ("data", "Data"),
        ("languages", "Languages"),
    ]
    
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(help_text="0-100")
    
    def __str__(self):
        return self.name


class Experience(models.Model):
    date = models.CharField(max_length=20)
    message = models.CharField(max_length=200)
    org = models.CharField(max_length=100)
    description = models.TextField()
    
    def __str__(self):
        return self.message

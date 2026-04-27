from django.contrib import admin
from .models import Project, Skill, Experience, Tag

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ("name",)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("name", "pid", "status", "stars")
    list_filter = ("status", "tags")
    search_fields = ("name", "description")
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ("name", "category", "proficiency", "order")
    list_filter = ("category",)
    list_editable = ("proficiency", "order")

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ("message", "org", "date", "hash")
    search_fields = ("message", "org", "description")

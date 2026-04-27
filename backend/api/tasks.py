import requests
from .models import Project, Tag, Experience
from django.utils import timezone
import logging

logger = logging.getLogger(__name__)

def sync_github_projects():
    """
    Syncs projects from GitHub API synchronously.
    """
    username = "Debrupbanik"
    url = f"https://api.github.com/users/{username}/repos?sort=updated&per_page=100"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            repos = response.json()
            for repo in repos:
                # We only sync repos that we want to showcase (e.g. not forks)
                if not repo['fork']:
                    project, created = Project.objects.update_or_create(
                        slug=repo['name'],
                        defaults={
                            'name': repo['name'],
                            'description': repo['description'] or "",
                            'github_url': repo['html_url'],
                            'stars': repo['stargazers_count'],
                            # Keep existing status or default to RUNNING
                        }
                    )
                    
                    # Sync topics as tags
                    if 'topics' in repo:
                        for topic in repo['topics']:
                            tag, _ = Tag.objects.get_or_create(name=topic)
                            project.tags.add(tag)
            return f"Synced {len(repos)} repositories."
    except Exception as e:
        return f"Error syncing GitHub: {str(e)}"

@shared_task
def sync_github_commits():
    """
    Syncs latest commits from key repos to update the Experience log.
    """
    # This would populate the Experience model with git log entries
    pass

from django.db import migrations

def seed_data(apps, schema_editor):
    Project = apps.get_model('api', 'Project')
    Skill = apps.get_model('api', 'Skill')
    Experience = apps.get_model('api', 'Experience')
    Tag = apps.get_model('api', 'Tag')

    # Seed Skills
    skills = [
        {"name": "Machine Learning", "category": "ml_ai", "proficiency": 88, "order": 1},
        {"name": "Time Series Forecasting", "category": "ml_ai", "proficiency": 90, "order": 2},
        {"name": "LSTM", "category": "ml_ai", "proficiency": 85, "order": 3},
        {"name": "Anomaly Detection", "category": "ml_ai", "proficiency": 82, "order": 4},
        {"name": "A/B Testing", "category": "ml_ai", "proficiency": 70, "order": 5},
        
        {"name": "Python", "category": "tools", "proficiency": 90, "order": 1},
        {"name": "TensorFlow", "category": "tools", "proficiency": 85, "order": 2},
        {"name": "Keras", "category": "tools", "proficiency": 82, "order": 3},
        {"name": "Scikit-learn", "category": "tools", "proficiency": 80, "order": 4},
        {"name": "Git/GitHub", "category": "tools", "proficiency": 85, "order": 5},
        {"name": "Streamlit", "category": "tools", "proficiency": 78, "order": 6},
        
        {"name": "Pandas", "category": "data", "proficiency": 88, "order": 1},
        {"name": "NumPy", "category": "data", "proficiency": 85, "order": 2},
        {"name": "Matplotlib", "category": "data", "proficiency": 75, "order": 3},
        {"name": "Seaborn", "category": "data", "proficiency": 72, "order": 4},
        {"name": "EDA", "category": "data", "proficiency": 85, "order": 5},

        {"name": "English", "category": "languages", "proficiency": 95, "order": 1},
        {"name": "Hindi", "category": "languages", "proficiency": 90, "order": 2},
        {"name": "Bengali", "category": "languages", "proficiency": 88, "order": 3},
    ]
    for sk in skills:
        Skill.objects.get_or_create(name=sk['name'], defaults=sk)

    # Seed Projects
    projects = [
        {
            "pid": "smart-ener",
            "name": "smart-energy-optimizer",
            "slug": "smart-energy-optimizer",
            "description": "LSTM-based forecasting model achieving <5% MAE for hourly electricity consumption with Isolation Forest anomaly detection and Streamlit dashboard.",
            "status": "RUNNING",
            "github_url": "https://github.com/Debrupbanik/lstm_comparisons",
            "tags": ["Python", "TensorFlow", "LSTM", "Streamlit", "Pandas"]
        },
        {
            "pid": "energy-for",
            "name": "energy-consumption-forecasting",
            "slug": "energy-consumption-forecasting",
            "description": "Designed LSTM-based electricity consumption forecasting model using TensorFlow and Keras with <5% MAE on 1,000+ data points.",
            "status": "RUNNING",
            "github_url": "https://github.com/Debrupbanik/lstm_comparisons",
            "tags": ["Python", "TensorFlow", "Keras", "Pandas", "Matplotlib"]
        },
        {
            "pid": "api-mesh",
            "name": "api-mesh-gateway",
            "slug": "api-mesh-gateway",
            "description": "AI-powered API gateway with intelligent request routing, circuit breaking, and smart caching using FastAPI and Redis.",
            "status": "RUNNING",
            "github_url": "https://github.com/Debrupbanik/api-mesh-gateway",
            "tags": ["FastAPI", "Redis", "Python", "Docker"]
        },
        {
            "pid": "vault-db",
            "name": "VaultDB",
            "slug": "VaultDB",
            "description": "CLI and web dashboard for database backup utility supporting MySQL, PostgreSQL, MongoDB, and SQLite with cloud storage integration.",
            "status": "RUNNING",
            "github_url": "https://github.com/Debrupbanik/VaultDB",
            "tags": ["FastAPI", "Python", "MySQL", "PostgreSQL"]
        },
        {
            "pid": "dataforge",
            "name": "DataForge",
            "slug": "DataForge",
            "description": "All-in-one backend platform combining API gateway, energy forecasting, and database backup capabilities.",
            "status": "RUNNING",
            "github_url": "https://github.com/Debrupbanik/DataForge",
            "tags": ["Python", "FastAPI", "TensorFlow"]
        },
        {
            "pid": "ai-trading",
            "name": "ai-trading-bot",
            "slug": "ai-trading-bot",
            "description": "Cryptocurrency trading bot with predictive analytics and machine learning models.",
            "status": "ARCHIVED",
            "github_url": "https://github.com/Debrupbanik/ai-trading-bot",
            "tags": ["Python", "ML"]
        }
    ]
    for p in projects:
        tags = p.pop('tags')
        project, created = Project.objects.get_or_create(slug=p['slug'], defaults=p)
        if created:
            for t in tags:
                tag, _ = Tag.objects.get_or_create(name=t)
                project.tags.add(tag)

    # Seed Experience
    experiences = [
        {
            "hash": "e7f1a3b",
            "date": "2025-12",
            "message": "AI Intern @ One Aim IT Solutions",
            "org": "One Aim IT Solutions",
            "description": "Trained and optimized machine learning models for energy forecasting and anomaly detection. Improved model accuracy and training efficiency through feature engineering and hyperparameter tuning. Worked with LSTM, Random Forest, and Isolation Forest models in production-oriented pipelines. Assisted in benchmarking, evaluation, and deployment-ready model preparation.",
        },
        {
            "hash": "c4d2e8f",
            "date": "2023-09",
            "message": "Web Developer @ The Speech Society",
            "org": "The Speech Society",
            "description": "Planned, developed, and maintained the official club website with 99% uptime, supporting 300+ students. Implemented 5+ feature enhancements and improved mobile responsiveness to boost engagement. Organized 10+ events, increasing student participation by 20% through digital communication.",
        }
    ]
    for ex in experiences:
        Experience.objects.get_or_create(hash=ex['hash'], defaults=ex)

def reverse_seed(apps, schema_editor):
    Project = apps.get_model('api', 'Project')
    Skill = apps.get_model('api', 'Skill')
    Experience = apps.get_model('api', 'Experience')
    Tag = apps.get_model('api', 'Tag')
    
    Project.objects.all().delete()
    Skill.objects.all().delete()
    Experience.objects.all().delete()
    Tag.objects.all().delete()

class Migration(migrations.Migration):
    dependencies = [
        ('api', '0002_analyticshit_message_tag_alter_experience_options_and_more'),
    ]

    operations = [
        migrations.RunPython(seed_data, reverse_seed),
    ]

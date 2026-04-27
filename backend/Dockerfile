# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 8080

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the project code
COPY . /app/

# Collect static files
# We set a dummy SECRET_KEY for build time so collectstatic doesn't fail
RUN SECRET_KEY=build-key ALLOWED_HOSTS=localhost python manage.py collectstatic --noinput

# Expose the port
EXPOSE 8080

# Run the application
# We use daphne because we are using Django Channels
CMD ["daphne", "-b", "0.0.0.0", "-p", "8080", "portfolio.asgi:application"]

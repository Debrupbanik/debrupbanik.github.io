# Use a full Bookworm image for better stability and pre-installed libs
FROM python:3.12-bookworm

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
ENV PORT 8080

# Install remaining mandatory dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libgobject-2.0-0 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libffi-dev \
    shared-mime-info \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

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

# Generated by Django 5.0 on 2025-01-30 00:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_archived', models.BooleanField(default=False)),
                ('title', models.CharField(max_length=255)),
                ('content', models.TextField(blank=True)),
                ('category', models.CharField(choices=[('RDM', 'Random Thoughts'), ('SCL', 'School'), ('PSL', 'Personal')], max_length=3)),
                ('last_edited', models.DateTimeField(auto_now=True)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]

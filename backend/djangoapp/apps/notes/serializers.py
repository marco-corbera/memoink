from rest_framework import serializers
from apps.notes.models import Note

class NotePreviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ("id", "title", "category", "last_edited")

class NoteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ("id", "title", "content", "category", "last_edited", "is_archived")

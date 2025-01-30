from rest_framework import serializers
from apps.notes.models import Note

class NotePreviewSerializer(serializers.ModelSerializer):
    content = serializers.SerializerMethodField()

    class Meta:
        model = Note
        fields = ("id", "title", "category", "last_edited", "content")

    def get_content(self, obj):
        return obj.content[:100] + "..." if len(obj.content) > 100 else obj.content

class NoteDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ("id", "title", "content", "category", "last_edited", "is_archived")

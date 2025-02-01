from django.contrib import admin
from apps.notes.models import Note


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ("title", "user", "category", "last_edited", "is_archived")
    search_fields = ("title", "content")
    list_filter = ("category", "is_archived")
    ordering = ("-last_edited",)

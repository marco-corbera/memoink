from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from apps.notes.models import Note
from apps.notes.serializers import NotePreviewSerializer, NoteDetailSerializer

class NoteViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Note.objects.filter(user=self.request.user).order_by("-last_edited")

    def get_serializer_class(self):
        if self.action == "list":
            return NotePreviewSerializer
        return NoteDetailSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

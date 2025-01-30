from rest_framework.viewsets import ModelViewSet
from apps.notes.models import Note
from apps.notes.serializers import NotePreviewSerializer, NoteDetailSerializer

class NoteViewSet(ModelViewSet):
    queryset = Note.objects.all()

    def get_serializer_class(self):
        if self.action == "list":
            return NotePreviewSerializer
        return NoteDetailSerializer
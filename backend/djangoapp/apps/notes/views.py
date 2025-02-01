from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Count
from apps.notes.models import Note
from apps.notes.serializers import NotePreviewSerializer, NoteDetailSerializer


class NoteViewSet(ModelViewSet):
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        queryset = Note.objects.filter(user=user).order_by("-last_edited")
        category = self.request.GET.get("category")
        if category:
            queryset = queryset.filter(category=category)
        return queryset

    def get_serializer_class(self):
        if self.action == "list":
            return NotePreviewSerializer
        return NoteDetailSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CategorySummaryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        category_summary = (
            Note.objects.filter(user=user)
            .values("category")
            .annotate(count=Count("id"))
            .order_by("category")
        )
        return Response(category_summary)

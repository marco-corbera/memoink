from django.urls import path, include
from rest_framework.routers import DefaultRouter
from apps.notes.views import NoteViewSet, CategorySummaryView

router = DefaultRouter()
router.register(r'notes', NoteViewSet, basename='note')

urlpatterns = [
    path("notes/summary/", CategorySummaryView.as_view(), name="category-summary"),
    path("", include(router.urls)),
]

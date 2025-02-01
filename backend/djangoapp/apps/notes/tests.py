from django.test import TestCase

from django.contrib.auth import get_user_model
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from apps.notes.models import Note
from apps.notes.serializers import NoteDetailSerializer, NotePreviewSerializer

User = get_user_model()

class NoteModelTest(TestCase):
    """Tests for the Note model."""

    def setUp(self):
        self.user = User.objects.create_user(username="testuser", email="test@example.com", password="password123")
        self.note = Note.objects.create(
            user=self.user,
            title="Test Note",
            content="This is a test note.",
            category="RDM"
        )

    def test_note_creation(self):
        """Test that a note is created successfully."""
        self.assertEqual(self.note.title, "Test Note")
        self.assertEqual(self.note.content, "This is a test note.")
        self.assertEqual(self.note.category, "RDM")
        self.assertEqual(self.note.user, self.user)

class NoteSerializerTest(TestCase):
    """Tests for the Note serializers."""

    def setUp(self):
        self.user = User.objects.create_user(username="testuser", email="test@example.com", password="password123")
        self.note = Note.objects.create(
            user=self.user,
            title="Test Note",
            content="This is a test note.",
            category="RDM"
        )

    def test_note_preview_serializer(self):
        """Test that NotePreviewSerializer serializes correctly."""
        serializer = NotePreviewSerializer(instance=self.note)
        self.assertEqual(serializer.data["title"], "Test Note")
        self.assertEqual(serializer.data["category"], "RDM")

    def test_note_detail_serializer(self):
        """Test that NoteDetailSerializer serializes correctly."""
        serializer = NoteDetailSerializer(instance=self.note)
        self.assertEqual(serializer.data["title"], "Test Note")
        self.assertEqual(serializer.data["content"], "This is a test note.")
        self.assertEqual(serializer.data["category"], "RDM")

class NoteViewSetTest(TestCase):
    """Tests for the NoteViewSet API."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", email="test@example.com", password="password123")
        self.client.force_authenticate(user=self.user)
        self.note1 = Note.objects.create(
            user=self.user,
            title="Note 1",
            content="Content 1",
            category="RDM"
        )
        self.note2 = Note.objects.create(
            user=self.user,
            title="Note 2",
            content="Content 2",
            category="PSL"
        )

    def test_list_notes(self):
        """Test retrieving a list of notes."""
        response = self.client.get("/api/notes/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_filter_notes_by_category(self):
        """Test filtering notes by category."""
        response = self.client.get("/api/notes/?category=RDM")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["title"], "Note 1")

    def test_create_note(self):
        """Test creating a note."""
        payload = {
            "title": "New Note",
            "content": "New Content",
            "category": "SCL"
        }
        response = self.client.post("/api/notes/", payload)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Note.objects.count(), 3)

    def test_update_note(self):
        """Test updating a note."""
        payload = {
            "title": "Updated Title",
            "content": "Updated Content",
            "category": "PSL"
        }
        response = self.client.put(f"/api/notes/{self.note1.id}/", payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.note1.refresh_from_db()
        self.assertEqual(self.note1.title, "Updated Title")

    def test_delete_note(self):
        """Test deleting a note."""
        response = self.client.delete(f"/api/notes/{self.note1.id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Note.objects.count(), 1)

class CategorySummaryViewTest(TestCase):
    """Tests for the CategorySummaryView endpoint."""

    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", email="test@example.com", password="password123")
        self.client.force_authenticate(user=self.user)
        Note.objects.create(user=self.user, title="Note 1", content="Content 1", category="RDM")
        Note.objects.create(user=self.user, title="Note 2", content="Content 2", category="RDM")
        Note.objects.create(user=self.user, title="Note 3", content="Content 3", category="SCL")

    def test_category_summary(self):
        """Test retrieving category summary."""
        response = self.client.get("/api/notes/summary/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        expected_summary = [{"category": "RDM", "count": 2}, {"category": "SCL", "count": 1}]
        self.assertCountEqual(response.data, expected_summary)

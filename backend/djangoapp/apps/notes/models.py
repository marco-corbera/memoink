from django.db import models
from apps.users.models import User
from memobackend.models import BaseModel


class Note(BaseModel):
    CATEGORY_CHOICES = [
        ("RDM", "Random Thoughts"),
        ("SCL", "School"),
        ("PSL", "Personal"),
        ("DRM", "Drama"),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    title = models.CharField(max_length=255)
    content = models.TextField(blank=True)
    category = models.CharField(max_length=3, choices=CATEGORY_CHOICES)
    last_edited = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

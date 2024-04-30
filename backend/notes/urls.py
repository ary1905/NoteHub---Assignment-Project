from django.urls import path
from .views import NotesAPIView, NoteDetailView

urlpatterns = [
    path('api/notes/', NotesAPIView.as_view(), name='notes'),
    path('api/notes/<int:pk>/', NoteDetailView.as_view(), name='note-detail'),
]

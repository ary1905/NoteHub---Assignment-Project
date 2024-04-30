from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .models import Notes


class NotesAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        try:
            notes = Notes.objects.all()
            note_data = [
                {
                    'note_id': note.id,
                    'note_title': note.note_title,
                    'note_content': note.note_content,
                }
                for note in notes
            ]
            return Response(note_data)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def post(self, request, *args, **kwargs):
        data = request.data

        note_title = data.get('note_title')
        note_content = data.get('note_content')

        if not note_title or not note_content:
            return Response({'error': 'Incomplete data provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            note = Notes.objects.create(
                note_title=note_title,
                note_content=note_content,
            )
            return Response({'success': 'Note added successfully', 'note_id': note.id})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class NoteDetailView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request, pk, *args, **kwargs):
        try:
            note = Notes.objects.get(pk=pk)
            note_data = {
                'note_id': note.id,
                'note_title': note.note_title,
                'note_content': note.note_content,
            }
            return Response(note_data)
        except Notes.DoesNotExist:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def put(self, request, pk, *args, **kwargs):
        data = request.data

        note_title = data.get('note_title')
        note_content = data.get('note_content')

        if not note_title or not note_content:
            return Response({'error': 'Incomplete data provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            note = Notes.objects.get(pk=pk)
            note.note_title = note_title
            note.note_content = note_content
            note.save()
            return Response({'success': 'Note updated successfully'})
        except Notes.DoesNotExist:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def delete(self, request, pk, *args, **kwargs):
        try:
            note = Notes.objects.get(pk=pk)
            note.delete()
            return Response({'success': 'Note deleted successfully'})
        except Notes.DoesNotExist:
            return Response({'error': 'Note not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
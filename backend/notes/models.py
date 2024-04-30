from django.db import models

class Notes(models.Model):
    id = models.AutoField(primary_key=True)
    note_title = models.TextField(max_length=255)
    note_content = models.TextField(max_length=1024)

    
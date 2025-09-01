from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

# Create your models here.

class User(AbstractUser):
  pass 

class Board(models.Model):
  title = models.CharField(max_length=255)
  owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='boards')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  def __str__(self):
      return self.title

class Column(models.Model):
  board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='columns')
  name = models.CharField(max_length=100)
  order = models.PositiveIntegerField(default=0)  # for custom ordering

  def __str__(self):
      return f"{self.name} ({self.board.title})"

class Task(models.Model):
  column = models.ForeignKey(Column, on_delete=models.CASCADE, related_name='tasks')
  title = models.CharField(max_length=255)
  description = models.TextField(blank=True)
  status = models.CharField(max_length=100)  # e.g. "Todo", "Doing", "Done"
  order = models.PositiveIntegerField(default=0)  # for custom ordering

  def __str__(self):
      return self.title

class Subtask(models.Model):
  task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='subtasks')
  title = models.CharField(max_length=255)
  is_completed = models.BooleanField(default=False)

  def __str__(self):
      return self.title   
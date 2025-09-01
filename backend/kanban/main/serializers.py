from rest_framework import serializers
from .models import User, Board, Column, Task, Subtask

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, min_length=8)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']  # Add other fields if needed

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data.get('email', '')
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
      
      
class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'title', 'owner', 'created_at', 'updated_at']

class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ['id', 'board', 'name', 'order']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'column', 'title', 'description', 'status', 'order']

class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ['id', 'task', 'title', 'is_completed']

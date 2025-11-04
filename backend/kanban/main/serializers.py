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
      
      
class SubtaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ['id', 'title', 'is_completed', 'task']

class TaskSerializer(serializers.ModelSerializer):
    subtasks = SubtaskSerializer(many=True, read_only=True)
    
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'status', 'order', 'subtasks', 'column']

class ColumnSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    
    class Meta:
        model = Column
        fields = ['id', 'name', 'order', 'tasks']
    extra_kwargs = {
            'board': {'write_only': True} 
        }

class BoardSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    columns = ColumnSerializer(many=True, read_only=True)
    
    class Meta:
        model = Board
        fields = ['id', 'title', 'owner', 'created_at', 'updated_at', 'columns']
        
    def create(self, validated_data):
        # Create the board first
        board = Board.objects.create(**validated_data)
        return board


# These serializers are now defined above with nested relations

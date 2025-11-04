from django.shortcuts import render
from rest_framework import generics, status, serializers
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from .models import User, Board, Column, Task, Subtask
from .serializers import UserRegistrationSerializer, BoardSerializer, ColumnSerializer, TaskSerializer, SubtaskSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
# Create your views here.


# User Registration View
class RegisterUserView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            # Optionally, create a token for the new user
            token, created = Token.objects.get_or_create(user=user)
            return Response({
                'message': 'User created successfully!',
                'token': token.key
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 

# User Login View (Token Auth)
class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({
            'token': token.key,
            'user_id': token.user_id,
            'username': token.user.username
        })
        
# Board ViewSet
class BoardViewSet(viewsets.ModelViewSet):
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Only return boards belonging to the current user
        return Board.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # Save the board with the current user as owner
        board = serializer.save(owner=self.request.user)
        
        print(f"DEBUG: Board created - ID: {board.id}, Title: {board.title}, Owner: {board.owner.username}")
        
        # Create columns if they were included in the request
        columns_data = self.request.data.get('columns', [])
        print(f"DEBUG: Columns data received: {columns_data}")
        
        if columns_data:
            for idx, column_data in enumerate(columns_data):
                column = Column.objects.create(
                    board=board,
                    name=column_data.get('name', ''),
                    order=idx
                )
                print(f"DEBUG: Column created - ID: {column.id}, Name: {column.name}, Board: {board.id}")
        
class ColumnViewSet(viewsets.ModelViewSet):
    serializer_class = ColumnSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Filter columns by board, and ensure the board belongs to the current user
        return Column.objects.filter(board__owner=self.request.user)
    
    def perform_create(self, serializer):
        board_id = self.request.data.get('board')
        try:
            # 1. Check if the board exists AND belongs to the authenticated user
            board = Board.objects.get(pk=board_id, owner=self.request.user)
            # 2. Save the column, linking it to the retrieved (and authorized) board
            serializer.save(board=board)
        except Board.DoesNotExist:
            # If the board doesn't exist or doesn't belong to the user, throw a 403/404
            raise serializers.ValidationError({"board": "Invalid board ID or permission denied."})


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Filter tasks by ensuring they belong to columns of boards owned by the current user
        return Task.objects.filter(column__board__owner=self.request.user)
        
    def perform_create(self, serializer):
        try:
            # Print received data for debugging
            print(f"DEBUG: Task creation data received: {self.request.data}")
            
            # Make sure column is included
            if 'column' not in self.request.data:
                print("ERROR: No column ID provided in the request")
                raise serializers.ValidationError({"column": "This field is required."})
            
            # Debug column value
            column_value = self.request.data.get('column')
            print(f"DEBUG: Column value received: {column_value}, type: {type(column_value)}")
            
            # Validate column exists
            try:
                from .models import Column
                column_obj = Column.objects.get(pk=column_value)
                print(f"DEBUG: Found column with ID {column_value}: {column_obj.name}")
            except Exception as e:
                print(f"ERROR: Could not find column with ID {column_value}: {str(e)}")
                raise serializers.ValidationError({"column": f"Column with ID {column_value} does not exist."})
                
            task = serializer.save()
            print(f"DEBUG: Task created - ID: {task.id}, Title: {task.title}, Column: {task.column.name}")
            
            # Check for subtasks in the request data
            subtasks_data = self.request.data.get('subtasks', [])
            print(f"DEBUG: Subtasks data received: {subtasks_data}")
            
            # Create subtasks if included
            if subtasks_data:
                for subtask_data in subtasks_data:
                    subtask = Subtask.objects.create(
                        task=task,
                        title=subtask_data.get('title', ''),
                        is_completed=subtask_data.get('is_completed', False)
                    )
                    print(f"DEBUG: Subtask created - ID: {subtask.id}, Title: {subtask.title}, Task: {task.id}")
        except Exception as e:
            print(f"ERROR creating task: {str(e)}")
            raise

class SubtaskViewSet(viewsets.ModelViewSet):
    serializer_class = SubtaskSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Filter subtasks by ensuring they belong to tasks in columns of boards owned by the current user
        return Subtask.objects.filter(task__column__board__owner=self.request.user)
    
    def perform_create(self, serializer):
        try:
            # Print received data for debugging
            print(f"DEBUG: Subtask creation data received: {self.request.data}")
            
            # Make sure task is included
            if 'task' not in self.request.data:
                print("ERROR: No task ID provided in the request")
                raise serializers.ValidationError({"task": "This field is required."})
            
            # Debug task value
            task_id = self.request.data.get('task')
            print(f"DEBUG: Task ID received: {task_id}, type: {type(task_id)}")
            
            # Validate task exists
            try:
                from .models import Task
                task_obj = Task.objects.get(pk=task_id)
                print(f"DEBUG: Found task with ID {task_id}: {task_obj.title}")
            except Exception as e:
                print(f"ERROR: Could not find task with ID {task_id}: {str(e)}")
                raise serializers.ValidationError({"task": f"Task with ID {task_id} does not exist."})
            
            # Save the subtask
            subtask = serializer.save()
            print(f"DEBUG: Subtask created - ID: {subtask.id}, Title: {subtask.title}, Task: {subtask.task.id}")
            
        except Exception as e:
            print(f"ERROR creating subtask: {str(e)}")
            raise

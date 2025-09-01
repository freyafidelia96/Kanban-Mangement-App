from django.shortcuts import render
from rest_framework import generics, status
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
    queryset = Board.objects.all()
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
        
class ColumnViewSet(viewsets.ModelViewSet):
    queryset = Column.objects.all()
    serializer_class = ColumnSerializer
    permission_classes = [IsAuthenticated]

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

class SubtaskViewSet(viewsets.ModelViewSet):
    queryset = Subtask.objects.all()
    serializer_class = SubtaskSerializer
    permission_classes = [IsAuthenticated]

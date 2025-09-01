from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'boards', views.BoardViewSet, basename='board')
router.register(r'columns', views.ColumnViewSet, basename='column')
router.register(r'tasks', views.TaskViewSet, basename='task')
router.register(r'subtasks', views.SubtaskViewSet, basename='subtask')

urlpatterns = [
    path('register/', views.RegisterUserView.as_view(), name='register'),
    path('login/', views.CustomObtainAuthToken.as_view(), name='login'),
]

urlpatterns += router.urls
  
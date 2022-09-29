from django.contrib import admin
from django.urls import path, include
from bezen.views import SearchSubtitlesView, UploadVideoView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/upload', UploadVideoView.as_view()),
    path('api/search', SearchSubtitlesView.as_view()),
]

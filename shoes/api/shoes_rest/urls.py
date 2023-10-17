from django.urls import path
from .views import list_shoes


urlpatterns = [
    path("", list_shoes, name="list_shoes")
]

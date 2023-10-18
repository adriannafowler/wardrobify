from django.urls import path
from .views import list_shoes, detail_shoe


urlpatterns = [
    path("", list_shoes, name="list_shoes"),
    path("<int:id>/", detail_shoe, name="detail_shoe")
]

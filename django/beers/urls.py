from django.urls import path
from . import views

app_name = 'beers'
urlpatterns = [
    path('new/<int:user_no>/', views.recommend)
]
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('guess', views.guess, name='guess'),
    path('new-word', views.new_word, name='new_word'),
]
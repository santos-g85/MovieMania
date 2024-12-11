from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter
from .views import fetch_tmdb_movies, fetch_trending_movies,get_recommendations,fetch_tv,movie_details;


urlpatterns = [
    path('movies/',fetch_tmdb_movies, name='fetch_movies'),
    path('tv/',fetch_tv, name='fetch_movies'),
    path('trending/', fetch_trending_movies, name='fetch_trending_movies'),
    path('recommend/',get_recommendations, name='recommended_movies'),
    path('movie_detail/<int:movie_id>/',movie_details, name='moviedetails'),
]





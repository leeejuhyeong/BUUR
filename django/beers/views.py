from django.shortcuts import render
from .latent_factor import use_latent
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET'])
def recommend(request, user_no):
    if request.method == 'GET':
        result = use_latent(user_no)
        return Response(result)
from django.shortcuts import render
from rest_framework import generics
from .models import Stock, MutualFund
from .serializers import StockSerializer, MutualFundSerializer

class StockList(generics.ListCreateAPIView):
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

class MutualFundList(generics.ListCreateAPIView):
    queryset = MutualFund.objects.all()
    serializer_class = MutualFundSerializer

from rest_framework import serializers
from .models import Stock, MutualFund

class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = '__all__'

class MutualFundSerializer(serializers.ModelSerializer):
    class Meta:
        model = MutualFund
        fields = '__all__'

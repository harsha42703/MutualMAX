from django.urls import path
from .views import StockList, MutualFundList

urlpatterns = [
    path('stocks/', StockList.as_view(), name='stock-list'),
    path('mutual-funds/', MutualFundList.as_view(), name='mutual-fund-list'),
]

from django.db import models

class Stock(models.Model):
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=10)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

class MutualFund(models.Model):
    name = models.CharField(max_length=100)
    expense_ratio = models.DecimalField(max_digits=5, decimal_places=2)
    nav = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

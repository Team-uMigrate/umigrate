
from django_filters import rest_framework as filters
from .models import Housing

class HousingFilter(filters.FilterSet):
    # More on lookup_expr syntax: https://django-filter.readthedocs.io/en/latest/ref/filters.html
    # https://docs.djangoproject.com/en/3.0/ref/models/querysets/#field-lookups
    # gte = greater than or equal to
    # lte = less than or equal to

    min_price = filters.NumberFilter(field_name='price', lookup_expr='gte')
    max_price = filters.NumberFilter(field_name='price', lookup_expr='lte')
    min_date = filters.DateTimeFilter(field_name='datetime_created', lookup_expr='gte')
    max_date = filters.DateTimeFilter(field_name='datetime_created', lookup_expr='lte')

    class Meta: 
        model = Housing
        fields = ['min_price', 'max_price', 'min_date', 'max_date', 
                'region', 'datetime_created', 'creator', 'category', 
                'price', 'term', 'street_address', 'city', 
                'division', 'country', 'title', 'features']

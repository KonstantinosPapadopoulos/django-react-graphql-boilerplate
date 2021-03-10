from django.db.models import Q
import django_filters
from users.models import User


class UserFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method='filter_search')

    class Meta:
        model = User
        fields = ()

    def filter_search(self, queryset, name, value):
        return queryset.filter(
            Q(username__icontains=value) | Q(email__icontains=value)
        )
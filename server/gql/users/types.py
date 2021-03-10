from graphene_django import DjangoObjectType
from users.models import User

class UserType(DjangoObjectType):
    
    class Meta:
        model = User
        only_fields = (
            'id',
            'username',
            'email',
            'bio',
            'password',
            'created_at'
        )
        use_connection = True


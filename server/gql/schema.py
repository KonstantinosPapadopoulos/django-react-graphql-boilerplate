from graphene import Argument, Field, ID, ObjectType, Schema
from graphene_django.filter import DjangoFilterConnectionField
from users.models import User
from .users.filters import UserFilter
from .users.mutations import UserCreate, UserDelete
from .users.types import UserType


class Query(ObjectType):

    users = DjangoFilterConnectionField(UserType, filterset_class=UserFilter)
    user = Field(UserType, id=Argument(ID,required=True))

    def resolve_users(root, info, **kwargs):
        return User.objects.all()

    def resolve_user(root, info, **kwargs):
        return User.objects.get(id=kwargs.get('id'))


class Mutation(ObjectType):

    user_create = UserCreate.Field()
    user_delete = UserDelete.Field()


schema = Schema(query=Query, mutation=Mutation)

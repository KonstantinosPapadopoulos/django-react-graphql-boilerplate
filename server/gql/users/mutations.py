from graphene import Boolean, Field, ID, InputObjectType, Mutation, String
from rest_framework import serializers
from users.models import User
from .types import UserType


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'email',
            'password'
        )


class UserInputType(InputObjectType):
    username = String()
    email = String() 
    password = String() 


class UserCreate(Mutation):
    class Arguments:
        input = UserInputType(required=True)

    user = Field(UserType)

    @classmethod
    def mutate(cls, root, info, **data):
        serializer = UserSerializer(data=data.get('input'))
        serializer.is_valid(raise_exception=True)

        return UserCreate(user=serializer.save())


class UserDelete(Mutation):
    class Arguments:
        id = ID()
        email = String()
        password = String()

    ok = Boolean()
    debug = String()


    @classmethod
    def mutate(cls, root, info, **data):

        if 'id' in data and 'email' not in data:
            user = User.objects.get(id=data.get('id'))
        elif 'email' in data and 'id' not in data:
            user =  User.objects.get(email=data.get('email'))
        else:
            return UserDelete(ok=False,debug='Please provide either only the id or only the email of the user you want to delete.')

        print('user password is: ' + user.password)
        if user.password == data.get('password'):
            user.delete()
            return UserDelete(ok=False,debug='User has been deleted.')
        else:
            return UserDelete(ok=False,debug='The password you entered is wrong.')
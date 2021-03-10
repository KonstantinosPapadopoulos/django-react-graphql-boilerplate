from django.db import models
from django.utils.translation import ugettext_lazy as _

class User(models.Model):
    username = models.CharField(max_length=255, unique=True) 
    email =  models.EmailField(max_length=70,unique=True)
    bio = models.TextField()
    password = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{} (#{})'.format(self.username, self.pk)

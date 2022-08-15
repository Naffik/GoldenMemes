from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, UserProfile

fields = list(UserAdmin.fieldsets)
fields[1] = ('Personal info', {'fields': ('first_name', 'last_name', 'email')})
UserAdmin.fieldsets = tuple(fields)

admin.site.register(User, UserAdmin)


@admin.register(UserProfile)
class UserProfile(admin.ModelAdmin):
    list_display = ['id', 'nickname']


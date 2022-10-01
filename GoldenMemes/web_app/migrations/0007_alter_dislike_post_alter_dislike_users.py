# Generated by Django 4.0.4 on 2022-10-01 10:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('web_app', '0006_alter_post_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dislike',
            name='post',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='dislike', to='web_app.post'),
        ),
        migrations.AlterField(
            model_name='dislike',
            name='users',
            field=models.ManyToManyField(related_name='post_dislikes', to=settings.AUTH_USER_MODEL),
        ),
    ]

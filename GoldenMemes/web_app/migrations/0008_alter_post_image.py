# Generated by Django 4.0.4 on 2022-06-23 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web_app', '0007_post_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='image',
            field=models.ImageField(upload_to='media/images/', verbose_name=''),
        ),
    ]
# Generated by Django 4.0.3 on 2023-10-18 00:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('shoes_rest', '0002_remove_shoes_name_shoes_color_shoes_manufacturer_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shoes',
            name='color',
        ),
        migrations.RemoveField(
            model_name='shoes',
            name='manufacturer',
        ),
        migrations.RemoveField(
            model_name='shoes',
            name='model_name',
        ),
        migrations.AddField(
            model_name='shoes',
            name='name',
            field=models.CharField(max_length=250, null=True),
        ),
    ]

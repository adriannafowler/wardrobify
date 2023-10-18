from django.contrib import admin
from .models import BinVO, Shoes


@admin.register(BinVO)
class BinVOAdmin(admin.ModelAdmin):
    pass

@admin.register(Shoes)
class ShoesAdmin(admin.ModelAdmin):
    pass

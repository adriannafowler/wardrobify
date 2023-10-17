from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from .models import Shoes
import json


class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "name",
    ]

@require_http_methods(["GET", "POST"])
def list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        shoes = Shoe.objects.filter(bin=bin_vo_id)
        return JsonResponse({"shoes": shoes},
                            encoder=ShoesListEncoder,
                            safe=False)

from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from .models import Shoes, BinVO
import json


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size",
        "import_href",
    ]

class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "name",
        "image",
        "bin",
    ]

@require_http_methods(["GET", "POST"])
def list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        shoes = Shoes.objects.filter(bin=bin_vo_id)
        return JsonResponse({"shoes": shoes},
                            encoder=ShoesListEncoder,
                            safe=False)
    else:
        content = json.loads(request.body)
        try:
            bin_href = f"/api/bins/{bin_vo_id}"
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status = 400,
            )
        shoe = Shoes.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoesListEncoder,
            safe=False
        )

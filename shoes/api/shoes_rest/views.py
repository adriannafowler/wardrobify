from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from .models import Shoes, BinVO
import json


class BinVOEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "import_href",
    ]

class ShoesListEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "image",
    ]
    def get_extra_data(self, o):
        return {"bin": o.bin.import_href}

class ShoesDetailEncoder(ModelEncoder):
    model = Shoes
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "image",
    ]
    def get_extra_data(self, o):
        return {"bin": o.bin.import_href}


@require_http_methods(["GET", "POST"])
def list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        if bin_vo_id is not None:
            shoes = Shoes.objects.filter(bin=bin_vo_id)
        else:
            shoes = Shoes.objects.all()
            return JsonResponse({"shoes": shoes},
                            encoder=ShoesListEncoder,
                            safe=False)
    else:
        content = json.loads(request.body)
        try:
            locate = content["bin"]
            bin_href = f"/api/bins/{locate}/"
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

@require_http_methods(["GET", "DELETE"])
def detail_shoe(request, id):
    if request.method == "GET":
        shoe = Shoes.objects.get(id=id)
        return JsonResponse(shoe,
                            encoder=ShoesDetailEncoder,
                            safe=False)
    else:
        count, _ = Shoes.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

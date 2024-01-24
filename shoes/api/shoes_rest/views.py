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
    ]
    def get_extra_data(self, o):
        return {
            "bin": o.bin.import_href,
            "image": o.image.url if o.image else None,
            }

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
        return {
            "bin": o.bin.import_href,
            "image": o.image.url if o.image else None,
            }


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
        try:
            manufacturer = request.POST.get("manufacturer")
            model_name = request.POST.get("model_name")
            color = request.POST.get("color")
            image = request.FILES.get("image")
            bin_id = request.POST.get("bin")
            bin = BinVO.objects.get(id=bin_id)

            shoe = Shoes.objects.create(
                manufacturer=manufacturer,
                model_name=model_name,
                color=color,
                image=image,
                bin=bin
            )

            return JsonResponse({
                "id": shoe.id,
                "manufacturer": shoe.manufacturer,
                "model_name": shoe.model_name,
                "color": shoe.color,
                "image": shoe.image.url if shoe.image else None,
                "bin": shoe.bin.import_href
            }, status=201)

        except BinVO.DoesNotExist:
            return JsonResponse({"message": "Invalid bin ID or Bin not found"}, status=400)


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

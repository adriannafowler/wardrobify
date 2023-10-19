from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Hats, LocationVO


class LocationVOEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "import_href",
        "closet_name",
    ]


class HatsEncoder(ModelEncoder):
    model = Hats
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "id",
        "location",
    ]
    encoders = {"location": LocationVOEncoder()}


class HatsDetailEncoder(ModelEncoder):
    model = Hats
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
        "id",
        "location",
    ]
    encoders = {"location": LocationVOEncoder()}




@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):

    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hats.objects.filter(location=location_vo_id)
        else:
            hats = Hats.objects.all()
        return JsonResponse(
            {"Hats": hats},
            encoder=HatsEncoder,
        )
    else:
        content = json.loads(request.body)

        try:
            locate = content["location"]
            location_href = f"/api/locations/{locate}/"
            location = LocationVO.objects.get(import_href=location_href)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid conference id"},
                status=400,
            )

        hat = Hats.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_hat(request, pk):
    if request.method == "GET":
        hats = Hats.objects.get(id=pk)
        return JsonResponse(
            hats,
            encoder=HatsDetailEncoder,
            safe=False,
        )
    else:
        count, _ = Hats.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})

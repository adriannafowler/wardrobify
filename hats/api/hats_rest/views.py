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
    ]


class HatsEncoder(ModelEncoder):
    model = Hats
    properties = [
        "fabric",
        "style_name",
        "color",
        "picture_url",
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
        hat = Hats.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatsEncoder,
            safe=False,
        )

# Create your views here.

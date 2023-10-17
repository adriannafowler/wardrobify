import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "attendees_bc.settings")
django.setup()


from .models import BinVO

def get_bins():
    url = "http://wardrobe:8100/api/bins/"
    response = requests.get(url)
    content = json.loads(response.content)
    for bin in content["bins"]:
        BinVO.objects.update_or_create(
            import_href=bin["href"],
            defaults={"name": bin["name"]},
        )

def poll():
    while True:
        try:
            get_bins()
        except Exception as e:
            print(e)
        time.sleep(5)


if __name__ == "__main__":
    poll()

import django
import os
import sys
import time
import json
import requests
import logging

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shoes_project.settings")
django.setup()

# Import models from hats_rest, here.
# from shoes_rest.models import Something
from shoes_rest.models import BinVO

def get_bins():
    url = "http://wardrobe-api:8000/api/bins/"
    response = requests.get(url)

    if response.status_code == 200:
        content = json.loads(response.content)
        for bin in content["bins"]:
            BinVO.objects.update_or_create(
                import_href=bin["href"],
                # defaults={"name": bin["closet_name"]},
            )
    else:
        logging.error(f"Failed to fetch data from {url}. Status code: {response.status_code}")

def poll():
    while True:
        print('Shoes poller polling for data')
        try:
            get_bins()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()

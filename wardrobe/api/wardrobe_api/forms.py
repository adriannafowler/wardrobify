from django.forms import ModelForm
from wardrobe_api.models import Bin

class BinForm(ModelForm):
    class Meta:
        model = Bin
        fields = [
            "closet_name",
            "bin_number",
            "bin_size",
            "image",
        ]

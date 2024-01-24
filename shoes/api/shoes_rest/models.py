from django.db import models

class BinVO(models.Model):
    import_href = models.CharField(max_length=250, unique=True)


class Shoes(models.Model):
    manufacturer = models.CharField(max_length=250, null=True)
    model_name = models.CharField(max_length=250, null=True)
    color = models.CharField(max_length=250, null=True)
    image = models.ImageField(null=True, blank=True, upload_to="images/")
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.model_name

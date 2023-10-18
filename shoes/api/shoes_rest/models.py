from django.db import models

class BinVO(models.Model):
    import_href = models.CharField(max_length=250, unique=True)


class Shoes(models.Model):
    name = models.CharField(max_length=250)
    image = models.URLField(null=True)
    bin = models.ForeignKey(
        BinVO,
        related_name="shoes",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name

from django.db import models

class BinVO(models.Model):
    import_href = models.CharField(max_length=250)


class Shoes(models.Model):
    name = models.CharField(max_length=250)
    bin = models.ForeignKey(
        BinVO,
        related_name="bins",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name

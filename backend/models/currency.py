from fireo import models

class Currency(models.Model):
    currency_id = models.IDField()
    name = models.TextField()

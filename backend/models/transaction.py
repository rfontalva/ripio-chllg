from fireo import models

class Transaction(models.Model):
    seller = models.TextField()
    buyer = models.TextField()
    seller_currency = models.TextField()
    buyer_currency = models.TextField()
    seller_price = models.NumberField()
    buyer_price = models.NumberField()
    is_complete = models.BooleanField()
    is_deposit = models.BooleanField

    def load_values(self, **kwargs):
        self.seller = kwargs.get("seller") if kwargs.get("seller") else ''
        self.buyer = kwargs.get("buyer") if kwargs.get("buyer") else ''
        self.seller_currency = kwargs.get("seller_currency") if kwargs.get("seller_currency") else ''
        self.buyer_currency = kwargs.get("buyer_currency") if kwargs.get("buyer_currency") else ''
        self.seller_price = kwargs.get("seller_price") if kwargs.get("seller_price") else 0
        self.buyer_price = kwargs.get("buyer_price") if kwargs.get("buyer_price") else 0
        self.is_deposit = kwargs.get("is_deposit") if kwargs.get("is_deposit") else False
        self.is_complete = True if self.is_deposit else False
        self.save()

    @classmethod
    def get_completed(self):
        t = Transaction.collection.group_fetch()
        incomplete_transactions = [n.to_dict() for n in t if n.is_complete]
        return incomplete_transactions

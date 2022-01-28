from fireo import models

from models.currency import Currency

class Wallet(models.Model):
    user_id = models.TextField()
    currencies = models.MapField()

    def create_wallet(self, user):
        self.user_id = user.id
        d = dict()
        for curr in Currency.get_ids():
            d[curr] = 0
        self.currencies = d
        self.save()

    def update_wallet(self, currency_id, value):
        balance = self.currencies[currency_id.upper()]
        if value < 0 and balance - value < 0:
            return False
        self.currencies[currency_id.upper()] = balance + value
        self.update()
        return balance

    def get_balance(self):
        return self.currencies

    @classmethod
    def get_by_user(self, user):
        return Wallet.collection.filter(user_id=user.id).get()

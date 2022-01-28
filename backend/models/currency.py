from fireo import models

class Currency(models.Model):
    currency_id = models.TextField()
    name = models.TextField()

    def add(self, id, name):
        self.currency_id = id
        self.name = name

    @classmethod
    def get_all(self):
        d = dict()
        for q in Currency.collection.group_fetch():
            d[q.currency_id] = q.name
        return d

    @classmethod
    def get_ids(self):
        return [q.currency_id for q in Currency.collection.group_fetch()]

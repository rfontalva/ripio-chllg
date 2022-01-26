from fireo import models
import bcrypt

class User(models.Model):
    name = models.TextField()
    password = models.Field()
    username = models.TextField()
    email = models.TextField()
    salt = models.Field()

    def load_values(self, _name, _username, _password, _email):
        self.name = _name
        self.username = _username
        self.email = _email
        self.salt = bcrypt.gensalt()
        pw = _password.encode('utf-8')
        self.password = bcrypt.hashpw(pw, self.salt)

    @classmethod
    def get_by_username(self, username):
        return User.collection.filter(username=username).get()

    @classmethod
    def get_by_email(self, email):
        return User.collection.filter(email=email).get()
        

class City(models.Model):
    short_name = models.IDField()
    name = models.TextField()
    state = models.TextField()
    country = models.TextField()
    capital = models.BooleanField()
    population = models.NumberField()
    regions = models.ListField()

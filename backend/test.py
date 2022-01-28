class Test():
    def __init__(self):
        self.value = 0

    def update(self, val):
        setattr(self, "value", val)

if __name__ == "__main__":
    t = Test()
    t.__setattr__("value", 5)
    print(t.value)

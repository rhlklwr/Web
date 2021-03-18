from decouple import config
import pymongo
from pymongo import MongoClient
import urllib.parse

username = urllib.parse.quote_plus(config('mongo_name'))
password = urllib.parse.quote_plus(config('password'))

connection_string = f'mongodb+srv://{username}:{password}@cluster0.pn7vd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

cluster = MongoClient(connection_string)
db = cluster['temp']
collection = db['users']

post = [{"_id":1, "name":"Jame", "age":"28"}, {"_id":2, "name":"Doc", "age":"5"}]

# collection.insert_one({"_id":0, "name":"Rahul", "age":"22"})
# collection.insert_many(post)
results = collection.find({"_id":0})

for result in results:
    print(result)
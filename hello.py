import os
import json
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return 'Hello hello World!'

@app.route('/userlist')
def userlist():
    print request
    response = {
                "id" : 0, 
                "name" : "haijun"
                }
    return json.dumps(response)
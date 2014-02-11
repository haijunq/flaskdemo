import os
import json
from flask import Flask
from flask import request
from flask import render_template
from flask import url_for

app = Flask(__name__)

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/userlist')
def userlist():
    print request
    f = open("static/userlist.json","r")
    userlist = json.load(f)
    response = {
                "status" : "success", 
                "results" : userlist
                }
    return json.dumps(response)

if __name__ == '__main__':
    app.run()
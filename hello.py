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
    fobj = file("static/userlist.json")
    userlist = json.load(fobj)
    response = {
                "status" : "success", 
                "results" : userlist
                }
    return json.dumps(response)

@app.route('/addnewuser', methods = ['POST'])
def addnewuser():
    newuser = json.loads(request.data)
    if (len(newuser["name"]) > 40):
        response = {
                    "status" : "failure"
                    }
        return json.dumps(response)
    
    fobj = file("static/userlist.json")
    userlist = json.load(fobj)
    userlist.append(newuser)
    with open("static/userlist.json", "w") as fobj:
        json.dump(userlist, fobj, indent = 4)
    response = {
               "status" : "success",
               "userlist" : userlist
               }
    return json.dumps(response)
    
if __name__ == '__main__':
    app.run()
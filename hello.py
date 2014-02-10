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
    response = {
                "id" : 0, 
                "name" : "haijun"
                }
    return json.dumps(response)

if __name__ == '__main__':
    app.run()
#! /usr/bin/env python3
import sys
import requests

url = 'http://localhost:8000/messages'
data = {'msg': sys.argv[1]}
r = requests.post(url, data=data)

print(r.text)

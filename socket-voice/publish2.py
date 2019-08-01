#! /usr/bin/env python3
import sys
import json
import requests
from datetime import datetime
import random

url = 'http://localhost:8000/messages'

places=["愛知県", "秋田県", "青森県", "千葉県", "愛媛県", "福井県", "福岡県", "福島県", "岐阜県", "群馬県"]
# places=["Tokyo", "New York", "London", "Lima", "Jakarta"]
magnitude=["1","2","3"]

dt=datetime.now()
data={
    "OriginTime": dt.strftime('%Y-%m-%dT%H:%M:%SZ'),
    "ArrivalTime":dt.strftime('%Y-%m-%dT%H:%M:%SZ'),
    "AreaName": places[random.randrange(len(places))],
    "EventID": "12345678",
    "Magnitude": magnitude[random.randrange(len(magnitude))],
    "NextAdvisory": dt.strftime('%Y-%m-%dT%H:%M:%SZ')
}

msg_type='jma_eq_ewfcst'                                              
message={
    "to":"all", 
    "msg": {
        "msg": {
            "type":msg_type, 
            "t":dt.strftime('%Y-%m-%dT%H:%M:%SZ'), 
            "data":data
        }
    }
}
print(json.dumps(message))

r=requests.post(url, json=message)
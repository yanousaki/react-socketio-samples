#! /usr/bin/env python3
import sys
import json
import requests
from datetime import datetime
import random

url = 'http://localhost:8000/message'

places=["愛知県", "秋田県", "青森県", "千葉県", "愛媛県", "福井県", "福岡県", "福島県", "岐阜県", "群馬県"]
magnitude=["1","2","3"]

data={
    "OriginTime":'originTime',
    "ArrivalTime":'arrivalTime',
    "AreaName": places[random.randrange(len(places))],
    "Magnitude": magnitude[random.randrange(len(magnitude))],
    "NextAdvisory":'nextAdvisory' }

msg_type='jma_eq_ewfcst'                                              
dt=datetime.now()
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
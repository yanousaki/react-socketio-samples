#! /usr/bin/env python3
import sys
import json
import requests
from datetime import datetime
import random

url = 'http://localhost:8000/message'

places=["Tokyo", "Kyoto", "Mihama Ward", "Nakase Ward", "Osaka", "Yokohama"]
magnitude=["1","2","3","4","5","6","7"]

data={
    "OriginTime":'originTime',
    "ArrivalTime":'arrivalTime',
    "AreaName": places[random.randrange(len(places))],
    "Magnitude": magnitude[random.randrange(len(magnitude))],
    "NextAdvisory":'nextAdvisory' }

msg_type='jma_eq_ewfcst'                                              
dt=datetime.now()
message={"to":"all", "msg":{"type":msg_type, "t":dt.strftime('%Y-%m-%dT%H:%M:%SZ'), "data":data}}
print(json.dumps(message))

r=requests.post(url, json=message)
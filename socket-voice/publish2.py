#! /usr/bin/env python3
import sys
import json
import requests
from datetime import datetime

url = 'http://localhost:8000/message'

data={
    "OriginTime":'originTime',
    "ArrivalTime":'arrivalTime',
    "AreaName":'Tokyo',
    "Magnitude":'5',
    "NextAdvisory":'nextAdvisory' }

msg_type='jma_eq_ewfcst'                                              
dt=datetime.now()
message={"to":"all", "msg":{"type":msg_type, "t":dt.strftime('%Y-%m-%dT%H:%M:%SZ'), "data":data}}
print(json.dumps(message))

r=requests.post(url, json=message)
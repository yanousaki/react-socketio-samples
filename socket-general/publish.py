#! /usr/bin/env python3

import time
from datetime import datetime        
import sys
import json
import requests

# WRAP_NOTIF_URL = 'http://notif-pubif:3000/messages'
WRAP_NOTIF_URL = 'http://localhost:8000/messages' # For Testing

infotypes=["announcement", "update", "correction", "cancel"]
modes=["normal", "test", "training"]
dt=datetime.now()

message={
    "to":"all",
    "msg":{
        "type": "jma_eq_ewfcst",
        "mode": modes[1],
        "t": dt.strftime('%Y-%m-%dT%H:%M:%SZ'),
        "data": {
            "OriginTime": dt.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "ArrivalTime": dt.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "AreaName": "幕張テクノガーデン付近",
            "EventID": dt.strftime('%Y-%m-%dT%H:%M:%SZ'),
            "InfoType": infotypes[0],
            "Magnitude": 1.0,
            "NextAdvisory": ""
        }
    }
}
# print(json.dumps(message))

r = requests.post(WRAP_NOTIF_URL, json=message)
print(r.text)

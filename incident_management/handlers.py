import json
from . import db


def create_incident(event, context=None):
    db.init_db()
    try:
        body = json.loads(event.get("body", "{}"))
    except json.JSONDecodeError:
        return {"statusCode": 400, "body": json.dumps({"error": "Invalid JSON"})}

    required = ["type", "severity", "status"]
    missing = [f for f in required if f not in body]
    if missing:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": f"Missing fields: {', '.join(missing)}"}),
        }

    incident = db.create_incident(body)
    return {"statusCode": 201, "body": json.dumps(incident)}


def update_incident(event, context=None):
    db.init_db()
    path = event.get("pathParameters") or {}
    incident_id = path.get("id")
    if not incident_id:
        return {"statusCode": 400, "body": json.dumps({"error": "Missing id"})}

    try:
        body = json.loads(event.get("body", "{}"))
    except json.JSONDecodeError:
        return {"statusCode": 400, "body": json.dumps({"error": "Invalid JSON"})}

    incident = db.update_incident(int(incident_id), body)
    if not incident:
        return {"statusCode": 404, "body": json.dumps({"error": "Incident not found"})}

    return {"statusCode": 200, "body": json.dumps(incident)}


def get_incident(event, context=None):
    db.init_db()
    path = event.get("pathParameters") or {}
    incident_id = path.get("id")
    if not incident_id:
        return {"statusCode": 400, "body": json.dumps({"error": "Missing id"})}

    incident = db.get_incident(int(incident_id))
    if not incident:
        return {"statusCode": 404, "body": json.dumps({"error": "Incident not found"})}

    return {"statusCode": 200, "body": json.dumps(incident)}

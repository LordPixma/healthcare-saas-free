import json
import os
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from incident_management import handlers, db


class IncidentHandlerTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.NamedTemporaryFile(delete=False)
        os.environ['INCIDENT_DB'] = self.tmp.name
        db.init_db()

    def tearDown(self):
        os.unlink(self.tmp.name)

    def test_create_incident(self):
        event = {
            'body': json.dumps({
                'type': 'Fall',
                'severity': 'High',
                'status': 'Open',
                'description': 'Patient fell in hallway'
            })
        }
        response = handlers.create_incident(event)
        self.assertEqual(response['statusCode'], 201)
        body = json.loads(response['body'])
        self.assertEqual(body['type'], 'Fall')
        self.assertEqual(body['status'], 'Open')

    def test_update_and_get_incident(self):
        create_event = {
            'body': json.dumps({'type': 'Medication', 'severity': 'Low', 'status': 'Open'})
        }
        create_resp = handlers.create_incident(create_event)
        created = json.loads(create_resp['body'])
        incident_id = created['id']

        update_event = {
            'pathParameters': {'id': str(incident_id)},
            'body': json.dumps({'status': 'Closed'})
        }
        update_resp = handlers.update_incident(update_event)
        self.assertEqual(update_resp['statusCode'], 200)
        updated = json.loads(update_resp['body'])
        self.assertEqual(updated['status'], 'Closed')

        get_event = {'pathParameters': {'id': str(incident_id)}}
        get_resp = handlers.get_incident(get_event)
        self.assertEqual(get_resp['statusCode'], 200)
        retrieved = json.loads(get_resp['body'])
        self.assertEqual(retrieved['status'], 'Closed')

    def test_update_nonexistent(self):
        update_event = {
            'pathParameters': {'id': '999'},
            'body': json.dumps({'status': 'Closed'})
        }
        update_resp = handlers.update_incident(update_event)
        self.assertEqual(update_resp['statusCode'], 404)


if __name__ == '__main__':
    unittest.main()

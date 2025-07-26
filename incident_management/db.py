import os
import sqlite3
from datetime import datetime

DB_NAME = os.environ.get('INCIDENT_DB', 'incidents.db')


def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS incidents (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL,
                severity TEXT NOT NULL,
                status TEXT NOT NULL,
                description TEXT,
                created_at TEXT NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )


def row_to_dict(row):
    return {key: row[key] for key in row.keys()}


def create_incident(data):
    now = datetime.utcnow().isoformat()
    with get_connection() as conn:
        cursor = conn.execute(
            """
            INSERT INTO incidents (type, severity, status, description, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                data["type"],
                data["severity"],
                data["status"],
                data.get("description"),
                now,
                now,
            ),
        )
        incident_id = cursor.lastrowid
        row = conn.execute("SELECT * FROM incidents WHERE id=?", (incident_id,)).fetchone()
    return row_to_dict(row)


def update_incident(incident_id, data):
    fields = {k: data[k] for k in ["type", "severity", "status", "description"] if k in data}
    if not fields:
        return None
    fields["updated_at"] = datetime.utcnow().isoformat()
    set_clause = ", ".join(f"{k}=?" for k in fields)
    values = list(fields.values())
    values.append(incident_id)
    with get_connection() as conn:
        conn.execute(f"UPDATE incidents SET {set_clause} WHERE id=?", values)
        row = conn.execute("SELECT * FROM incidents WHERE id=?", (incident_id,)).fetchone()
    return row_to_dict(row) if row else None


def get_incident(incident_id):
    with get_connection() as conn:
        row = conn.execute("SELECT * FROM incidents WHERE id=?", (incident_id,)).fetchone()
    return row_to_dict(row) if row else None

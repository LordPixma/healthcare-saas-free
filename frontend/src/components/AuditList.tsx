import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchForms } from '../api/auditApi';

interface Form {
  id: string;
  name: string;
}

const AuditList: React.FC = () => {
  const [forms, setForms] = useState<Form[]>([]);

  useEffect(() => {
    fetchForms().then(setForms).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Audits</h2>
      <Link to="/audits/new">Create New Audit</Link>
      {forms.length === 0 ? (
        <p>No audits found.</p>
      ) : (
        <ul>
          {forms.map(f => (
            <li key={f.id}>
              <Link to={`/audits/${f.id}`}>{f.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuditList;

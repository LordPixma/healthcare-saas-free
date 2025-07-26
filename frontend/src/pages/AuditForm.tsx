import React, { useState, useEffect } from 'react';

interface Audit {
  id: string;
  name: string;
  findings: string;
}

const AuditForm: React.FC = () => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [name, setName] = useState('');
  const [findings, setFindings] = useState('');

  useEffect(() => {
    fetch('/api/audits')
      .then(res => res.json())
      .then(data => setAudits(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/audits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, findings })
    });
    if (response.ok) {
      const newAudit = await response.json();
      setAudits([...audits, newAudit]);
      setName('');
      setFindings('');
    }
  };

  return (
    <div>
      <h1>Audits</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Audit Name"
        />
        <textarea
          value={findings}
          onChange={e => setFindings(e.target.value)}
          placeholder="Findings"
        />
        <button type="submit">Add Audit</button>
      </form>
      <ul>
        {audits.map(audit => (
          <li key={audit.id}>
            <strong>{audit.name}</strong>
            <p>{audit.findings}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuditForm;

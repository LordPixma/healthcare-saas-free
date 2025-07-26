import React, { useState, useEffect } from 'react';

interface Risk {
  id: string;
  title: string;
  description: string;
}

const RiskRegister: React.FC = () => {
  const [risks, setRisks] = useState<Risk[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch('/api/risks')
      .then(res => res.json())
      .then(data => setRisks(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/risks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    });
    if (response.ok) {
      const newRisk = await response.json();
      setRisks([...risks, newRisk]);
      setTitle('');
      setDescription('');
    }
  };

  return (
    <div>
      <h1>Risk Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description"
        />
        <button type="submit">Add Risk</button>
      </form>
      <ul>
        {risks.map(risk => (
          <li key={risk.id}>
            <strong>{risk.title}</strong>
            <p>{risk.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RiskRegister;

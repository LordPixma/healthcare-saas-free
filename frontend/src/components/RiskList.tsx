import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchRisks } from '../api/riskApi';

interface Risk {
  riskId: string;
  description: string;
  likelihood: number;
  impact: number;
  status: string;
}

const RiskList: React.FC = () => {
  const [risks, setRisks] = useState<Risk[]>([]);

  useEffect(() => {
    fetchRisks().then(setRisks).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Risks</h2>
      <Link to="/risks/new">Create New Risk</Link>
      {risks.length === 0 ? (
        <p>No risks found.</p>
      ) : (
        <ul>
          {risks.map(r => (
            <li key={r.riskId}>
              <Link to={`/risks/${r.riskId}`}>{r.description}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RiskList;

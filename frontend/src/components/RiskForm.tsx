import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRisk, fetchRisk, updateRisk } from '../api/riskApi';

const RiskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    description: '',
    likelihood: '',
    impact: '',
    status: ''
  });

  useEffect(() => {
    if (id) {
      fetchRisk(id).then(setForm).catch(console.error);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description) return;
    try {
      if (id) {
        await updateRisk(id, form);
      } else {
        await createRisk(form);
      }
      navigate('/risks');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Description:
        <input name="description" value={form.description} onChange={handleChange} required />
      </label>
      <label>
        Likelihood:
        <input name="likelihood" type="number" value={form.likelihood} onChange={handleChange} required />
      </label>
      <label>
        Impact:
        <input name="impact" type="number" value={form.impact} onChange={handleChange} required />
      </label>
      <label>
        Status:
        <input name="status" value={form.status} onChange={handleChange} />
      </label>
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default RiskForm;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createRisk, fetchRisk, updateRisk } from '../api/riskApi';
import Field from './Field';

const RiskForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    description: '',
    likelihood: '',
    impact: '',
    status: ''
  });
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    try {
      if (id) {
        await updateRisk(id, form);
      } else {
        await createRisk(form);
      }
      navigate('/risks');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const fields = [
    {
      id: 'description',
      label: 'Description',
      element: (
        <input id="description" name="description" value={form.description} onChange={handleChange} required />
      )
    },
    {
      id: 'likelihood',
      label: 'Likelihood',
      element: (
        <input id="likelihood" name="likelihood" type="number" value={form.likelihood} onChange={handleChange} required />
      )
    },
    {
      id: 'impact',
      label: 'Impact',
      element: (
        <input id="impact" name="impact" type="number" value={form.impact} onChange={handleChange} required />
      )
    },
    {
      id: 'status',
      label: 'Status',
      element: (
        <input id="status" name="status" value={form.status} onChange={handleChange} />
      )
    }
  ];

  return (
    <form onSubmit={handleSubmit}>
      {fields.map(f => (
        <Field key={f.id} id={f.id} label={f.label}>
          {f.element}
        </Field>
      ))}
      <button type="submit" disabled={submitting}>{id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default RiskForm;

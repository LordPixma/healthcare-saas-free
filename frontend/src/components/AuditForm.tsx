import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createForm, fetchForm, updateForm } from '../api/auditApi';

const AuditForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    questions: ''
  });

  useEffect(() => {
    if (id) {
      fetchForm(id).then(f => setForm({ name: f.name, questions: (f.questions || []).join(',') })).catch(console.error);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name) return;
    const payload = { name: form.name, questions: form.questions.split(',').map(q => q.trim()).filter(Boolean) };
    try {
      if (id) {
        await updateForm(id, payload);
      } else {
        await createForm(payload);
      }
      navigate('/audits');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" value={form.name} onChange={handleChange} required />
      </label>
      <label>
        Questions (comma separated):
        <textarea name="questions" value={form.questions} onChange={handleChange} />
      </label>
      <button type="submit">{id ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default AuditForm;

import React, { ReactNode } from 'react';

interface FieldProps {
  id: string;
  label: string;
  isRequired?: boolean;
  children: ReactNode;
}

const Field: React.FC<FieldProps> = ({ id, label, isRequired = false, children }) => (
  <div>
    <label htmlFor={id}>{label}</label>
    {children}
  </div>
);

export default Field;

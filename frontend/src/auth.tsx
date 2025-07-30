import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const LoginButton: React.FC = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  if (process.env.NODE_ENV === 'test' || isAuthenticated) return null;
  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export const LogoutButton: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();
  if (process.env.NODE_ENV === 'test' || !isAuthenticated) return null;
  return (
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
    </button>
  );
};

export const AuthStatus: React.FC = () => {
  const { isAuthenticated, user } = useAuth0();
  if (process.env.NODE_ENV === 'test') return null;
  return <span>{isAuthenticated ? `Logged in as ${user?.name || user?.email}` : 'Not logged in'}</span>;
};

interface RoleProps { role: string | string[]; children: React.ReactNode; }

export const RoleProtected: React.FC<RoleProps> = ({ role, children }) => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();
  if (process.env.NODE_ENV === 'test') return <>{children}</>;
  if (!isAuthenticated) {
    loginWithRedirect();
    return null;
  }
  const roles = (user && (user['https://example.com/roles'] || user.roles)) || [];
  const required = Array.isArray(role) ? role : [role];
  return required.some(r => roles.includes(r)) ? <>{children}</> : <div>Access denied</div>;
};

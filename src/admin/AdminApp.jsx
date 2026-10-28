import React from 'react';
import { useAdminStore } from './adminStore';
import { AdminLogin } from './AdminLogin';
import { AdminLayout } from './AdminLayout';

export const AdminApp = () => {
  const { data, updateData, auth, login, logout, resetToDefault } = useAdminStore();

  if (!auth.isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <AdminLayout
      data={data}
      onUpdate={updateData}
      auth={auth}
      onLogout={logout}
      onResetDefault={resetToDefault}
    />
  );
};

export default AdminApp;

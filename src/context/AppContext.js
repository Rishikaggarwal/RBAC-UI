import React, { createContext, useState, useContext } from 'react';

// Create the context
const AppContext = createContext();

// Custom hook to use the context
export const useAppContext = () => {
  return useContext(AppContext);
};

// AppProvider as named export
export const AppProvider = ({ children }) => {
  const [roles, setRoles] = useState([
    { id: 'admin', name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 'editor', name: 'Editor', permissions: ['Read', 'Write'] },
    { id: 'viewer', name: 'Viewer', permissions: ['Read'] },
  ]);

  const [permissions] = useState(['Read', 'Write', 'Delete']);

  // Add a new role
  const addRole = (role) => {
    setRoles([...roles, role]);
  };

  // Update role permissions
  const updateRolePermissions = (roleId, permissions) => {
    setRoles(roles.map((role) =>
      role.id === roleId ? { ...role, permissions } : role
    ));
  };

  // Update role name
  const updateRoleName = (roleId, newName) => {
    setRoles(roles.map((role) =>
      role.id === roleId ? { ...role, name: newName } : role
    ));
  };

  return (
    <AppContext.Provider value={{ roles, addRole, updateRolePermissions, updateRoleName, permissions }}>
      {children}
    </AppContext.Provider>
  );
};


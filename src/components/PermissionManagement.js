import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const PermissionManagement = () => {
  const { permissions, setPermissions } = useAppContext();
  const [newPermission, setNewPermission] = useState("");

  const handleAddPermission = () => {
    if (newPermission) {
      setPermissions([...permissions, newPermission]);
      setNewPermission("");  // Reset input field
    }
  };

  return (
    <div>
      <h2>Permission Management</h2>
      <div>
        <input
          type="text"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          placeholder="Enter new permission"
        />
        <button onClick={handleAddPermission}>Add Permission</button>
      </div>
      <ul>
        {permissions.map((permission, index) => (
          <li key={index}>{permission}</li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionManagement;

import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Paper, Grid, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { getRoles, getPermissions, addRole, updateRole, deleteRole, updatePermissions } from '../mockApi';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [editingRole, setEditingRole] = useState(null); // State to track the role being edited

  useEffect(() => {
    getRoles().then(setRoles);
    getPermissions().then(setPermissions);
  }, []);

  const handleAddRole = () => {
    if (newRole.name) {
      addRole(newRole).then((role) => {
        setRoles([...roles, role]);
        setNewRole({ name: '', permissions: [] });
      });
    }
  };

  const handleRolePermissionsChange = (event) => {
    const updatedPermissions = newRole.permissions.includes(event.target.value)
      ? newRole.permissions.filter((permission) => permission !== event.target.value)
      : [...newRole.permissions, event.target.value];
    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  const handleDeleteRole = (roleId) => {
    deleteRole(roleId).then(() => {
      setRoles(roles.filter((role) => role.id !== roleId));
    });
  };

  const handleUpdateRole = () => {
    if (editingRole) {
      // Update the role name and permissions using the updateRole function
      updateRole(editingRole).then((updatedRole) => {
        setRoles(roles.map(role => (role.id === updatedRole.id ? updatedRole : role)));
        setEditingRole(null); // Reset editing role after update
      });
    }
  };

  const handleEditRole = (role) => {
    setEditingRole({ ...role }); // Set the role to be edited
  };

  const handlePermissionsChange = (event) => {
    const updatedPermissions = editingRole.permissions.includes(event.target.value)
      ? editingRole.permissions.filter((permission) => permission !== event.target.value)
      : [...editingRole.permissions, event.target.value];
    setEditingRole({ ...editingRole, permissions: updatedPermissions });
  
    // Update permissions on the server
    updatePermissions(editingRole.id, updatedPermissions).then(() => {
      setRoles(roles.map(role =>
        role.id === editingRole.id
          ? { ...role, permissions: updatedPermissions }
          : role
      ));
    });
  };
  

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Role Management</Typography>
      <Paper sx={{ padding: 3 }}>
        <Box display="flex" gap={2} alignItems="center" mb={3}>
          <TextField
            label="Role Name"
            value={newRole.name}
            onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          />
           
          <FormControl fullWidth>
          <InputLabel
    sx={{
      transform: 'translate(0, -10px)', // Move the label upward
      fontSize: '0.85rem', // Optional: Adjust label size if needed
    }}
  >
    Permissions
  </InputLabel>
            <FormGroup>
            
              {permissions.map((permission) => (
                <FormControlLabel
                  key={permission}
                  control={<Checkbox value={permission} onChange={handleRolePermissionsChange} />}
                  label={permission}
                />
              ))}
            </FormGroup>
          </FormControl>
          <Button variant="contained" onClick={handleAddRole}>Add Role</Button>
        </Box>

        {/* Editing existing role */}
        {editingRole && (
          <Box mb={3}>
            <Typography variant="h6">Edit Role</Typography>
            <TextField
              label="Role Name"
              value={editingRole.name}
              onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>Permissions</InputLabel>
              <FormGroup>
                {permissions.map((permission) => (
                  <FormControlLabel
                    key={permission}
                    control={<Checkbox
                      checked={editingRole.permissions.includes(permission)}
                      value={permission}
                      onChange={handlePermissionsChange}
                    />}
                    label={permission}
                  />
                ))}
              </FormGroup>
            </FormControl>
            <Button variant="contained" onClick={handleUpdateRole}>Update Role</Button>
            <Button onClick={() => setEditingRole(null)} sx={{ ml: 2 }}>Cancel</Button>
          </Box>
        )}

        <Grid container spacing={2}>
          {roles.map((role) => (
            <Grid item xs={12} sm={6} key={role.id}>
              <Paper>
                <Box p={2}>
                  <Typography variant="h6">{role.name}</Typography>
                  <Typography>Permissions: {role.permissions.join(", ")}</Typography>
                  <Button onClick={() => handleDeleteRole(role.id)}>Delete Role</Button>
                  <Button onClick={() => handleEditRole(role)}>Edit Role</Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default RoleManagement;

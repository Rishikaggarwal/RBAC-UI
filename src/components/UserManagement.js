import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Paper, Grid, Card, CardContent, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { getUsers, getRoles, addUser, updateUser, deleteUser } from '../mockApi';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', role: '', status: 'Active' });

  useEffect(() => {
    getUsers().then(setUsers);
    getRoles().then(setRoles);
  }, []);

  const handleAddUser = () => {
    if (newUser.name && newUser.role) {
      addUser(newUser).then((user) => {
        setUsers([...users, user]);
        setNewUser({ name: '', role: '', status: 'Active' });
      });
    }
  };

  const handleDeleteUser = (userId) => {
    deleteUser(userId).then(() => {
      setUsers(users.filter((user) => user.id !== userId));
    });
  };

  const handleStatusChange = (userId, status) => {
    const updatedUser = users.find((user) => user.id === userId);
    updatedUser.status = status;
    updateUser(updatedUser).then(() => setUsers([...users]));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Paper sx={{ padding: 3 }}>
        <Box display="flex" gap={2} alignItems="center" mb={3}>
          <TextField label="Name" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
              {roles.map((role) => (
                <MenuItem key={role.id} value={role.name}>{role.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleAddUser}>Add User</Button>
        </Box>

        <Grid container spacing={2}>
          {users.map((user) => (
            <Grid item xs={12} sm={6} key={user.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{user.name}</Typography>
                  <Typography>{user.role}</Typography>
                  <Typography>Status: {user.status}</Typography>
                  <Box mt={2} display="flex" gap={2}>
                    <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                    <Button onClick={() => handleStatusChange(user.id, user.status === 'Active' ? 'Inactive' : 'Active')}>
                      {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
};

export default UserManagement;

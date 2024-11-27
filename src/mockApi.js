const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor" },
  ];
  
  const roles = [
    { id: 1, name: "Admin", permissions: ["read", "write", "delete"] },
    { id: 2, name: "Editor", permissions: ["read", "write"] },
  ];
  
  const permissions = ["read", "write", "delete", "manage_users"];
  
  export const getUsers = async () => Promise.resolve(users);
  
  export const addUser = async (user) => {
    const newUser = { ...user, id: Date.now() };
    users.push(newUser);
    return Promise.resolve(newUser);
  };
  
  export const deleteUser = async (userId) => {
    const index = users.findIndex((user) => user.id === userId);
    if (index !== -1) {
      users.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject("User not found");
  };
  
  export const updateUser = async (updatedUser) => {
    const index = users.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedUser };
      return Promise.resolve(users[index]);
    }
    return Promise.reject("User not found");
  };
  
  export const getRoles = async () => Promise.resolve(roles);
  
  export const addRole = async (role) => {
    const newRole = { ...role, id: Date.now() };
    roles.push(newRole);
    return Promise.resolve(newRole);
  };
  
  export const deleteRole = async (roleId) => {
    const index = roles.findIndex((role) => role.id === roleId);
    if (index !== -1) {
      roles.splice(index, 1);
      return Promise.resolve(true);
    }
    return Promise.reject("Role not found");
  };
  
  export const updateRole = async (updatedRole) => {
    const index = roles.findIndex((role) => role.id === updatedRole.id);
    if (index !== -1) {
      roles[index] = { ...roles[index], ...updatedRole };
      return Promise.resolve(roles[index]);
    }
    return Promise.reject("Role not found");
  };
  
  export const getPermissions = async () => Promise.resolve(permissions);
  
  export const updatePermissions = async (roleId, updatedPermissions) => {
    const index = roles.findIndex((role) => role.id === roleId);
    if (index !== -1) {
      roles[index].permissions = updatedPermissions;
      return Promise.resolve(roles[index]);
    }
    return Promise.reject("Role not found");
  };
  
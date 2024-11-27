// api.js
const mockUsers = [
    { id: 1, name: "Alice", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", role: "Editor", status: "Inactive" },
    { id: 3, name: "Charlie", role: "Viewer", status: "Active" },
  ];
  
  const mockRoles = [
    { id: 1, name: "Admin", permissions: ["Read", "Write", "Delete"] },
    { id: 2, name: "Editor", permissions: ["Read", "Write"] },
    { id: 3, name: "Viewer", permissions: ["Read"] },
  ];
  
  // Simulate fetch for users
  export const fetchUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockUsers), 500); // Simulating network delay
    });
  };
  
  // Simulate fetch for roles
  export const fetchRoles = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockRoles), 500); // Simulating network delay
    });
  };
  
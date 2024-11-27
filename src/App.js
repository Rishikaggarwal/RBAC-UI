// import React from 'react';
// import { AppProvider } from './context/AppContext';  // Named import
// import RoleManagement from './components/RoleManagement';
// import UserManagement from './components/UserManagement';

// const App = () => {
//   return (
   
//     <AppProvider>
//       <div className="App">
//         <h1>Role-Based Access Control</h1>
//         <RoleManagement />
//       </div>
//     </AppProvider>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, Button, Box, ThemeProvider, createTheme } from '@mui/material';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#d32f2f',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Box>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                Admin Dashboard
              </Typography>
              <Button color="inherit" component={Link} to="/users">Users</Button>
              <Button color="inherit" component={Link} to="/roles">Roles</Button>
            </Toolbar>
          </AppBar>

          <Container sx={{ mt: 4 }}>
            <Routes>
              <Route path="/users" element={<UserManagement />} />
              <Route path="/roles" element={<RoleManagement />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
};

export default App;

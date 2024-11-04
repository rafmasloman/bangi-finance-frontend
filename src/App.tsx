// import './App.css';
import { MantineProvider } from '@mantine/core';
import RouterProvider from './shared/provider/RouterProvider';
import RouterPage from './libs/Router';
import { theme } from './libs/mantine/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import { AuthProvider } from './context/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <MantineProvider theme={theme}>
        <Notifications />
        <QueryClientProvider client={queryClient}>
          <RouterProvider>
            <AuthProvider>
              <RouterPage />
            </AuthProvider>
          </RouterProvider>
        </QueryClientProvider>
      </MantineProvider>
    </>
  );
}

export default App;

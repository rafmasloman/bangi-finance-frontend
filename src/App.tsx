// import './App.css';
import { MantineProvider } from '@mantine/core';
import RouterProvider from './shared/provider/RouterProvider';
import RouterPage from './libs/Router';
import { theme } from './libs/mantine/theme';

function App() {
  return (
    <>
      <MantineProvider theme={theme}>
        <RouterProvider>
          <RouterPage />
        </RouterProvider>
      </MantineProvider>
    </>
  );
}

export default App;

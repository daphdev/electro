import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'dayjs/locale/vi';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import './App.css';
import ManagerPath from 'constants/ManagerPath';
import Client from './pages/Client';
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import AddressManage from 'pages/address/AddressManage';
import ProvinceManage, { ProvinceCreate, ProvinceUpdate } from 'pages/province';
import DistrictManage, { DistrictCreate, DistrictUpdate } from 'pages/district';

const queryClient = new QueryClient();

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
    <QueryClientProvider client={queryClient}>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <NotificationsProvider>
            <ModalsProvider>
              <Routes>
                <Route path="/" element={<Client/>}/>
                <Route path="/admin" element={<Admin/>}>
                  <Route index element={<AdminDashboard/>}/>
                  {/* ADDRESS */}
                  <Route path={ManagerPath.ADDRESS} element={<AddressManage/>}/>
                  {/* PROVINCE */}
                  <Route path={ManagerPath.PROVINCE} element={<ProvinceManage/>}/>
                  <Route path={ManagerPath.PROVINCE + '/create'} element={<ProvinceCreate/>}/>
                  <Route path={ManagerPath.PROVINCE + '/update/:id'} element={<ProvinceUpdate/>}/>
                  {/* DISTRICT */}
                  <Route path={ManagerPath.DISTRICT} element={<DistrictManage/>}/>
                  <Route path={ManagerPath.DISTRICT + '/create'} element={<DistrictCreate/>}/>
                  <Route path={ManagerPath.DISTRICT + '/update/:id'} element={<DistrictUpdate/>}/>
                </Route>
              </Routes>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}

export default App;

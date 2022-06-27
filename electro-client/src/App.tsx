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
import AddressManage, { AddressCreate, AddressUpdate } from 'pages/address';
import ProvinceManage, { ProvinceCreate, ProvinceUpdate } from 'pages/province';
import DistrictManage, { DistrictCreate, DistrictUpdate } from 'pages/district';
import UserManage, { UserCreate, UserUpdate } from 'pages/user';
import RoleManage, { RoleCreate, RoleUpdate } from 'pages/role';
import OfficeManage, { OfficeCreate, OfficeUpdate } from 'pages/office';
import DepartmentManage, { DepartmentCreate, DepartmentUpdate } from 'pages/department';
import JobTypeManage, { JobTypeCreate, JobTypeUpdate } from 'pages/job-type';
import JobLevelManage, { JobLevelCreate, JobLevelUpdate } from 'pages/job-level';
import JobTitleManage, { JobTitleCreate, JobTitleUpdate } from 'pages/job-title';
import EmployeeManage, { EmployeeCreate, EmployeeUpdate } from 'pages/employee';
import CustomerGroupManage, { CustomerGroupCreate, CustomerGroupUpdate } from 'pages/customer-group';
import CustomerStatusManage, { CustomerStatusCreate, CustomerStatusUpdate } from 'pages/customer-status';
import CustomerResourceManage, { CustomerResourceCreate, CustomerResourceUpdate } from 'pages/customer-resource';
import CustomerManage, { CustomerCreate, CustomerUpdate } from 'pages/customer';

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
                  <Route path={ManagerPath.ADDRESS + '/create'} element={<AddressCreate/>}/>
                  <Route path={ManagerPath.ADDRESS + '/update/:id'} element={<AddressUpdate/>}/>
                  {/* PROVINCE */}
                  <Route path={ManagerPath.PROVINCE} element={<ProvinceManage/>}/>
                  <Route path={ManagerPath.PROVINCE + '/create'} element={<ProvinceCreate/>}/>
                  <Route path={ManagerPath.PROVINCE + '/update/:id'} element={<ProvinceUpdate/>}/>
                  {/* DISTRICT */}
                  <Route path={ManagerPath.DISTRICT} element={<DistrictManage/>}/>
                  <Route path={ManagerPath.DISTRICT + '/create'} element={<DistrictCreate/>}/>
                  <Route path={ManagerPath.DISTRICT + '/update/:id'} element={<DistrictUpdate/>}/>
                  {/* USER */}
                  <Route path={ManagerPath.USER} element={<UserManage/>}/>
                  <Route path={ManagerPath.USER + '/create'} element={<UserCreate/>}/>
                  <Route path={ManagerPath.USER + '/update/:id'} element={<UserUpdate/>}/>
                  {/* ROLE */}
                  <Route path={ManagerPath.ROLE} element={<RoleManage/>}/>
                  <Route path={ManagerPath.ROLE + '/create'} element={<RoleCreate/>}/>
                  <Route path={ManagerPath.ROLE + '/update/:id'} element={<RoleUpdate/>}/>
                  {/* OFFICE */}
                  <Route path={ManagerPath.OFFICE} element={<OfficeManage/>}/>
                  <Route path={ManagerPath.OFFICE + '/create'} element={<OfficeCreate/>}/>
                  <Route path={ManagerPath.OFFICE + '/update/:id'} element={<OfficeUpdate/>}/>
                  {/* DEPARTMENT */}
                  <Route path={ManagerPath.DEPARTMENT} element={<DepartmentManage/>}/>
                  <Route path={ManagerPath.DEPARTMENT + '/create'} element={<DepartmentCreate/>}/>
                  <Route path={ManagerPath.DEPARTMENT + '/update/:id'} element={<DepartmentUpdate/>}/>
                  {/* JOB_TYPE */}
                  <Route path={ManagerPath.JOB_TYPE} element={<JobTypeManage/>}/>
                  <Route path={ManagerPath.JOB_TYPE + '/create'} element={<JobTypeCreate/>}/>
                  <Route path={ManagerPath.JOB_TYPE + '/update/:id'} element={<JobTypeUpdate/>}/>
                  {/* JOB_LEVEL */}
                  <Route path={ManagerPath.JOB_LEVEL} element={<JobLevelManage/>}/>
                  <Route path={ManagerPath.JOB_LEVEL + '/create'} element={<JobLevelCreate/>}/>
                  <Route path={ManagerPath.JOB_LEVEL + '/update/:id'} element={<JobLevelUpdate/>}/>
                  {/* JOB_TITLE */}
                  <Route path={ManagerPath.JOB_TITLE} element={<JobTitleManage/>}/>
                  <Route path={ManagerPath.JOB_TITLE + '/create'} element={<JobTitleCreate/>}/>
                  <Route path={ManagerPath.JOB_TITLE + '/update/:id'} element={<JobTitleUpdate/>}/>
                  {/* EMPLOYEE */}
                  <Route path={ManagerPath.EMPLOYEE} element={<EmployeeManage/>}/>
                  <Route path={ManagerPath.EMPLOYEE + '/create'} element={<EmployeeCreate/>}/>
                  <Route path={ManagerPath.EMPLOYEE + '/update/:id'} element={<EmployeeUpdate/>}/>
                  {/* CUSTOMER */}
                  <Route path={ManagerPath.CUSTOMER} element={<CustomerManage/>}/>
                  <Route path={ManagerPath.CUSTOMER + '/create'} element={<CustomerCreate/>}/>
                  <Route path={ManagerPath.CUSTOMER + '/update/:id'} element={<CustomerUpdate/>}/>
                  {/* CUSTOMER_GROUP */}
                  <Route path={ManagerPath.CUSTOMER_GROUP} element={<CustomerGroupManage/>}/>
                  <Route path={ManagerPath.CUSTOMER_GROUP + '/create'} element={<CustomerGroupCreate/>}/>
                  <Route path={ManagerPath.CUSTOMER_GROUP + '/update/:id'} element={<CustomerGroupUpdate/>}/>
                  {/* CUSTOMER_STATUS */}
                  <Route path={ManagerPath.CUSTOMER_STATUS} element={<CustomerStatusManage/>}/>
                  <Route path={ManagerPath.CUSTOMER_STATUS + '/create'} element={<CustomerStatusCreate/>}/>
                  <Route path={ManagerPath.CUSTOMER_STATUS + '/update/:id'} element={<CustomerStatusUpdate/>}/>
                  {/* CUSTOMER_RESOURCE */}
                  <Route path={ManagerPath.CUSTOMER_RESOURCE} element={<CustomerResourceManage/>}/>
                  <Route path={ManagerPath.CUSTOMER_RESOURCE + '/create'} element={<CustomerResourceCreate/>}/>
                  <Route path={ManagerPath.CUSTOMER_RESOURCE + '/update/:id'} element={<CustomerResourceUpdate/>}/>
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

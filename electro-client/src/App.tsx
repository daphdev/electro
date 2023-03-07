import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'dayjs/locale/vi';
import '@smastrom/react-rating/style.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ColorScheme, ColorSchemeProvider, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';
import ManagerPath from 'constants/ManagerPath';
import Client from 'pages/Client';
import Admin from 'pages/Admin';
import AdminDashboard from 'pages/AdminDashboard';
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
import ProductManage, { ProductCreate, ProductUpdate } from 'pages/product';
import CategoryManage, { CategoryCreate, CategoryUpdate } from 'pages/category';
import BrandManage, { BrandCreate, BrandUpdate } from 'pages/brand';
import PropertyManage, { PropertyCreate, PropertyUpdate } from 'pages/property';
import SpecificationManage, { SpecificationCreate, SpecificationUpdate } from 'pages/specification';
import UnitManage, { UnitCreate, UnitUpdate } from 'pages/unit';
import TagManage, { TagCreate, TagUpdate } from 'pages/tag';
import GuaranteeManage, { GuaranteeCreate, GuaranteeUpdate } from 'pages/guarantee';
import SupplierManage, { SupplierCreate, SupplierUpdate } from 'pages/supplier';
import InventoryManage from 'pages/inventory';
import WarehouseManage, { WarehouseCreate, WarehouseUpdate } from 'pages/warehouse';
import DestinationManage, { DestinationCreate, DestinationUpdate } from 'pages/destination';
import DocketReasonManage, { DocketReasonCreate, DocketReasonUpdate } from 'pages/docket-reason';
import OrderManage, { OrderCreate, OrderUpdate } from 'pages/order';
import OrderResourceManage, { OrderResourceCreate, OrderResourceUpdate } from 'pages/order-resource';
import OrderCancellationReasonManage, {
  OrderCancellationReasonCreate,
  OrderCancellationReasonUpdate
} from 'pages/order-cancellation-reason';
import PurchaseOrderManage, { PurchaseOrderCreate, PurchaseOrderUpdate } from 'pages/purchase-order';
import DocketManage, { DocketCreate, DocketUpdate } from 'pages/docket';
import TransferManage, { TransferCreate, TransferUpdate } from 'pages/transfer';
import CountManage, { CountCreate, CountUpdate } from 'pages/count';
import ClientHome from 'pages/client-home';
import ClientAllCategories from 'pages/client-all-categories';
import ClientCategory from 'pages/client-category';
import ClientSearch from 'pages/client-search';
import ClientSignin from 'pages/client-signin';
import ClientUser from 'pages/client-user';
import { AdminError, ClientError, ProtectedRoute, ScrollToTop } from 'components';
import ClientSetting from 'pages/client-setting';
import ClientSettingPersonal from 'pages/client-setting-personal';
import ClientSettingPhone from 'pages/client-setting-phone';
import ClientSettingEmail from 'pages/client-setting-email';
import ClientSettingPassword from 'pages/client-setting-password';
import ClientWishlist from 'pages/client-wishlist';
import ClientPreorder from 'pages/client-preorder';
import ClientNotification from 'pages/client-notification';
import ClientReview from 'pages/client-review';
import ReviewManage from 'pages/review';
import VoucherManage from 'pages/voucher';
import PaymentMethodManage from 'pages/payment-method';
import PromotionManage, { PromotionCreate, PromotionUpdate } from 'pages/promotion';
import ClientProduct from 'pages/client-product';
import ClientCart from 'pages/client-cart';
import WaybillManage, { WaybillCreate, WaybillUpdate } from 'pages/waybill';
import ClientOrder from 'pages/client-order';
import ClientOrderDetail from 'pages/client-order-detail';
import ClientChat from 'pages/client-chat';
import { StompSessionProvider } from 'react-stomp-hooks';
import ApplicationConstants from 'constants/ApplicationConstants';
import ChatDashboard from 'pages/chat';
import ClientPaymentSuccess from 'pages/client-payment-success';
import ClientPaymentCancel from 'pages/client-payment-cancel';
import AdminNotification from 'pages/admin-notification';
import AdminAccount from 'pages/admin-account';
import RewardManage from 'pages/reward-strategy';
import ClientReward from 'pages/client-reward';
import ClientSignup from 'pages/client-signup';
import ClientForgotPassword, { ClientChangePassword } from 'pages/client-forgot-password';

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
              <ScrollToTop/>
              <Routes>
                <Route path="/" element={<Client/>}>
                  <Route index element={<ClientHome/>}/>
                  <Route path="/*" element={<ClientError/>}/>
                  <Route path="/all-categories" element={<ClientAllCategories/>}/>
                  <Route path="/category/:slug" element={<ClientCategory/>}/>
                  <Route path="/search" element={<ClientSearch/>}/>
                  <Route path="/signin" element={<ClientSignin/>}/>
                  <Route path="/user" element={(
                    <ProtectedRoute>
                      <ClientUser/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/setting" element={(
                    <ProtectedRoute>
                      <ClientSetting/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/setting/personal" element={(
                    <ProtectedRoute>
                      <ClientSettingPersonal/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/setting/phone" element={(
                    <ProtectedRoute>
                      <ClientSettingPhone/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/setting/email" element={(
                    <ProtectedRoute>
                      <ClientSettingEmail/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/setting/password" element={(
                    <ProtectedRoute>
                      <ClientSettingPassword/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/wishlist" element={(
                    <ProtectedRoute>
                      <ClientWishlist/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/preorder" element={(
                    <ProtectedRoute>
                      <ClientPreorder/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/notification" element={(
                    <ProtectedRoute>
                      <ClientNotification/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/review" element={(
                    <ProtectedRoute>
                      <ClientReview/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/product/:slug" element={<ClientProduct/>}/>
                  <Route path="/cart" element={(
                    <ProtectedRoute>
                      <ClientCart/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/order" element={(
                    <ProtectedRoute>
                      <ClientOrder/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/order/detail/:code" element={(
                    <ProtectedRoute>
                      <ClientOrderDetail/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/chat" element={(
                    <ProtectedRoute>
                      <StompSessionProvider url={ApplicationConstants.WEBSOCKET_PATH}>
                        <ClientChat/>
                      </StompSessionProvider>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/user/reward" element={(
                    <ProtectedRoute>
                      <ClientReward/>
                    </ProtectedRoute>
                  )}/>
                  <Route path="/signup" element={<ClientSignup/>}/>
                  <Route path="/forgot" element={<ClientForgotPassword/>}/>
                  <Route path="/change-password" element={<ClientChangePassword/>}/>
                </Route>
                <Route path="/admin" element={<Admin/>}>
                  <Route path="/admin/*" element={<AdminError/>}/>
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
                  {/* PRODUCT */}
                  <Route path={ManagerPath.PRODUCT} element={<ProductManage/>}/>
                  <Route path={ManagerPath.PRODUCT + '/create'} element={<ProductCreate/>}/>
                  <Route path={ManagerPath.PRODUCT + '/update/:id'} element={<ProductUpdate/>}/>
                  {/* CATEGORY */}
                  <Route path={ManagerPath.CATEGORY} element={<CategoryManage/>}/>
                  <Route path={ManagerPath.CATEGORY + '/create'} element={<CategoryCreate/>}/>
                  <Route path={ManagerPath.CATEGORY + '/update/:id'} element={<CategoryUpdate/>}/>
                  {/* BRAND */}
                  <Route path={ManagerPath.BRAND} element={<BrandManage/>}/>
                  <Route path={ManagerPath.BRAND + '/create'} element={<BrandCreate/>}/>
                  <Route path={ManagerPath.BRAND + '/update/:id'} element={<BrandUpdate/>}/>
                  {/* SUPPLIER */}
                  <Route path={ManagerPath.SUPPLIER} element={<SupplierManage/>}/>
                  <Route path={ManagerPath.SUPPLIER + '/create'} element={<SupplierCreate/>}/>
                  <Route path={ManagerPath.SUPPLIER + '/update/:id'} element={<SupplierUpdate/>}/>
                  {/* UNIT */}
                  <Route path={ManagerPath.UNIT} element={<UnitManage/>}/>
                  <Route path={ManagerPath.UNIT + '/create'} element={<UnitCreate/>}/>
                  <Route path={ManagerPath.UNIT + '/update/:id'} element={<UnitUpdate/>}/>
                  {/* TAG */}
                  <Route path={ManagerPath.TAG} element={<TagManage/>}/>
                  <Route path={ManagerPath.TAG + '/create'} element={<TagCreate/>}/>
                  <Route path={ManagerPath.TAG + '/update/:id'} element={<TagUpdate/>}/>
                  {/* GUARANTEE */}
                  <Route path={ManagerPath.GUARANTEE} element={<GuaranteeManage/>}/>
                  <Route path={ManagerPath.GUARANTEE + '/create'} element={<GuaranteeCreate/>}/>
                  <Route path={ManagerPath.GUARANTEE + '/update/:id'} element={<GuaranteeUpdate/>}/>
                  {/* PROPERTY */}
                  <Route path={ManagerPath.PROPERTY} element={<PropertyManage/>}/>
                  <Route path={ManagerPath.PROPERTY + '/create'} element={<PropertyCreate/>}/>
                  <Route path={ManagerPath.PROPERTY + '/update/:id'} element={<PropertyUpdate/>}/>
                  {/* SPECIFICATION */}
                  <Route path={ManagerPath.SPECIFICATION} element={<SpecificationManage/>}/>
                  <Route path={ManagerPath.SPECIFICATION + '/create'} element={<SpecificationCreate/>}/>
                  <Route path={ManagerPath.SPECIFICATION + '/update/:id'} element={<SpecificationUpdate/>}/>
                  {/* INVENTORY */}
                  <Route path={ManagerPath.INVENTORY} element={<InventoryManage/>}/>
                  {/* WAREHOUSE */}
                  <Route path={ManagerPath.WAREHOUSE} element={<WarehouseManage/>}/>
                  <Route path={ManagerPath.WAREHOUSE + '/create'} element={<WarehouseCreate/>}/>
                  <Route path={ManagerPath.WAREHOUSE + '/update/:id'} element={<WarehouseUpdate/>}/>
                  {/* DESTINATION */}
                  <Route path={ManagerPath.DESTINATION} element={<DestinationManage/>}/>
                  <Route path={ManagerPath.DESTINATION + '/create'} element={<DestinationCreate/>}/>
                  <Route path={ManagerPath.DESTINATION + '/update/:id'} element={<DestinationUpdate/>}/>
                  {/* DOCKET_REASON */}
                  <Route path={ManagerPath.DOCKET_REASON} element={<DocketReasonManage/>}/>
                  <Route path={ManagerPath.DOCKET_REASON + '/create'} element={<DocketReasonCreate/>}/>
                  <Route path={ManagerPath.DOCKET_REASON + '/update/:id'} element={<DocketReasonUpdate/>}/>
                  {/* ORDER */}
                  <Route path={ManagerPath.ORDER} element={<OrderManage/>}/>
                  <Route path={ManagerPath.ORDER + '/create'} element={<OrderCreate/>}/>
                  <Route path={ManagerPath.ORDER + '/update/:id'} element={<OrderUpdate/>}/>
                  {/* ORDER_RESOURCE */}
                  <Route path={ManagerPath.ORDER_RESOURCE} element={<OrderResourceManage/>}/>
                  <Route path={ManagerPath.ORDER_RESOURCE + '/create'} element={<OrderResourceCreate/>}/>
                  <Route path={ManagerPath.ORDER_RESOURCE + '/update/:id'} element={<OrderResourceUpdate/>}/>
                  {/* ORDER_CANCELLATION_REASON */}
                  <Route path={ManagerPath.ORDER_CANCELLATION_REASON} element={<OrderCancellationReasonManage/>}/>
                  <Route
                    path={ManagerPath.ORDER_CANCELLATION_REASON + '/create'}
                    element={<OrderCancellationReasonCreate/>}
                  />
                  <Route
                    path={ManagerPath.ORDER_CANCELLATION_REASON + '/update/:id'}
                    element={<OrderCancellationReasonUpdate/>}
                  />
                  {/* PURCHASE_ORDER */}
                  <Route path={ManagerPath.PURCHASE_ORDER} element={<PurchaseOrderManage/>}/>
                  <Route path={ManagerPath.PURCHASE_ORDER + '/create'} element={<PurchaseOrderCreate/>}/>
                  <Route path={ManagerPath.PURCHASE_ORDER + '/update/:id'} element={<PurchaseOrderUpdate/>}/>
                  {/* DOCKET */}
                  <Route path={ManagerPath.DOCKET} element={<DocketManage/>}/>
                  <Route path={ManagerPath.DOCKET + '/create'} element={<DocketCreate/>}/>
                  <Route path={ManagerPath.DOCKET + '/update/:id'} element={<DocketUpdate/>}/>
                  {/* TRANSFER */}
                  <Route path={ManagerPath.TRANSFER} element={<TransferManage/>}/>
                  <Route path={ManagerPath.TRANSFER + '/create'} element={<TransferCreate/>}/>
                  <Route path={ManagerPath.TRANSFER + '/update/:id'} element={<TransferUpdate/>}/>
                  {/* COUNT */}
                  <Route path={ManagerPath.COUNT} element={<CountManage/>}/>
                  <Route path={ManagerPath.COUNT + '/create'} element={<CountCreate/>}/>
                  <Route path={ManagerPath.COUNT + '/update/:id'} element={<CountUpdate/>}/>
                  {/* WAYBILL */}
                  <Route path={ManagerPath.WAYBILL} element={<WaybillManage/>}/>
                  <Route path={ManagerPath.WAYBILL + '/create'} element={<WaybillCreate/>}/>
                  <Route path={ManagerPath.WAYBILL + '/update/:id'} element={<WaybillUpdate/>}/>
                  {/* REVIEW */}
                  <Route path={ManagerPath.REVIEW} element={<ReviewManage/>}/>
                  {/* VOUCHER */}
                  <Route path={ManagerPath.VOUCHER} element={<VoucherManage/>}/>
                  {/* PAYMENT_METHOD */}
                  <Route path={ManagerPath.PAYMENT_METHOD} element={<PaymentMethodManage/>}/>
                  {/* PROMOTION */}
                  <Route path={ManagerPath.PROMOTION} element={<PromotionManage/>}/>
                  <Route path={ManagerPath.PROMOTION + '/create'} element={<PromotionCreate/>}/>
                  <Route path={ManagerPath.PROMOTION + '/update/:id'} element={<PromotionUpdate/>}/>
                  {/* CHAT */}
                  <Route path={ManagerPath.CHAT} element={
                    <StompSessionProvider url={ApplicationConstants.WEBSOCKET_PATH}>
                      <ChatDashboard/>
                    </StompSessionProvider>
                  }/>
                  {/* NOTIFICATION */}
                  <Route path={ManagerPath.NOTIFICATION} element={<AdminNotification/>}/>
                  {/* ACCOUNT */}
                  <Route path={ManagerPath.ACCOUNT} element={<AdminAccount/>}/>
                  {/* REWARD */}
                  <Route path={ManagerPath.REWARD_STRATEGY} element={<RewardManage/>}/>
                </Route>
                <Route path="/payment/success" element={<ClientPaymentSuccess/>}/>
                <Route path="/payment/cancel" element={<ClientPaymentCancel/>}/>
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

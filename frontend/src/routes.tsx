import { createBrowserRouter } from "react-router";

import AboutUs from "@/component/layout/AboutUs";
import Cart from "@/component/Cart/Cart";
import Contact from "@/component/layout/Contact";
import Dashboard from "@/component/Admin/Dashboard";
import ForgotPassword from "@/component/User/ForgotPassword";
import Home from "@/component/Home/Home";
import LoginSignUp from "@/component/User/LoginSignUp";
import MyOrders from "@/component/Order/MyOrders";
import NewProduct from "@/component/Admin/NewProduct";
import OrderDetails from "@/component/Order/OrderDetails";
import OrderList from "@/component/Admin/OrderList";
import Payment from "@/component/Cart/Payment";
import ProcessOrder from "@/component/Admin/ProcessOrder";
import ProductDetails from "@/component/Product/ProductDetails";
import ProductList from "@/component/Admin/ProductList";
import ProductReviews from "@/component/Admin/ProductReviews";
import Products from "@/component/Product/Products";
import Profile from "@/component/User/Profile";
import ProtectedRoute from "@/component/Route/ProtectedRoute";
import ResetPassword from "@/component/User/ResetPassword";
import ShippingConfirm from "@/component/Cart/ShippingConfirm";
import StripeElements from "@/component/Cart/StripeElements";
import Success from "@/component/Cart/Success";
import UpdatedProfile from "@/component/User/UpdatedProfile";
import UpdatePassword from "@/component/User/UpdatePassword";
import UpdateProduct from "@/component/Admin/UpdateProduct";
import UpdateUser from "@/component/Admin/UpdateUser";
import UsersList from "@/component/Admin/UsersList";

import AppLayout from "@/layout";
import HomePage from "@/page/home";
import CartPage from "@/page/cart";
import ShippingPage from "@/page/shipping";

import { ROUTE_PATH } from "@/constants";

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.HOME,
    Component: AppLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "old-home",
        Component: Home,
      },
      {
        path: "old-cart",
        Component: Cart,
      },
      {
        path: "old-shipping",
        element: (
          <ProtectedRoute isAdmin={false}>
            <ShippingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.PRODUCTS,
        Component: Products,
      },
      {
        path: ROUTE_PATH.PRODUCT_DETAILS,
        Component: ProductDetails,
      },
      {
        path: ROUTE_PATH.LOGIN,
        Component: LoginSignUp,
      },
      {
        path: ROUTE_PATH.ACCOUNT,
        Component: Profile,
      },
      {
        path: ROUTE_PATH.UPDATE_PROFILE,
        Component: UpdatedProfile,
      },
      {
        path: ROUTE_PATH.UPDATE_PASSWORD,
        Component: UpdatePassword,
      },
      {
        path: ROUTE_PATH.FORGOT_PASSWORD,
        Component: ForgotPassword,
      },
      {
        path: ROUTE_PATH.RESET_PASSWORD,
        Component: ResetPassword,
      },
      {
        path: ROUTE_PATH.CART,
        Component: CartPage,
      },
      {
        path: ROUTE_PATH.ABOUT,
        Component: AboutUs,
      },
      {
        path: ROUTE_PATH.CONTACT,
        Component: Contact,
      },
      {
        path: ROUTE_PATH.SIPPING,
        element: (
          <ProtectedRoute isAdmin={false}>
            <ShippingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.CONFIRM_ORDER,
        element: (
          <ProtectedRoute isAdmin={false}>
            <ShippingConfirm />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.PROCESS_PAYMENT,
        element: (
          <ProtectedRoute isAdmin={false}>
            <StripeElements>
              <Payment />
            </StripeElements>
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.PAYMENT_SUCCESS,
        element: (
          <ProtectedRoute isAdmin={false}>
            <Success />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ORDERS,
        element: (
          <ProtectedRoute isAdmin={false}>
            <MyOrders />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ORDER_DETAILS,
        element: (
          <ProtectedRoute isAdmin={false}>
            <OrderDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ADMIN_DASHBOARD,
        element: (
          <ProtectedRoute isAdmin>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ADMIN_PRODUCTS,
        element: (
          <ProtectedRoute isAdmin>
            <ProductList />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ADMIN_NEW_PRODUCT,
        element: (
          <ProtectedRoute isAdmin>
            <NewProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ADMIN_UPDATE_PRODUCT,
        element: (
          <ProtectedRoute isAdmin>
            <UpdateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ADMIN_ORDERS,
        element: (
          <ProtectedRoute isAdmin>
            <OrderList />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ADMIN_UPDATE_ORDER,
        element: (
          <ProtectedRoute isAdmin>
            <ProcessOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ADMIN_USERS,
        element: (
          <ProtectedRoute isAdmin>
            <UsersList />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ADMIN_UPDATE_USER,
        element: (
          <ProtectedRoute isAdmin>
            <UpdateUser />
          </ProtectedRoute>
        ),
      },
      {
        path: ROUTE_PATH.ADMIN_REVIEWS,
        element: (
          <ProtectedRoute isAdmin>
            <ProductReviews />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;

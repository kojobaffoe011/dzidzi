import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authProvider";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/landingpage/LandingPage";
import PageNotFound from "./pages/404Page/PageNotFound";
import LoginOutlet from "./pages/auth/LoginOutlet";
import LoginPage from "./pages/auth/LoginPage";
import RegisterInfo from "./pages/auth/signup/RegisterInfo";
import DetailsMain from "./components/reusableComponents/DetailsScreen";
import RestaurantMenu from "./pages/main/orderpages/RestaurantMenu";
import ReviewOrder from "./pages/main/orderpages/ReviewOrder";
import PersistLogin from "./components/PersistLogin";
import Dashboard from "./pages/dashboard/Dashboard";
import MyProfileDetails from "./pages/dashboard/MyProfile";
import Restaurants from "./pages/admin/Restaurants";
import Users from "./pages/admin/Users";
import Couriers from "./pages/admin/Couriers";
import Services from "./pages/admin/Services";
import ViewRestaurantsPage from "./pages/admin/ViewRestaurantsPage";
import Menus from "./pages/admin/Menus";
import WelcomePage from "./pages/auth/WelcomePage";
import Coupons from "./pages/admin/Coupons";
import ViewUsers from "./pages/admin/ViewUsers";
import ViewCouriers from "./pages/admin/ViewCouriers";
import VIewServices from "./pages/admin/VIewServices";
import { OrderProvider } from "./context/orderProvider";
import Checkout from "./pages/main/orderpages/Checkout";
import Orders from "./pages/admin/Orders";
import UserOrders from "./pages/admin/UserOrders";
import UserSettings from "./pages/admin/UserSettings";
import Home from "./pages/admin/Home";
import BasicDetails from "./pages/auth/signup/BasicDetails";
import AddressInfo from "./pages/auth/signup/AddressInfo";
import LoginDetails from "./pages/auth/signup/LoginDetails";
import Success from "./pages/auth/signup/Success";
import Verify from "./pages/auth/Verify";
import Profile from "./pages/main/userprofile/profile";
import General from "./pages/main/userprofile/General";
import MyOrders from "./pages/main/userprofile/MyOrders";
import Support from "./pages/main/userprofile/Support";
import { ModalProvider } from "./context/modalProvider";
import ViewRestaurantMenus from "./pages/admin/ViewRestaurantMenus";
import RestaurantBranches from "./pages/admin/RestaurantBranches";
import ViewRestaurantBranches from "./pages/admin/ViewRestaurantBranches";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: (error) => {
        console.error("Global error handler:", error.message);
      },
      retry: 1, // Retry once before failing
    },
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <BrowserRouter>
        <AuthProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="auth" element={<LoginOutlet />}>
                <Route path="" element={<LoginPage />} />
                <Route path="admin" element={<LoginPage />} />
                <Route path="register" element={<RegisterInfo />}>
                  <Route path="" element={<BasicDetails />} />
                  <Route path="address" element={<AddressInfo />} />
                  <Route path="login-info" element={<LoginDetails />} />
                  <Route path="success" element={<Success />} />
                </Route>
                <Route path="verify" element={<Verify />} />
                {/* <Route path="newpassword/:phone" element={<NewPassword />} /> */}
              </Route>

              <Route
                path="all-restaurants"
                exact
                element={<DetailsMain />}
              ></Route>

              <Route path="/details" exact element={<OrderProvider />}>
                <Route path="" exact element={<DetailsMain />} />
                <Route path="menu/:id" exact element={<RestaurantMenu />} />
                <Route
                  path="menu/revieworder/:resID/:id"
                  exact
                  element={<ReviewOrder />}
                ></Route>
                <Route path="checkout/:id" exact element={<Checkout />}></Route>
                <Route path="user-profile" exact element={<Profile />}>
                  <Route path="" exact element={<General />} />
                  <Route path="orders" exact element={<MyOrders />} />
                  <Route path="support" exact element={<Support />} />
                </Route>
              </Route>

              <Route element={<PersistLogin />}>
                <Route path="/welcome" exact element={<WelcomePage />} />
                <Route path="/dashboard" exact element={<Dashboard />}>
                  <Route
                    path="profile-details"
                    exact
                    element={<MyProfileDetails />}
                  />
                  <Route path="restaurants" exact element={<Restaurants />} />
                  <Route path="orders" exact element={<Orders />} />
                  <Route
                    path="restaurants/:id"
                    exact
                    element={<ViewRestaurantsPage />}
                  >
                    <Route path="" exact element={<ViewRestaurantBranches />} />
                    <Route
                      path="menus"
                      exact
                      element={<ViewRestaurantMenus />}
                    />
                  </Route>
                  <Route path="users/:id" exact element={<ViewUsers />}>
                    <Route path="" exact element={<UserOrders />} />
                    <Route path="support" exact element={<UserOrders />} />
                    <Route path="settings" exact element={<UserSettings />} />
                  </Route>
                  <Route path="couriers/:id" exact element={<ViewCouriers />} />
                  <Route path="services/:id" exact element={<VIewServices />} />
                  <Route path="" exact element={<Home />} />
                  <Route path="users" exact element={<Users />} />
                  <Route path="couriers" exact element={<Couriers />} />
                  <Route path="services" exact element={<Services />} />
                  <Route path="coupons" exact element={<Coupons />} />
                  <Route path="menus" exact element={<Menus />} />
                  <Route
                    path="branches"
                    exact
                    element={<RestaurantBranches />}
                  />
                </Route>
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Layout>
        </AuthProvider>
        <Toaster position="top-center" reverseOrder={true} />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
    </QueryClientProvider>
  );
};

export default App;

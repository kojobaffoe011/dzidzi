import { QueryClient, QueryClientProvider } from "react-query";
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
import OrderPagesLayout from "./pages/main/orderlayout/OrderPagesLayout";
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

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginOutlet />}>
                <Route path="" element={<LoginPage />} />
                <Route path="admin" element={<LoginPage />} />
                <Route path="register" element={<RegisterInfo />} />
                {/* <Route path="otp/:phone" element={<ForgotOTP />} /> */}
                {/* <Route path="newpassword/:phone" element={<NewPassword />} /> */}
              </Route>

              <Route
                path="all-restaurants"
                exact
                element={<DetailsMain />}
              ></Route>

              {/* new layout */}

              <Route path="/details" exact element={<OrderPagesLayout />}>
                <Route path="" exact element={<DetailsMain />} />
                <Route path="menu/:id" exact element={<RestaurantMenu />} />
                <Route
                  path="menu/revieworder/:id"
                  exact
                  element={<ReviewOrder />}
                ></Route>
                {/* <Route path="menu" exact element={<RestaurantMenu />}></Route> */}
              </Route>

              <Route element={<PersistLogin />}>
                <Route path="/welcome" exact element={<WelcomePage />} />
                <Route path="/dashboard" exact element={<Dashboard />}>
                  <Route path="profile" exact element={<MyProfileDetails />} />
                  <Route path="restaurants" exact element={<Restaurants />} />
                  <Route
                    path="restaurants/:id"
                    exact
                    element={<ViewRestaurantsPage />}
                  />
                  <Route path="users/:id" exact element={<ViewUsers />} />
                  <Route path="couriers/:id" exact element={<ViewCouriers />} />
                  <Route path="services/:id" exact element={<VIewServices />} />
                  <Route path="" exact element={<Users />} />
                  <Route path="couriers" exact element={<Couriers />} />
                  <Route path="services" exact element={<Services />} />
                  <Route path="coupons" exact element={<Coupons />} />
                  <Route path="menus" exact element={<Menus />} />
                </Route>
              </Route>

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AuthProvider>
        </Layout>
        <Toaster position="top-center" reverseOrder={true} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

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
import OrderPagesLayout from "./pages/main/OrderPagesLayout";
import ReviewOrder from "./pages/main/orderpages/ReviewOrder";
import PersistLogin from "./components/PersistLogin";

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
                <Route path="register" element={<RegisterInfo />} />
                {/* <Route path="otp/:phone" element={<ForgotOTP />} /> */}
                {/* <Route path="newpassword/:phone" element={<NewPassword />} /> */}
              </Route>

              <Route element={<PersistLogin />}>
                <Route path="/details" exact element={<OrderPagesLayout />}>
                  <Route path="" exact element={<DetailsMain />}></Route>
                  <Route
                    path="revieworder"
                    exact
                    element={<ReviewOrder />}
                  ></Route>
                  <Route path="menu" exact element={<RestaurantMenu />}></Route>
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

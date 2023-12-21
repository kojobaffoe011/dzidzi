import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Routes } from "react-router";
import { BrowserRouter, Link } from "react-router-dom";
import { AuthProvider } from "./context/authProvider";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/landingpage/LandingPage";
import PageNotFound from "./pages/404Page/PageNotFound";
import LoginOutlet from "./pages/auth/LoginOutlet";
import LoginPage from "./pages/auth/LoginPage";
import RegisterInfo from "./pages/auth/signup/RegisterInfo";

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
              {/* <Route path="/login" element={<LoginOutlet />}>
                <Route path="" element={<Login />} />
                <Route path="forgot" element={<Forgotpassword />} />
                <Route path="otp/:phone" element={<ForgotOTP />} />
                <Route path="newpassword/:phone" element={<NewPassword />} />
              </Route>
              <Route path="/signup" element={<Signup />}>
                <Route path="" element={<ChooseCampus />} />
                <Route path="details" element={<RegisterInfo />} />
              </Route>
              <Route path="/print/:id" element={<Print />} />
              <Route path="/reserve/:id" element={<PrintInvoice />} />
              <Route
                path="/shortstayreceipt/:id"
                element={<ShortStayPaidInvoice />}
              />

              <Route element={<PersistLogin />}>
                <Route path="/dashboard" element={<StudentDashboard />}>
                  <Route path="" element={<Home />} />
                  <Route path="getstarted" element={<RegisterLegon />}>
                    <Route path="" element={<StudentType />} />
                    <Route path="basicinfo" element={<BasicInfo100 />} />
                    <Route path="schoolinfo" element={<SchoolInfo />} />
                    <Route path="filesinfo" element={<FilesInfo />} />
                    <Route path="success" element={<Success />} />
                    <Route path="otp/:phone" element={<OTPScreen />} />
                  </Route>
                  <Route
                    path="getstarted/outstation"
                    element={<RegisterOthers />}
                  >
                    <Route path="" element={<OtherBasicInfo />} />
                    <Route
                      path="schoolinfo"
                      element={<OutstationSchoolInfo />}
                    />
                    <Route path="filesinfo" element={<OtherFilesInfo />} />
                    <Route path="otp/:phone" element={<OTPScreen />} />
                  </Route>
                  <Route path="upload" element={<Upload />} />
                  <Route path="profile" element={<MyProfile />} />
                  <Route path="my-bookings" element={<BookingOutlet />}>
                    <Route path="" element={<MyBookings />} />
                    <Route path="roomswap" element={<SwapRoomPage />} />
                  </Route>

                  <Route path="invoice/:id" element={<ViewInvoice />} />
                  <Route path="my-requests" element={<Requests />}>
                    <Route path="" element={<Refunds />} />
                    <Route path="roomswap" element={<RoomSwap />} />
                  </Route>
                  <Route path="short-stay" element={<ShortStay />}>
                    <Route path="" element={<ViewRequests />} />
                    <Route path="send-request" element={<SendRequest />} />
                  </Route>
                  <Route
                    path="short-stay-payment/:id"
                    element={<PaymentOutlet />}
                  >
                    <Route path="" element={<MakeStayPayment />} />
                    <Route
                      path="awaiting-payment"
                      element={<AwaitingPayment />}
                    />
                    <Route path="failed" element={<CheckFailed />} />
                    <Route path="success" element={<CheckSuccess />} />
                  </Route>
                  <Route path="bookings" element={<Booking />}>
                    <Route path="" element={<AvailableRooms />} />
                    <Route path="checkout/:id" element={<Checkout />}>
                      <Route path="" element={<CheckoutPayment />} />
                      <Route path="waiting" element={<CheckoutAwaiting />} />
                      <Route path="success" element={<CheckSuccess />} />
                      <Route path="failed" element={<CheckFailed />} />
                      <Route path="paylater" element={<Paylater />} />
                    </Route>
                    <Route
                      path="payments/:id/:roomType/:amount"
                      element={<Payment />}
                    >
                      <Route path="" element={<PaymentInfo />} />
                      <Route path="confirm" element={<Confirm />} />
                      <Route path="success" element={<PaymentSuccess />} />
                    </Route>
                  </Route>
                </Route>
              </Route> */}
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

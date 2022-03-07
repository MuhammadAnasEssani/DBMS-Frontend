
import PageNotFound from "../../views/404/PageNotFound";
import ActivateAccount from "../../views/ActivateAccount/ActivateAccount";
import Checkout from "../../views/Checkout/Checkout";
import Dashboard from "../../views/dashboard/Dashboard";
import OrderInvoive from "../../views/OrderInvoice/OrderInvoive";
import Order from "../../views/Orders/Order";
import ProductDetailPage from "../../views/ProductDetailPage/ProductDetailPage";
import ProductPage from "../../views/ProductPage/ProductPage";
import ShopPage from "../../views/ShopPage/ShopPage";
import Shops from "../../views/Shops/Shops";

const routes = [
  // {
  //   path: "/signin",
  //   exact: true,
  //   title: "signin",
  //   isLoginRequired: false,
  //   component: () => <SignIn />,
  // },
  // {
  //   path: "/signup",
  //   exact: true,
  //   title: "signUp",
  //   isLoginRequired: false,
  //   component: () => <SignUp />,
  // },
  {
    exact: true,
    path: "/",
    title: "Home",
    component: () => <Dashboard />,
  },
  {
    path: "/account/orders",
    title: "Orders",
    component: () => <Order />,
  },
  {
    path: "/checkout",
    title: "Checkout",
    component: () => <Checkout />,
  },
  {
    path: "/shops",
    title: "Shops",
    component: () => <Shops />,
  },
  {
    path: "/invoice/:orderId",
    title: "Invoice",
    component: () => <OrderInvoive />,
  },
  {
    path: "/shop/:shopId",
    title: "Shop Page",
    component: () => <ShopPage />,
  },
  {
    path: "/authentication/activate/:token",
    title: "Verify Account",
    // isLoginRequired: true,
    component: () => <ActivateAccount />,
  },
  {
    path: "/:productSlug/:productId/p",
    title: "Product Detail",
    component: () => <ProductDetailPage />,
  },
  {
    path: "/:slug",
    title: "Products",
    component: () => <ProductPage />,
  },
  // {
  //   path: "/forgot-password",
  //   title: "forgot",
  //   isLoginRequired: false,
  //   component: () => <ForgetPassword />,
  // },
  // {
  //   path: "/change-password",
  //   title: "changePassword",
  //   isLoginRequired: true,
  //   component: () => <ChangePassword />,
  // },
  // {
  //   path: "/edit-profile",
  //   title: "editProfile",
  //   isLoginRequired: true,
  //   component: () => <EditProfile />,
  // },
  // {
  //   path: `/reset-password/:code`,
  //   title: "forgot",
  //   isLoginRequired: false,
  //   component: () => <ResetPassword />,
  // },
  // {
  //   path: "/feedback/:id",
  //   title: "giveFeedback",
  //   isLoginRequired: true,
  //   component: () => <Feedback />,
  // },
 
  // {
  //   path: "/aboutus",
  //   title: "about",
  //   isLoginRequired: false,
  //   component: () => <AboutUs />,
  // },
  // {
  //   path: "/privacy",
  //   title: "privacy",
  //   isLoginRequired: false,
  //   component: () => <Privacy />,
  // },
  // {
  //   path: "/terms-and-conditions",
  //   title: "termsAndCondition",
  //   isLoginRequired: false,
  //   component: () => <TermsAndCondition />,
  // },
  // {
  //   path: "/profile/:id",
  //   title: "profile",
  //   isLoginRequired: false,
  //   component: () => <Profile />,
  // },
  // {
  //   path: "/search:search",
  //   title: "search",
  //   isLoginRequired: true,
  //   component: () => <Search />,
  // },
  // {
  //   path: "/:Categories",
  //   title: "category",
  //   isLoginRequired: false,
  //   component: () => <Categories />,
  // },
  {
    path: "*",
    title: "Page Not Found",
    isLoginRequired: false,
    component: () => <PageNotFound />,
    
  },

];

export default routes;

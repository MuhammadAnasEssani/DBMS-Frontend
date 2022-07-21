import PageNotFound from "../../views/404/PageNotFound";
import ActivateAccount from "../../views/ActivateAccount/ActivateAccount";
import Checkout from "../../views/Checkout/Checkout";
import Dashboard from "../../views/dashboard/Dashboard";
import DiscountedProducts from "../../views/DiscountedProducts/DiscountedProducts";
import FeaturedProducts from "../../views/FeaturedProducts/FeaturedProducts";
import OfferPage from "../../views/OfferPage/OfferPage";
import OrderInvoive from "../../views/OrderInvoice/OrderInvoive";
import Order from "../../views/Orders/Order";
import ProductDetailPage from "../../views/ProductDetailPage/ProductDetailPage";
import ProductPage from "../../views/ProductPage/ProductPage";
import ResetPassword from "../../views/ResetPassword/ResetPassword";
import SearchProducts from "../../views/SearchProducts/SearchProducts";
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
    path: "/featured-products",
    title: "Shops",
    component: () => <FeaturedProducts />,
  },
  {
    path: "/discounted-products",
    title: "Shops",
    component: () => <DiscountedProducts />,
  },
  {
    path: "/shops",
    title: "Shops",
    component: () => <Shops />,
  },
  {
    path: "/resetpassword/:token",
    title: "Invoice",
    component: () => <ResetPassword />,
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
    path: "/product-by-offer/:id",
    title: "Shop Page",
    component: () => <OfferPage />,
  },
  {
    path: "/search-products/:keyword",
    title: "Shop Page",
    component: () => <SearchProducts />,
  },
  {
    path: "/product-by-category/:id",
    title: "Products",
    component: () => <ProductPage />,
  },
  {
    path: "/authentication/activate/:token",
    title: "Verify Account",
    // isLoginRequired: true,
    component: () => <ActivateAccount />,
  },
  {
    path: "/product-detail/:id",
    title: "Product Detail",
    component: () => <ProductDetailPage />,
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

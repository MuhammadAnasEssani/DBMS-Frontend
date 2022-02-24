import Profile from "../../component/profile/Profile";
import PageNotFound from "../../views/404/PageNotFound";
import Dashboard from "../../views/dashboard/Dashboard";
import ProductDetailPage from "../../views/ProductDetailPage/ProductDetailPage";
import ProductPage from "../../views/ProductPage/ProductPage";


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
  {
    path: "/profile/:id",
    title: "profile",
    isLoginRequired: false,
    component: () => <Profile />,
  },
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

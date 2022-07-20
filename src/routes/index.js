import config from '~/config';
// Layout
import MainLayout from '~/Layout/MainLayout/MainLayout';
import FormLayout from '~/Layout/FormLayout';
import AdminLayout from '~/Layout/AdminLayout/AdminLayout';
import UserLayout from '~/Layout/UserLayout/UserLayout';
// Page
import Home from '~/Pages/Home/Home';
import Login from '~/Pages/Login/Login';
import Register from '~/Pages/Register/Register';
import Verify from '~/Pages/Verify/Verify';
import ForgetPassword from '~/Pages/ForgetPassword/ForgetPassword';
import RePassword from '~/Pages/RePassword/RePassword';
import Detail from '~/Pages/Detail/Detail';
import Admin from '~/Pages/Admin/Admin';
import AccountManage from '~/Pages/AccountManage/AccountManage';
import ProductManage from '~/Pages/ProductManage/ProductManage';
import NewsManage from '~/Pages/NewsManage/NewsManage';
import Profile from '~/Pages/Profile/Profile';
import News from '~/Pages/News/News';
const paths = config.routes;

const publicRouter = [
  { path: paths.home, comp: Home, layout: MainLayout },
  { path: paths.detail, comp: Detail, layout: MainLayout },
  { path: paths.news, comp: News, layout: MainLayout },

  { path: paths.admin, comp: Admin, layout: AdminLayout },
  { path: paths.accountmanage, comp: AccountManage, layout: AdminLayout },
  { path: paths.newsmanage, comp: NewsManage, layout: AdminLayout },
  { path: paths.productmanage, comp: ProductManage, layout: AdminLayout },

  { path: paths.login, comp: Login, layout: FormLayout },
  { path: paths.register, comp: Register, layout: FormLayout },
  { path: paths.verify, comp: Verify, layout: FormLayout },
  { path: paths.forgetpassword, comp: ForgetPassword, layout: FormLayout },
  { path: paths.repassword, comp: RePassword, layout: FormLayout },

  { path: paths.profile, comp: Profile, layout: UserLayout },
];

export { publicRouter };

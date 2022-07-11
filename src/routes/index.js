import config from '~/config';
// Layout
import MainLayout from '~/Layout/MainLayout/MainLayout';
import FormLayout from '~/Layout/FormLayout';
// Page
import HomePage from '~/Pages/Home/HomePage';
import LoginPage from '~/Pages/Login/LoginPage';
import RegisterPage from '~/Pages/Register/Register';
import VerifyPage from '~/Pages/Verify/VerifyPage';
const paths = config.routes;

const publicRouter = [
  { path: paths.home, comp: HomePage, layout: MainLayout },
  { path: paths.login, comp: LoginPage, layout: FormLayout },
  { path: paths.register, comp: RegisterPage, layout: FormLayout },
  { path: paths.verify, comp: VerifyPage, layout: FormLayout },
];

export { publicRouter };

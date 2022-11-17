// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Road Issues',
    path: '/dashboard/road-issues',
    icon: icon('ic_blog'),
  },
  {
    title: 'Accidents',
    path: '/dashboard/accidents',
    icon: icon('ic_lock'),
  },
  {
    title: 'Tenders',
    path: '/dashboard/tenders',
    icon: icon('ic_cart'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;

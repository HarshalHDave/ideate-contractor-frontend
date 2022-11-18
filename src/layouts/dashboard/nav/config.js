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
    title: 'Pothole Issues',
    path: '/dashboard/pothole',
    icon: icon('ic_lock'),
  },
  {
    title: 'Manhole Issues',
    path: '/dashboard/manhole',
    icon: icon('ic_lock'),
  },
  {
    title: 'Street Light Issues',
    path: '/dashboard/street-light',
    icon: icon('ic_lock'),
  },
  {
    title: 'My Tenders',
    path: '/dashboard/my-tenders',
    icon: icon('ic_blog'),
  },
  {
    title: 'Applications',
    path: '/dashboard/application',
    icon: icon('ic_blog'),
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

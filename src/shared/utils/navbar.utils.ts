import { useLocation } from 'react-router-dom';

export const checkPathname = (url: string) => {
  const { pathname } = useLocation();

  const currentPathname = pathname.split('/')[pathname.split('/').length - 1];

  const checkPathname = currentPathname == url;

  return checkPathname;
};

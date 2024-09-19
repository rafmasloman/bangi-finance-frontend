import { BrowserRouter, BrowserRouterProps } from 'react-router-dom';

interface IRouterProviderProps extends BrowserRouterProps {}
const RouterProvider = (props: IRouterProviderProps) => {
  return <BrowserRouter {...props}>{props.children}</BrowserRouter>;
};

export default RouterProvider;

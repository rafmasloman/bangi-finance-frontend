import { BrowserRouter, BrowserRouterProps } from 'react-router-dom';

type IRouterProviderProps = BrowserRouterProps;
const RouterProvider = (props: IRouterProviderProps) => {
  return <BrowserRouter {...props}>{props.children}</BrowserRouter>;
};

export default RouterProvider;

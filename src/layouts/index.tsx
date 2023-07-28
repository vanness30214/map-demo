import * as React from "react";
import { Outlet } from 'umi';
interface IProps {
  
};
const Layout: React.FC<IProps> = (props) => {

  return (
    <>
      <Outlet/>
    </>
  );
};
export default Layout;
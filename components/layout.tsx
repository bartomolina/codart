import { PropsWithChildren } from "react";
import Nav from "./nav";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-full">
      <Nav />
      <div className="py-10">{children}</div>
    </div>
  );
};

export default Layout;

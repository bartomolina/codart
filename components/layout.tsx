import { PropsWithChildren } from "react";
import Nav from "./nav";
import { Montserrat } from '@next/font/google';

const montserrat = Montserrat({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: '--font-montserrat',
});

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={`${montserrat.variable} font-sans min-h-full`}>
      <Nav />
      <div className="py-10">{children}</div>
    </div>
  );
};

export default Layout;

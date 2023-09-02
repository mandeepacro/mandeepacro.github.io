import * as React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
const Layout = ({ pageTitle, children,showWhiteHeader=false }) => {
return (
    <div className={showWhiteHeader ? "bg-light-gr" : "bg-dark"}>
        <Navbar isWhite={showWhiteHeader}></Navbar>
        <main>
          {children}
        </main>
        <Footer></Footer>
    </div> 
  )
}

export default Layout
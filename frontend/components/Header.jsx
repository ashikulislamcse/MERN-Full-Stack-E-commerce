import React from "react";
import Logo from "../src/assets/Logo.png";
import { Link } from "react-router-dom";
import Search from "./Search";
const Header = () => {

  return (
    <header className="h-24 lg:h-20 lg:shadow-md sticky top-0 z-40 flex flex-col justify-center gap-1 bg-white">
      <div className="container mx-auto flex items-center px-2 justify-between">
        {/* Logo */}
        <div>
          <div className="h-full">
            <Link to="/" className="h-full flex justify-center items-center">
              <img
                src={Logo}
                alt="CholoKinbo"
                className="h-16 w-16 hidden lg:block"
              />
              <img
                src={Logo}
                alt="CholoKinbo"
                className="h-12 w-12 lg:hidden"
              />
            </Link>
          </div>
        </div>
        {/* Search */}
        <Link to='search'><Search/></Link>
        {/* Login and My Cart */}
        <div>Login</div>
      </div>
    </header>
  );
};

export default Header;

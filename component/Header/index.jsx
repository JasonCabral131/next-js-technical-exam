import Link from "next/link";
import React  from "react";

import HeaderSearchBar from "../HeaderSearchBar";
const Header = () => {
 
  return (
    <div className="header-container">
      <Link href={"/"}>
      <img className="header-logo" src={"/assets/img/Jason Cabral.png"} />
      </Link>
      <div className="header-right">
        <HeaderSearchBar />
        
      </div>
    </div>
  );
};

export default Header;

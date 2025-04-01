import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideNavbar from "../Navbar/SideNavbar";
import TopHeader from "./TopHeader";
import { topsetting } from "../../assets/images";

const Layout = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuactive, setMenuActive] = useState(true);
  const [load, setLoad] = useState(false);

  const [logoutpop, setLogoutPop] = useState(false);

  const toggleFun = () => {
    setMenuActive(!menuactive);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  return (
    <div className="layer">
      <div className="containersss">
        {/* {logoutpop && (
            <Poppup
              type="logout"
              cont=" Are you sure you want to Logout ?"
              poppupHandle={poppupHandle}
            />
          )} */}
        {/* {load && <PageLoad />} */}

        <SideNavbar
          setMenuActive={setMenuActive}
          toggleFun={toggleFun}
          menuactive={menuactive}
          load={load}
        />
        <div className={`${menuactive ? "main active" : "main"}`}>
          <TopHeader
            setMenuActive={setMenuActive}
            toggleFun={toggleFun}
            menuactive={menuactive}
          />
          <div className="px-3 py-2 py-md-1 px-md-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;

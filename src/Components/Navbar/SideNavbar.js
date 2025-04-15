import React, { useState } from "react";
import {
  logout_icon,
  menu_toggle,
  pro_icon,
  round_logo,
} from "../../assets/images";
import { SideNavList } from "../../Data/DummyJson";
import { useLocation, useNavigate } from "react-router-dom";

const SideNavbar = ({ menuactive, toggleFun, setMenuActive, poppupHandle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = location?.pathname;

  const onNavclike = (item) => {
    if (item?.navi === "logout") {
      poppupHandle("clike");
    } else {
      navigate(item?.navi);
    }
  };

  return (
    <div
      className={`${menuactive ? "navigation active" : "navigation"
        } textani d-flex flex-column justify-between`}
      style={{ height: "100vh", overflow: "hidden" }}
    >
      {/* TOP SCROLLABLE AREA */}
      <ul className="flex-grow-1 overflow-auto m-0 p-0 list-unstyled">
        {/* Logo */}
        <li>
          <div className="d-flex ac-js w-100 border-0 bg-transparent">
            <div className="icon_box d-flex ac-jc">
              <img src={round_logo} alt="Logo" />
            </div>
          </div>
        </li>

        {/* Profile */}
        <div
          className={`${menuactive ? "rounded-2" : "rounded-5 mx-md-3 mx-2 py-1 px-2"
            } pro-cont d-flex ac-js`}
        >
          <div className="pro-img d-flex ac-jc">
            <img src={pro_icon} alt="Profile" />
          </div>
          <div className="textss">
            <p className="mb-0 orange f4 fs-xxl-15 textani">
              Sujatha <span className="white">Venkatesh</span>
            </p>
            <p className="mb-0 white f2 fs-xxl-14 textani">Admin</p>
          </div>
        </div>

        {/* Features */}
        <div className="d-flex ms-3 ac-jb gap-2 my-2">
          <p className="white t-hh mb-2 f3 fs-xxl-14 textani">Features</p>
          <div className="line" />
        </div>

        {/* Nav Items */}
        <div className="d-flex flex-column gap-md-2 gap-0 px-1">
          {SideNavList?.map((item, index) => {
            const isActive =
              (activeIndex === index && pathname === item?.navi) ||
              pathname === item?.navi ||
              item?.sub?.some((subItem) => pathname === subItem?.list);

            return (
              <li
                key={index}
                onClick={() => {
                  onNavclike(item);
                  setActiveIndex(index);
                  setMenuActive(!isActive);
                }}
                className={`${isActive ? "hovered" : ""
                  } textani cp d-flex ac-js my-1`}
              >
                <a className="d-flex ac-js w-100">
                  <div className="icon_box_list d-flex ac-jc">
                    <img
                      src={
                        isActive ? item?.active_icon : item?.inactive_icon
                      }
                      alt={`${item.name} Icon`}
                    />
                  </div>
                  <span className="title f5 fs-xxl-14">{item?.name}</span>
                </a>
              </li>
            );
          })}
        </div>
      </ul>

      {/* BOTTOM FIXED SECTION */}
      <div
        className="d-flex ac-jb px-3 py-2"
        style={{
          backgroundColor: "#00225d",
          borderTop: menuactive ? "1px solid rgba(255,255,255,0.1)" : "none",
          borderBottomRightRadius: "10px",
          borderBottomLeftRadius: "10px",
        }}
      >
        {/* Logout */}
        <div
          onClick={() => poppupHandle("clike")}
          className="d-flex  gap-2 "
        >
          <img src={logout_icon} alt="Logout" style={{ width: 20, height: 20 }} />
          {menuactive && <span className="white">Logout</span>}
        </div>

        {/* Toggle Icon */}
        <button
          onClick={toggleFun}
          className="border-0 bg-transparent"
          style={{ padding: 0 }}
        >
          <img
            src={menu_toggle}
            alt="Toggle Menu"
            style={{ width: 24, height: 24 }}
          />
        </button>
      </div>

    </div>
  );
};

export default SideNavbar;

import React, { useState } from "react";
import {
  logout_icon,
  menu_toggle,
  pro_icon,
  round_logo,
  topsetting,
} from "../../assets/images";
import { SideNavList } from "../../Data/DummyJson";
import { useLocation, useNavigate } from "react-router-dom";

const SideNavbar = ({ menuactive, toggleFun, setMenuActive, poppupHandle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = location?.pathname;
  console.log("pathname", pathname);

  const onNavclike = (item) => {
    if (item?.navi == "logout") {
      poppupHandle("clike");
    } else {
      navigate(item?.navi);
    }
  };

  return (
    <div
      className={`${menuactive ? "navigation active" : "navigation"} textani `}
    >
      <ul className="">
        <div className="d-flex as-jb flex-column position-relative">
          <div className="w-100">
            <li className="">
              <div className="d-flex ac-js w-100 border-0 bg-transparent">
                <div className="icon_box d-flex ac-jc ">
                  <img src={round_logo} />
                </div>
              </div>
            </li>
            <div
              className={`${
                menuactive ? "rounded-2" : "rounded-5 mx-md-3 mx-2 py-1 px-2"
              } pro-cont d-flex ac-js `}
            >
              <div className="pro-img d-flex ac-jc ">
                <img src={pro_icon} />
              </div>
              <div className="textss">
                <p className="mb-0 orange f4 fs-xxl-15 fs-xl-15 fs-lg-14 fs-sm-13 fs-xs-13 textani">
                  Sujatha <span className="white">Venkatesh</span>
                </p>
                <p className="mb-0 white f2 fs-xxl-14 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-12 textani">
                 Admin
                </p>
              </div>
            </div>
            <div className="d-flex ms-3 ac-jb gap-2 my-2">
              <p className="white t-hh mb-2 f3 fs-xxl-14 fs-xl-14 fs-lg-13 fs-sm-12 fs-xs-12 textani">
                Features
              </p>
              <div className="line" />
            </div>
            <div className="d-flex flex-column gap-md-2 gap-0 px-1">
              {SideNavList?.map((item, index) => {
                return (
                  <li
                    onClick={() => {
                      onNavclike(item);
                      setActiveIndex(index);
                      if (
                        (activeIndex === index && pathname == item?.navi) ||
                        pathname == item?.navi
                      ) {
                        setMenuActive(false);
                      } else {
                        setMenuActive(true);
                      }
                    }}
                    className={`${
                      (activeIndex === index && pathname == item?.navi) ||
                      pathname == item?.navi ||
                      item?.sub?.find((subItem) => pathname === subItem?.list)
                        ? "hovered"
                        : ""
                    } textani cp  `}
                    // className={`${
                    //   activeIndex === index ? "hovered" : ""
                    // } textani cp  `}
                  >
                    <a className="d-flex ac-js">
                      <div className="icon_box_list d-flex ac-jc">
                        <img
                          src={
                            (activeIndex === index && pathname == item?.navi) ||
                            pathname == item?.navi ||
                            item?.sub?.find(
                              (subItem) => pathname === subItem?.list
                            )
                              ? item?.active_icon
                              : item?.inactive_icon
                          }
                        />
                      </div>
                      <span className="title f5 fs-xxl-14 fs-xl-13 fs-lg-12 fs-sm-12 fs-xs-12">
                        {item?.name}
                      </span>
                    </a>
                  </li>
                );
              })}
            </div>
          </div>
          <div className="logout-cont d-flex ac-jb flex-column w-20 ">
            <div
              className={`${
                menuactive ? "" : "cc" 
              } logout cp w-100 d-flex ac-jb`}
            >
              <li>
                <a className="d-flex ac-js">
                  <div className="icon_box_list d-flex ac-jc">
                    <img src={logout_icon} />
                  </div>
                  <span className="title f5 ffs-xxl-13 fs-xl-13 fs-lg-12 fs-sm-12 fs-xs-12 textani">
                    Logout
                  </span>
                </a>
              </li>
              <button
                onClick={() => {
                  toggleFun();
                }}
                className={`${
                  menuactive ? "opacity-0" : ""
                } icon_box_list2 bg-transparent border-0`}
              >
                <img src={menu_toggle} />
              </button>
            </div>
            {menuactive && (
              <div
                className={`${
                  menuactive ? "" : "opacity-0"
                } logout cp w-100 d-flex ac-jb`}
              >
                <li>
                  <a className="d-flex ac-js">
                    <div
                      onClick={() => {
                        toggleFun();
                      }}
                      className="icon_box_list d-flex ac-jc"
                    >
                      <img src={menu_toggle} />
                    </div>
                  </a>
                </li>
              </div>
            )}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default SideNavbar;

import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { topmain, topnoti, topsetting } from "../../assets/images";
import MenuOpenOutlinedIcon from "@mui/icons-material/MenuOpenOutlined";

const TopHeader = ({ toggleFun }) => {
  return (
    <div className="top-header px-md-5 px-3 py-md-4 py-3 d-flex ae-jb gap-md-0 gap-3 flex-column flex-md-row">
      <div className="w-md-40 wi-100 d-flex ac-jc gap-md-4 gap-3">
        <button
          onClick={() => {
            toggleFun();
          }}
          className="ressidenav border-0 bg-primary3 rounded-2"
        >
          <MenuOpenOutlinedIcon className="white" />
        </button>
        <div className="serach-cont d-flex ac-jb w-100 py-md-2 py-1 px-md-3 px-2 rounded-5">
          <input
            placeholder="Seaarch.."
            className="search-input serachgray border-0 w-100 f3 fs-xxl-18 fs-xl-17 fs-lg-17 fs-sm-16 fs-xs-15 black"
          />
          <SearchOutlinedIcon className="serachgray fs-3" />
        </div>
      </div>

      <div className="icon-cont d-flex ac-jc gap-md-3 gap-2">
        <button className="icon-bg d-flex ac-jc border-0 bg-primary3 rounded-5">
          <div className="inner-text rounded-5 d-flex ac-jc">
            <p className="white mb-0 f7 fs-xxl-10 fs-xl-10 fs-lg-9 fs-sm-8 fs-xs-8 textani">
              20
            </p>
          </div>
          <img src={topnoti} />
        </button>
        <button className="icon-bg d-flex ac-jc border-0 bg-yellow rounded-5">
          <img src={topsetting} />
        </button>
        <button className="icon-bg d-flex ac-jc border-0 bg-green rounded-5">
          <img src={topmain} />
          <div className="inner-text rounded-5 d-flex ac-jc">
            <p className="white mb-0 f7 fs-xxl-10 fs-xl-10 fs-lg-9 fs-sm-8 fs-xs-8 textani">
              15
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default TopHeader;

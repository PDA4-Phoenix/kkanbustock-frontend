import React, { useState, useEffect } from "react";
import "./Nav.css";
import { Link, useLocation } from "react-router-dom";

function Nav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  const [isMainPage, setIsMainPage] = useState(location.pathname === "/");
  const isScrolled = scrollPosition >= 150;
  const shouldApplyStyle = isMainPage && !isScrolled;

  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    setIsMainPage(location.pathname === "/" || location.pathname === "/Rival");
    window.addEventListener("scroll", updateScroll);

    return () => {
      window.removeEventListener("scroll", updateScroll);
    };
  }, [location.pathname]); // location.pathname이 변경될 때만 useEffect 실행

  return (
    <div className={!shouldApplyStyle ? "nav" : "change_nav"}>
      <div className={!shouldApplyStyle ? "navbar" : "change_header"}>
        <div className={!shouldApplyStyle ? "logo" : "change_logo"}>KKANBU</div>
        <div className="menuClass">
          <Link
            className={!shouldApplyStyle ? "navbarMenu" : "change_navbarMenu"}
            to={"/"}
          >
            메인
          </Link>
          <Link
            className={!shouldApplyStyle ? "navbarMenu" : "change_navbarMenu"}
            to={"/Rival"}
          >
            라이벌
          </Link>
          <Link
            className={!shouldApplyStyle ? "navbarMenu" : "change_navbarMenu"}
            to={"/Dictionary"}
          >
            사전
          </Link>
          <Link
            className={!shouldApplyStyle ? "navbarMenu" : "change_navbarMenu"}
            to={"/Quiz"}
          >
            퀴즈
          </Link>
          <Link
            className={!shouldApplyStyle ? "navbarMenu" : "change_navbarMenu"}
            to={"/Login"}
          >
            내정보
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;

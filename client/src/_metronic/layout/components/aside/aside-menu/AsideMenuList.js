/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import {useLocation} from "react-router";
import {NavLink}  from "react-router-dom";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl, checkIsActive} from "../../../../_helpers";

export function AsideMenuList({ layoutProps }) {
  const location = useLocation();
  const getMenuItemActive = (url) => {
    return checkIsActive(location, url)
        ? " menu-item-active menu-item-open "
        : "";
  };

  return (
      <>
        <ul className={`menu-nav ${layoutProps.ulClasses}`}>
          <li
              className={`menu-item ${getMenuItemActive("/freights")}`}
              aria-haspopup="true"
          >
            <NavLink className="menu-link" to="/freights">
            <span className="svg-icon menu-icon">
              <SVG src={toAbsoluteUrl("/media/svg/icons/Design/Layers.svg")}/>
            </span>
              <span className="menu-text">Freights</span>
            </NavLink>
          </li>
        </ul>
      </>
  );
}

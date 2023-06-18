import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartBar,
  faUser,
  faClipboardList,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Image, OverlayTrigger, Tooltip } from "react-bootstrap";
import userProfile from "../../../images/userProfile.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../../featuers/slice/userSlice";

const UserOptions = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate();

const{user} = useSelector(state => state.user)

  const dashbordFunc = () => {
    navigate("/dashboard");
  };

  const odersFunc = () => {
    navigate("/orders");
  };

  const profileFunc = () => {
    navigate("/account");
  };

  const logoutFunc = () => {
    dispatch(userLogout());
  };

  const options = [
    {
      component: (
        <FontAwesomeIcon
          icon={faClipboardList}
          className="fs-2 mx-3 text-secondary"
          onClick={odersFunc}
          style={{ cursor: "pointer" }}
        />
      ),
      name: "Orders",
      func: odersFunc,
    },
    {
      component: (
        <FontAwesomeIcon
          icon={faUser}
          className="fs-2 mx-3 text-secondary"
          onClick={profileFunc}
          style={{ cursor: "pointer" }}
        />
      ),
      name: "Profile",
      func: profileFunc,
    },
    {
      component: (
        <FontAwesomeIcon
          icon={faSignOutAlt}
          className="fs-2 mx-3 text-secondary"
          onClick={logoutFunc}
          style={{ cursor: "pointer" }}
        />
      ),
      name: "Logout",
      func: logoutFunc,
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      component: (
        <FontAwesomeIcon
          icon={faChartBar}
          className="fs-2 mx-3 text-secondary"
          onClick={dashbordFunc}
          style={{ cursor: "pointer" }}
        />
      ),
      name: "Dashboard",
      func: dashbordFunc,
    });
  }

  const renderTooltip = (text) => <Tooltip id="tooltip">{text}</Tooltip>;

  return (
    <>
      <div className="m-3 text-end">
        <div className="d-flex align-items-center justify-content-end">
          <Image
            src={user?.avatar?.url ? user?.avatar?.url : userProfile}
            alt="Profile Picture"
            roundedCircle
            style={{ width: "40px" }}
            className="mx-2"
          />
          <div>
            {options.map((option) => (
              <OverlayTrigger
                key={option.name}
                placement="top"
                overlay={renderTooltip(option.name)}
              >
                {option.component}
              </OverlayTrigger>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserOptions;

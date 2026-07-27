import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Input, Button, Avatar, Typography, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  UserOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { getCurrentUser } from "../Calls/authCalls.js";
import { setUserData } from "../redux/userSlice.js";
import "./Navbar.css";
function Navbar() {
  const { Header } = Layout;
  const { Text } = Typography;

  // const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  console.log(userData, "navbarcomponent");
  const dispatch = useDispatch();
  const onSearch = (value) => {
    console.log("Search:", value);
  };
  useEffect(() => {
    (async () => {
      const user = await getCurrentUser();
      console.log(user);
      dispatch(setUserData(user || null));
    })();
  }, [dispatch]);
  const displayName = userData?.name || userData?.username || "User";
  return (
    <Layout>
      <Header className="navbar-header">
        <div className="navbar-content">
          <Link
            to={
              userData?.role === "partner"
                ? "/partner"
                : userData?.role === "admin"
                  ? "/admin"
                  : "/home"
            }
            className="navbar-brand"
          >
            <Text strong className="brand-text">
              MovieHub
            </Text>
          </Link>

          <div className="navbar-search">
            <Input
              placeholder="Search movies..."
              onPressEnter={(e) => onSearch(e.target.value)}
              className="search-input"
              prefix={<SearchOutlined />}
            />
          </div>

          <div className="navbar-actions">
            {userData?.role === "user" && (
              <Link to="/my-bookings">
                <Button type="link" className="nav-link">
                  My Bookings
                </Button>
              </Link>
            )}
            <div className="user-info">
              <Avatar icon={<UserOutlined />} className="user-avatar" />
              <Link
                to={
                  userData?.role === "partner"
                    ? "/partner"
                    : userData?.role === "admin"
                      ? "/admin"
                      : "/home"
                }
                className="user-name"
              >
                {displayName}
              </Link>
            </div>
            <Button icon={<LogoutOutlined />} className="logout-button">
              Logout
            </Button>
          </div>
        </div>
      </Header>
    </Layout>
  );
}

export default Navbar;

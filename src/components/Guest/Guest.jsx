import React from "react";
import { Layout, theme } from "antd";
const { Header, Content, Footer } = Layout;
import Footers from "../Footer/Footer";
import { Button, Flex } from "antd";
import "./Guest.css";
import {useNavigate} from "react-router-dom";

const Guest = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate=useNavigate();
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          height: "95px",
        }}
      >
        <div className="demo-logo">
          <h1
            style={{
              color: "white",
              fontWeight: "600",
              fontStyle: "normal",
              fontFamily: "Quicksand, sans-serif",
            }}
          >
            Stay Manager
          </h1>
        </div>
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          className="example_d"
          style={{
            background: colorBgContainer,
            minHeight: 280,
            margin: "50px 0",
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <h2 style={{ margin: "40px 20%", fontSize: "35px" }}>
            Effortless Management for Hassle-Free Stays
          </h2>
          <Flex gap="large" wrap justify="center">
            <Button type="primary" size="large" onClick={()=>navigate("/register")}>
              Sign Up
            </Button>
            <Button size="large" onClick={()=>navigate("/login")}>Login</Button>
          </Flex>
        </div>
      </Content>
      <Footers />
      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#001529",
          color: "white",
          fontSize: "medium",
        }}
      >
        Copyright ©2024. All rights reserved. | This website is made by
        Dhananjay D.
      </Footer>
    </Layout>
  );
};
export default Guest;

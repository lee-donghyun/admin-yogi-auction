import { FC, useMemo } from "react";
import { Layout as AntdLayout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { getMenus } from "./menus";

const Layout: FC = () => {
  const location = useLocation();

  const [_, depth1, depth2] = location.pathname.split("/");

  const menus = useMemo(() => getMenus(depth1), [depth1]);

  return (
    <AntdLayout style={{ minHeight: "100vh" }}>
      <AntdLayout.Header className="header">
        <div style={{ float: "left" }}>
          <h1 style={{ color: "white", paddingRight: 50 }}>Y-A ADMIN</h1>
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[depth1]}>
          <Menu.Item key="item">
            <Link to="/item/manage">상품 관리</Link>
          </Menu.Item>
          <Menu.Item key="content">컨텐츠 관리</Menu.Item>
          <Menu.Item key="user">회원 관리</Menu.Item>
          <Menu.Item key="transaction">거래 관리</Menu.Item>
          <Menu.Item key="dashboard">지표</Menu.Item>
        </Menu>
      </AntdLayout.Header>
      <AntdLayout>
        {menus.length > 0 && (
          <AntdLayout.Sider width={200}>
            <Menu
              mode="inline"
              style={{ height: "100%", borderRight: 0 }}
              selectedKeys={[depth2]}
            >
              {menus.map((menu) => (
                <Menu.Item key={menu.key}>
                  <Link to={`/${depth1}/${menu.key}`}>{menu.name}</Link>
                </Menu.Item>
              ))}
            </Menu>
          </AntdLayout.Sider>
        )}
        <AntdLayout style={{ padding: "24px" }}>
          <AntdLayout.Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "white",
            }}
          >
            <Outlet />
          </AntdLayout.Content>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;

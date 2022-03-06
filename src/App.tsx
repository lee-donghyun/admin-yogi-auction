import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import auth from "./pages/auth";
import item from "./pages/item";

function App() {
  return (
    <Auth whiteList={["/auth/signin"]}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<auth.SignIn />} />
          <Route path="/auth/signin" element={<auth.SignIn />} />
          <Route path="/item/register" element={<item.Register />} />
          <Route path="/item/manage" element={<item.Manage />} />
        </Route>
      </Routes>
    </Auth>
  );
}

export default App;

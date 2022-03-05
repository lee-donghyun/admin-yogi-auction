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
          <Route path="/item/register" element={<h1>register page</h1>} />
          <Route path="/item/manage" element={<item.Manage />} />
          <Route path="/auth/signin" element={<auth.SignIn />} />
        </Route>
      </Routes>
    </Auth>
  );
}

export default App;

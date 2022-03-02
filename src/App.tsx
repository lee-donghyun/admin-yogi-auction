import { Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import SignIn from "./pages/auth/signin";

function App() {
  return (
    <Auth whiteList={["/auth/signin"]}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/item/register" element={<h1>register page</h1>} />
          <Route path="/item/manage" element={<h1>manage page</h1>} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route index element={<></>} />
        </Route>
      </Routes>
    </Auth>
  );
}

export default App;

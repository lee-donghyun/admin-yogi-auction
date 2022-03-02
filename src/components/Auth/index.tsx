import { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  whiteList: string[];
};
const Auth: FC<Props> = ({ children, whiteList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(false);
  console.log("auth :", isAuthorized);

  if (!isAuthorized && !whiteList.includes(location.pathname)) {
    navigate({
      pathname: "/auth/signin",
      search: `redirect=${location.pathname}`,
    });
  }
  return <>{children}</>;
};

export default Auth;

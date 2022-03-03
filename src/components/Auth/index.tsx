import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../store";

type Props = {
  whiteList: string[];
};
const Auth: FC<Props> = ({ children, whiteList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = useRecoilValue(authState);

  if (!isAuthorized && !whiteList.includes(location.pathname)) {
    navigate({
      pathname: "/auth/signin",
      search: `redirect=${location.pathname}`,
    });
  }
  return <>{children}</>;
};

export default Auth;

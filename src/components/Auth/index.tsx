import { FC, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../services/store";

type Props = {
  whiteList: string[];
};
const Auth: FC<Props> = ({ children, whiteList }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthorized = useRecoilValue(authState);

  useEffect(() => {
    const redirect =
      location.pathname == "/" ? "/item/manage" : location.pathname;
    const isWhiteList = whiteList.includes(location.pathname);
    if (!isAuthorized && !isWhiteList) {
      navigate(
        {
          pathname: "/auth/signin",
        },
        { state: { redirect }, replace: true }
      );
    } else if (isAuthorized && isWhiteList) {
      navigate({
        pathname: (location as any).state?.redirect ?? redirect,
      });
    }
  }, [isAuthorized, location.pathname]);
  return <>{children}</>;
};

export default Auth;

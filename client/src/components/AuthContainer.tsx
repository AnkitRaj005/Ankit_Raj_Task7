import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

interface AuthContainerProps {
  children: ReactNode;
  authentication?: boolean;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const authStatus = useSelector((state: any) => state.auth?.status);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && !authStatus) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }

    const timer = setTimeout(() => setLoader(false), 300);
    return () => clearTimeout(timer);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading...</h1> : <>{children}</>;
};

export default AuthContainer;

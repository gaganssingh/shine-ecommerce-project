import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { verifyJwt } from "../services/auth.service";

interface PrivateRouteProps {
  page: JSX.Element;
}

export const PrivateRoute = ({ page }: PrivateRouteProps) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  console.log("authState", authState);
  const { jwt, success, isAuthenticated } = authState;

  useEffect(() => {
    if (!jwt || !jwt?.token) return;

    dispatch(verifyJwt(jwt.token));
  }, [jwt, success, dispatch]);

  return isAuthenticated ? page : <Navigate replace to="/signin" />;
};

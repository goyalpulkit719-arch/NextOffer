import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
function PublicLayout() {

  const { isLoggedIn, isLoading } = useSelector((state) => state.auth);

  if (isLoading) {
      return (
          <div className="flex min-h-screen items-center justify-center">
              <ClipLoader size={40} />
          </div>
      );
  }

  if (isLoggedIn) {
      return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicLayout;
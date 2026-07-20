import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useDispatch } from "react-redux";

import { getCurrentUser } from "./api/authApi";
import { setLoading, setUser } from "./app/authSlice";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const loadUser = async () => {
            try {
                dispatch(setLoading(true));

                const response = await getCurrentUser();

                dispatch(setUser(response.data));
            } catch (error) {
                dispatch(logout());
            } finally {
                dispatch(setLoading(false));
            }
        };

        loadUser();
    }, [dispatch]);

    return (
        <>
            <Toaster position="top-center" richColors closeButton />
            <Outlet />
        </>
    );
}

export default App;
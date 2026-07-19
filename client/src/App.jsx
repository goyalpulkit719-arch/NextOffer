import { Outlet } from "react-router-dom";
import {Toaster} from "sonner";

function App() {
    return (
        <>
            <Toaster position="top-center" richColors closeButton/>
            <Outlet/>
        </>
    )
}

export default App;
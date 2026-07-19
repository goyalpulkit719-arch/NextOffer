import { History, Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { pageConfig } from "../constants/pageConfig";

function Header({ setSidebarOpen }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const page = pageConfig[pathname];

  const { name, avatar } = useSelector((state) => state.auth.user);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
      {/* ================= Left ================= */}
      <div className="flex items-center gap-4">
        {/* Hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-900 md:text-2xl">
            {page?.title}
          </h1>

          <p className="mt-1 hidden text-sm text-slate-500 md:block">
            {page?.subtitle}
          </p>
        </div>
      </div>

      {/* ================= Right ================= */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* History */}
        {page?.historyPath  && (
          <button
            onClick={() => navigate(page.historyPath)}    
            className="
              flex items-center gap-2
              rounded-xl border border-slate-200
              bg-white
              px-3 py-2
              text-sm font-medium text-slate-700
              transition
              hover:bg-slate-100
            "
          >
            <History size={18} />

            <span className="hidden sm:block">
              History
            </span>
          </button>
        )}

        {/* User */}
        <button
          className="
            flex items-center gap-3
            rounded-xl
            px-2 py-2
            transition
            hover:bg-slate-100
          "
        >
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-11 w-11 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
              {name?.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="hidden text-left lg:block">
            <p className="font-semibold text-slate-900">
              {name}
            </p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
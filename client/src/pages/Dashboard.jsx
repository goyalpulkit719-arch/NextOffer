import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  getCodeforcesDashboard,
  getCodeforcesHistory,
  getLeetcodeDashboard,
  getLeetcodeHistory,
  refreshCodeforcesProfile,
  refreshLeetcodeProfile,
} from "../api/dashboardApi";

import {
  setCodeforcesError,
  setCodeforcesLoading,
  setCodeforcesProfile,
} from "../app/codeforcesSlice";

import {
  setLeetcodeError,
  setLeetcodeLoading,
  setLeetcodeProfile,
} from "../app/leetcodeSlice";

import PlatformDashboard from "../components/dashboard/PlatformDashboard";
import HistoryModal from "../components/dashboard/HistoryModal";
import DashboardFooter from "../components/dashboard/DashboardFooter";

const getErrorMessage = (error) =>
  error.response?.data?.message || "Something went wrong.";

function Dashboard() {
  const dispatch = useDispatch();
  const hasLoaded = useRef(false);

  const leetcode = useSelector((state) => state.leetcode);
  const codeforces = useSelector((state) => state.codeforces);

  const [leetcodeHistory, setLeetcodeHistory] = useState([]);
  const [codeforcesHistory, setCodeforcesHistory] = useState([]);

  const [showLeetcodeHistory, setShowLeetcodeHistory] = useState(false);
  const [showCodeforcesHistory, setShowCodeforcesHistory] = useState(false);

  const [isLeetcodeRefreshing, setIsLeetcodeRefreshing] = useState(false);
  const [isCodeforcesRefreshing, setIsCodeforcesRefreshing] = useState(false);

  const loadLeetcode = async () => {
    dispatch(setLeetcodeLoading(true));

    try {
      const dashboardResponse = await getLeetcodeDashboard();
      const historyResponse = await getLeetcodeHistory();

      dispatch(setLeetcodeProfile(dashboardResponse.data));
      setLeetcodeHistory(historyResponse.data);
    } catch (error) {
      dispatch(setLeetcodeError(getErrorMessage(error)));
    }
  };

  const loadCodeforces = async () => {
    dispatch(setCodeforcesLoading(true));

    try {
      const dashboardResponse = await getCodeforcesDashboard();
      const historyResponse = await getCodeforcesHistory();

      dispatch(setCodeforcesProfile(dashboardResponse.data));
      setCodeforcesHistory(historyResponse.data);
    } catch (error) {
      dispatch(setCodeforcesError(getErrorMessage(error)));
    }
  };

  useEffect(() => {
    if (hasLoaded.current) {
      return;
    }

    hasLoaded.current = true;

    loadLeetcode();
    loadCodeforces();
  }, []);

  const handleLeetcodeRefresh = async () => {
    try {
      setIsLeetcodeRefreshing(true);

      const response = await refreshLeetcodeProfile();
      const historyResponse = await getLeetcodeHistory();

      dispatch(setLeetcodeProfile(response.data));
      setLeetcodeHistory(historyResponse.data);

      toast.success(response.message);
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error(error.response.data.message);
        return;
      }

      toast.error(getErrorMessage(error));
    } finally {
      setIsLeetcodeRefreshing(false);
    }
  };

  const handleCodeforcesRefresh = async () => {
    try {
      setIsCodeforcesRefreshing(true);

      const response = await refreshCodeforcesProfile();
      const historyResponse = await getCodeforcesHistory();

      dispatch(setCodeforcesProfile(response.data));
      setCodeforcesHistory(historyResponse.data);

      toast.success(response.message);
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error(error.response.data.message);
        return;
      }

      toast.error(getErrorMessage(error));
    } finally {
      setIsCodeforcesRefreshing(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-12 pb-10">
        <PlatformDashboard
          platform="leetcode"
          profile={leetcode.profile}
          error={leetcode.error}
          isLoading={leetcode.isLoading}
          onRefresh={handleLeetcodeRefresh}
          onHistory={() => setShowLeetcodeHistory(true)}
          isRefreshing={isLeetcodeRefreshing}
        />

        <div className="border-t border-slate-200 pt-12">
          <PlatformDashboard
            platform="codeforces"
            profile={codeforces.profile}
            error={codeforces.error}
            isLoading={codeforces.isLoading}
            onRefresh={handleCodeforcesRefresh}
            onHistory={() => setShowCodeforcesHistory(true)}
            isRefreshing={isCodeforcesRefreshing}
          />
        </div>
        <DashboardFooter />
      </div>

      <HistoryModal
        isOpen={showLeetcodeHistory}
        onClose={() => setShowLeetcodeHistory(false)}
        history={leetcodeHistory}
        platform="leetcode"
      />

      <HistoryModal
        isOpen={showCodeforcesHistory}
        onClose={() => setShowCodeforcesHistory(false)}
        history={codeforcesHistory}
        platform="codeforces"
      />
    </>
  );
}

export default Dashboard;
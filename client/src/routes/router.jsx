import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

import Dashboard from "../pages/Dashboard";
import ResumeAnalyzer from "../pages/ResumeAnalyzer";
import JobMatcher from "../pages/JobMatcher";
import CompanyInsights from "../pages/CompanyInsights";
import NextSteps from "../pages/NextSteps";
import Profile from "../pages/Profile";

export const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        element: <PublicLayout />,

        children: [
          {
            index: true,
            element: <Landing />,
          },
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },

      {
        element: <DashboardLayout />,

        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "resume-analyzer",
            element: <ResumeAnalyzer />,
          },
          {
            path: "job-matcher",
            element: <JobMatcher />,
          },
          {
            path: "company-insights",
            element: <CompanyInsights />,
          },
          {
            path: "next-steps",
            element: <NextSteps />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

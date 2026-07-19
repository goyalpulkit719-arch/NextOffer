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

import ResumeAnalyzerHistory from "../pages/ResumeAnalyzerHistory";
import JobMatcherHistory from "../pages/JobMatcherHistory";
import CompanyInsightsHistory from "../pages/CompanyInsightsHistory";
import NextStepsHistory from "../pages/NextStepsHistory";

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
            path: "resume-analyzer/history",
            element: <ResumeAnalyzerHistory/>,
          },
          {
            path: "job-matcher",
            element: <JobMatcher />,
          },
          {
            path: "job-matcher/history",
            element: <JobMatcherHistory />,
          },
          {
            path: "company-insights",
            element: <CompanyInsights />,
          },
          {
            path: "company-insights/history",
            element: <CompanyInsightsHistory />,
          },
          {
            path: "next-steps/history",
            element: <NextStepsHistory />,
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

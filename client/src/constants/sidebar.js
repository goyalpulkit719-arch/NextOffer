import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Building2,
  Route,
  User,
} from "lucide-react";

export const sidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Resume Analyzer",
    path: "/resume-analyzer",
    icon: FileText,
  },
  {
    title: "Job Matcher",
    path: "/job-matcher",
    icon: Briefcase,
  },
  {
    title: "Company Insights",
    path: "/company-insights",
    icon: Building2,
  },
  {
    title: "Next Steps",
    path: "/next-steps",
    icon: Route,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
];
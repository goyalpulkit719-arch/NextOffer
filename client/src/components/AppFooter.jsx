import { Heart, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Resume Analyzer", path: "/resume-analyzer" },
  { label: "Job Matcher", path: "/job-matcher" },
  { label: "Company Insights", path: "/company-insights" },
  { label: "AI Next Steps", path: "/next-steps" },
  { label: "Home", path: "/" },
];

function AppFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-slate-900">
              <Rocket size={18} className="text-blue-600" />
              <p className="font-semibold">
                Built for your next engineering offer
              </p>
            </div>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
              NextOffer brings your coding progress, resume strengths, and company
              goals into one focused placement-preparation workspace.
            </p>
          </div>

          <nav className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="font-medium text-slate-600 transition hover:text-blue-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-row gap-3 text-sm">
                <a
                  href="https://github.com/goyalpulkit719-arch/NextOffer"
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-slate-500 transition hover:text-blue-600"
                >
                  GitHub
                </a>

                <a
                  href="https://linkedin.com/in/pulkit-goyal1"
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-slate-500 transition hover:text-blue-600"
                >
                  LinkedIn
                </a>

                <a
                  href="mailto:goyalpulkit719@email.com"
                  className="w-fit text-slate-500 transition hover:text-blue-600"
                >
                  Email
                </a>
              </div>

          <p className="flex items-center gap-1">
            Made with{" "}
            <Heart size={13} className="fill-rose-500 text-rose-500" /> for
            ambitious engineers
          </p>

          <p>© 2026 NextOffer</p>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Lightbulb,
  Link,
  Mail,
  Menu,
  Route,
  Sparkles,
  Target,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../assets/images/logo.png";
import dashboardImage from "../assets/images/landing/dashboard-overview.png";
import resumeImage from "../assets/images/landing/resume-analyzer.png";
import matcherImage from "../assets/images/landing/job-matcher.png";
import companyImage from "../assets/images/landing/company-insights.png";
import roadmapImage from "../assets/images/landing/ai-next-steps.png";

const navItems = [
  ["Placement Journey", "journey"],
  ["Explore", "explore"],
  ["Why NextOffer", "why"],
  ["How It Works", "how-it-works"],
];

const modules = [
  [
    "Resume Analyzer",
    "AI feedback for ATS compatibility, placement readiness, section scores, and high-impact resume fixes.",
    resumeImage,
  ],
  [
    "Job Matcher",
    "Compare your resume with a real role and see qualifications, gaps, and practical recommendations.",
    matcherImage,
  ],
  [
    "Company Insights",
    "Research hiring process, interview difficulty, DSA topics, core subjects, and company expectations.",
    companyImage,
  ],
  [
    "AI Next Steps",
    "Turn your coding progress, resume, and target company into a focused preparation roadmap.",
    roadmapImage,
  ],
];

function Landing() {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const getStarted = () => navigate(isLoggedIn ? "/dashboard" : "/login");

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };
  useEffect(() => {
    const sectionIds = ["hero", "journey", "explore", "why", "how-it-works"];

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-35% 0px -55% 0px",
        threshold: 0,
      },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);

      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-slate-50/90 backdrop-blur">
        <nav className="mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 md:px-8">
          <button
            onClick={() => scrollTo("hero")}
            className="flex w-fit items-center gap-2"
          >
            <img
              src={logo}
              alt="NextOffer"
              className="h-9 w-9 object-contain"
            />

            <span className="text-lg font-bold">
              Next<span className="text-blue-600">Offer</span>
            </span>
          </button>

          <div className="hidden items-center justify-center gap-2 rounded-xl bg-slate-100/80 p-1 lg:flex">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                  activeSection === id
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2">
            <button
              onClick={getStarted}
              className="hidden rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 sm:block"
            >
              Get Started
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
        {mobileOpen && (
          <div className="border-t border-slate-200 bg-white p-4 lg:hidden">
            {navItems.map(([label, id]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full px-3 py-3 text-left text-sm font-medium text-slate-700"
              >
                {label}
              </button>
            ))}
            <button
              onClick={getStarted}
              className="mt-2 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"
            >
              Get Started
            </button>
          </div>
        )}
      </header>

      <main>
        <section
          id="hero"
          className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 lg:grid-cols-2 lg:items-center lg:py-24"
        >
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-sm font-semibold text-violet-700">
              <Bot size={16} /> Your AI Placement Mentor
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Prepare smarter.
              <span className="block text-blue-600">Earn your next offer.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
              Analyze resumes, track coding profiles, match jobs, explore
              companies, and build a personalized placement roadmap in one
              focused workspace.
            </p>
            <button
              onClick={getStarted}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-blue-600 to-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:-translate-y-0.5"
            >
              Get Started <ArrowRight size={17} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <img
              src={dashboardImage}
              alt="NextOffer dashboard"
              className="rounded-2xl border border-slate-200 shadow-2xl"
            />
            {[
              ["ATS Score", "92", "top-4 -left-4"],
              ["Contest Rating", "1862", "bottom-10 -left-8"],
              ["Company Ready", "75%", "right-0 top-1/3"],
            ].map(([label, value, position]) => (
              <motion.div
                key={label}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  delay: Math.random(),
                }}
                className={`absolute rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg ${position}`}
              >
                <p className="text-xs text-slate-500">{label}</p>
                <p className="font-bold text-slate-900">{value}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        <section id="journey" className="bg-white py-18">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <p className="text-sm font-bold text-blue-600">PLACEMENT JOURNEY</p>
            <h2 className="mt-2 text-3xl font-bold">
              One focused path to your dream offer.
            </h2>
            <div className="mt-10 overflow-x-auto pb-3">
              <div className="flex py-5 min-w-250 items-start">
                {[
                  [FileText, "Upload Resume", "Add your latest resume."],
                  [BarChart3, "Connect Profiles", "Link coding progress."],
                  [Target, "Choose Goal", "Select a company or role."],
                  [Bot, "AI Analysis", "Identify strengths and gaps."],
                  [Route, "Personalized Roadmap", "Follow focused next steps."],
                  [
                    Sparkles,
                    "Dream Offer",
                    "Crack interviews with confidence.",
                  ],
                ].map(([Icon, title, description], index, items) => (
                  <div key={title} className="flex flex-1 items-start">
                    <motion.div
                      whileHover={{ y: -5 }}
                      className="w-42 text-center"
                    >
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20">
                        <Icon size={23} />
                      </div>

                      <span className="mt-4 inline-block rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                        Step {index + 1}
                      </span>

                      <p className="mt-3 font-semibold text-slate-900">
                        {title}
                      </p>
                      <p className="mt-2 text-xs leading-5 text-slate-500">
                        {description}
                      </p>
                    </motion.div>

                    {index !== items.length - 1 && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.12, duration: 0.45 }}
                        className="mt-7 h-0.5 flex-1 origin-left bg-linear-to-r from-blue-400 to-red-400"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="explore"
          className="mx-auto max-w-7xl space-y-20 px-4 py-20 md:px-6"
        >
          {modules.map(([title, description, image], index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`grid gap-8 lg:grid-cols-2 lg:items-center ${index % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                  EXPLORE
                </span>
                <h2 className="mt-4 text-3xl font-bold">{title}</h2>
                <p className="mt-4 max-w-lg leading-7 text-slate-600">
                  {description}
                </p>
              </div>
              <img
                src={image}
                alt={title}
                className="rounded-2xl border border-slate-200 shadow-xl"
              />
            </motion.div>
          ))}
        </section>

        <section id="why" className="bg-slate-900 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <h2 className="text-3xl font-bold">Why NextOffer</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {[
                [
                  Sparkles,
                  "Personalized AI Guidance",
                  "Get recommendations shaped around your resume, coding profile, and target company.",
                ],
                [
                  BarChart3,
                  "Coding Progress Tracking",
                  "Turn LeetCode and Codeforces activity into clear preparation signals.",
                ],
                [
                  Lightbulb,
                  "AI-Powered Analysis",
                  "Understand resume quality, job fit, and interview expectations in minutes.",
                ],
                [
                  Target,
                  "Placement-Focused Preparation",
                  "Focus on the skills and actions that move you closer to real offers.",
                ],
              ].map(([Icon, title, description]) => (
                <motion.article
                  key={title}
                  whileHover={{ y: -5 }}
                  className="group rounded-2xl border border-white/10 bg-linear-to-br from-white/12 to-white/5 p-6 transition hover:border-blue-300/50 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <Icon
                    size={28}
                    className="text-blue-300 transition group-hover:scale-110"
                  />

                  <p className="mt-5 font-semibold text-white">{title}</p>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    {description}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="mx-auto max-w-3xl px-4 py-20 md:px-6"
        >
          <h2 className="text-3xl font-bold">How It Works</h2>
          <div className="mt-8 space-y-4 border-l-2 border-blue-100">
            {[
              [
                "Upload Resume",
                "Give NextOffer the foundation for personalized resume feedback.",
              ],
              [
                "Connect LeetCode & Codeforces",
                "Bring your coding consistency and contest progress into one view.",
              ],
              [
                "Generate AI Reports",
                "Explore company insights, job fit, and resume analysis.",
              ],
              [
                "Follow Personalized Roadmap",
                "Convert your current profile into clear weekly preparation actions.",
              ],
              [
                "Crack Interviews 🚀",
                "Walk into interviews with sharper preparation and confidence.",
              ],
            ].map(([title, description], index) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-12"
              >
                <span className="absolute -left-3 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shadow-md shadow-blue-500/25">
                  {index + 1}
                </span>

                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <p className="font-semibold text-slate-900">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 md:px-6">
          <div className="rounded-3xl bg-linear-to-r from-blue-600 to-violet-600 p-8 text-center text-white md:p-14">
            <h2 className="text-3xl font-bold">
              Ready to crack your dream company?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-blue-100">
              Build a clearer, smarter, and more focused placement journey
              today.
            </p>
            <button
              onClick={getStarted}
              className="mt-7 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-700"
            >
              Get Started
            </button>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8">
          <div className="grid gap-10 md:grid-cols-4">
            {/* Logo */}
            <div>
              <div className="flex items-center gap-3">
                <img
                  src={logo}
                  alt="NextOffer"
                  className="h-10 w-10 object-contain"
                />

                <div>
                  <p className="text-lg font-bold text-slate-900">
                    Next<span className="text-blue-600">Offer</span>
                  </p>

                  <p className="text-sm text-slate-500">AI Placement Mentor</p>
                </div>
              </div>

              <p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">
                Your AI-powered companion for software engineering placements.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="mb-4 font-semibold text-slate-900">Navigation</h3>

              <div className="flex flex-col gap-3 text-sm">
                {navItems.map(([label, id]) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className="w-fit text-slate-500 transition hover:text-blue-600"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Connect */}
            <div>
              <h3 className="mb-4 font-semibold text-slate-900">Connect</h3>

              <div className="flex flex-col gap-3 text-sm">
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
            </div>

            {/* About */}
            <div className="flex flex-col justify-between">
              <div>
                <h3 className="mb-4 font-semibold text-slate-900">About</h3>

                <p className="text-sm leading-6 text-slate-500">
                  Built with ❤️ by Pulkit to help students prepare smarter, stay
                  consistent, and land better software engineering offers.
                </p>
              </div>
            </div>
          </div>

          <div className="my-8 border-t border-slate-200" />

          <div className="flex flex-col gap-3 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
            <p>© 2026 NextOffer. All rights reserved.</p>

            <p>Made with ❤️ for ambitious engineers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;

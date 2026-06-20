import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS: Array<{ label: string; to: string }> = [
  { label: "Thumbnail Studio", to: "/thumbnail-studio" },
  { label: "Video Editor", to: "/video-editor" },
  { label: "Ad Creator", to: "/ad-creator" },
  { label: "AI Tools", to: "/ai-tools" },
  { label: "AI Image", to: "/ai-image-generator" },
  { label: "Templates", to: "/templates" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function ElysianLogo() {
  const SEGMENTS = [
    { id: "a", color: "#50c878", start: 0, end: 55 },
    { id: "b", color: "#00c8a0", start: 60, end: 110 },
    { id: "c", color: "#0047ab", start: 115, end: 155 },
    { id: "d", color: "#50c878", start: 160, end: 205 },
    { id: "e", color: "#00e5a0", start: 210, end: 250 },
    { id: "f", color: "#0078d4", start: 255, end: 295 },
    { id: "g", color: "#50c878", start: 300, end: 355 },
  ];
  const cx = 20;
  const cy = 20;
  const r = 17;
  const sw = 4;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const arc = (s: number, e: number) => {
    const rs = toRad(s - 90);
    const re = toRad(e - 90);
    const x1 = cx + r * Math.cos(rs);
    const y1 = cy + r * Math.sin(rs);
    const x2 = cx + r * Math.cos(re);
    const y2 = cy + r * Math.sin(re);
    const la = e - s > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${la} 1 ${x2} ${y2}`;
  };

  return (
    <div
      className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: 40, height: 40 }}
      aria-hidden="true"
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0 }}
        aria-label="Elysian Labs logo swirl"
        role="img"
      >
        {SEGMENTS.map((seg) => (
          <path
            key={seg.id}
            d={arc(seg.start, seg.end)}
            stroke={seg.color}
            strokeWidth={sw}
            strokeLinecap="round"
            fill="none"
            style={{ filter: `drop-shadow(0 0 3px ${seg.color}88)` }}
          />
        ))}
      </svg>
      <span
        style={{
          position: "relative",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontStyle: "normal",
          fontSize: "17px",
          color: "#d4f5e9",
          lineHeight: 1,
          userSelect: "none",
          zIndex: 1,
        }}
      >
        E
      </span>
    </div>
  );
}

function NavItem({
  label,
  to,
  active,
  onClick,
}: {
  label: string;
  to: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    // @ts-ignore - route union too wide
    <Link
      to={to as any}
      onClick={onClick}
      className="block"
      data-ocid={`nav.${label.toLowerCase().replace(/ /g, "_")}.link`}
    >
      {() => (
        <motion.span
          className="relative px-3 py-1.5 text-sm font-medium rounded-lg flex items-center gap-0.5 whitespace-nowrap"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: active ? "#50c878" : "rgba(255,255,255,0.70)",
          }}
          whileHover={{ y: -1, color: "#50c878" }}
          transition={{ duration: 0.15 }}
        >
          {label}
          {active && (
            <motion.span
              className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
              style={{
                width: "70%",
                background: "linear-gradient(90deg, #0047ab, #50c878)",
                boxShadow: "0 0 8px rgba(80,200,120,0.8)",
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </motion.span>
      )}
    </Link>
  );
}

export function Navigation() {
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevPath = useRef(pathname);

  if (prevPath.current !== pathname) {
    prevPath.current = pathname;
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

  return (
    <>
      <motion.header
        className="fixed top-4 left-1/2 z-50 w-full max-w-6xl px-4"
        style={{ transform: "translateX(-50%)" }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        data-ocid="nav"
      >
        <div
          className="flex items-center justify-between px-4"
          style={{
            height: 58,
            background: "rgba(16,24,32,0.88)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderTop: "1px solid rgba(255,255,255,0.14)",
            borderRadius: 18,
            boxShadow: scrolled
              ? "0 12px 48px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.06) inset"
              : "0 8px 40px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset",
            transition: "box-shadow 0.3s ease",
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
            data-ocid="nav.logo.link"
          >
            <div className="transition-all duration-200 group-hover:scale-105 group-hover:drop-shadow-[0_0_10px_rgba(80,200,120,0.5)]">
              <ElysianLogo />
            </div>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#ffffff",
                letterSpacing: "-0.3px",
                whiteSpace: "nowrap",
              }}
            >
              Elysian Labs
            </span>
          </Link>

          {/* Desktop links */}
          <nav
            className="hidden xl:flex items-center gap-0"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <NavItem
                key={link.label}
                label={link.label}
                to={link.to}
                active={isActive(link.to)}
              />
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="xl:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.7)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            data-ocid="nav.hamburger.button"
          >
            {mobileOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-ocid="nav.mobile_menu"
          >
            <button
              type="button"
              className="absolute inset-0 w-full h-full cursor-default border-0"
              style={{
                background: "rgba(16,24,32,0.75)",
                backdropFilter: "blur(4px)",
              }}
              onClick={() => setMobileOpen(false)}
              aria-label="Close mobile menu"
            />
            <motion.nav
              className="absolute top-20 left-4 right-4 flex flex-col gap-1 p-4 rounded-2xl"
              style={{
                background: "rgba(16,24,32,0.97)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.10)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              }}
              initial={{ y: -10, opacity: 0, scale: 0.97 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -10, opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((link) => (
                <NavItem
                  key={link.label}
                  label={link.label}
                  to={link.to}
                  active={isActive(link.to)}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navigation;

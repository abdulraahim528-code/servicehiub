"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

// Routes where the footer should be hidden
const HIDDEN_FOOTER_ROUTES = ["/login", "/register", "/providers/become"];

const ConditionalFooter: React.FC = () => {
  const pathname = usePathname();

  const shouldHideFooter = HIDDEN_FOOTER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (shouldHideFooter) return null;

  return <Footer />;
};

export default ConditionalFooter;

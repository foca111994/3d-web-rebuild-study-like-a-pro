import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Analytics is optional; never request an unresolved build-time placeholder.
const analyticsEndpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
const analyticsWebsiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;
if (analyticsEndpoint && analyticsWebsiteId) {
  const script = document.createElement("script");
  script.src = `${analyticsEndpoint.replace(/\/$/, "")}/umami`;
  script.defer = true;
  script.dataset.websiteId = analyticsWebsiteId;
  document.head.appendChild(script);
}

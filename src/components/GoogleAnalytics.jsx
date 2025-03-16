import { useEffect } from "react";

export default function GoogleAnalytics() {
  useEffect(() => {
    const GA_MEASUREMENT_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

    if (!GA_MEASUREMENT_ID) {
      console.warn("Google Analytics Measurement ID is missing you wanker fix it!");
      return;
    }
    else {
      console.log("Google Analytics Measurement ID ready");
    }

    // Ensure dataLayer is available
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }


    // Initialize Google Analytics
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
    console.log("Analytics initialized (I can see you! shhh , but no worries its only me lol)");
  }, []);

  return (
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`}></script>
  );
}

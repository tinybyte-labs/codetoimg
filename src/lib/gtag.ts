export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ID ?? "";

export const logPageView = (url: string) => {
  window.gtag?.("config", GA_TRACKING_ID, {
    page_path: url,
  });
};

export const logEvent = (name: string, params?: any) => {
  window.gtag?.("event", name, params);
};

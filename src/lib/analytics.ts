type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number>;
};

let analyticsEnabled = false;

export function enableAnalytics() {
  analyticsEnabled = true;
}

export function disableAnalytics() {
  analyticsEnabled = false;
}

export function trackEvent(name: string, properties?: Record<string, string | number>) {
  if (!analyticsEnabled) return;

  const safeProperties: Record<string, string | number> = {};
  if (properties) {
    const forbidden = new Set([
      "filename",
      "filepath",
      "bloburl",
      "useragent",
      "content",
    ]);
    for (const [key, value] of Object.entries(properties)) {
      if (!forbidden.has(key.toLowerCase())) {
        safeProperties[key] = value;
      }
    }
  }

  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, safeProperties);
  }
}

export const AnalyticsEvents = {
  TOOL_VIEWED: "tool_viewed",
  FILE_PICKER_OPENED: "file_picker_opened",
  FILES_SELECTED: "files_selected",
  FILES_VALIDATION_COMPLETED: "files_validation_completed",
  PAGE_ADDED: "page_added",
  PAGE_REMOVED: "page_removed",
  PAGE_REORDERED: "page_reordered",
  PAGE_ROTATED: "page_rotated",
  PAGE_SIZE_CHANGED: "page_size_changed",
  ORIENTATION_CHANGED: "orientation_changed",
  FIT_MODE_CHANGED: "fit_mode_changed",
  MARGIN_CHANGED: "margin_changed",
  QUALITY_CHANGED: "quality_changed",
  CONVERSION_STARTED: "conversion_started",
  CONVERSION_CANCELLED: "conversion_cancelled",
  CONVERSION_COMPLETED: "conversion_completed",
  CONVERSION_FAILED: "conversion_failed",
  DOWNLOAD_STARTED: "download_started",
  NEW_PROJECT_STARTED: "new_project_started",
} as const;

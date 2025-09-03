export function openLinkedInPopup(
  authUrl: string
): Promise<{ accessToken: string; memberUrn: string }> {
  return new Promise((resolve, reject) => {
    const width = 600;
    const height = 700;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const popup = window.open(
      authUrl,
      "linkedin-login",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (!popup) {
      reject(new Error("Popup blocked"));
      return;
    }

    // Listen for message from popup
    function receiveMessage(event: MessageEvent) {
      console.log("[LinkedInAuthPopup] Received message from popup:", event);
      // Optionally check event.origin here for security!
      if (event.data.type === "LINKEDIN_AUTH_SUCCESS") {
        console.log("[LinkedInAuthPopup] Auth success:", event.data);
        resolve({
          accessToken: event.data.accessToken,
          memberUrn: event.data.memberUrn,
        });
        window.removeEventListener("message", receiveMessage);
        popup?.close();
      }
      if (event.data.type === "LINKEDIN_AUTH_ERROR") {
        console.error("[LinkedInAuthPopup] Auth error:", event.data.error);
        reject(new Error(event.data.error));
        window.removeEventListener("message", receiveMessage);
        popup?.close();
      }
    }
    window.addEventListener("message", receiveMessage);

    // Detect if popup is closed without login
    const popupInterval = setInterval(() => {
      if (popup.closed) {
        clearInterval(popupInterval);
        window.removeEventListener("message", receiveMessage);
        reject(new Error("Popup closed before authentication"));
      }
    }, 500);
  });
}

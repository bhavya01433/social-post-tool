import React, { useState, useEffect } from "react";
import { openLinkedInPopup } from "../utils/linkedinAuthPopup";

interface ShareToLinkedInButtonProps {
  content: {
    text: string;
    image?: string;
    hashtags?: string[];
  };
}

const ShareToLinkedInButton: React.FC<ShareToLinkedInButtonProps> = ({
  content,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [memberUrn, setMemberUrn] = useState<string | null>(null);

  // Load credentials from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("linkedin_accessToken");
    const storedUrn = localStorage.getItem("linkedin_memberUrn");
    if (storedToken && storedUrn) {
      setToken(storedToken);
      setMemberUrn(storedUrn);
    }
  }, []);

  const handleShare = async () => {
    setIsLoading(true);
    let triedReauth = false;
    try {
      let accessToken = token;
      let urn = memberUrn;

      while (true) {
        // Authenticate if needed
        if (!accessToken || !urn) {
          const authUrl = "/api/auth/linkedin/login";
          try {
            console.log("[ShareToLinkedInButton] Opening LinkedIn popup for auth...");
            const auth = await openLinkedInPopup(authUrl);
            console.log("[ShareToLinkedInButton] Received credentials:", auth);
            accessToken = auth.accessToken;
            urn = auth.memberUrn;
            setToken(accessToken);
            setMemberUrn(urn);
            localStorage.setItem("linkedin_accessToken", accessToken);
            localStorage.setItem("linkedin_memberUrn", urn);
          } catch (err) {
            if (err && typeof err === "object" && "message" in err) {
              alert(
                (err as { message?: string }).message ||
                  "Popup blocked or login failed"
              );
            } else {
              alert("Popup blocked or login failed");
            }
            console.error("[ShareToLinkedInButton] Popup error:", err);
            return;
          }
        }

        // Post to LinkedIn
        console.log("[ShareToLinkedInButton] Posting to backend with:", { accessToken, memberUrn: urn, ...content });
        const res = await fetch("/api/auth/linkedin/publish", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...content,
            accessToken,
            memberUrn: urn,
          }),
        });

        if (res.status === 401 && !triedReauth) {
          // Token invalid, clear and retry once
          console.warn("[ShareToLinkedInButton] 401 received, clearing credentials and retrying...");
          localStorage.removeItem("linkedin_accessToken");
          localStorage.removeItem("linkedin_memberUrn");
          setToken(null);
          setMemberUrn(null);
          accessToken = null;
          urn = null;
          triedReauth = true;
          continue;
        }

        if (!res.ok) {
          const err = await res.json();
          console.error("[ShareToLinkedInButton] Backend error:", err);
          alert(err.error || "Failed to post to LinkedIn");
          return;
        }

        alert("Posted to LinkedIn! 🎉");
        return;
      }
    } catch (error: any) {
      console.error("[ShareToLinkedInButton] Unexpected error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleShare}
      disabled={isLoading}
      className="flex items-center space-x-3 px-5 py-2.5 rounded-full font-bold shadow-md
        bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:from-blue-600 hover:to-blue-800
        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-white border border-blue-600"
    >
      <span>{isLoading ? "Sharing..." : "Share to LinkedIn"}</span>
    </button>
  );
};

export default ShareToLinkedInButton;

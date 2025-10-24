"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, MessageSquare, Clock, Sparkles } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { ChatKit, useChatKit } from "@openai/chatkit-react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "vapi-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "assistant-id"?: string;
        "public-key"?: string;
      };
    }
  }
}

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template:
    | {
        title: string;
        description: string;
        features: string[];
      }
    | null;
}

// -----------------------------
// ChatKit Widget Component
// -----------------------------
function ChatKitWidget() {
  console.log("🧠 [ChatKitWidget] init @", new Date().toISOString());

  // client-only guard + small delay to avoid hydration/race with modal animations
  const [mounted, setMounted] = useState(false);
  const [readyDelayPassed, setReadyDelayPassed] = useState(false);

  // whether we observed client_secret arrival (set by getClientSecret dispatch)
  const clientSecretSeenRef = useRef(false);
  const [clientSecretObserved, setClientSecretObserved] = useState(false);

  // ref to store control for debugging if needed
  const controlRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setReadyDelayPassed(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Fallback: if no event-based client secret observed, allow show after timeout (8s)
  useEffect(() => {
    if (clientSecretObserved) return;
    const fallback = setTimeout(() => {
      if (!clientSecretSeenRef.current) {
        console.warn("⚠️ [ChatKitWidget] client_secret not observed via event before timeout — proceeding anyway.");
        setClientSecretObserved(true);
      }
    }, 8000);
    return () => clearTimeout(fallback);
  }, [clientSecretObserved]);

  // listen for a dispatched event when client secret is received in getClientSecret
  useEffect(() => {
    const handler = () => {
      clientSecretSeenRef.current = true;
      setClientSecretObserved(true);
      console.log("🔔 [ChatKitWidget] client_secret event observed");
    };
    window.addEventListener("chatkit:client_secret_received", handler);
    return () => {
      window.removeEventListener("chatkit:client_secret_received", handler);
    };
  }, []);

  // call the hook (unconditionally; safe within client component)
  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        console.log("🔑 [ChatKitWidget] getClientSecret called. existing:", existing);

        // localStorage guarded
        let userId: string | null = null;
        try {
          userId = localStorage.getItem("chatkit_user_id");
        } catch (e) {
          console.warn("⚠️ [ChatKitWidget] localStorage read failed:", e);
        }

        if (!userId) {
          userId = `user_${Math.random().toString(36).substring(2, 15)}`;
          try {
            localStorage.setItem("chatkit_user_id", userId);
          } catch (e) {
            console.warn("⚠️ [ChatKitWidget] localStorage write failed:", e);
          }
          console.log("🆕 [ChatKitWidget] Generated userId:", userId);
        } else {
          console.log("♻️ [ChatKitWidget] Existing userId:", userId);
        }

        const url = `${window.location.origin}/api/chatkit/session`;
        console.log("🌐 [ChatKitWidget] POST →", url, { userId });

        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const text = await res.text();
        console.log("📡 [ChatKitWidget] Response:", res.status, text);

        if (!res.ok) {
          console.error("❌ [ChatKitWidget] Failed to get client secret:", res.status, text);
          throw new Error(`Failed to get client secret: ${res.status}`);
        }

        let parsed;
        try {
          parsed = JSON.parse(text);
        } catch (e) {
          console.error("❌ [ChatKitWidget] Invalid JSON in /api/chatkit/session response:", e, text);
          throw e;
        }

        const client_secret = parsed?.client_secret ?? parsed?.clientSecret ?? null;
        if (!client_secret) {
          console.error("❌ [ChatKitWidget] No client_secret in response:", parsed);
          throw new Error("No client_secret returned");
        }

        // Dispatch a DOM event so the component can detect the secret arrived
        try {
          window.dispatchEvent(new CustomEvent("chatkit:client_secret_received"));
        } catch (e) {
          console.warn("⚠️ [ChatKitWidget] could not dispatch client secret event:", e);
        }

        console.log("✅ [ChatKitWidget] client_secret length:", String(client_secret).length);
        return client_secret;
      },
    },
  });

  // keep control ref for debugging
  useEffect(() => {
    controlRef.current = control;
    console.log("🎯 [ChatKitWidget] control set:", !!controlRef.current);
  }, [control]);

  // DOM check interval (non-mutating): limited attempts, no setState inside loop
  useEffect(() => {
    if (!mounted) return;
    let attempts = 0;
    const maxAttempts = 12;
    const interval = setInterval(() => {
      attempts++;
      const iframe = document.querySelector('iframe[src*="chat.openai.com"], iframe[src*="chatkit"], iframe[src*="chat.vapi"]');
      const chatkitRoot = document.querySelector("[data-chatkit-root]");
      console.log("🔍 [ChatKitWidget] DOM check:", { iframeFound: !!iframe, chatkitRootFound: !!chatkitRoot, attempt: attempts });

      if (iframe) {
        console.log("✅ [ChatKitWidget] iframe present");
        clearInterval(interval);
        return;
      }

      if (attempts >= maxAttempts) {
        console.warn("⚠️ [ChatKitWidget] iframe not found after max attempts");
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [mounted]);

  const showChatKit = mounted && readyDelayPassed && (clientSecretObserved || clientSecretSeenRef.current);

  return (
    <div
      data-chatkit-root
      className="w-full h-[600px] border border-border rounded-lg overflow-hidden relative"
      style={{ position: "relative", zIndex: 999999 }}
    >
      {!showChatKit ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-sm text-muted-foreground">Loading chat preview…</div>
        </div>
      ) : (
        <div className="h-full w-full">
          <ChatKit control={control} className="h-full w-full" />
        </div>
      )}

      <div style={{ position: "absolute", bottom: 6, right: 8, pointerEvents: "none" }} className="text-xs text-muted-foreground opacity-75">
        debug
      </div>
    </div>
  );
}

// -----------------------------
// Template Preview Modal
// -----------------------------
const TemplatePreviewModal = ({ isOpen, onClose, template }: TemplatePreviewModalProps) => {
  const isVoiceBot =
    template?.title === "Restaurant Reservation Bot" ||
    template?.title === "Professional Services Bot";
  const shouldShowVapiWidget = template?.title === "Restaurant Reservation Bot" || false;
  const shouldShowChatKit = template?.title === "Retail & E-commerce Bot";

  // Vapi script load once (do not remove script — reuse between opens)
  useEffect(() => {
    if (!(isOpen && shouldShowVapiWidget)) return;
    const scriptId = "vapi-widget-script";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
      script.async = true;
      document.body.appendChild(script);
    }

    const initializeVapi = () => {
      try {
        const vapi = new Vapi("992bd5fb-c74c-4955-9371-4ae0b3aec062");
        vapi.start("c72f770b-2c30-4021-a81e-6a4f85f176e9");
        console.log("✅ Vapi initialized");
      } catch (e) {
        console.error("❌ Vapi init failed:", e);
      }
    };

    if ((script as any).dataset?.loaded) {
      initializeVapi();
    } else {
      script.onload = () => {
        (script as any).dataset = (script as any).dataset || {};
        (script as any).dataset.loaded = "true";
        initializeVapi();
      };
    }
  }, [isOpen, shouldShowVapiWidget]);

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{template.title}</DialogTitle>
          <DialogDescription className="text-base">{template.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Demo header */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Try the Live Demo</h3>
                {isVoiceBot ? (
                  <p className="text-sm text-muted-foreground mb-4">
                    This bot supports both <strong>voice</strong> and <strong>text</strong>. Click the phone button to start a voice call, or use the chat window to type your questions.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">
                    This is a <strong>text-only</strong> bot. Use the chat window below to interact with the AI and see it in action.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Key features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">What This Template Includes:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {template.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></span>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Demo Widgets */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{isVoiceBot ? "Live Voice & Chat Demo" : "Live Chat Demo"}</h3>
            {shouldShowVapiWidget ? (
              <div className="relative">
                <vapi-widget assistant-id="c72f770b-2c30-4021-a81e-6a4f85f176e9" public-key="992bd5fb-c74c-4955-9371-4ae0b3aec062" />
              </div>
            ) : shouldShowChatKit ? (
              <ChatKitWidget />
            ) : (
              <div className="flex justify-center">
                <div className="w-[400px] h-[600px] bg-muted/50 border border-border rounded-lg shadow-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Text-only chat widget coming soon.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;

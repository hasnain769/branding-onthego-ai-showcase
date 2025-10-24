"use client";
import React, { useEffect } from "react";
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
  template: {
    title: string;
    description: string;
    features: string[];
  } | null;
}

// -----------------------------
// ChatKit Widget Component
// -----------------------------
function ChatKitWidget() {
  console.log("🧠 [ChatKitWidget] init @", new Date().toISOString());

  const { control } = useChatKit({
    api: {
      async getClientSecret(existing) {
        console.log("🔑 [ChatKitWidget] getClientSecret called:", existing);

        // Persistent user ID
        let userId = localStorage.getItem("chatkit_user_id");
        if (!userId) {
          userId = `user_${Math.random().toString(36).substring(2, 10)}`;
          localStorage.setItem("chatkit_user_id", userId);
          console.log("🆕 [ChatKitWidget] New userId:", userId);
        } else {
          console.log("♻️ [ChatKitWidget] Existing userId:", userId);
        }

        const res = await fetch("/api/chatkit/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        const text = await res.text();
        console.log("📡 [ChatKitWidget] Response:", res.status, text);

        if (!res.ok) throw new Error(`Failed to get client secret: ${res.status}`);

        const { client_secret } = JSON.parse(text);
        console.log("✅ [ChatKitWidget] Client secret received:", client_secret?.length);
        return client_secret;
      },
    },
  });

  useEffect(() => {
    console.log("🎯 [ChatKitWidget] Mounted. control:", control);

    const interval = setInterval(() => {
      const iframe = document.querySelector('iframe[src*="chat.openai.com"], iframe[src*="chatkit"]');
      const chatkitRoot = document.querySelector("[data-chatkit-root]");
      console.log("🔍 [ChatKitWidget] DOM:", {
        iframeFound: !!iframe,
        chatkitRootFound: !!chatkitRoot,
      });
    }, 2500);

    return () => {
      console.log("🧹 [ChatKitWidget] Unmounted.");
      clearInterval(interval);
    };
  }, [control]);

  return (
    <div
      className="w-full h-[600px] border border-border rounded-lg overflow-hidden relative"
      data-chatkit-root
    >
      <ChatKit control={control} className="h-full w-full" />
      <div className="absolute bottom-2 right-2 text-xs text-muted-foreground opacity-50">
        (debug active)
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
  const shouldShowVapiWidget = template?.title === "Restaurant Reservation Bot";
  const shouldShowChatKit = template?.title === "Retail & E-commerce Bot";

  // -----------------------------
  // Load Voice Widget (Vapi)
  // -----------------------------
  useEffect(() => {
    if (isOpen && shouldShowVapiWidget) {
      const scriptId = "vapi-widget-script";
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (!script) {
        script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
        script.async = true;
        document.body.appendChild(script);
      }

      const initializeVapi = () => {
        const vapi = new Vapi("992bd5fb-c74c-4955-9371-4ae0b3aec062");
        vapi.start("c72f770b-2c30-4021-a81e-6a4f85f176e9");
      };

      if (script.dataset.loaded) {
        initializeVapi();
      } else {
        script.onload = () => {
          script.dataset.loaded = "true";
          initializeVapi();
        };
      }

      return () => {
        const vapi = new Vapi("992bd5fb-c74c-4955-9371-4ae0b3aec062");
        vapi.stop();
      };
    }
  }, [isOpen, shouldShowVapiWidget]);

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{template.title}</DialogTitle>
          <DialogDescription className="text-base">
            {template.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Intro */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 border border-primary/20">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Try the Live Demo</h3>
                {isVoiceBot ? (
                  <p className="text-sm text-muted-foreground mb-4">
                    This bot supports both <strong>voice</strong> and <strong>text</strong>. Click the phone button to talk, or use the chat box to type.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mb-4">
                    This is a <strong>text-only</strong> bot. Use the chat below to test it live.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Key Features:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {template.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Widget */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">
              {isVoiceBot ? "Live Voice & Chat Demo" : "Live Chat Demo"}
            </h3>
            {shouldShowVapiWidget ? (
              <div className="relative">
                <vapi-widget
                  assistant-id="c72f770b-2c30-4021-a81e-6a4f85f176e9"
                  public-key="992bd5fb-c74c-4955-9371-4ae0b3aec062"
                ></vapi-widget>
              </div>
            ) : shouldShowChatKit ? (
              <ChatKitWidget />
            ) : (
              <div className="flex justify-center">
                <div className="w-[400px] h-[600px] bg-muted/50 border border-border rounded-lg shadow-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Chat widget coming soon.</p>
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

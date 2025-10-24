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
import Vapi from '@vapi-ai/web';
import { ChatKit, useChatKit } from '@openai/chatkit-react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vapi-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'assistant-id'?: string;
        'public-key'?: string;
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

// ChatKit Component
// ChatKit Component
function ChatKitWidget() {
  // Prevent SSR execution
  if (typeof window === "undefined") {
    console.warn("ChatKitWidget: running in SSR context — skipping render.");
    return null;
  }

  const [initTime] = React.useState(() => Date.now());
  console.groupCollapsed(`🧠 ChatKitWidget init @ ${new Date(initTime).toISOString()}`);

  // Runtime environment info
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Origin:", window.location.origin);

  const { control, status, error } = useChatKit({
    api: {
      async getClientSecret(existing) {
        console.groupCollapsed("🔑 ChatKit.getClientSecret()");
        try {
          if (existing) console.log("Existing client secret detected:", existing);

          // Persistent userId
          let userId: string | null = null;
          try {
            userId = localStorage.getItem("chatkit_user_id");
            if (!userId) {
              userId = `user_${Math.random().toString(36).substring(2, 15)}`;
              localStorage.setItem("chatkit_user_id", userId);
              console.log("Generated new userId:", userId);
            } else {
              console.log("Found existing userId:", userId);
            }
          } catch (e) {
            console.error("localStorage access failed:", e);
          }

          const url = `${window.location.origin}/api/chatkit/session`;
          console.log("POST →", url, "body:", { userId });

          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          });

          console.log("Response status:", res.status);
          const text = await res.text();
          console.log("Raw response text:", text);

          if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);

          let data;
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.error("Failed to parse JSON:", e);
            throw new Error("Invalid JSON in /api/chatkit/session response");
          }

          if (!data?.client_secret) {
            console.error("Missing client_secret in response:", data);
            throw new Error("No client_secret returned");
          }

          console.log("✅ Client secret received:", data.client_secret);
          console.groupEnd();
          return data.client_secret;
        } catch (err) {
          console.error("❌ getClientSecret error:", err);
          console.groupEnd();
          throw err;
        }
      },
    },
  });

  // Track status & errors
  React.useEffect(() => {
    console.log("ChatKitWidget status changed →", status);
  }, [status]);

  React.useEffect(() => {
    if (error) console.error("ChatKitWidget error →", error);
  }, [error]);

  React.useEffect(() => {
    console.log("ChatKitWidget mounted ✅");
    return () => console.log("ChatKitWidget unmounted 🧹");
  }, []);

  console.groupEnd();

  return (
    <div className="w-full h-[600px] border border-border rounded-lg overflow-hidden">
      {error ? (
        <div className="p-4 text-red-500 text-sm">
          Error loading ChatKit widget — check console for details.
        </div>
      ) : (
        <ChatKit control={control} className="h-full w-full" />
      )}
    </div>
  );
}

const TemplatePreviewModal = ({ isOpen, onClose, template }: TemplatePreviewModalProps) => {
  const isVoiceBot = template?.title === "Restaurant Reservation Bot" || template?.title === "Professional Services Bot";
  const shouldShowVapiWidget = template?.title === "Restaurant Reservation Bot" || false;
  const shouldShowChatKit = template?.title === "Retail & E-commerce Bot";

  // Vapi Widget Effect
  useEffect(() => {
    if (isOpen && shouldShowVapiWidget) {
      const scriptId = 'vapi-widget-script';
      let script = document.getElementById(scriptId) as HTMLScriptElement;

      if (!script) {
        script = document.createElement('script');
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
          script.dataset.loaded = 'true';
          initializeVapi();
        };
      }

      return () => {
        const vapi = new Vapi("992bd5fb-c74c-4955-9371-4ae0b3aec062");
        vapi.stop();
        
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      }
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
          {/* Demo Instructions */}
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
            
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className={`flex items-start gap-3 bg-background/50 rounded-lg p-3 ${isVoiceBot ? '' : 'opacity-50'}`}>
                <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Voice Enabled</div>
                  <div className="text-xs text-muted-foreground">Talk naturally with AI</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-background/50 rounded-lg p-3">
                <MessageSquare className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">Smart Responses</div>
                  <div className="text-xs text-muted-foreground">Context-aware answers</div>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-background/50 rounded-lg p-3">
                <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-medium text-sm">24/7 Available</div>
                  <div className="text-xs text-muted-foreground">Always ready to help</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">What This Template Includes:</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {template.features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border"
                >
                  <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2"></span>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Prompts */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Try asking:</h3>
            <div className="space-y-2">
              {template.title.includes("Salon") && (
                <>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg border border-border">
                    "I'd like to book a haircut appointment for next Tuesday"
                  </div>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg border border-border">
                    "What services do you offer and what are your prices?"
                  </div>
                </>
              )}
              {template.title.includes("Retail") && (
                <>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg border border-border">
                    "Do you have this product in stock?"
                  </div>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg border border-border">
                    "What's your return policy?"
                  </div>
                </>
              )}
              {template.title.includes("Real Estate") && (
                <>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg border border-border">
                    "I'm looking for a 3-bedroom house in downtown"
                  </div>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg border border-border">
                    "Can I schedule a property viewing?"
                  </div>
                </>
              )}
              {template.title.includes("Professional Services") && (
                <>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg border border-border">
                    "I need to schedule a consultation with a lawyer."
                  </div>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg border border-border">
                    "What are your billing rates for design services?"
                  </div>
                </>
              )}
              {!template.title.includes("Salon") && !template.title.includes("Retail") && !template.title.includes("Real Estate") && !template.title.includes("Professional Services") && (
                <>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg border border-border">
                    "Tell me more about your services"
                  </div>
                  <div className="text-sm p-3 bg-muted/50 rounded-lg border border-border">
                    "How can you help my business?"
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Live Demo Widgets */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">{isVoiceBot ? "Live Voice & Chat Demo" : "Live Chat Demo"}</h3>
            {shouldShowVapiWidget ? (
              <div className="relative">
                <vapi-widget 
                  assistant-id="c72f770b-2c30-4021-a81e-6a4f85f176e9" 
                  public-key="992bd5fb-c74c-4955-9371-4ae0b3aec062">
                </vapi-widget>
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
import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, MessageSquare, Clock, Sparkles } from "lucide-react";

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: {
    title: string;
    description: string;
    features: string[];
  } | null;
}

const TemplatePreviewModal = ({ isOpen, onClose, template }: TemplatePreviewModalProps) => {
  const shouldShowVapiWidget = template?.title === "Restaurant Reservation Bot";
  const shouldShowFastbotsWidget = template?.title === "Salon & Spa Booking Bot";
  const vapiIframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen && shouldShowVapiWidget && vapiIframeRef.current) {
      // Inject Vapi widget into iframe for Restaurant Reservation Bot
      const iframeDoc = vapiIframeRef.current.contentDocument;
      if (iframeDoc) {
        iframeDoc.open();
        iframeDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <style>
                body { margin: 0; padding: 0; overflow: hidden; }
              </style>
            </head>
            <body>
              <vapi-widget 
                assistant-id="c72f770b-2c30-4021-a81e-6a4f85f176e9" 
                public-key="992bd5fb-c74c-4955-9371-4ae0b3aec062">
              </vapi-widget>
              <script
                src="https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js"
                async
                type="text/javascript">
              </script>
            </body>
          </html>
        `);
        iframeDoc.close();
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
                <p className="text-sm text-muted-foreground mb-4">
                  Click the phone button in the bottom right to start a voice conversation with this AI agent. 
                  Ask questions relevant to {template.title.toLowerCase()} to experience how it works.
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-start gap-3 bg-background/50 rounded-lg p-3">
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
              {!template.title.includes("Salon") && !template.title.includes("Retail") && !template.title.includes("Real Estate") && (
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

          {/* Vapi Widget - Only for Restaurant Reservation Bot */}
          {shouldShowVapiWidget && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Live Voice Demo:</h3>
              <div className="flex justify-center">
                <iframe
                  ref={vapiIframeRef}
                  style={{ width: "100%", height: "100px", border: "none" }}
                  title="Vapi Voice Widget"
                />
              </div>
            </div>
          )}

          {/* Fastbots Chatbot Widget - Only for Salon & Spa Booking Bot */}
          {shouldShowFastbotsWidget && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Live Chat Demo:</h3>
              <div className="flex justify-center">
                <iframe
                  style={{ width: "400px", height: "600px" }}
                  src="https://app.fastbots.ai/embed/cmalkz9s50dlsn8lt1jyxyr83"
                  title="Salon & Spa Booking Chatbot"
                  className="border border-border rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplatePreviewModal;
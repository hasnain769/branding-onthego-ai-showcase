import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Phone, MessageSquare, Clock, Sparkles } from "lucide-react";
import Vapi from '@vapi-ai/web';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vapi-widget': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'assistant-id'?: string;
        'public-key'?: string;
      };
      'openai-chatkit': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        'workflow-id'?: string;
        'client-secret'?: string;
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

const TemplatePreviewModal = ({ isOpen, onClose, template }: TemplatePreviewModalProps) => {
  const isVoiceBot = template?.title === "Restaurant Reservation Bot" || template?.title === "Professional Services Bot";
  const shouldShowVapiWidget = template?.title === "Restaurant Reservation Bot" || false;
  const shouldShowChatKit = template?.title === "Retail & E-commerce Bot";
  
  const chatKitRef = useRef<HTMLElement>(null);
  const [chatKitError, setChatKitError] = useState<string | null>(null);
  const [chatKitLoading, setChatKitLoading] = useState(false);

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

  // ChatKit Widget Effect
  useEffect(() => {
    if (!isOpen || !shouldShowChatKit) {
      return;
    }

    console.log('ChatKit: Starting initialization...');
    setChatKitLoading(true);
    setChatKitError(null);

    const scriptId = 'chatkit-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    let isCleanedUp = false;

    const initializeChatKit = async () => {
      if (isCleanedUp) return;
      
      try {
        console.log('ChatKit: Fetching session...');
        
        // Fetch session from your API
        const response = await fetch('/api/create-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to create session: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('ChatKit: Session created successfully');

        if (isCleanedUp) return;

        // Wait for the element to be available
        const maxAttempts = 20;
        let attempts = 0;
        
        const waitForElement = () => {
          if (isCleanedUp) return;
          
          const chatKitElement = chatKitRef.current as any;
          
          if (chatKitElement && data.client_secret) {
            console.log('ChatKit: Setting client secret...');
            chatKitElement.clientSecret = data.client_secret;

            // Add event listeners
            chatKitElement.addEventListener('chatkit.message', (event: CustomEvent) => {
              console.log('ChatKit message:', event.detail);
            });

            chatKitElement.addEventListener('chatkit.error', (event: CustomEvent) => {
              console.error('ChatKit error:', event.detail);
              setChatKitError('Chat widget error occurred');
            });

            chatKitElement.addEventListener('chatkit.ready', () => {
              console.log('ChatKit: Widget ready!');
              setChatKitLoading(false);
            });

            console.log('ChatKit: Initialized successfully');
            setChatKitLoading(false);
          } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(waitForElement, 100);
          } else {
            console.error('ChatKit: Element not found after max attempts');
            setChatKitError('Failed to initialize chat widget');
            setChatKitLoading(false);
          }
        };

        waitForElement();
      } catch (error) {
        console.error('ChatKit: Initialization error:', error);
        setChatKitError(error instanceof Error ? error.message : 'Failed to initialize chat widget');
        setChatKitLoading(false);
      }
    };

    // Load or use existing script
    if (!script) {
      console.log('ChatKit: Loading script...');
      script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://cdn.platform.openai.com/deployments/chatkit/chatkit.js";
      script.async = true;
      
      script.onerror = () => {
        console.error('ChatKit: Failed to load script');
        setChatKitError('Failed to load chat widget script');
        setChatKitLoading(false);
      };
      
      script.onload = () => {
        console.log('ChatKit: Script loaded');
        script.dataset.loaded = 'true';
        // Give the custom element time to register
        setTimeout(() => initializeChatKit(), 100);
      };
      
      document.head.appendChild(script);
    } else if (script.dataset.loaded === 'true') {
      console.log('ChatKit: Using cached script');
      // Script already loaded
      setTimeout(() => initializeChatKit(), 100);
    } else {
      // Script is loading
      console.log('ChatKit: Waiting for script to load...');
      script.addEventListener('load', () => {
        setTimeout(() => initializeChatKit(), 100);
      });
    }

    return () => {
      isCleanedUp = true;
      console.log('ChatKit: Cleaning up...');
    };
  }, [isOpen, shouldShowChatKit]);

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
              <div className="relative min-h-[600px] flex items-center justify-center border border-border rounded-lg bg-muted/20">
                {chatKitError ? (
                  <div className="text-center p-6">
                    <p className="text-destructive font-semibold mb-2">Error Loading Chat Widget</p>
                    <p className="text-sm text-muted-foreground mb-4">{chatKitError}</p>
                    <p className="text-xs text-muted-foreground">
                      Check console for details. Make sure:
                      <br />• API endpoint exists at /api/create-session
                      <br />• Environment variables are configured
                      <br />• OpenAI API key is valid
                    </p>
                  </div>
                ) : chatKitLoading ? (
                  <div className="text-center p-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-sm text-muted-foreground">Loading chat widget...</p>
                  </div>
                ) : (
                  <openai-chatkit 
                    ref={chatKitRef as any}
                    workflow-id={process.env.NEXT_PUBLIC_CHATKIT_WORKFLOW_ID || ""}
                    style={{
                      width: '100%',
                      height: '600px',
                    }}
                  />
                )}
              </div>
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
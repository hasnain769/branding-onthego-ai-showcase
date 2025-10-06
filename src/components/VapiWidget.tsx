import { useEffect, useRef } from 'react';

const VapiWidget = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const widget = document.createElement('vapi-widget');
      widget.setAttribute('assistant-id', 'e8ffb38b-1e13-41a6-828e-b59b7e8412e9');
      widget.setAttribute('public-key', 'eefca180-1254-4f69-90a4-11b95eb5495b');
      containerRef.current.appendChild(widget);

      return () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    }
  }, []);

  return <div ref={containerRef} />;
};

export default VapiWidget;

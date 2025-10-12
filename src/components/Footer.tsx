import { Link } from "react-router-dom";
import { Linkedin, Twitter, Youtube, Mail } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-auto h-auto p-1 gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Branding</span>
              </div>
              <span className="font-bold text-xl">On the Go</span>
            </div>
            <p className="text-sm text-background/70">
              AI agents & automations that keep your business moving.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-primary transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/case-studies" className="hover:text-primary transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-background/70 mb-4">Get AI insights weekly</p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button variant="hero" size="sm">
                <Mail size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
          <p>© 2025 On the Go. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

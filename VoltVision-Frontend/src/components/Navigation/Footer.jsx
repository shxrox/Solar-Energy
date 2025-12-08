
import { Facebook, Instagram, Linkedin, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-base-200 text-base-content transition-colors duration-300 border-t border-base-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* --- BRAND SECTION --- */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-lime-400 flex justify-center items-center overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-200">
                <img src="/assets/logo/logo.png" alt="VoltVision Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-[Inter] text-xl font-bold tracking-tight">VoltVision</span>
            </Link>
            
            <p className="text-sm text-base-content/70 leading-relaxed max-w-xs">
              Revolutionizing renewable energy management through advanced digital twins and predictive AI insights for a sustainable future.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 ">
              <SocialIcon icon={Twitter} href="#" />
              <SocialIcon icon={Linkedin} href="#" />
              <SocialIcon icon={Instagram} href="#" />
              <SocialIcon icon={Facebook} href="#" />
            </div>
          </div>

          {/* --- SOLUTIONS COLUMN --- */}
          <div>
            <h3 className="font-bold text-lg mb-6 ">Solutions</h3>
            <ul className="space-y-4 text-sm text-base-content/70">
              <FooterLink text="Digital Twin Platform" />
              <FooterLink text="Predictive Analytics" />
              <FooterLink text="Remote Monitoring" />
              <FooterLink text="Performance Optimization" />
              <FooterLink text="Automated Reporting" />
            </ul>
          </div>

          {/* --- CONTACT COLUMN --- */}
          <div>
            <h3 className="font-bold text-lg mb-6 ">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5  shrink-0 mt-0.5" />
                <span className="text-sm text-base-content/70">
                  123 Innovation Drive,<br/>
                  Energy Tech Park,<br/>
                  Colombo 07, Sri Lanka
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5  shrink-0" />
                <a href="tel:+94112345678" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  +94 11 234 5678
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5  shrink-0" />
                <a href="mailto:hello@voltvision.lk" className="text-sm text-base-content/70 hover:text-primary transition-colors">
                  hello@voltvision.lk
                </a>
              </li>
            </ul>
          </div>

          {/* --- NEWSLETTER COLUMN --- */}
          <div>
            <h3 className="font-bold text-lg mb-6 ">Stay Updated</h3>
            <p className="text-sm text-base-content/70 mb-4">
              Subscribe to our newsletter for the latest solar tech updates.
            </p>
            <div className="form-control w-full">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="input input-bordered w-full pr-12 bg-base-100 text-sm focus:border-primary focus:ring-1 focus:ring-primary" 
                />
                <button className="absolute top-0 right-0 rounded-l-none btn btn-primary btn-sm h-full px-3">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* --- BOTTOM BAR --- */}
        <div className="border-t border-base-300 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-base-content/60">
          <p>© {new Date().getFullYear()} VoltVision. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Helper Components
function SocialIcon({ icon: Icon, href }) {
  return (
    <a 
      href={href} 
      className="p-2 rounded-full bg-base-300 hover:bg-primary hover:text-primary-content transition-all duration-300"
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}

function FooterLink({ text }) {
  return (
    <li>
      <a href="#" className="hover:text-primary hover:translate-x-1 transition-all duration-200 inline-block">
        {text}
      </a>
    </li>
  );
}
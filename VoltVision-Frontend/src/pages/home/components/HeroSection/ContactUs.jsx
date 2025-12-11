import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2, Clock, MessageSquare } from "lucide-react";

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      
      {/* --- HEADER SECTION --- */}
      <section className="relative py-20 bg-base-200 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-secondary/5 blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-down">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-base-100 border border-base-300 text-sm font-medium mb-6 shadow-sm">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span>We'd love to hear from you</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Have a question about your solar monitoring? Need enterprise solutions? 
            Our team in Colombo is ready to help.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* --- LEFT COLUMN: CONTACT INFO --- */}
          <div className="space-y-8" data-aos="fade-right" data-aos-delay="200">
            
            <div className="grid gap-6">
              <ContactCard 
                icon={Phone} 
                title="Call Us" 
                content="+94 11 234 5678" 
                sub="Mon-Fri from 8am to 5pm"
                action="tel:+94112345678"
              />
              <ContactCard 
                icon={Mail} 
                title="Email Us" 
                content="hello@voltvision.lk" 
                sub="We'll respond within 24 hours"
                action="mailto:hello@voltvision.lk"
              />
              <ContactCard 
                icon={MapPin} 
                title="Visit Us" 
                content="123 Innovation Drive, Colombo 07" 
                sub="Energy Tech Park, Sri Lanka"
                action="https://maps.google.com"
              />
            </div>

            {/* Map Placeholder */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg border border-base-300 group">
                <img 
                    src="/assets/images/srilanka.jpg" 
                    alt="Colombo Map Location" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 left-4 bg-base-100/90 backdrop-blur px-4 py-2 rounded-lg text-sm font-semibold shadow-sm">
                    📍 VoltVision HQ
                </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: FORM --- */}
          <div className="relative" data-aos="fade-left" data-aos-delay="400">
            <div className="bg-base-100 p-8 rounded-3xl border border-base-200 shadow-2xl relative overflow-hidden">
              
              {/* Success Overlay */}
              {isSubmitted ? (
                <div className="absolute inset-0 bg-base-100 z-20 flex flex-col items-center justify-center text-center p-8 animate-in fade-in zoom-in duration-300">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-base-content/70 mb-8 max-w-xs">
                        Thank you for reaching out. Our team will get back to you shortly.
                    </p>
                    <button 
                        onClick={() => setIsSubmitted(false)}
                        className="btn btn-outline btn-sm"
                    >
                        Send Another Message
                    </button>
                </div>
              ) : null}

              <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                    <div className="form-control">
                        <label className="label text-sm font-medium opacity-70">First Name</label>
                        <input type="text" placeholder="John" className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors" required />
                    </div>
                    <div className="form-control">
                        <label className="label text-sm font-medium opacity-70">Last Name</label>
                        <input type="text" placeholder="Doe" className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors" required />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label text-sm font-medium opacity-70">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="input input-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors" required />
                </div>

                <div className="form-control">
                    <label className="label text-sm font-medium opacity-70">Subject</label>
                    <select className="select select-bordered w-full bg-base-200/50 focus:bg-base-100 transition-colors">
                        <option>General Inquiry</option>
                        <option>Technical Support</option>
                        <option>Sales & Pricing</option>
                        <option>Partnership</option>
                    </select>
                </div>

                <div className="form-control">
                    <textarea className="textarea textarea-bordered h-32 bg-base-200/50 focus:bg-base-100 transition-colors" placeholder="How can we help you?" required></textarea>
                </div>

                <button 
                    type="submit" 
                    className="btn btn-primary w-full text-lg mt-2"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <span className="loading loading-spinner"></span>
                            Sending...
                        </>
                    ) : (
                        <>
                            Send Message
                            <Send className="w-5 h-5 ml-2" />
                        </>
                    )}
                </button>
              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper Card Component
function ContactCard({ icon: Icon, title, content, sub, action }) {
    return (
        <a 
            href={action}
            target="_blank"
            rel="noreferrer"
            className="flex items-start gap-4 p-4 rounded-xl bg-base-100 border border-base-200 shadow-sm hover:shadow-md hover:border-primary/50 hover:-translate-y-1 transition-all duration-300 group"
        >
            <div className="p-3 bg-primary/10 text-primary rounded-lg group-hover:bg-primary group-hover:text-primary-content transition-colors">
                <Icon className="w-6 h-6" />
            </div>
            <div>
                <h3 className="font-bold text-lg text-base-content">{title}</h3>
                <p className="font-medium text-base-content/90">{content}</p>
                <p className="text-sm text-base-content/60 mt-1">{sub}</p>
            </div>
        </a>
    );
}
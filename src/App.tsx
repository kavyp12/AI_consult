import React, { FormEvent, useState } from 'react';
import { ArrowDown, Brain, ChevronRight, FileSearch, LineChart, MessageSquare, Rocket, Users, Check, Star, Zap, Trophy, Target, Shield } from 'lucide-react';

interface FormData {
  personName: string;
  personDesignation: string;
  email: string;
  contactNumber: string;
  companyName: string;
  companyWebsite: string;
  productName: string;
  productWebsite: string;
}

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    
    try {
      const formElement = e.currentTarget;
      const formData: FormData = {
        personName: (formElement.elements.namedItem('personName') as HTMLInputElement).value,
        personDesignation: (formElement.elements.namedItem('personDesignation') as HTMLInputElement).value,
        email: (formElement.elements.namedItem('email') as HTMLInputElement).value,
        contactNumber: (formElement.elements.namedItem('contactNumber') as HTMLInputElement).value,
        companyName: (formElement.elements.namedItem('companyName') as HTMLInputElement).value,
        companyWebsite: (formElement.elements.namedItem('companyWebsite') as HTMLInputElement).value,
        productName: (formElement.elements.namedItem('productName') as HTMLInputElement).value,
        productWebsite: (formElement.elements.namedItem('productWebsite') as HTMLInputElement).value
      };
  
      // Use the correct API URL based on environment
      const apiUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/api/contact'
        : '/api/contact';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setSubmitStatus({
        type: 'success',
        message: 'Thank you! We will contact you soon.'
      });
      formElement.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error submitting form. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50 py-4 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-3xl font-serif text-[#0A2647] tracking-tight">
                enhc
              </span>
            </div>
            <button
              onClick={scrollToContact}
              className="bg-[#0A2647] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-[#0A3157] transition-all duration-300 flex items-center gap-2"
            >
              Get Started
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden py-20 lg:py-0 mt-16">
        {/* AI-themed background with multiple layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A2647] via-[#144272] to-[#205295]"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1676277791608-ac54525aa94d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-screen"></div>
        
        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <p className="text-blue-100 text-lg">AI Transformation Made Simple</p>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Enriching your Product with AI Features 
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Unlock the full potential of your product with cutting-edge AI integration, 
              Get expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <button
                onClick={scrollToContact}
                className="w-full sm:w-auto bg-[#0A2647] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-[#0A3157] transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-[#0A2647]/30"
              >
                Let's make your product AI-Powered
                <ArrowDown className="w-5 h-5" />
              </button>
              {/* <div className="flex items-center gap-3 text-blue-100 px-6 py-2 bg-white/5 rounded-full backdrop-blur-sm">
                <Check className="w-5 h-5" />
                <span className="text-lg">No Credit Card Required</span>
              </div> */}
            </div>
            {/* <div className="mt-16 text-blue-100 backdrop-blur-sm bg-white/5 inline-block px-8 py-6 rounded-2xl">
              <p className="font-medium text-lg mb-2">Founded by</p>
              <p className="text-2xl font-semibold mb-4">Harsh Gajera & kavy</p>
              <div className="flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span>AI Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-400" />
                  <span>Product Strategists</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-[#F8F9FA] to-[#E9ECEF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { number: "20+", label: "Products Enhanced" },
              { number: "95%", label: "Success Rate" },
              { number: "30+", label: "AI Models Integrated" },
              { number: "100%", label: "Client Satisfaction" }
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-white/50 rounded-2xl backdrop-blur-sm">
                <p className="text-4xl font-bold text-[#0A2647] mb-2">{stat.number}</p>
                <p className="text-gray-700 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center">
            <div className="inline-block mb-6 px-6 py-2 bg-[#F8F9FA] rounded-full text-[#0A2647] font-medium text-lg">
  About <span className="font-bold">enhc</span>
</div>

              <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-[#0A2647]">Transforming your Product into AI Powered Product</h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto">
                We provide AI consultancy to help businesses integrate artificial intelligence into their products. 
                Our mission is to democratize AI adoption by making expert guidance accessible to everyone, 
                helping you transform your product into a future ready AI-Capable solution.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {[
                  { icon: Shield, text: "Enterprise-grade AI Solutions" },
                  { icon: Zap, text: "Quick Implementation" },
                  { icon: Star, text: "Industry Best Practices" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 justify-center text-gray-700 bg-[#F8F9FA] p-4 rounded-xl">
                    <item.icon className="w-6 h-6 text-[#0A2647]" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-gradient-to-br from-[#F8F9FA] via-white to-[#E9ECEF]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-2 bg-[#F8F9FA] rounded-full text-[#0A2647] font-medium text-lg">
              Our Process
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-[#0A2647]">How We Transform Your Product</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive approach ensures your product gets the best AI integration possible
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              { 
                icon: FileSearch, 
                title: "Understand Your Product", 
                desc: "Deep dive into your features, market positioning, and user needs",
                details: ["Feature analysis", "Market research", "User journey mapping"]
              },
              { 
                icon: Brain, 
                title: "Detailed Research & Analysis", 
                desc: "Comprehensive AI feasibility study tailored to your product",
                details: ["AI model selection", "Integration assessment", "ROI projection"]
              },
              { 
                icon: Rocket, 
                title: "Enhancement Suggestions", 
                desc: "Identify AI-transformable features and innovative solutions",
                details: ["Feature recommendations", "Implementation roadmap", "Resource planning"]
              },
              { 
                icon: LineChart, 
                title: "Final Report", 
                desc: "Detailed actionable roadmap for AI integration",
                details: ["Step-by-step guide", "Technical specifications", "Success metrics"]
              }
            ].map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="bg-[#F8F9FA] w-20 h-20 rounded-xl flex items-center justify-center mb-8">
                  <step.icon className="w-10 h-10 text-[#0A2647]" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[#0A2647]">{step.title}</h3>
                <p className="text-gray-600 mb-6 text-lg">{step.desc}</p>
                <ul className="space-y-3">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-500">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-2 bg-[#F8F9FA] rounded-full text-[#0A2647] font-medium text-lg">
              Benefits
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-[#0A2647]">What You Get</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive AI transformation package worth thousands, completely free
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                title: "Detailed AI Analysis",
                desc: "In-depth analysis of AI integration possibilities",
                icon: Brain
              },
              {
                title: "Market Research",
                desc: "Comprehensive study of AI trends in your industry",
                icon: Target
              },
              {
                title: "AI Roadmap",
                desc: "Step-by-step implementation guide",
                icon: LineChart
              },
              {
                title: "Expert Consultation",
                desc: "One-on-one session with AI specialists",
                icon: Users
              }
            ].map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-[#F8F9FA] to-white p-8 rounded-2xl border border-[#E9ECEF] hover:shadow-lg transition-all duration-300">
                <div className="bg-white w-16 h-16 rounded-xl shadow-md flex items-center justify-center mb-6">
                  <item.icon className="w-8 h-8 text-[#0A2647]" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-[#0A2647]">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#0A2647] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-2 bg-white/10 rounded-full text-white font-medium text-lg backdrop-blur-sm">
              Why enhc
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Why Choose Us</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Get enterprise-grade AI consultation from industry experts
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              { 
                title: "Deep Expertise", 
                desc: "Years of experience in AI & product strategy",
                features: ["AI/ML specialists", "Product experts", "Industry veterans"]
              },
              { 
                title: "Customized Solutions", 
                desc: "Tailored AI solutions for your specific needs",
                features: ["Personalized approach", "Industry-specific solutions", "Scalable recommendations"]
              },
              { 
                title: "Actionable Results", 
                desc: "Practical, implementable recommendations",
                features: ["Clear roadmap", "Resource planning", "ROI projections"]
              }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-blue-200 text-lg mb-8">{item.desc}</p>
                <ul className="space-y-4">
                  {item.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-blue-100">
                      <Check className="w-6 h-6 text-blue-400 flex-shrink-0" />
                      <span className="text-lg">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
<section className="py-24 bg-gradient-to-br from-white via-[#F8F9FA] to-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-20">
      <div className="inline-block mb-6 px-6 py-2 bg-[#F8F9FA] rounded-full text-[#0A2647] font-medium text-lg">
        Testimonials
      </div>
      <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-[#0A2647]">
        What Our Clients Say
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Join hundreds of satisfied clients who transformed their products with our help
      </p>
    </div>
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      {[
        {
          quote:
            "Learn Stream Campus's integration of AI-powered career guidance, thanks to your consulting, has been transformative.  It's not just a fourth component; it's the key to unlocking our students'futures.",
          author: "Ronie Sheladia",
          role: "CEO",
          company: "Vedcool (Webito Infotech)",
        },
        {
          quote:
            "This AI photoshoot tool has revolutionized our business! It slashed our photoshoot time from weeks to minutes, saving us significant time and money.We're now launching new styles faster than ever before.",
          author: "Smit Hirani",
          role: "Owner",
          company: "Fashion E-commerce",
        },
      ].map((testimonial, index) => (
        <div
          key={index}
          className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <p className="text-gray-600 mb-8 text-lg italic leading-relaxed">
            "{testimonial.quote}"
          </p>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#0A2647] rounded-full flex items-center justify-center text-white text-xl font-bold">
              {testimonial.author[0]}
            </div>
            <div>
              <p className="font-semibold text-xl text-[#0A2647]">
                {testimonial.author}
              </p>
              <p className="text-gray-500">{testimonial.role}</p>
              <p className="text-[#0A2647] font-medium">{testimonial.company}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


      {/* Contact Form */}
      <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block mb-6 px-6 py-2 bg-indigo-50 rounded-full text-indigo-600 font-medium text-lg">
              Get Started
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Transform Your Product Today</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out the form below and get your free AI consultation worth $5,000
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <label className="block text-gray-700 font-medium mb-3">Person Name *</label>
                <input 
                  type="text" 
                  name="personName"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-3">Person Designation *</label>
                <input 
                  type="text" 
                  name="personDesignation"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="Your role"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-3">Email *</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-3">Contact Number *</label>
                <input 
                  type="tel" 
                  name="contactNumber"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="+1 (555) 000-0000"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-3">Company Name *</label>
                <input 
                  type="text" 
                  name="companyName"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="Your company name"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-3">Company Website</label>
                <input 
                  type="url" 
                  name="companyWebsite"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="https://example.com"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-3">Product Name *</label>
                <input 
                  type="text" 
                  name="productName"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="Your product name"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-3">Product Website</label>
                <input 
                  type="url" 
                  name="productWebsite"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all" 
                  placeholder="https://product.com"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {submitStatus.type && (
              <div className={`mt-6 p-4 rounded-xl ${
                submitStatus.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-10 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? 'Submitting...' : 'Get Free Consultation'}
              <Users className="w-6 h-6" />
            </button>
            
            <p className="text-center text-gray-500 mt-6">
              By submitting this form, you agree to our terms and privacy policy
            </p>
          </form>
        </div>
      </div>
    </section>

      {/* Footer */}
      <footer className="bg-[#0A2647] text-gray-300 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-3xl font-serif text-white tracking-tight">
                  enhc
                </span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
              Transforming your Product into AI Powered Product.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact</h3>
              <p className="text-gray-400 text-lg">Email: infoenhc@gmail.com</p>
              <p className="text-gray-400 text-lg">Number:+91 9879985607</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Follow Us</h3>
              <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-lg">LinkedIn</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-lg">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-lg">&copy; 2023 enhc. All rights reserved.</p>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default App;
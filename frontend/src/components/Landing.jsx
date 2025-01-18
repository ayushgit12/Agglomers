import React, { useEffect, useState } from 'react';
import { 
  Eye, 
  AlertTriangle, 
  Blocks, 
  ArrowRight,
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// Counter animation component
const AnimatedCounter = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(target, 10);
      const increment = end / duration * 10;
      const timer = setInterval(() => {
        start = Math.min(start + increment, end);
        setCount(Math.floor(start));
        if (start >= end) clearInterval(timer);
      }, 10);
      return () => clearInterval(timer);
    }
  }, [inView, target, duration]);

  return <span ref={ref}>{count}</span>;
};

// Navbar component

function Landing() {

  
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  return (
    <div className="min-h-screen bg-white w-full">
      
      <Navbar />
      
      {/* Hero Section */}
      <header className="relative h-screen w-full">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="container mx-auto px-6 relative h-full flex items-center">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Making the Web Accessible for Everyone
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Detect and fix accessibility issues in real-time. Ensure your website reaches all users, regardless of their abilities.
            </p>
            <div className="flex gap-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
              >
                Start Free Trial
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50 w-full">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">How We Help</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition" data-aos="fade-up" data-aos-delay="100">
              <Eye className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Visual Accessibility</h3>
              <p className="text-gray-600">
                Detect contrast issues, font sizes, and color combinations that might affect visually impaired users.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition" data-aos="fade-up" data-aos-delay="200">
              <Blocks className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Structure Analysis</h3>
              <p className="text-gray-600">
                Ensure proper heading hierarchy and semantic HTML structure for screen readers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition" data-aos="fade-up" data-aos-delay="300">
              <AlertTriangle className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">Error Detection</h3>
              <p className="text-gray-600">
                Identify WCAG violations and accessibility issues in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-blue-600 text-white w-full">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div data-aos="zoom-in">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter target="1000" />M+
              </div>
              <p className="text-blue-100">Pages Scanned</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="100">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter target="50" />K+
              </div>
              <p className="text-blue-100">Happy Customers</p>
            </div>
            <div data-aos="zoom-in" data-aos-delay="200">
              <div className="text-4xl font-bold mb-2">
                <AnimatedCounter target="99" />.9%
              </div>
              <p className="text-blue-100">Accuracy Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 w-full">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">How It Works</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="w-full h-[400px] relative overflow-hidden rounded-xl shadow-lg"
            >
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" 
                alt="Team working on accessibility" 
                className="absolute  h-full object-cover w-screen"
              />
            </motion.div>
            <div className="space-y-8">
              {[1, 2, 3].map((num, index) => (
                <motion.div
                  key={num}
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{num}</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      {num === 1 ? "Scan Your Website" : 
                       num === 2 ? "Get Detailed Reports" : "Fix Issues"}
                    </h3>
                    <p className="text-gray-600">
                      {num === 1 ? "Simply enter your URL and our advanced algorithms will analyze your entire website." :
                       num === 2 ? "Receive comprehensive reports highlighting accessibility issues and violations." :
                       "Follow our guided solutions to fix accessibility issues and improve your site."}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50 w-full">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16" data-aos="fade-up">What Our Clients Say</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Product Manager",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
                quote: "This tool has transformed how we approach web accessibility. It's now an integral part of our development process."
              },
              {
                name: "Michael Chen",
                role: "Web Developer",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
                quote: "The real-time error detection has saved us countless hours of manual testing. Highly recommended!"
              },
              {
                name: "Emma Davis",
                role: "UX Designer",
                image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
                quote: "Finally, a tool that makes web accessibility testing straightforward and actionable."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-8 rounded-xl shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600">{testimonial.quote}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 w-full">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Ready to Make Your Website Accessible?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of companies that trust us to make their websites accessible to everyone.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition inline-flex items-center gap-2"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 w-full">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">About Us</h3>
              <p className="text-sm">
                We're dedicated to making the web accessible for everyone through innovative technology and expert guidance.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
                <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Newsletter</h3>
              <p className="text-sm mb-4">Stay updated with our latest features and news.</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-gray-800 rounded px-4 py-2 text-sm flex-grow"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-sm text-center">
            © 2024 AccessibilityChecker. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;
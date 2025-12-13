import Plans from "../plan";
import img1 from "../../assets/img1.png";
import { useState, useRef } from "react";

// Import images for features
import secureIcon from "../../assets/icons/secure.svg";
import fastIcon from "../../assets/icons/fast.svg";
import supportIcon from "../../assets/icons/support.svg";
import offersIcon from "../../assets/icons/offers.svg";

function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sliderRef = useRef(null);
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  
  // Feature images with professional descriptions
  const features = [
    { 
      icon: secureIcon, 
      title: "Bank-Grade Security", 
      desc: "256-bit encryption & secure payment gateway",
      color: "from-emerald-500 to-teal-600"
    },
    { 
      icon: fastIcon, 
      title: "Lightning Fast", 
      desc: "Instant activation within 30 seconds",
      color: "from-amber-500 to-orange-600"
    },
    { 
      icon: supportIcon, 
      title: "24/7 Expert Support", 
      desc: "Dedicated customer service team",
      color: "from-slate-700 to-gray-800"
    },
    { 
      icon: offersIcon, 
      title: "Smart Offers", 
      desc: "Personalized deals based on usage",
      color: "from-rose-600 to-pink-700"
    }
  ];

  // Parallax mouse effect
  const handleMouseMove = (e) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      setMousePosition({ x, y });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* HERO SECTION - Keep original colors */}
      <div className="relative overflow-hidden rounded-3xl mx-4 md:mx-8 mt-6 md:mt-8">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
        
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, white 2%, transparent 0%), 
                            radial-gradient(circle at 75px 75px, white 2%, transparent 0%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-12">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <div className="mb-6">
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Power Up
                <span className="block text-transparent bg-clip-text 
                               bg-gradient-to-r from-amber-400 to-orange-400">
                  Redefined
                </span>
              </h1>
            </div>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
              Experience premium mobile recharge services with enterprise-grade security, 
              instant activation, and dedicated 24/7 customer support.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/plans"
                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 
                         text-white font-semibold rounded-3xl overflow-hidden 
                         hover:shadow-2xl transition-all duration-300
                         hover:from-amber-600 hover:to-orange-600"
              >
                <span className="relative z-10">Explore Plans</span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 
                              transform -translate-x-full group-hover:translate-x-0 
                              transition-transform duration-500"></div>
              </a>
              
              <a
                href={isLoggedIn ? "/recharge" : "/login"}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white 
                         font-semibold rounded-3xl border border-white/20 
                         hover:bg-white/20 hover:border-white/40 
                         transition-all duration-300"
              >
                {isLoggedIn ? "Recharge Now" : "Login for Recharge"}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">10M+</div>
                <div className="text-sm text-gray-400">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-gray-400">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>

          
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-orange-900/20 
                            rounded-3xl blur-2xl"></div>
              <img
                src={img1}
                alt="Mobile Recharge Interface"
                className="relative w-full h-auto rounded-2xl shadow-2xl 
                         border-2 border-white/10 backdrop-blur-sm"
              />
              
              
            </div>
          </div>
        </div>
      </div>

     
      <div className="mt-20 px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the difference with our premium services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 shadow-lg 
                       hover:shadow-2xl transition-all duration-300 
                       border border-gray-100 hover:border-gray-200"
            >
              {/* Corner accent */}
              <div className={`absolute top-0 right-0 w-16 h-16 
                             bg-gradient-to-br ${feature.color} 
                             rounded-bl-3xl opacity-10 group-hover:opacity-20 
                             transition-opacity duration-300`}></div>
              
              <div className="relative">
                <div className={`w-14 h-14 mb-5 rounded-xl 
                               bg-gradient-to-br ${feature.color} 
                               flex items-center justify-center shadow-md`}>
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-7 h-7 filter brightness-0 invert"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      

      {/* POPULAR PLANS PREVIEW - Dark theme */}
      <div className="mt-20 px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Recharge Plans
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our most popular plans chosen by customers
          </p>
        </div>

        <div 
          ref={sliderRef}
          onMouseMove={handleMouseMove}
          className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                   rounded-3xl p-8 md:p-12 overflow-hidden cursor-pointer"
        >
          {/* Background pattern with parallax */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              backgroundImage: `radial-gradient(circle at 50% 50%, white 2%, transparent 20%)`,
              backgroundSize: '50px 50px'
            }}
          ></div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: "Daily Data Pack", 
                price: "₹19", 
                data: "1.5GB/day", 
                validity: "1 Day",
                highlight: true
              },
              { 
                name: "Weekly Pack", 
                price: "₹149", 
                data: "2GB/day", 
                validity: "7 Days",
                highlight: false
              },
              { 
                name: "Monthly Pack", 
                price: "₹399", 
                data: "3GB/day", 
                validity: "28 Days",
                highlight: false
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 
                         border ${plan.highlight ? 'border-amber-500/50' : 'border-white/20'}
                         hover:border-amber-500/70 transition-all duration-300 hover:scale-105`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 
                                bg-gradient-to-r from-amber-500 to-orange-500 text-white 
                                px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-white mb-4">
                  {plan.price}
                </div>
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-white/80">
                    <span>Data:</span>
                    <span className="font-semibold">{plan.data}</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Validity:</span>
                    <span className="font-semibold">{plan.validity}</span>
                  </div>
                </div>
                <a
                  href={isLoggedIn ? "/recharge" : "/login"}
                  className={`block w-full py-3 font-semibold rounded-lg text-center
                                 transition-all duration-300
                                 ${plan.highlight 
                                   ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600' 
                                   : 'bg-white text-gray-900 hover:bg-white/90'}`}>
                  {isLoggedIn ? "Buy Now" : "Login for Recharge"}
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="/plans"
              className="inline-block px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 
                       text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 
                       transition-all duration-300"
            >
              View All Plans →
            </a>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS - Original style */}
      <div className="mt-20 px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Customers Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Trusted by millions of satisfied users
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Rahul Sharma",
              role: "Premium User",
              text: "Best recharge service I've used! Instant activation and amazing customer support.",
              rating: 5
            },
            {
              name: "Priya Patel",
              role: "Student User",
              text: "Great plans for students with amazing discounts. Highly recommended!",
              rating: 5
            },
            {
              name: "Amit Kumar",
              role: "Business User",
              text: "Reliable service for all my business connections. Never had any issues.",
              rating: 5
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100
                       hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center 
                              justify-center text-white font-bold
                              ${index === 0 ? 'bg-gradient-to-r from-amber-500 to-orange-500' :
                                index === 1 ? 'bg-gradient-to-r from-emerald-500 to-teal-600' :
                                'bg-gradient-to-r from-slate-700 to-gray-800'}`}>
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
              <div className="flex text-amber-400">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CALL TO ACTION - Dark theme */}
      <div className="mt-20 px-4 md:px-8">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"></div>
          
          <div className="relative p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Experience Premium?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of satisfied customers who trust us for their mobile recharge needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 
                         text-white font-semibold rounded-xl 
                         hover:shadow-xl transition-all duration-300
                         hover:from-amber-600 hover:to-orange-600"
              >
                Get Started Free
              </a>
              <a
                href={isLoggedIn ? "/recharge" : "/login"}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm text-white 
                         font-semibold rounded-xl border border-white/20 
                         hover:bg-white/20 transition-all duration-300"
              >
                {isLoggedIn ? "Recharge Now" : "Login for Recharge"}
              </a>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}

export default Home;
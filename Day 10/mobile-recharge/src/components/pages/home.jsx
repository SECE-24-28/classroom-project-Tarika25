import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Shield, Zap, Headphones, Tag, CheckCircle } from "lucide-react";

// Import slide images - update paths based on your structure
import slide1 from "../../assets/slides/slide1.jpg";
import slide2 from "../../assets/slides/slide2.jpg";
import slide3 from "../../assets/slides/slide3.jpg";
import slide4 from "../../assets/slides/slide4.jpg";
import feature1 from "../../assets/features/feature1.png";
import feature2 from "../../assets/features/feature2.png";
import feature3 from "../../assets/features/feature3.png";
import feature4 from "../../assets/features/feature4.png";

// Import other assets
import secureIcon from "../../assets/icons/secure.svg";
import fastIcon from "../../assets/icons/fast.svg";
import supportIcon from "../../assets/icons/support.svg";
import offersIcon from "../../assets/icons/offers.svg";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const slideInterval = useRef(null);

  const slides = [
    {
      id: 1,
      image: slide1,
      title: "Power Up Redefined",
      subtitle: "Experience premium mobile recharge services",
      description: "Enterprise-grade security, instant activation, and dedicated 24/7 customer support",
      buttonText: "Explore Plans",
      buttonColor: "from-amber-500 to-orange-500",
      bgOverlay: "from-gray-900/80 via-gray-900/60 to-black/70"
    },
    {
      id: 2,
      image: slide2,
      title: "Instant Recharge",
      subtitle: "Lightning fast transactions",
      description: "Get your mobile recharged in less than 30 seconds with our advanced technology",
      buttonText: "Recharge Now",
      buttonColor: "from-emerald-500 to-teal-600",
      bgOverlay: "from-blue-900/80 via-indigo-900/60 to-purple-900/70"
    },
    {
      id: 3,
      image: slide3,
      title: "Secure Payments",
      subtitle: "Bank-level security",
      description: "256-bit encryption ensures your transactions are completely safe and secure",
      buttonText: "Learn More",
      buttonColor: "from-violet-500 to-purple-600",
      bgOverlay: "from-emerald-900/80 via-teal-900/60 to-cyan-900/70"
    },
    {
      id: 4,
      image: slide4,
      title: "Best Offers",
      subtitle: "Exclusive discounts daily",
      description: "Get personalized offers and cashback on every recharge you make",
      buttonText: "View Offers",
      buttonColor: "from-rose-500 to-pink-600",
      bgOverlay: "from-rose-900/80 via-pink-900/60 to-red-900/70"
    }
  ];

  // Features with your PNG images
  const features = [
    {
      image: feature1,
      icon: secureIcon,
      title: "Bank-Grade Security",
      description: "256-bit encryption & secure payment gateway",
      color: "bg-gradient-to-br from-emerald-500 to-teal-600"
    },
    {
      image: feature2,
      icon: fastIcon,
      title: "Lightning Fast",
      description: "Instant activation within 30 seconds",
      color: "bg-gradient-to-br from-amber-500 to-orange-600"
    },
    {
      image: feature3,
      icon: supportIcon,
      title: "24/7 Expert Support",
      description: "Dedicated customer service team",
      color: "bg-gradient-to-br from-blue-500 to-indigo-600"
    },
    {
      image: feature4,
      icon: offersIcon,
      title: "Smart Offers",
      description: "Personalized deals based on usage",
      color: "bg-gradient-to-br from-rose-500 to-pink-600"
    }
  ];

  // Auto slide functionality
  useEffect(() => {
    if (isAutoPlaying) {
      slideInterval.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [currentSlide, isAutoPlaying]);

  // Check login status
  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Popular Plans
  const popularPlans = [
    { name: "Daily Pack", price: "₹19", data: "1.5GB/day", validity: "1 Day", popular: true },
    { name: "Weekly Pack", price: "₹149", data: "2GB/day", validity: "7 Days", popular: false },
    { name: "Monthly Pack", price: "₹399", data: "3GB/day", validity: "28 Days", popular: false },
    { name: "Truly Unlimited", price: "₹599", data: "Unlimited", validity: "28 Days", popular: false }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      
      {/* HERO SLIDER SECTION */}
      <section className="relative h-screen overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)'
              }}
            ></div>
            
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgOverlay}`}></div>
            
            {/* Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-6 lg:px-12">
                <div className="max-w-2xl">
                  <div className="space-y-6">
                    <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight">
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl lg:text-3xl text-amber-300 font-semibold">
                      {slide.subtitle}
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-200">
                      {slide.description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <a
                        href={slide.id === 2 && isLoggedIn ? "/recharge" : "/plans"}
                        className={`group px-8 py-4 bg-gradient-to-r ${slide.buttonColor} text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}
                      >
                        {slide.buttonText}
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a
                        href="/signup"
                        className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                      >
                        Get Started Free
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-amber-400 w-12' 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            ></button>
          ))}
        </div>

       
        
      </section>

      {/* STATS SECTION */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-black -mt-1">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "10M+", label: "Happy Customers" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-lg text-gray-300">{stat.label}</div>
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-500 mt-4 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES SECTION - Using your PNG images */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium services designed for your convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                {/* Feature Image */}
                <div className="h-48 mb-6 overflow-hidden rounded-xl">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                {/* Icon */}
                <div className={`${feature.color} w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <img 
                    src={feature.icon} 
                    alt={feature.title}
                    className="w-6 h-6 filter brightness-0 invert"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-amber-500 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      

      {/* POPULAR PLANS SECTION */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Popular Recharge Plans
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our most popular plans chosen by customers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                  plan.popular 
                    ? 'border-amber-500 shadow-lg shadow-amber-500/20' 
                    : 'border-white/20 hover:border-amber-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-4">
                  {plan.name}
                </h3>
                <div className="text-4xl font-bold text-white mb-6">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-300">/month</span>
                </div>
                <div className="space-y-3 mb-8">
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                    <span>{plan.data}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                    <span>Validity: {plan.validity}</span>
                  </div>
                  <div className="flex items-center text-white/80">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                    <span>Unlimited Calls</span>
                  </div>
                </div>
                <a
                  href={isLoggedIn ? "/recharge" : "/login"}
                  className="block w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg text-center hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                >
                  {isLoggedIn ? "Buy Now" : "Login for Recharge"}
                </a>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/plans"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300"
            >
              View All Plans
              <ChevronRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trusted by millions of satisfied users worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rahul Sharma",
                role: "Premium User",
                text: "Best recharge service I've used! Instant activation and amazing customer support.",
                rating: 5,
                avatar: "RS"
              },
              {
                name: "Priya Patel",
                role: "Student User",
                text: "Great plans for students with amazing discounts. Highly recommended!",
                rating: 5,
                avatar: "PP"
              },
              {
                name: "Amit Kumar",
                role: "Business User",
                text: "Reliable service for all my business connections. Never had any issues.",
                rating: 5,
                avatar: "AK"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex text-amber-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
    </div>
  );
}

export default Home;
import React, { useLayoutEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ReactLenis, useLenis } from "lenis/react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "../components/CircularGallery";
import "./StoryPage.css";

gsap.registerPlugin(ScrollTrigger);

const StoryPage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const textRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Intro Text Animation removed per user request

      // Nike 3D Shoe Floating Animation
      gsap.to(".hero-shoe", {
        y: 400,
        x: 150,
        rotation: -25,
        scale: 1.3,
        ease: "none",
        scrollTrigger: {
          trigger: ".story-hero",
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

      // Scroll triggered image reveal
      gsap.utils.toArray('.reveal-section').forEach(section => {
        gsap.fromTo(
          section.querySelector('.reveal-image'),
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "bottom center",
              scrub: 1
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.12, duration: 1.2, smoothWheel: true }}>
      <div className="story-container" ref={containerRef}>
        
        {/* HERO SECTION */}
        <section 
          className="story-hero"
          style={{
            backgroundImage: `url('https://res.cloudinary.com/dcefror3c/image/upload/v1782031066/ChatGPT_Image_Jun_21_2026_02_07_26_PM_tzgwlg.png')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
        </section>

        {/* PARALLAX SECTIONS */}
        <section className="reveal-section section-dark">
          <div className="reveal-content">
            <h2>Crafted with Precision.</h2>
            <p>Every detail designed to bring you the highest quality products curated for modern living.</p>
          </div>
          <div className="reveal-image-container">
            <img 
              className="reveal-image" 
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop" 
              alt="Premium Headphones" 
            />
          </div>
        </section>

        <section className="reveal-section section-light">
          <div className="reveal-image-container">
            <img 
              className="reveal-image" 
              src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1000&auto=format&fit=crop" 
              alt="Modern Sneakers" 
            />
          </div>
          <div className="reveal-content">
            <h2>Timeless Design.</h2>
            <p>Experience the intersection of aesthetics and functionality in our exclusive collections.</p>
          </div>
        </section>

        {/* CIRCULAR GALLERY SECTION */}
        <section className="gallery-section" style={{ height: '800px', position: 'relative', width: '100%', backgroundColor: '#050505' }}>
          <div style={{ textAlign: 'center', padding: '40px 0', zIndex: 10, position: 'relative' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 900 }}>Featured Collections</h2>
            <p style={{ color: '#aaa' }}>Drag to explore our latest arrivals</p>
          </div>
          <div style={{ height: '600px', width: '100%', position: 'absolute', top: '100px', left: 0 }}>
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.05}
              scrollSpeed={3}
              fontUrl="https://fonts.googleapis.com/css2?family=Outfit:wght@700&display=swap"
              font="bold 30px Outfit"
              items={[
                { image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop", text: "Sneakers" },
                { image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", text: "Red Kicks" },
                { image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop", text: "Headphones" },
                { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop", text: "Smart Watches" },
                { image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=800&auto=format&fit=crop", text: "Cameras" }
              ]}
            />
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="story-cta">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h1>Ready to explore?</h1>
            <p>Step into our world of premium products.</p>
            <button 
              className="enter-store-btn"
              onClick={() => navigate('/home')}
            >
              Enter the Store
            </button>
          </motion.div>
        </section>

      </div>
    </ReactLenis>
  );
};

export default StoryPage;

import React, { useRef } from "react";
import "./App.css";
import Home from "./components/Home.jsx";
import Navbar from "./components/navbar.jsx";
import Gallery from "./components/gallery.jsx";
import Testimonials from "./components/testimonials.jsx";
import Booking from "./components/bookingn.jsx";
import About from "./components/aboutus.jsx";

function App() {
  const sectionRef = useRef(null);
  return (
    <div className=" bg-[#f8f2e9] text-[#4a2a1d]">
      <Navbar />

      <main id="Home" className="relative w-full bg-black">
        <section id="HomeScroll" className="relative h-[500vh]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <Home />
          </div>
        </section>
      </main>
{/*
      <section id="cakes" className=" relative min-h-screen bg-white flex items-center justify-center">
        <FeaturedCakes />
      </section>

      <main id="custom" className="relative w-full bg-black">
        <section ref={sectionRef} className="relative h-[1200vh] bg-[#f8f3ed]">
          <div className="sticky top-0 h-screen overflow-hidden">
            <CustomCake sectionRef={sectionRef} />
          </div>
        </section>
      </main>
      */}

      <section id="gallery" className="min-h-screen bg-white flex items-center justify-center">
        <Gallery />
      </section>

      <section id="feedback" className="min-h-screen bg-white flex items-center justify-center">
        <Testimonials />
      </section>

      <section  className="min-h-screen bg-[#f8f2e9] flex items-center justify-center">
        <Booking />
      </section>

      <section id="about" className="min-h-screen bg-white flex items-center justify-center">
        <About />
      </section>

      <section id="about" className="pb-8 bg-white flex items-center justify-center">
        <p>© {new Date().getFullYear()} Simz Bakery. All rights reserved.</p>
        <p>Made with love, baked with care.</p>
      </section>

    </div>
  );
}

export default App;
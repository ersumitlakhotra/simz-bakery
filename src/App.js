import "./App.css";
import Home from "./components/Home.jsx";
import Navbar from "./components/navbar.jsx";
import Gallery from "./components/gallery.jsx";
import Testimonials from "./components/testimonials.jsx";
import Booking from "./components/bookingn.jsx";
import About from "./components/aboutus.jsx";

function App() {
  return (
    <div className=" bg-[#f8f2e9] text-[#4a2a1d]">
      <Navbar />

      <main id="Home" className="relative w-full bg-black">
        <section id="HomeScroll" className="relative h-[500vh] ">
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

      <div className="relative z-10 flex w-full flex-col items-center justify-center gap-2 bg-white px-4 py-6 text-center text-black">
        <p className="text-sm">
          © {new Date().getFullYear()} Simz Bakery. All rights reserved.
        </p>
      </div>

    </div>
  );
}

export default App;
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="py-25 px-4 text-center ">
      {/* Header background */}
      <div
        className="h-48 w-full bg-cover bg-center flex items-center justify-center "
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1650&q=80')"
        }}
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight bg-black/40 px-4 py-2 rounded-lg">
          TripBot ✈️
        </h1>
      </div>

      {/* Hero text */}
      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
          Discover Your Next Adventure with AI
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Personalized itineraries at your fingertips — powered by AI.
        </p>
      </div>

      <Link to="/create-trip">
        <Button className="mt-8 bg-blue-800 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-900 transition duration-200">
          Get started
        </Button>
      </Link>
    </section>
  );
}

export default Hero;

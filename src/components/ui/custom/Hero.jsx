import React from 'react'
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

function Hero() {
  return (
     <section className=" py-25 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
          Discover Your Next Adventure with AI ✈️
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600">
          Personalized itineraries at your fingertips — powered by AI.
        </p>
      </div>
      <Link to="/create-trip" >
      <Button className="mt-8 bg-blue-800 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-900 transition duration-200">Get started</Button>
     </Link>
    </section>
  )
}

export default Hero
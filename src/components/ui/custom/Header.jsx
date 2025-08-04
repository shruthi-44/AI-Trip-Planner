import React from "react";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="shadow-sm bg-white p-3">
      <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
        {/* Logo / App Name */}
        <h1 className="text-2xl font-bold text-blue-600">TripBot.</h1>

        {/* Auth Button */}
        <Button variant="outline">Sign In</Button>
      </div>
    </header>
  );
}

export default Header;



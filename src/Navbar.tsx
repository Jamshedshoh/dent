import { useState } from "react";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";

// Navbar Component
export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-md py-2 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600 px-2">
          <Link to="/">Dent</Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <button className="md:hidden text-gray-700" onClick={toggleMenu}>
          <Menu className="w-6 h-6" />
        </button>

        <div className="relative w-full max-w mx-auto px-10">
          <div className="absolute inset-y-0 left-0 flex items-center pl-14 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring focus:ring-blue-300 focus:outline-none"
          />
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "hidden" : "hidden"
          } md:flex space-x-6 items-center`}
        >
          <Link to="/" className="text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/shop" className="text-gray-700 hover:text-blue-600">
            Shop
          </Link>
          <Link to="/community" className="text-gray-700 hover:text-blue-600">
            Community
          </Link>
          <Link to="/blog" className="text-gray-700 hover:text-blue-600">
            Blog
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </Link>

          {/* Icon Buttons */}
          <div className="flex space-x-4">
            <button className="text-gray-700 hover:text-blue-600">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              {/* <span className="flex">Sign In / Sign Up</span> */}
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Links */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } bg-white shadow-md absolute left-0 right-0 top-16 p-4`}
      >
        <div className="space-y-4">
          <Link to="/" className="block text-gray-700 hover:text-blue-600">
            Home
          </Link>
          <Link to="/shop" className="block text-gray-700 hover:text-blue-600">
            Shop
          </Link>
          <Link
            to="/community"
            className="block text-gray-700 hover:text-blue-600"
          >
            Community
          </Link>
          <Link to="/blog" className="block text-gray-700 hover:text-blue-600">
            Blog
          </Link>
          <Link
            to="/contact"
            className="block text-gray-700 hover:text-blue-600"
          >
            Contact
          </Link>
          <div className="flex space-x-4 mt-4">
            <button className="text-gray-700 hover:text-blue-600">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-700 hover:text-blue-600">
              <ShoppingCart className="w-5 h-5" />
            </button>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              <User className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

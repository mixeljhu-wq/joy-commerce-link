import { Search, User, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="font-display text-xl font-semibold text-foreground">
              Engraved Moments
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Shop
            </Link>
            <Link
              to="/collections"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Collections
            </Link>
            <Link
              to="/about"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-foreground/80 hover:text-primary transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              to="/search"
              className="p-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              to="/account"
              className="p-2 text-foreground/70 hover:text-primary transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>
            <Link
              to="/cart"
              className="p-2 text-foreground/70 hover:text-primary transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center">
                2
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

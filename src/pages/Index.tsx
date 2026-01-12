import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4">
            Engrave Your <span className="text-gradient">Precious Moments</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Transform your cherished memories into timeless jewelry. Discover our collection of custom engraved pieces.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/search">
              <Button className="btn-gradient px-8 py-6 text-lg flex items-center gap-2">
                <Search className="w-5 h-5" />
                Browse Products
              </Button>
            </Link>
            <Link to="/search">
              <Button variant="outline" className="px-8 py-6 text-lg flex items-center gap-2 border-border hover:bg-secondary">
                View Collection
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
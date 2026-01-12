import { useState } from "react";
import { Search, SlidersHorizontal, Grid3X3, LayoutList, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SearchFilters from "@/components/SearchFilters";
import ActiveFilters from "@/components/ActiveFilters";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Sample product data
const products = [
  {
    id: 1,
    name: "Heart Photo Necklace",
    price: 49.99,
    originalPrice: 89.99,
    image: "https://images.unsplash.com/photo-1761210875101-1273b9ae5600?w=400",
    rating: 4.8,
    reviews: 128,
    isSale: true,
  },
  {
    id: 2,
    name: "Custom Pet Portrait Keychain",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1582309184259-ad7701b34a84?w=400",
    rating: 4.9,
    reviews: 89,
    isNew: true,
  },
  {
    id: 3,
    name: "Couple's Engraved Bracelet",
    price: 69.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1764593820890-25e8ef6f2bc1?w=400",
    rating: 4.7,
    reviews: 56,
    isSale: true,
  },
  {
    id: 4,
    name: "Circle Memory Pendant",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1762505465319-459da2a2cb8a?w=400",
    rating: 4.6,
    reviews: 42,
  },
  {
    id: 5,
    name: "Rose Gold Photo Ring",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400",
    rating: 4.9,
    reviews: 73,
    isNew: true,
  },
  {
    id: 6,
    name: "Sterling Silver Heart Locket",
    price: 64.99,
    originalPrice: 84.99,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400",
    rating: 4.8,
    reviews: 95,
    isSale: true,
  },
  {
    id: 7,
    name: "Family Portrait Keychain Set",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400",
    rating: 4.7,
    reviews: 61,
  },
  {
    id: 8,
    name: "Gold Plated Initial Necklace",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400",
    rating: 4.6,
    reviews: 38,
  },
  {
    id: 9,
    name: "Custom Date Bracelet",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400",
    rating: 4.5,
    reviews: 27,
    isNew: true,
  },
];

const SearchResults = () => {
  const [searchQuery, setSearchQuery] = useState("necklace");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
  };

  const handleClearAll = () => {
    setActiveFilters([]);
    setPriceRange([0, 200]);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const displayedProducts = products.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <a href="/" className="hover:text-primary transition-colors">
                Home
              </a>
              <span>/</span>
              <span className="text-foreground">Search Results</span>
            </nav>

            {/* Search Bar */}
            <div className="relative max-w-2xl mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>

            {/* Results Count */}
            <h1 className="font-display text-2xl lg:text-3xl font-semibold text-foreground mb-2">
              Search Results for "{searchQuery}"
            </h1>
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{products.length}</span> results
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="pb-16 lg:pb-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Filters */}
              <div className="hidden lg:block">
                <SearchFilters
                  activeFilters={activeFilters}
                  onFilterChange={setActiveFilters}
                  priceRange={priceRange}
                  onPriceChange={setPriceRange}
                />
              </div>

              {/* Products Section */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="lg:hidden flex items-center gap-2"
                      >
                        <SlidersHorizontal className="w-4 h-4" />
                        Filters
                        {activeFilters.length > 0 && (
                          <span className="w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                            {activeFilters.length}
                          </span>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-full max-w-sm p-0">
                      <SheetHeader className="p-6 border-b border-border">
                        <SheetTitle className="font-display">Filters</SheetTitle>
                      </SheetHeader>
                      <div className="p-6 overflow-auto max-h-[calc(100vh-80px)]">
                        <SearchFilters
                          activeFilters={activeFilters}
                          onFilterChange={setActiveFilters}
                          priceRange={priceRange}
                          onPriceChange={setPriceRange}
                        />
                      </div>
                    </SheetContent>
                  </Sheet>

                  <div className="flex items-center gap-4 ml-auto">
                    {/* Sort */}
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[180px] bg-card border-border">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* View Toggle */}
                    <div className="hidden sm:flex items-center bg-card border border-border rounded-lg p-1">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "grid"
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Grid3X3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-colors ${
                          viewMode === "list"
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <LayoutList className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                <ActiveFilters
                  filters={activeFilters}
                  priceRange={priceRange}
                  onRemoveFilter={handleRemoveFilter}
                  onClearAll={handleClearAll}
                />

                {/* Products Grid */}
                <div
                  className={`grid gap-6 ${
                    viewMode === "grid"
                      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                      : "grid-cols-1"
                  }`}
                >
                  {displayedProducts.map((product, index) => (
                    <div
                      key={product.id}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <ProductCard {...product} />
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="border-border"
                    >
                      Previous
                    </Button>

                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                          currentPage === i + 1
                            ? "bg-primary text-primary-foreground"
                            : "bg-card border border-border text-foreground hover:bg-secondary"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}

                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="border-border"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;

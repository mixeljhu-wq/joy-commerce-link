import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface FilterSection {
  title: string;
  options: { label: string; count: number }[];
}

const filterSections: FilterSection[] = [
  {
    title: "Category",
    options: [
      { label: "Necklaces", count: 24 },
      { label: "Bracelets", count: 18 },
      { label: "Keychains", count: 12 },
      { label: "Rings", count: 8 },
    ],
  },
  {
    title: "Material",
    options: [
      { label: "Sterling Silver", count: 32 },
      { label: "Gold Plated", count: 20 },
      { label: "Rose Gold", count: 15 },
      { label: "Stainless Steel", count: 10 },
    ],
  },
  {
    title: "Shape",
    options: [
      { label: "Heart", count: 28 },
      { label: "Circle", count: 22 },
      { label: "Square", count: 14 },
      { label: "Oval", count: 10 },
    ],
  },
];

interface SearchFiltersProps {
  activeFilters: string[];
  onFilterChange: (filters: string[]) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
}

const SearchFilters = ({
  activeFilters,
  onFilterChange,
  priceRange,
  onPriceChange,
}: SearchFiltersProps) => {
  const [openSections, setOpenSections] = useState<string[]>(["Category", "Material", "Shape", "Price"]);

  const toggleSection = (title: string) => {
    setOpenSections((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
    );
  };

  const toggleFilter = (filter: string) => {
    onFilterChange(
      activeFilters.includes(filter)
        ? activeFilters.filter((f) => f !== filter)
        : [...activeFilters, filter]
    );
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="bg-card rounded-2xl p-6 shadow-soft sticky top-24">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Filters
          </h3>
          {activeFilters.length > 0 && (
            <button
              onClick={() => onFilterChange([])}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        <div className="space-y-4">
          {filterSections.map((section) => (
            <Collapsible
              key={section.title}
              open={openSections.includes(section.title)}
              onOpenChange={() => toggleSection(section.title)}
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b border-border">
                <span className="font-medium text-foreground">
                  {section.title}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${
                    openSections.includes(section.title) ? "rotate-180" : ""
                  }`}
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-3 pb-2 space-y-3">
                {section.options.map((option) => (
                  <label
                    key={option.label}
                    className="flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={activeFilters.includes(option.label)}
                        onCheckedChange={() => toggleFilter(option.label)}
                        className="border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <span className="text-sm text-foreground/80 group-hover:text-foreground transition-colors">
                        {option.label}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({option.count})
                    </span>
                  </label>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}

          {/* Price Range */}
          <Collapsible
            open={openSections.includes("Price")}
            onOpenChange={() => toggleSection("Price")}
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b border-border">
              <span className="font-medium text-foreground">Price Range</span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${
                  openSections.includes("Price") ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="pt-6 pb-2">
              <Slider
                value={priceRange}
                onValueChange={(value) =>
                  onPriceChange(value as [number, number])
                }
                min={0}
                max={200}
                step={5}
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="px-3 py-1.5 bg-secondary rounded-lg text-foreground">
                  ${priceRange[0]}
                </span>
                <span className="text-muted-foreground">to</span>
                <span className="px-3 py-1.5 bg-secondary rounded-lg text-foreground">
                  ${priceRange[1]}
                </span>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </aside>
  );
};

export default SearchFilters;

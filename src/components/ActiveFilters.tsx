import { X } from "lucide-react";

interface ActiveFiltersProps {
  filters: string[];
  priceRange: [number, number];
  onRemoveFilter: (filter: string) => void;
  onClearAll: () => void;
}

const ActiveFilters = ({
  filters,
  priceRange,
  onRemoveFilter,
  onClearAll,
}: ActiveFiltersProps) => {
  const hasFilters = filters.length > 0 || priceRange[0] > 0 || priceRange[1] < 200;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onRemoveFilter(filter)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary-light rounded-full text-sm text-primary hover:bg-primary hover:text-primary-foreground transition-colors group"
        >
          {filter}
          <X className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
        </button>
      ))}
      
      {(priceRange[0] > 0 || priceRange[1] < 200) && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 rounded-full text-sm text-accent">
          ${priceRange[0]} - ${priceRange[1]}
        </span>
      )}
      
      <button
        onClick={onClearAll}
        className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-2 ml-2"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilters;

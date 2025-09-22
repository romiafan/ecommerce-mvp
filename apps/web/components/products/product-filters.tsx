'use client';

import { useState } from 'react';

import { Button } from '@ecommerce/ui';
import { useQuery } from 'convex/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { api } from '@/convex/_generated/api';

export function ProductFilters() {
  const [showCategories, setShowCategories] = useState(true);
  const [showPriceFilter, setShowPriceFilter] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const categories = useQuery(api.categories.getCategories);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId === selectedCategory ? '' : categoryId);
    // TODO: Implement category filtering
  };

  const handlePriceChange = (field: 'min' | 'max', value: string) => {
    setPriceRange(prev => ({ ...prev, [field]: value }));
    // TODO: Implement price filtering
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    // TODO: Implement clear filters
  };

  if (!categories) {
    return (
      <div className="space-y-6">
        <div className="bg-gray-200 animate-pulse rounded-lg h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="mt-2 text-sm"
        >
          Clear All
        </Button>
      </div>

      {/* Categories Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          Categories
          {showCategories ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showCategories && (
          <div className="mt-3 space-y-2">
            {categories.map(category => (
              <label key={category._id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="category"
                  value={category._id}
                  checked={selectedCategory === category._id}
                  onChange={() => handleCategoryChange(category._id)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="border-b pb-4">
        <button
          onClick={() => setShowPriceFilter(!showPriceFilter)}
          className="flex items-center justify-between w-full text-left font-medium"
        >
          Price Range
          {showPriceFilter ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>

        {showPriceFilter && (
          <div className="mt-3 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Min</label>
                <input
                  type="number"
                  placeholder="$0"
                  value={priceRange.min}
                  onChange={e => handlePriceChange('min', e.target.value)}
                  className="w-full mt-1 px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Max</label>
                <input
                  type="number"
                  placeholder="$1000"
                  value={priceRange.max}
                  onChange={e => handlePriceChange('max', e.target.value)}
                  className="w-full mt-1 px-2 py-1 border rounded text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Featured Products Filter */}
      <div className="border-b pb-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded border-gray-300"
            // TODO: Implement featured filter
          />
          <span className="text-sm">Featured Products Only</span>
        </label>
      </div>
    </div>
  );
}

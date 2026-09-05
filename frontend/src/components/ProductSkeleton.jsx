import React from 'react';

const ProductSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="bg-white rounded-3xl overflow-hidden animate-pulse">
        <div className="aspect-square bg-[#EFE2C9]" />
        <div className="p-4 space-y-2">
          <div className="h-3 w-16 bg-[#EFE2C9] rounded" />
          <div className="h-4 w-3/4 bg-[#EFE2C9] rounded" />
          <div className="h-3 w-full bg-[#EFE2C9] rounded" />
          <div className="h-5 w-14 bg-[#EFE2C9] rounded mt-2" />
        </div>
      </div>
    ))}
  </div>
);

export default ProductSkeleton;

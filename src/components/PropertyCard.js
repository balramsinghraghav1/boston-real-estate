import React from 'react';

// This component displays a single property in the list
function PropertyCard({ property }) {
  // Format price as currency
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <img 
        src={property.imageUrl || 'https://placehold.co/600x400/e2e8f0/64748b?text=No+Image'} 
        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/e2e8f0/64748b?text=No+Image'; }}
        alt="Property" 
        className="h-56 w-full object-cover" 
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900">{formattedPrice}</h3>
        <p className="text-gray-700 mt-1 truncate" title={property.address}>
          {property.address}
        </p>
        <p className="text-gray-600 text-sm mt-2">
          {property.beds} Beds • {property.baths} Baths • {property.sqft.toLocaleString()} sqft
        </p>
        <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-md">
          View Details
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;

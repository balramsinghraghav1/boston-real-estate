import React from 'react';
import { useFirestore } from '../hooks/useFirestore';
import PropertyCard from '../components/PropertyCard';
import Spinner from '../components/Spinner';

function Properties() {
  // Use our real-time hook to get the 'properties' collection
  const { docs: properties, loading, error } = useFirestore('properties');

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Available Properties</h1>
      
      {loading && (
        <div className="flex justify-center mt-16">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
          <p>{error}</p>
        </div>
      )}

      {!loading && properties.length === 0 && (
        <p className="text-gray-600">No properties listed yet. Check back soon!</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}

export default Properties;

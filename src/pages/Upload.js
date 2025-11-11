import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useStorage } from '../hooks/useStorage';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';

function Upload() {
  const [address, setAddress] = useState('');
  const [price, setPrice] = useState('');
  const [sqft, setSqft] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [file, setFile] = useState(null);
  
  const [formError, setFormError] = useState(null);
  const [fileError, setFileError] = useState(null);

  const { uploadFile, loading: uploading, error: uploadError } = useStorage();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(null);
    let selected = e.target.files[0];

    if (!selected) {
      setFileError("Please select a file.");
      return;
    }
    if (!selected.type.includes('image')) {
      setFileError("Selected file must be an image.");
      return;
    }
    if (selected.size > 2 * 1024 * 1024) { // 2MB limit
      setFileError("Image must be less than 2MB.");
      return;
    }

    setFileError(null);
    setFile(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!file) {
      setFileError("Please select an image for the property.");
      return;
    }
    
    // 1. Upload image to Storage
    const downloadURL = await uploadFile(file);
    if (!downloadURL) {
      // Error is already set by the useStorage hook
      return;
    }

    // 2. Add property document to Firestore
    try {
      const propertiesCol = collection(db, 'properties');
      await addDoc(propertiesCol, {
        address: address,
        price: parseInt(price),
        sqft: parseInt(sqft),
        beds: parseInt(beds),
        baths: parseInt(baths),
        imageUrl: downloadURL,
        dealerId: currentUser.uid,
        createdAt: serverTimestamp()
      });
      
      // 3. Reset form and navigate to properties
      navigate('/properties');

    } catch (err) {
      console.error(err);
      setFormError("Failed to save property. Please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Upload New Property</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-8 space-y-4">
        
        {formError && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            <p>{formError}</p>
          </div>
        )}
        
        <div>
          <label htmlFor="upload-address" className="block text-sm font-medium text-gray-700">Address</label>
          <input type="text" id="upload-address" value={address} onChange={(e) => setAddress(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="123 Main St, Boston, MA" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="upload-price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input type="number" id="upload-price" value={price} onChange={(e) => setPrice(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="600000" />
          </div>
          <div>
            <label htmlFor="upload-sqft" className="block text-sm font-medium text-gray-700">Size (sqft)</label>
            <input type="number" id="upload-sqft" value={sqft} onChange={(e) => setSqft(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="2100" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="upload-beds" className="block text-sm font-medium text-gray-700">Beds</label>
            <input type="number" id="upload-beds" value={beds} onChange={(e) => setBeds(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="4" />
          </div>
          <div>
            <label htmlFor="upload-baths" className="block text-sm font-medium text-gray-700">Baths</label>
            <input type="number" id="upload-baths" value={baths} onChange={(e) => setBaths(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="3" />
          </div>
        </div>

        <div>
          <label htmlFor="upload-image" className="block text-sm font-medium text-gray-700">Property Image</label>
          <input type="file" id="upload-image" onChange={handleFileChange} accept="image/*" required className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
          {fileError && <p className="text-xs text-red-600 mt-1">{fileError}</p>}
          {uploadError && <p className="text-xs text-red-600 mt-1">{uploadError}</p>}
        </div>

        <button type="submit" disabled={uploading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300">
          {uploading ? <Spinner small /> : 'Upload Property'}
        </button>
      </form>
    </div>
  );
}

export default Upload;

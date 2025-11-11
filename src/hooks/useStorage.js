import { useState } from 'react';
import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useAuth } from '../context/AuthContext';

// This hook handles file uploads to Firebase Storage
export const useStorage = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const { currentUser } = useAuth();

  const uploadFile = async (file) => {
    if (!file) {
      setError("No file selected.");
      return;
    }
    
    if (!currentUser) {
      setError("You must be logged in to upload a file.");
      return;
    }

    setLoading(true);
    setError(null);
    setUrl(null);

    try {
      // Create a unique file path
      const filePath = `properties/${currentUser.uid}/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, filePath);

      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);

      // Get the public download URL
      const downloadURL = await getDownloadURL(snapshot.ref);

      setUrl(downloadURL);
      setLoading(false);
      return downloadURL;

    } catch (err) {
      console.error(err);
      setError("Failed to upload file.");
      setLoading(false);
      return null;
    }
  };

  return { error, loading, url, uploadFile };
};

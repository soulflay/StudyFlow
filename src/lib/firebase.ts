// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "studyflow-1fb3e.firebaseapp.com",
  projectId: "studyflow-1fb3e",
  storageBucket: "studyflow-1fb3e.firebasestorage.app",
  messagingSenderId: "925868557503",
  appId: "1:925868557503:web:b704f3fc1e77f4b22b720a",
  measurementId: "G-W8QZGXWV6C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);



export async function uploadFileToFirebase(image_url: string, name: string) {
  try {
    // Fetch the image from the DALL·E URL
    const response = await fetch(image_url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // Convert the response into an array buffer
    const buffer = await response.arrayBuffer();
    const file_name = name.replace(" ", "") + Date.now + ".jpeg";

    // Create a reference in Firebase Storage
    const storageRef = ref(storage, file_name);
    // Upload the image buffer to Firebase
    await uploadBytes(storageRef, buffer, {
      contentType: "image/jpeg",
    });

    // Generate and return the Firebase storage URL
    const firebase_url = await getDownloadURL(storageRef);
    return firebase_url;
  } catch (error) {
    console.error("Error uploading file to Firebase:", error);
    throw error;
  }
}

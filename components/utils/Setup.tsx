// 'use client' directive for enabling client-side rendering in Next.js
'use client';

// Importing the custom hook useVerify from the hooks directory
import { useVerify } from '@/hooks';
// Importing the ToastContainer component from react-toastify for displaying toast notifications
import { ToastContainer } from 'react-toastify';
// Importing the CSS for react-toastify
import 'react-toastify/dist/ReactToastify.css';

export default function Setup() {
	// Calling the useVerify hook to verify some state or perform some verification logic on component mount
	useVerify();

	// Returning the ToastContainer component to enable toast notifications in the application
	return <ToastContainer />;
}

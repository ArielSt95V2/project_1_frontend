// Importing necessary hooks and types from React and Next.js
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
// Importing the useRegisterMutation hook from the authApiSlice to handle user registration
import { useRegisterMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

export default function useRegister() {
	const router = useRouter();
	// Destructuring the register mutation hook and loading state
	const [register, { isLoading }] = useRegisterMutation();
    // Local state to handle form data
	const [formData, setFormData] = useState({
		first_name: '',
		last_name: '',
		email: '',
		password: '',
		re_password: '',
	});
    // Destructure the formData to individual parameters
	const { first_name, last_name, email, password, re_password } = formData;
    // onChange handler to update form data in the state
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;

		setFormData({ ...formData, [name]: value });
	};
    // onSubmit handler to handle form submission
	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
        // Register the user with the provided form data
		register({ first_name, last_name, email, password, re_password })
			.unwrap()
			.then(() => {
            // Handle successful registration
				toast.success('Please check email to verify account');
				router.push('/auth/login');
			})
			.catch(() => {
			// Handle registration errors
				toast.error('Failed to register account');
			});
	};

	return {
		first_name,
		last_name,
		email,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
	};
}

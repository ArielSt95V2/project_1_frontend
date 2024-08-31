// 'use client' directive for enabling client-side rendering in Next.js For "LifeSycle Hooke" or "Event Hendeling"
'use client';

import { useRegister } from '@/hooks';
import { Form } from '@/components/forms'

export default function RegisterForm() {
    const {
		first_name,
		last_name,
		email,
		password,
		re_password,
		isLoading,
		onChange,
		onSubmit,
    } = useRegister();

    const config= [
        {
        labelText: 'first_name',
        labelId: 'first_name',
        type: 'text',
        value: first_name,
        required: true
    },
    {
        labelText: 'last_name',
        labelId: 'last_name',
        type: 'text',
        value: last_name,
        required: true
    },
    {
        labelText: 'Email adress',
        labelId: 'email',
        type: 'email',
        value: email,
        required: true
    },
    {
        labelText: 'Password',
        labelId: 'password',
        type: 'password',
        value: password,
        required: true
    },
    {
        labelText: 'Confirm Password',
        labelId: 're_password',
        type: 'password',
        value: re_password,
        required: true
    },
];

    return(
        <Form 
        config={config}
        btnText='Sign Up'
        isLoading={isLoading}
        onChange={onChange}
        onSubmit={onSubmit}
        />
    );
}
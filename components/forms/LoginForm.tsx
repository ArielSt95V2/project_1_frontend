// 'use client' directive for enabling client-side rendering in Next.js For "LifeSycle Hooke" or "Event Hendeling"
'use client';

import { useLogin } from '@/hooks';
import { Form } from '@/components/forms'
import { link } from 'fs';

export default function LoginForm() {
    const {
		email, password, isLoading, onChange, onSubmit,} = useLogin();

    const config= [
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
        required: true,
        link: {
            linkText: 'Forgot password',
            linkUrl: '/password-reset',
        }
    },
];

    return(
        <Form 
        config={config}
        btnText='Login'
        isLoading={isLoading}
        onChange={onChange}
        onSubmit={onSubmit}
        />
    );
}
// src/pages/Login.js
import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <SignIn path="/login" routing="path" signUpUrl="/sign-up" />
        </div>
    );
}

export default Login;

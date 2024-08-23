import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const Login = () => {
    return (
        <div style={styles.container}>
            <div style={styles.box}>
                <h2>Login</h2>
                <SignIn path="/login" routing="path" signUpUrl="/sign-up" />
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    box: {
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
    }
};

export default Login;
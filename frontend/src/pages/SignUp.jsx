import {Container, Stack, TextField, Typography, Button, FormControl} from '@mui/material';

import { useSignup } from '../hooks/useSignup';

import { useState } from "react";

function SignUp() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await signup(email, password)
    }

    return ( 
        <FormControl sx={{width: '100%', mt: '70px'}}>
            <Typography variant='h4' mb={2}>Sign Up</Typography>
            <TextField 
                label='Email' 
                variant='outlined' 
                color='secondary' 
                required 
                onChange={(e)=> setEmail(e.target.value)} 
                value={email}
            ></TextField>

            <TextField 
                label='Password' 
                variant='outlined' 
                color='secondary'
                required
                multiline 
                onChange={(e)=> setPassword(e.target.value)} 
                value={password}
            ></TextField>

            <Button onClick={handleSubmit} disabled={isLoading}>Signup</Button>
            {error && <div>{error}</div>}
        </FormControl>
    );
}

export default SignUp;
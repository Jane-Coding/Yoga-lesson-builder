import {Container, Stack, TextField, Typography, Button, FormControl} from '@mui/material';

import { useLogin } from '../hooks/useLogin';

import { useState } from "react";

function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await login(email, password)
    }

    return ( 
        <FormControl sx={{width: '100%', mt: '70px'}}>
            <Typography variant='h4' mb={2}>Log In</Typography>
            <TextField 
                label='Login' 
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

            <Button onClick={handleSubmit} disabled={isLoading}>Login</Button>
            {error && <div>{error}</div>}
        </FormControl>
    );
}

export default Login;
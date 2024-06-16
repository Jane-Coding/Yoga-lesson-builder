import {TextField, Typography, Button, FormControl} from '@mui/material';

import { useLogin } from '../hooks/useLogin';

import { useState } from "react";

function Login() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const { login, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await login(email, password)
    }

    return ( 
        <FormControl sx={{width: '100%', mt: '70px'}}>
            <Typography variant='h5' mb={2}>Log In to see your lessons</Typography>
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

            <Button onClick={handleSubmit} disabled={isLoading} color='secondary'>Log In</Button>
        </FormControl>
    );
}

export default Login;
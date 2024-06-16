import { TextField, Typography, Button, FormControl } from '@mui/material';

import { useSignup } from '../hooks/useSignup';

import { useState } from "react";

function Signup() {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    
    const { signup, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        await signup(email, password)
    }

    return ( 
        <FormControl sx={{width: '100%', mt: '70px'}}>
            <Typography variant='h5' mb={2}>Create new account</Typography>
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

            <Button onClick={handleSubmit} disabled={isLoading} color='secondary'>Create account</Button>
        </FormControl>
    );
}

export default Signup;
import {
    TextField,
    Typography,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { defaultStyle, focusedStyle, focusedWithPasswordStyle } from './styles'

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


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [isFocused, setIsFocused] = useState(false)

    const handleOnFocus = () => { 
        if(!password){
            setIsFocused(!isFocused)
        }
        else {
            setIsFocused(true)
        }
    }; 

    return ( 
        <>
            <Typography variant='h5' mb={2}>Create new account</Typography>
            <FormControl sx={{width: '100%', mt: '70px'}} variant='outlined'>
                <TextField 
                    sx={{marginBottom: '20px'}}
                    label='Email' 
                    color='secondary' 
                    required 
                    onChange={(e)=> setEmail(e.target.value)} 
                    value={email}
                ></TextField>

                <InputLabel 
                    htmlFor="password"
                    sx={ 
                        !password && !isFocused ? defaultStyle 
                            : !password && isFocused ? focusedStyle
                            : focusedWithPasswordStyle
                    }
                >Password *</InputLabel>

                <OutlinedInput
                    onFocus={handleOnFocus}
                    onBlur={handleOnFocus}
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    color='secondary'
                    required
                    sx={{marginBottom: '20px'}}
                    onChange={(e)=> setPassword(e.target.value)} 
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }                    
                />

                <Button onClick={handleSubmit} disabled={isLoading} color='secondary' variant='contained'>Create account</Button>
            </FormControl>
        </>
    );
}

export default Signup;
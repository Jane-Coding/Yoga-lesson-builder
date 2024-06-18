import {Container, Stack, TextField, Typography, Button, FormControl} from '@mui/material';
import SimpleSlider from "../components/SimpleSlider";

import { useCreateLessonContext } from '../hooks/useCreateLessonContext';
import { useLessonsContext } from '../hooks/useLessonsContext';
import { useNotificationContext } from '../hooks/useNotificationContext';
import { useAuthContext } from '../hooks/useAuthContext';

import { useState } from 'react';

function LessonForm() {
    const { list, dispatch: dispatchList } = useCreateLessonContext()
    const { dispatch } = useLessonsContext()
    const { openNotification } = useNotificationContext()
    const { user } = useAuthContext()

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ error, setError ] = useState([])
    const [ emptyFields, setEmptyFields ] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user){
            setError('You must be logged in')
            return 
        }
        
        const lesson = {title, description, poses: list}

        const response = await fetch('http://localhost:8085/api/lessons', {
            method: 'POST',
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
            openNotification({type: 'ERROR', message: json.error})
        }
        
        if(response.ok){
            setEmptyFields([])
            setError([])
            setTitle('')
            setDescription('')
            dispatch({type: 'CREATE_LESSON', payload: json})
            dispatchList({type: 'RESET', payload: []})
            openNotification({type: 'CREATE'})
        }
    }

    return ( 
        <Container sx={{mt: '70px'}}>
            <FormControl sx={{width: '100%'}}>
                <Typography variant='h4' mb={2}>Create new lesson</Typography>
                <Stack spacing={3} pb={3}>

                    <TextField 
                        label='Title of the lesson' 
                        variant='outlined' 
                        color='secondary' 
                        required 
                        onChange={(e)=> setTitle(e.target.value)} 
                        value={title}
                        error={emptyFields.includes('title')}
                    ></TextField>

                    <TextField 
                        label='Description of the lesson' 
                        variant='outlined' 
                        color='secondary'
                        required
                        multiline 
                        onChange={(e)=> setDescription(e.target.value)} 
                        value={description}
                        error={emptyFields.includes('description')}
                    ></TextField>

                </Stack>

                <Typography 
                    sx={{
                    fontWeight: 'bold',
                    color: emptyFields.includes('poses') ? 'red' : 'black',
                    marginBottom: 1
                    }}
                >Chosen asanas for this lesson: {list.length}</Typography>

                {list.length === 0 
                    ? 
                    <Typography sx={{height: '300px'}}>No chosen asanas</Typography> 
                    : 
                    <SimpleSlider list={list}/>
                }
                <Button onClick={handleSubmit} color='secondary' variant='outlined' sx={{alignSelf: 'center', m: 3}}>Create new lesson</Button>
            </FormControl>
        </Container>
     );
}

export default LessonForm;
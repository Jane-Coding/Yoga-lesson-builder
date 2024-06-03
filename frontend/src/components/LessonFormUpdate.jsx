import React from 'react';

import {Container, Stack, TextField, Typography, Button, FormControl} from '@mui/material';
import SimpleSlider from "../components/SimpleSlider";

import { useCreateLessonContext } from '../hooks/useCreateLessonContext';
import { useLessonsContext } from '../hooks/useLessonsContext';
import { useState } from 'react';

function LessonFormUpdate({id}) {
    let { list, dispatch: dispatchList } = useCreateLessonContext()
    const { dispatch } = useLessonsContext()

    const [ lesson, setLesson ] = useState()

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ error, setError ] = useState([])
    const [ emptyFields, setEmptyFields ] = useState([])

    React.useEffect(()=> {
        const getLesson = async() => {
        const response = await fetch(`http://localhost:8085/api/lessons/${id}`)
        const lesson = await response.json()

            if(!response.ok){
                setError(lesson.error)
            }
          
            if(response.ok){
                setLesson(lesson)
                setTitle(lesson.title)
                setDescription(lesson.description)
                
                dispatchList({type: 'SET_ASANAS', payload: lesson.poses})
            }            
        }
    
        getLesson()
    
      }, [dispatch, dispatchList, id])

    const handleUpdate = async () => {
        const updatedLesson = {...lesson, title, description, poses: list }        

        const response = await fetch(`http://localhost:8085/api/lessons/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedLesson),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if(!response.ok){
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        
        if(response.ok){
            setEmptyFields([])
            dispatch({type: 'UPDATE_LESSON', payload: json})
        }
    }

    return ( 
        <Container sx={{mt: '70px'}}>
            <FormControl sx={{width: '100%'}}>
                <Typography variant='h4' mb={2}>Update lesson</Typography>
                <Stack spacing={3}>

                    <TextField
                        label={'Title of the lesson'}
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
                    color: emptyFields.includes('poses') ? 'red' : 'black'                    
                    }}
                >Chosen asanas for this lesson: {list.length}</Typography>

                {list.length === 0 
                    ? 
                    <Typography sx={{height: '300px'}}>No chosen asanas</Typography> 
                    : 
                    <SimpleSlider list={list}/>
                }
                <Button onClick={handleUpdate}>Submit the lesson</Button>
            </FormControl>
        </Container>
     );
}

export default LessonFormUpdate;
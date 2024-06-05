import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import LessonCard from '../components/LessonCard';
import Notification from '../components/Notification';

import { useEffect } from 'react';

import { useLessonsContext } from '../hooks/useLessonsContext';

function HomePage() {
    const {lessons, dispatch} = useLessonsContext()

    useEffect(() => {
        const getLessonsList = async () => {
            const response = await fetch('http://localhost:8085/api/lessons')
            const lessonsList = await response.json()

            if(response.ok){
                dispatch({type: 'SET_LESSONS', payload: lessonsList})
            }
        }

        getLessonsList()

    }, [dispatch])

    return (
        <Container maxWidth="sm" sx={{mt: "80px", mb: "60px"}}>
            <Stack spacing={3}>            
                <Typography variant="h4">
                    Created sessions
                </Typography>

                {lessons && lessons.map(lesson => 
                    <LessonCard key={lesson._id} lesson={lesson}></LessonCard>
                )}

                <Typography variant="h4">
                    Default sessions
                </Typography>

            </Stack>
            <Notification />
        </Container>      
    );
}

export default HomePage;
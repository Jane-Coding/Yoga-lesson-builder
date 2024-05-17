import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Navbar from '../components/Navbar';
import SessionCard from '../components/LessonCard';

import { useEffect, useState } from 'react';


function HomePage() {
    const [lessons, setLessons] = useState([])

    useEffect(() => {

        const getLessonsList = async () => {
            const response = await fetch('http://localhost:8085/api/lessons')
            const lessonsList = await response.json()

            if(response.ok){
                setLessons(lessonsList)
            }
        }

        getLessonsList()

    }, [])

    return ( 
        <>
        <Navbar/>
        <Container maxWidth="sm" sx={{mt: "80px", mb: "60px"}}>
            <Stack spacing={3}>            
                <Typography variant="h4">
                    Created sessions
                </Typography>

                {lessons && lessons.map(lesson => 
                    <SessionCard key={lesson._id} lesson={lesson}></SessionCard>
                )}

                <Typography variant="h4">
                    Default sessions
                </Typography>

                {/* {lessonDefault.map(el => {
                    return <SessionCard session={el}/>
                })} */}
            </Stack>
        </Container>
        </>           
     );
}

export default HomePage;
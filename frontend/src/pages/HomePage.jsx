import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Navbar from '../components/Navbar';
import SessionCard from '../components/SessionCard';

import { useEffect, useState } from 'react';


function HomePage() {
    const [lesson, setLesson] = useState([])
    const [lessonDefault, setLessonDefault] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/userSessions')
        .then(res => res.json())
        .then(data => setLesson(data)),

        fetch('http://localhost:8085/defaultSessions')
        .then(res2 => res2.json())
        .then(data => setLessonDefault(data))

    }, [])

    return ( 
        <>
        <Navbar/>
        <Container maxWidth="sm" sx={{mt: "80px", mb: "60px"}}>
            <Stack spacing={3}>            
                <Typography variant="h4">
                    Created sessions
                </Typography>
                
                {lesson.map(el => {
                    return <SessionCard session={el}/>
                })}                   
                

                <Typography variant="h4">
                    Default sessions
                </Typography>

                {lessonDefault.map(el => {
                    return <SessionCard session={el}/>
                })}
            </Stack>
        </Container>
        </>           
     );
}

export default HomePage;
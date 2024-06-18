import { Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import LessonCard from '../components/LessonCard';
import Notification from '../components/Notification';
import Login from '../components/Login';
import Signup from '../components/Signup';

import { useEffect, useState } from 'react';

import { useLessonsContext } from '../hooks/useLessonsContext';
import { useAuthContext } from '../hooks/useAuthContext';

function HomePage() {
    const {lessons, dispatch} = useLessonsContext()
    const { user } = useAuthContext()

    const [ newUser, setNewUser ] = useState(true)

    useEffect(() => {
        const getLessonsList = async () => {
            const response = await fetch('http://localhost:8085/api/lessons', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const lessonsList = await response.json()

            if(response.ok){
                dispatch({type: 'SET_LESSONS', payload: lessonsList})
            }
        }

        if(user){
            getLessonsList()
        }

    }, [dispatch, user])

    const login = (event, update) => {
        setNewUser(update)
    }

    return (
        <Container maxWidth="sm" sx={{mt: "80px", mb: "60px"}}>
            <Stack spacing={3}>

                {!user && 
                    <ToggleButtonGroup
                        sx={{display: 'flex', justifyContent: 'center'}}
                        color='secondary'
                        value={newUser}
                        exclusive
                        onChange={login}
                        size='large'
                    >
                        <ToggleButton value={true}>Sign up</ToggleButton>
                        <ToggleButton value={false}>Log in</ToggleButton>
                    </ToggleButtonGroup>
                }

                {(!user && newUser) && <Signup />}
                {(!user && !newUser) && <Login />}

                {user && <>
                    <Typography>Welcome back <Typography component='span' color='secondary' fontWeight={500}>{user.email}</Typography></Typography>
                    <Typography variant="h4">Your created lessons</Typography>
                    </>
                }

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
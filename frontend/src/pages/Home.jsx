import { Typography, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import LessonCard from '../components/LessonCard';
import Notification from '../components/Notification';
import Login from '../components/Login';
import Signup from '../components/Signup';
import DefaultLessonCard from '../components/DefaultLessonCard';

import defaultLessons from '../db/defaultLessons';

import { useEffect, useState } from 'react';

import { useLessonsContext } from '../hooks/useLessonsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import { v4 as uuidv4 } from 'uuid';

function Home() {
    const {lessons, dispatch} = useLessonsContext()
    const { user } = useAuthContext()

    const [ newUser, setNewUser ] = useState(true)

    useEffect(() => {
        const getLessonsList = async () => {
            const response = await fetch(import.meta.env.VITE_SERVER_URL + '/api/lessons', {
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
                        aria-label="toggle buttons group"
                    >
                        <ToggleButton 
                            value={true}
                            aria-label="choose sign up"
                        >Sign up</ToggleButton>

                        <ToggleButton 
                            value={false} 
                            aria-label="choose login option"
                        >Log in</ToggleButton>
                    </ToggleButtonGroup>
                }

                {(!user && newUser) && <Signup />}
                {(!user && !newUser) && <Login />}

                {user &&
                    <Typography>Welcome back <Typography component='span' color='secondary' fontWeight={500}>{user.email}</Typography></Typography>
                }

                {user && lessons.length === 0 && 
                    <Typography>Please create your first lesson or try default lessons provided below</Typography>
                }

                {user && lessons.length !== 0 &&
                    <>
                    <Typography variant="h4">Your created lessons</Typography>
                    {lessons.map(lesson => 
                        <LessonCard key={lesson._id} lesson={lesson}></LessonCard>
                    )}
                    </>
                }

                <Typography variant="h4">
                    Default lessons
                </Typography>

                {defaultLessons.map(lesson => <DefaultLessonCard key={uuidv4()} lesson={lesson}/>)}

            </Stack>
            <Notification />
        </Container>      
    );
}

export default Home;
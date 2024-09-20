import { Typography } from '@mui/material';
import LessonCard from './LessonCard';

import { useEffect, useState } from 'react';

function UserLessons({user, lessons}) {
    const [ noLessons, setNoLessons ] = useState(true)

    useEffect(() => {
        if(lessons.length !== 0 ){
            setNoLessons(false)
        }else{
            setNoLessons(true)
        }

    }, [lessons])

    return ( 
        <>
        <Typography>Welcome back <Typography component='span' color='secondary' fontWeight={500}>{user.email}</Typography></Typography>

        {!noLessons &&
            <>
                <Typography variant="h4">Your created lessons</Typography>

                {lessons.map(lesson => 
                    <LessonCard key={lesson._id} lesson={lesson}></LessonCard>
                )}
            </>
        }

        {noLessons && 
            <Typography>Please create your first lesson or try default lessons provided below</Typography>
        }        
        </>
    );
}

export default UserLessons;
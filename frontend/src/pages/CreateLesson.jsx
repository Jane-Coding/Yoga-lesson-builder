import { Container, Typography, Grid } from '@mui/material';

import LessonFormCreate from '../components/LessonFormCreate';
import AsanaCard from '../components/AsanaCard';
import LessonFormUpdate from '../components/LessonFormUpdate';
import Notification from '../components/Notification';

import asanasDb from '../db/asanasDb.json';

import { CreateLessonContextProvider } from '../context/CreateLessonContext';

import { v4 as uuidv4 } from 'uuid';

import { useParams } from 'react-router-dom';

function CreateLesson (){
    const { id } = useParams()

    return (
        <CreateLessonContextProvider>
            {id ? <LessonFormUpdate id={id}/> : <LessonFormCreate />}
            <Container>
                <Typography sx={{fontWeight: 'bold'}}>Please choose from the list of available poses:</Typography>
                <Grid container rowGap={2} columnGap={2} mt={1} sx={{justifyContent: 'center', mt: 3, mb: 3}}>
                    {asanasDb.poses.map(el => 
                        <Grid key={uuidv4()}>
                            <AsanaCard link={el} type={'ADD'} />                    
                        </Grid>
                    )}
                </Grid>
                <Notification />
            </Container>
        </CreateLessonContextProvider>
    )
}

export default CreateLesson;
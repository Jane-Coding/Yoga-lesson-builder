import { Container, Typography, Grid } from '@mui/material';

import LessonForm from '../components/LessonForm';
import AsanaCard from '../components/AsanaCard';

import asanasDb from '../db/asanasDb.json';

import { CreateLessonContextProvider } from '../context/CreateLessonContext';

import { v4 as uuidv4 } from 'uuid';

function CreateLessonPage (){

    return (
        <CreateLessonContextProvider>
            <LessonForm/>
            
            <Container>
                <Typography sx={{fontWeight: 'bold'}}>Please choose from the list of available poses:</Typography>
                <Grid container rowGap={2} columnGap={2} mt={1} sx={{justifyContent: 'center', mt: '30px'}}>
                    {asanasDb.poses.map(el => 
                        <Grid key={uuidv4()}>
                            <AsanaCard link={el} type={'ADD'} />                    
                        </Grid>
                    )}
                </Grid>
            </Container>
        </CreateLessonContextProvider>
    )
}

export default CreateLessonPage;
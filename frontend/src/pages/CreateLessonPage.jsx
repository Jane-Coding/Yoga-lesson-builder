import Box from '@mui/material/Box';
import {Container, Stack, TextField, Typography, Grid} from '@mui/material';

import Navbar from '../components/Navbar';
import AsanaCard from '../components/AsanaCard';

import asanasDb from '../db/asanasDb.json';

import { useCreateLessonContext } from '../hooks/useCreateLessonContext';

import SimpleSlider from "../components/SimpleSlider";

function CreateLessonPage (){
    
const {list} = useCreateLessonContext()

    return (
        <>
        <Navbar/>
        <Container sx={{mt: '70px'}}>
        <Typography variant='h4' mb={2}>Create new lesson</Typography>
        <Stack spacing={3}>
            <TextField label='Title of the lesson' variant='outlined' color='secondary' required></TextField>
            <TextField label='Description of the lesson' variant='outlined' color='secondary' multiline></TextField>
        </Stack>

        <Typography sx={{fontWeight: 'bold'}}>Chosen asanas for this lesson: {list.length}</Typography>

        {list.length === 0 ? 
            <Typography sx={{height: '300px'}}>No chosen asanas</Typography> 
            : 
            <SimpleSlider list={list}/>
        }        

        <Box>
            <Typography sx={{fontWeight: 'bold'}}>Please choose from the list of available poses:</Typography>
            <Grid container rowGap={2} columnGap={2} mt={1} sx={{justifyContent: 'center'}}>
                {asanasDb.asanas.map(el => 
                <Grid>
                    <AsanaCard link={el} type={'ADD'}/>
                </Grid>                
                )}

            </Grid>
        </Box>
        </Container>
        </>
    )
}

export default CreateLessonPage;
import {Container, Stack, TextField, Typography} from '@mui/material';
import SimpleSlider from "../components/SimpleSlider";

import { useCreateLessonContext } from '../hooks/useCreateLessonContext';

function LessonForm() {
    const {list} = useCreateLessonContext()

    return ( 
        <Container sx={{mt: '70px'}}>
            <Typography variant='h4' mb={2}>Create new lesson</Typography>
            <Stack spacing={3}>
                <TextField label='Title of the lesson' variant='outlined' color='secondary' required></TextField>
                <TextField label='Description of the lesson' variant='outlined' color='secondary' multiline></TextField>
            </Stack>

            <Typography sx={{fontWeight: 'bold'}}>Chosen asanas for this lesson: {list.length}</Typography>

            {list.length === 0 
                ? 
                <Typography sx={{height: '300px'}}>No chosen asanas</Typography> 
                : 
                <SimpleSlider list={list}/>
            }
        </Container>
     );
}

export default LessonForm;
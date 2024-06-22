import { 
    Grid, 
    Typography, 
    Paper, 
    Button, 
    ButtonGroup, 
    IconButton, 
    Dialog, 
    DialogTitle, 
    DialogContent,
    DialogActions} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { createTheme } from '@mui/material/styles';

import { Link } from "react-router-dom";

import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

const theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 400,
      },
    },
  });

function DefaultLessonCard({lesson}) {        
    const [ preview, setPreview ] = useState(false)
    
    function previewLesson () {
        setPreview(!preview)
    }

    return ( 
        <>
            <Paper elevation={6} square={false} sx={{p: '10px', wordWrap: 'break-word'}}>
            <Grid container spacing={2} justifyContent='center'>
                <Grid item xs={12}>
                    <Typography variant='h6' >
                        {lesson.title}
                    </Typography>
                    <Typography sx={{pt: 1}}>{lesson.description}</Typography>
                </Grid>

                <Grid item xs='auto' theme={theme} sm={6}>
                    <ButtonGroup sx={{border: "2px solid", borderColor: "secondary.main"}} >
                        <Button variant="text" onClick={()=> previewLesson()} color='secondary'>Preview</Button>
                    </ButtonGroup>                         
                </Grid>

                <Grid item xs='auto' theme={theme} sm={6}>
                    <Grid container spacing={2} direction={'row-reverse'}>
                        <Grid item>
                            <Button variant='contained' color='secondary' component={Link} to={`/default/${lesson._id}`}>Start Lesson</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </Paper>

            <Dialog 
                open={preview} 
                onClose={previewLesson} 
                sx={{wordWrap: 'break-word'}}
                aria-labelledby='dialog-title'
                aria-describedby='dialog-description'
                >
                <DialogActions sx={{position: 'absolute', right: 0 }} disableSpacing={true} aria-label='close dialog'>
                    <IconButton onClick={()=> previewLesson()} color='secondary' aria-label='close dialog'>
                        <CloseIcon />
                    </IconButton>
                </DialogActions>
                <DialogTitle id='dialog-title' mr={4}>List of asanas for the lesson: <Typography color='secondary' fontWeight={500}>{lesson.title}</Typography></DialogTitle>
                <DialogContent id='dialog-description'>
                    {lesson && lesson.poses.map(lessonObj=> lessonObj.pose).map((pose, ind)=> <Typography pt={1} key={uuidv4()}>{ind+1}) {pose}</Typography>)}
                </DialogContent>            
            </Dialog>
        </>
    );
}

export default DefaultLessonCard;
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
    DialogContentText,
    DialogActions} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

import { createTheme } from '@mui/material/styles';

import { Link } from "react-router-dom";

import { useLessonsContext } from '../hooks/useLessonsContext';
import { useNotificationContext } from '../hooks/useNotificationContext';
import { useAuthContext } from '../hooks/useAuthContext';

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

function LessonCard({lesson}) {
    const { dispatch } = useLessonsContext()
    const { openNotification } = useNotificationContext()
    const { user } = useAuthContext()
        
    const [ preview, setPreview ] = useState(false)
    const [ alert, setAlert ] = useState(false)

    const deleteLesson = async () => {
        if(!user){
            return 
        }

        const response = await fetch(import.meta.env.VITE_SERVER_URL +'/api/lessons/' + lesson._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const deletedLesson = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_LESSON', payload: deletedLesson})
            openNotification({type: 'DELETE'})
        }
    }

    function previewLesson () {
        setPreview(!preview)
    }

    const openAlert = () => {
        setAlert(!alert);
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
                    <ButtonGroup sx={{border: "2px solid", borderColor: "secondary.main"}} aria-label="Button group">                        
                        <IconButton sx={{borderRight: "2px solid", borderRadius: "0"}} color='secondary' aria-label="edit" component={Link} to={`update/${lesson._id}`}>
                            <EditIcon/>
                        </IconButton>
                        <IconButton sx={{borderRight: "2px solid", borderRadius: "0"}} color='secondary' aria-label="delete" onClick={openAlert}>
                            <DeleteIcon />
                        </IconButton>
                        <Button variant="text" onClick={()=> previewLesson()} color='secondary'>Preview</Button>
                    </ButtonGroup>
                         
                </Grid>

                <Grid item xs='auto' theme={theme} sm={6}>
                    <Grid container spacing={2} direction={'row-reverse'}>
                        <Grid item>
                            <Button variant='contained' color='secondary' component={Link} to={`lesson/${lesson._id}`}>Start Lesson</Button>
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
                <DialogTitle id='dialog-title' mr={4}>List of asanas for the lesson: </DialogTitle>
                <DialogContent id='dialog-description'>
                    <Typography color='secondary' fontWeight={500}>{lesson.title}</Typography>
                    {lesson && lesson.poses.map(lessonObj=> lessonObj.pose).map((pose, ind)=> <Typography pt={1} key={uuidv4()}>{ind+1}) {pose}</Typography>)}
                </DialogContent>            
            </Dialog>

            <Dialog
                open={alert}
                onClose={openAlert}
                aria-labelledby="Delete-lesson"
                aria-describedby="Delete-lesson-from-database"
                >                    
                <DialogTitle id="Delete-lesson">
                    {"Delete lesson"}
                </DialogTitle>

                <DialogContent>
                <DialogContentText id="Delete-lesson-from-database">
                    Are you sure you want to delete lesson: 
                    <Typography component='span' sx={{display: 'block', mt: 1, fontWeight: 500}} color='secondary'>{lesson.title}</Typography>
                </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button onClick={openAlert} color='secondary' variant='contained'>No, keep it</Button>
                    <Button onClick={deleteLesson} color='secondary' variant='outlined'>Yes, delete it</Button>
                </DialogActions>
            </Dialog>            
        </>
    );
}

export default LessonCard;
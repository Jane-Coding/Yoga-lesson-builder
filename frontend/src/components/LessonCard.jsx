import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';

import { Link } from "react-router-dom";

import { useLessonsContext } from '../hooks/useLessonsContext';

function LessonCard({lesson}) {
    const { dispatch } = useLessonsContext()

    const deleteLesson = async () => {
        const response = await fetch('http://localhost:8085/api/lessons/' + lesson._id, {
            method: 'DELETE'
        })

        const deletedLesson = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_LESSON', payload: deletedLesson})
        }
    }
    return ( 
        <Paper elevation={6} square={false} sx={{p: '10px'}}>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                  <Typography variant='h6'>
                      {lesson.title}
                  </Typography>
                  <Typography sx={{pt: 1}}>{lesson.description}</Typography>
              </Grid>

              <Grid item xs={6}>
                  <ButtonGroup sx={{border: "2px solid", borderColor: "primary.main"}} aria-label="Basic button group" >                        
                      <IconButton sx={{borderRight: "2px solid", borderRadius: "0"}} color='primary' aria-label="edit">
                          <EditIcon/>
                      </IconButton>
                      <IconButton sx={{borderRight: "2px solid", borderRadius: "0"}} color='primary' aria-label="delete" onClick={deleteLesson}>
                        <DeleteIcon />
                      </IconButton>
                      <Button variant="text">Preview</Button>
                  </ButtonGroup>
              </Grid>

              <Grid item xs={6}>
                  <Grid container spacing={2} direction={'row-reverse'}>
                      <Grid item>
                          <Button variant='contained' color='secondary' component={Link} to={`lesson/${lesson._id}`}>Start Lesson</Button>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
        </Paper>
     );
}

export default LessonCard;
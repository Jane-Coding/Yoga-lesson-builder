import { Card, 
  CardActions, 
  CardContent, 
  CardMedia, 
  Typography, 
  Container, 
  Box, 
  LinearProgress, 
  IconButton 
} from '@mui/material';

import { useState, useEffect } from 'react';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import EndLessonDialog from '../components/EndLessonDialog';

import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

function Lesson() {
  const { id } = useParams()
  const { user } = useAuthContext()

  const [ progress, setProgress ] = useState(0);
  const [ pause, setPause ] = useState(false)

  const [ lesson, setLesson ] = useState(null)
  let [ currentPose, setCurrentPose ] = useState(0)
  let [ nextPose, setNextPose ] = useState(currentPose + 1)
  const [ posesArray, setPosesArray ] = useState([])
  const [ showDialog, setShowDialog ] = useState(false)

  useEffect(()=> {
    const getLessonsList = async() => {
      const response = await fetch(`http://localhost:8085/api/lessons/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
        }
      })
      const lessonsList = await response.json()
      
      if(response.ok){
        setLesson(lessonsList)
        setPosesArray(lessonsList.poses)
      }
    }

    getLessonsList()

  }, [id, user])

  useEffect( () => {
    const interval = setInterval(() => {
      if(pause) {
        if (progress < 100) {
          setProgress(progress + (100/60))
        }
        else if (progress >= 100) {
          setProgress(0)

          if (currentPose >= posesArray.length-1){
            setPause(!pause)
            clearInterval(interval)
            setShowDialog(true)
          }

          else {
            currentPose ++
            setCurrentPose(currentPose)
            setNextPose(++currentPose)
          }
        }        
      }
    }, 1000);

    return () => {
      clearInterval(interval)};
  });

  const handlePauseToggle = () => {
    setPause(!pause);
  }

  return (
      <>
      <Container maxWidth='sm'>
        <Card sx={{ maxWidth: "sm" , mt: "150px", }} >
          <CardMedia
              component="img"
              alt="asana"
              height="sm"
              image={lesson && `../src/assets/poses/${lesson.poses[currentPose].picture}.png`}
              sx={{margin: 'auto', maxWidth: '300px'}}
          />

          <CardContent>
            <LinearProgress sx={{mb: 2}} variant="determinate" value={progress} color='secondary'/>
            <Typography gutterBottom variant="h5" component="div">
              {lesson && posesArray[currentPose].pose}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {'Next pose: '} 
              {lesson && currentPose < posesArray.length-1 ? posesArray[nextPose].pose : 'End of the lesson'}
            </Typography>
          </CardContent>

          <CardActions sx={{display: 'flex', justifyContent: 'center'}}>
            <Box sx={{display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
              <IconButton aria-label="play/pause" color='secondary' onClick={()=> handlePauseToggle()}>
                {pause ?
                <PauseIcon sx={{ height: 60, width: 60 }} /> 
                :
                <PlayArrowIcon sx={{ height: 60, width: 60 }} />
                }          
              </IconButton>
            </Box>      
          </CardActions>

        </Card>
      </Container>

      <EndLessonDialog dialog={showDialog}/>

      </>
    );
}

export default Lesson;
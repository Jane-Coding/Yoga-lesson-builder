import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import Container from '@mui/system/Container';
import Box from '@mui/material/Box';
import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';

import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

import Navbar from '../components/Navbar';

import fetchData from '../../scripts/fetchData'

function Lesson() {
  const [progress, setProgress] = React.useState(0);
  const [pause, setPause] = React.useState(false)

  const [lesson, setLesson] = React.useState(null)  
  // const [isLoading, setIsLoading] = React.useState(true) 

  React.useEffect(()=> {
    fetchData('http://localhost:8080/userSessions', 1).then(data => setLesson(data))

  fetchData()


  }, [])


  React.useEffect(() => {
    const interval = setInterval(() => {
      if(pause) { 
        if (progress < 100) {
          setProgress(progress + (100 / 60))
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  
  const handlePauseToggle = () => {
    setPause(!pause);
  }

  return ( 
      <>
      <Navbar/>
      <Container maxWidth='sm'>

      <Card sx={{ maxWidth: "sm" , mt: "150px", }} >
      <CardMedia
          component="img"
          alt="asana"
          height="sm"
          // image={asana}
      />

      <CardContent>
      <LinearProgress variant="determinate" value={progress} color='secondary'/>
      <Typography gutterBottom variant="h5" component="div">
        {/* {lesson && lesson.name} */}
        {/* {lesson && lesson.title} */}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {/* {lesson && lesson.asanas.map(el=>el.asanaName)} */}
        {lesson && lesson.title}
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


      {/* <IconButton onClick={()=>console.log(fetchData())}>
        <PauseIcon></PauseIcon>
      </IconButton> */}
      </Box> 
     
      </CardActions>
      </Card>

      </Container>
      </>
    );
}

export default Lesson;
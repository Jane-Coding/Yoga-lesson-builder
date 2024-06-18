import { Dialog, 
  DialogTitle, 
  DialogContentText, 
  DialogContent, 
  Button 
} from '@mui/material';

import { Link } from 'react-router-dom';

export default function EndLessonDialog({dialog}) {
  return <>
    <Dialog open={dialog} sx={{backdropFilter: "blur(5px)"}}>
      <DialogContent sx={{textAlign: "center"}}>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogContentText sx={{pb: "20px"}}>You finished lesson!</DialogContentText>
        <Button color='secondary' component={Link} to="/">Back to Home Page</Button>
      </DialogContent>
    </Dialog>
  </>
}

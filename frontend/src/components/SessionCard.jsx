import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';

import { Link } from "react-router-dom";


function SessionCard({session}) {
    return ( 
        <Paper elevation={6} square={false} sx={{p: '10px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6'>
                        {session.name}
                    </Typography>
                    <Typography sx={{pt: 1}}>{session.description}</Typography>
                </Grid>

                <Grid item xs={6} spacing={2}>
                    <ButtonGroup variant="outlined" aria-label="Basic button group" >
                        <Button variant='outlined'>
                            <IconButton color='primary' sx={{p: '0'}}>
                                <EditIcon></EditIcon>
                            </IconButton>
                        </Button>
                        <Button >Preview</Button>
                    </ButtonGroup>
                </Grid>

                <Grid item xs={6}>
                    <Grid container spacing={2} direction={'row-reverse'}>
                        <Grid item>
                            <Button variant='contained' color='secondary' component={Link} to="lesson">Start Lesson</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
     );
}

export default SessionCard;
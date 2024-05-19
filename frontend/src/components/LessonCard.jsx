import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';

import { Link } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles"
const theme = createTheme({
    components: {
      MuiIconButton: {
        variants: [
          {
            props: { variant: "outlined" },
            style: ({ theme }) => ({
              color: theme.palette.primary.main,
              borderTop: `1px solid ${theme.palette.primary.light}`,
              borderLeft: `1px solid ${theme.palette.primary.light}`,
              borderBottom: `1px solid ${theme.palette.primary.light}`,
              borderRight: 'none',
              borderRadius: 4,
            })
          }
        ]
      }
    }
  })

function LessonCard({lesson}) {
    return ( 
        <Paper elevation={6} square={false} sx={{p: '10px'}}>
            <ThemeProvider theme={theme}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6'>
                        {lesson.title}
                    </Typography>
                    <Typography sx={{pt: 1}}>{lesson.description}</Typography>
                </Grid>

                <Grid item xs={6}>
                    <ButtonGroup variant="outlined" aria-label="Basic button group" >                        
                        <IconButton variant="outlined" color='primary' >
                            <EditIcon></EditIcon>
                        </IconButton>
                        <Button >Preview</Button>
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
            </ThemeProvider>
        </Paper>
     );
}

export default LessonCard;
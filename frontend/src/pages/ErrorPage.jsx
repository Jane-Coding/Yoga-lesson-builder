import { Container, Box, Typography, Link } from '@mui/material';

import { Link as RouterLink } from "react-router-dom";

function ErrorPage() {
    return ( <>
        <Container sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', mt: '70px'}}>
            <Box 
                component='img'
                src='/lotus-large.svg'
                maxHeight={'300px'}
            />

            <Typography variant='h4' mt={3} textAlign={'center'}>Something went wrong</Typography>

            <Link
                component={RouterLink}
                underline="none"
                color="secondary"
                mt={3}
                fontWeight={500}
                to="/"
            >
                Return to Home Page
            </Link>
            
        </Container>    
    </> );
}

export default ErrorPage;
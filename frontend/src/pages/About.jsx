import { Container, Typography, Link } from '@mui/material';

function About() {
    return ( 
        <Container sx={{marginTop: '80px', marginBottom: '50px', display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <Typography variant='h4'>Welcome to my project</Typography>

            <Typography>My name is Jane, I&#39;m a self-taught frontend developer. The idea of this project came to me when I was searching for yoga classes. Some of them were too hard, others were too simple. Then I thought it would be great to create my own lesson depending on the mood or situation. So I started working on this project first of all building the frontend part of it. Then I realized that I want to add one feature, then another and after some time I was already working on the backend. </Typography>
            
            <Typography>This project was the most challenging but at the same time the most valuable in terms of study. I learned a lot and had fun with it.</Typography>
            
            <Typography>My main goal was to create web site with working functionality while keeping the design simple. I&#39;m satisfied with the result (at least for now). But I have some more ideas for future adjustments. </Typography>

            <Typography>If you have questions or just want to say &quot;hello&quot; you can contact me via mail <Link variant='span' color='secondary' href={`mailto:jane.pp.business@gmail.com`}>jane.pp.business@gmail.com</Link></Typography>

            <Typography>Thank you for stopping by.</Typography>
        </Container>
     );
}

export default About;
import { 
    Typography, 
    Card, 
    CardMedia, 
    CardContent, 
    Button } from "@mui/material";

const cardStyle = {
    maxWidth: 150,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
}

import { useCreateLessonContext } from "../hooks/useCreateLessonContext";

function AsanaCard({link, type}) {    
    const {dispatch} = useCreateLessonContext()

    const image = `../src/assets/poses/${link.id}.png`
    return (
        <Card variant="outlined" sx={cardStyle}>
            <CardContent sx={{ padding: '0'}}>
                <CardMedia component="img" sx={{maxWidth: '100%'}} image={image}></CardMedia>
                <Typography p={2}>{link.asana}</Typography>
            </CardContent>
            <Button variant="outlined" color="secondary" onClick={()=> dispatch({type: `${type}_ASANA`, payload: link})}>{type} LESSON</Button>
        </Card>
    );
}

export default AsanaCard;
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

    const image = `../src/assets/poses/${link.id}.png`
    return (
        <Card variant="outlined" sx={cardStyle}>
            <CardContent sx={{ padding: '0'}}>
                <CardMedia component="img" sx={{maxWidth: '100%'}} image={image}></CardMedia>
                <Typography p={2}>{link.asana}</Typography>
            </CardContent>
            {type === 'ADD' ? <AddButton link={link}/> : <DeleteButton link={link} uuid={link.uuid}/>}
        </Card>
    );
}

export default AsanaCard;


function AddButton ({link}) {
    const {dispatch} = useCreateLessonContext()
    return (
        <Button variant="outlined" color="secondary" onClick={()=> dispatch({type: `ADD_ASANA`, payload: link})}>ADD LESSON</Button>
    )
}

function DeleteButton ({link, uuid}) {
    const {dispatch} = useCreateLessonContext()
    return (
        <Button variant="outlined" color="secondary" onClick={()=> dispatch({type: `DELETE_ASANA`, payload: link, uuid: uuid})}>DELETE LESSON</Button>
    )
}
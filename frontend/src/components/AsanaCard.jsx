import { 
    Typography, 
    Card, 
    CardMedia, 
    CardContent, 
    Button,
    IconButton,
} from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

import { getImageURL } from '../utils/useAssets';

const cardStyle = {
    maxWidth: 150,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
}

const deleteButtonStyle = {
    position: 'absolute',
    right: 0,
    minWidth: '24px',
    padding: 0,
    borderRadius: '30px',
}

import { useCreateLessonContext } from "../hooks/useCreateLessonContext";

function AsanaCard({link, type}) {
    const image = getImageURL(link.picture)

    return (
        <Card variant="outlined" sx={cardStyle}>
            <CardContent sx={{ padding: '0'}}>
                <CardMedia component="img" sx={{maxWidth: '100%'}} image={image}></CardMedia>
                <Typography p={2}>{link.pose}</Typography>
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
        <Button variant="contained" color="secondary" sx={deleteButtonStyle}>
            <IconButton 
                onClick={()=> dispatch({type: `DELETE_ASANA`, payload: link, uuid: uuid})}
                sx={{color: 'white', padding: 0}}
                aria-label='delete asana'
            >
                <CloseIcon />
            </IconButton>
        </Button>
    )
}
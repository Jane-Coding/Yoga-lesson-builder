import { Snackbar, Alert } from "@mui/material";

import { useNotificationContext } from '../hooks/useNotificationContext';

function Notification() {
    
    const { notification, openNotification } = useNotificationContext()
    const { open, message } = notification

    const handleClose = () => {
        openNotification({type: 'CLOSE'})
    }

    return ( 
        <Snackbar
            open={open}
            autoHideDuration={3000}        
            onClose={handleClose}
        >
            <Alert
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    );
}

export default Notification;
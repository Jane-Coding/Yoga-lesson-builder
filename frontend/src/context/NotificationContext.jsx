import { createContext, useReducer } from "react";

export const NotificationContext = createContext();

export const notificationReducer = (notification, action) => {
    switch (action.type){
        case 'CREATE': 
            return {
                open: true,
                message: 'New lesson was created'
            }
        case 'DELETE':
            return {
                open: true,
                message: 'Lesson was deleted'
            }
        case 'UPDATE':
            return {
                open: true,
                message: 'Lesson was updated'
            }
        case 'CLOSE':
            return {
                open: false,
                message: '',
                severity: ''
            }
        case 'ERROR':
            return {
                open: true,
                message: action.message,
                severity: 'error'
            }
        default:
            return notification
    }
}


export const NotificationContextProvider = ({ children }) => {
    const [notification, openNotification] = useReducer(notificationReducer, {open: false, message: '', severity: 'success'})

    return ( 
        <NotificationContext.Provider value={{notification, openNotification}}>
            { children }
        </NotificationContext.Provider>
    );
}

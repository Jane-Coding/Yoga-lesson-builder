import { createContext, useReducer } from "react";

export const CreateLessonContext = createContext()

function listReducer(list, action){
    switch (action.type){
        case 'ADD_ASANA': {
            return [...list, action.payload] 
        }
        case 'DELETE_ASANA': {
            return list.filter(el => el.id !== action.payload.id)
        }

        default:
            return list
    }
}

export const CreateLessonContextProvider = ({children}) => {    
    const [list, dispatch] = useReducer(listReducer, [])

    return ( 
        <CreateLessonContext.Provider value={{list, dispatch}}>
            {children}
        </CreateLessonContext.Provider>
    );
}

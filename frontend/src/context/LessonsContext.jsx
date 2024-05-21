import { createContext, useReducer } from "react";

export const LessonsContext = createContext();

export const lessonsReducer = (state, action) => {
    switch (action.type){
        case 'SET_LESSONS': 
            return {
                lessons: action.payload
            }
        default:
            return state
    }
}

export const LessonContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(lessonsReducer, { lessons: null })

    return (
        <LessonsContext.Provider value={{...state, dispatch}}>
            { children }
        </LessonsContext.Provider>
    )
}
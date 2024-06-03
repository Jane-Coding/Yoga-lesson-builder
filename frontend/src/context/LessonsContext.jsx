import { createContext, useReducer } from "react";

export const LessonsContext = createContext();

export const lessonsReducer = (state, action) => {
    switch (action.type){
        case 'SET_LESSONS': 
            return {
                lessons: action.payload
            }
        case 'CREATE_LESSON':
            return { 
                lessons: [action.payload, ...state.lessons]
            }
        case 'DELETE_LESSON':
            return {
                lessons: state.lessons.filter( el => el._id !== action.payload._id)
            }
        case 'UPDATE_LESSON':
            return {
                lessons: state.lessons.map(el => el._id === action.payload._id ? action.payload : el)
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
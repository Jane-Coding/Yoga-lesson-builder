import {CreateLessonContext} from "../context/CreateLessonContext";
import { useContext } from "react";

export const useCreateLessonContext = () => {
    const context = useContext(CreateLessonContext)

    if(!context){
        throw Error('useCreateLessonsContext must be used inside an CreateLessonsContextProvider')
    }
    
    return context
}
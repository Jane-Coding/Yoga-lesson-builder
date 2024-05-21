import { LessonsContext } from "../context/LessonsContext";
import { useContext } from "react";

export const useLessonsContext = () => {
    const context = useContext(LessonsContext)

    if(!context){
        throw Error('useLessonsContext must be used inside an LessonsContextProvider')
    }

    return context
}
import { useAuthContext } from "./useAuthContext"
import { useLessonsContext } from "./useLessonsContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch: lessonsDispatch } = useLessonsContext()

    const logout = () => {
        // remove user from storage
        localStorage.removeItem('user')

        // dispatch logout action
        dispatch({type: 'LOGOUT'})
        lessonsDispatch({type: 'SET_LESSONS', payload: null})
    }

    return { logout }
}
import axios from "axios"
import { API_URL_JWT, API_URL } from "../Constants"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser"
export const JWT_TOKEN = "token"

class ChallengeAPI {
    authenticateAPI(username, password) {
        return axios.post(`${API_URL_JWT}/authenticate`, {
            username,
            password
        })
    }

    getTopPlayerAPI(token) {
        return axios.get(`${API_URL}/getTopPlayer`, { headers: { authorization: token } })
    }

    getAllLanguagesAPI(token) {
        return axios.get(`${API_URL}/getAllLanguages`, { headers: { authorization: token } })
    }

    getRandomTaskForPlayerAPI(username, language, token) {
        return axios.get(`${API_URL}/getRandomTaskForPlayer`, { params: { nickName: username, languageName: language }, headers: { authorization: token } })
    }

    submitChallengeAPI(nickName, languageName, program, preLoadedTaskId, compilerArgs) {
        return axios.post(`${API_URL}/submitChallenges`, {
            nickName,
            languageName,
            program,
            preLoadedTaskId,
            compilerArgs
        })
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        sessionStorage.removeItem(JWT_TOKEN)
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ""
        return user
    }
}

export default new ChallengeAPI()

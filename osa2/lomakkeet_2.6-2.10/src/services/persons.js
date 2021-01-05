import axios from "axios"
const usersURL = "http://localhost:3001/persons"

//AXIOS HANDLES HTTP COMMUNICATION

//Get all users from api route
const getUsers = () => {
    const request = axios.get(usersURL)
    return request.then(response => response.data)
}

//Uses POST HTTP method to add user to given route
//@Param user is JSON object
const addUser = (user) => {
    const request = axios.post(usersURL, user)
    return request.then(response => response.data)
}

//Uses PUT HTTP method to update existing user (id) with new information
//@Param user is JSON object that includes new userValue
//@Param userId is the given user that gets replaced
const updateUser = (user, userId) => {
    const request = axios.put(`${usersURL}/${userId}`, user)
    return request.then(response => response.data)
}

//Deletes user with given ID using HTTP DELETE
const deleteUser = (userId) => {
    const request = axios.delete(`${usersURL}/${userId}`)
    return request.then(response => response.data)
}

//export module
export default {
    getUsers: getUsers,
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}
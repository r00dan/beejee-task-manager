import axios from 'axios'

const API_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/';

export function getTasksByUsername (page, username="Name") {
    return axios.get(`${API_URL}?developer=${username}&page=${page}`);
}

export function postNewTask (username, email, text) {
    let data = new FormData();
    data.append('username', username);
    data.append('email', email);
    data.append('text', text);

    return axios({
        method: 'POST',
        url: `${API_URL}create?developer=${username}`,
        data: data,
        crossDomain: true,
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        dataType: "json"
    })
}

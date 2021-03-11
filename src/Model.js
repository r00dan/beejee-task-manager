import axios from 'axios'

const API_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/';

export function getTasksByUsername (page, username="Name") {
    return axios.get(`${API_URL}?developer=${username}&page=${page}`);
}

export function getSortedTasks (page, sortField, sortDirection, username="Name") {
    return axios.get(`${API_URL}?developer=${username}&page=${page}&sort_field=${sortField}&sort_direction=${sortDirection}`);
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

export function login (username, password) {
    let data = new FormData();
    data.append('username', username);
    data.append('password', password);

    return axios({
        method: 'POST',
        url: `${API_URL}login?developer=${username}`,
        data: data,
        crossDomain: true,
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        dataType: "json"
    })
}

export function edit (token, status, text) {
    let data = new FormData();

    return axios({
        method: 'POST',
        url: `${API_URL}edit`,
        data: data,
        crossDomain: true,
        mimeType: "multipart/form-data",
        contentType: false,
        processData: false,
        dataType: "json"
    })
}

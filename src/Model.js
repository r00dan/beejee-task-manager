import axios from 'axios'

const API_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/';

export function getTasksByUsername (page, username="Name") {
        return axios(`${API_URL}?developer=${username}&page=${page}`);
}

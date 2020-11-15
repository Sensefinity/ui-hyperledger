import axios from 'axios';

async function request(obj) {
    let headers = {};
    let authorization = 'Basic YWRtaW5Ac2Vuc2VmaW5pdHkuY29tOmFiY2QxMjM0';
    if (authorization) headers['Authorization'] = authorization;
    try {
        if (obj.params) {
            for (let param in obj.params) {
                if (typeof obj.params[param] === 'undefined' || obj.params[param] === null) {
                    delete obj.params[param];
                }
            }
        }
        const response = await axios.create({
            baseURL: process.env.REACT_APP_REST_API_URL,
            headers: headers
        })(obj);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw Error(error.response.data || 'Server error.');
        } else {
            throw Error('Internet error.');
        }
    }
}

const Server = {
    get: async (obj) => await request({ ...obj, method: 'GET' }),
    post: async (obj) => await request({ ...obj, method: 'POST', data: obj.data || {} }),
    put: async (obj) => await request({ ...obj, method: 'PUT', data: obj.data || {} }),
    delete: async (obj) => await request({ ...obj, method: 'DELETE' })
};

export default Server;

const axiosOBJ = require('axios');

axiosOBJ.defaults.baseURL = process.env.REACT_APP_API_URL ?? 'http://localhost:5000'

export { axiosOBJ as axios };

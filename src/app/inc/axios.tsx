const axiosOBJ = require('axios');

axiosOBJ.defaults.baseURL = 'http://localhost:5000'

export { axiosOBJ as axios };

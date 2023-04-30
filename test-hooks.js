const axios = require('axios');

const getInfo = async () => {
    const result = await axios.post(
        'https://3745-196-135-101-10.ngrok-free.app/'
    );
    console.log(result.data);
};

getInfo();

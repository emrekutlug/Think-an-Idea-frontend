export const getEndpointURL = () => {
    return process.env.VUE_APP_ENVIRONMENT === 'production' ?
        'https://thinkanidea-server.mybluemix.net' :
        'http://localhost:1234'
};
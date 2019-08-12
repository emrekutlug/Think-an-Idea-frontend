export const getEndpointURL = () => {
    return process.env.VUE_APP_ENVIRONMENT === 'production' ?
        'https://thinkanidea-client.mybluemix.net/' :
        'http://localhost:1234'
}
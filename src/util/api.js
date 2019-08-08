export const getEndpointURL = () => {
    return process.env.VUE_APP_ENVIRONMENT === 'production' ?
        'https://thinkanideaserver.eu-gb.mybluemix.net' :
        'http://localhost:1234'
}
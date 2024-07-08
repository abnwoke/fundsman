
const isDev = process.env.NODE_ENV === "development"

const development = {
    api_url:  "http://192.168.0.159:1302",
};

const production = {
    api_url:  "http://192.168.0.159:1302",
    //api_url:  "https://isolve-api.vercel.app",
}


const general = {
    projectId: "007ced7d-c854-4762-82e7-803189f063c9",
    google_api_key: "AIzaSyAHHoifTiYGFmHWMKXRZGcmCT7Kj5nfcFk",
    host: 'https://homesalet.com'
}


const config = isDev? development : production

export default {
    ...config,
    ...general
}

// export const ORIGIN_NAME = 'http://ad.dev.gemii.cc:58080'
// export const API_PATH = (window.location.origin.includes('https')?'https://':'http://')+ORIGIN_NAME
//

export const API_PATH =
    window.location.origin.includes('localhost:8000') ? 'http://localhost:8000/'
        : window.location.origin.includes('localhost') ? 'http://ad.dev.gemii.cc:58080/'
        : window.location.origin.includes('dev') ? 'http://ad.dev.gemii.cc:58080/'
        : window.location.origin.includes('test') ? 'http://ad.test.gemii.cc:58080/'
            : 'http://ad.cloud.gemii.cc'

// http://ad.dev.gemii.cc:58080/liz-launch/noauth/launch/managerlist?id=24
// http://ad.dev.gemii.cc:58080/noauth/launch/managerlist?id=24
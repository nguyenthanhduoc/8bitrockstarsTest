import 'whatwg-fetch';
import config from '../config';
import {GET_LOCATION_SUCCESS} from '../HomeReducer';

function getLocationSuccess(data) {
    return {
        type: GET_LOCATION_SUCCESS,
        locationData: data.results
    };
}

export function requestLocationFromLatLng(data) {
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + data.lat +
        ',' + data.lng +
        '&key=' + config.GOOGLE_API_KEY;
    return fetch(url)
        .then(resp => resp.json())
        .then(resp => getLocationSuccess(resp));
}
import {forEach, some} from 'lodash';

export function decorateLocation(locationData) {
    let result = {
        streetName: '',
        ward: '',
        district: '',
        city: '',
        country: ''
    };
    !!locationData && forEach(locationData[0].address_components, (e) => {
        if (some(e.types, (text) => text === 'street_number')) {
            result.streetName += e.long_name;
        }
        if (some(e.types, (text) => text === 'route')) {
            result.streetName += ' ' + e.long_name;
        }
        if (some(e.types, (text) => text === 'sublocality_level_1')) {
            result.ward += ' ' + e.long_name;
        }
        if (some(e.types, (text) => text === 'administrative_area_level_2')) {
            result.district += ' ' + e.long_name;
        }
        if (some(e.types, (text) => text === 'administrative_area_level_1')) {
            result.city += ' ' + e.long_name;
        }
        if (some(e.types, (text) => text === 'country')) {
            result.country += ' ' + e.long_name;
        }
    });
    return result;
}
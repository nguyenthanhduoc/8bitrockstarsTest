export const GET_ADDRESS_SUCCESS = 'GET_ADDRESS_SUCCESS';
export const ADD_ADDRESS_SUCCESS = 'ADD_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_SUCCESS = 'UPDATE_ADDRESS_SUCCESS';
export const DELETE_ADDRESS_SUCCESS = 'DELETE_ADDRESS_SUCCESS';
export const GET_LOCATION_SUCCESS = 'GET_LOCATION_SUCCESS';

let initialState = {
    addressList: []
};

export default function Homepage(state = initialState, action)  {
    switch (action.type) {
        case GET_ADDRESS_SUCCESS:
            return {...state, addressList: action.addressList, locationData: null };
        case ADD_ADDRESS_SUCCESS:
            return {...state};
        case GET_LOCATION_SUCCESS:
            return {...state, locationData: action.locationData};
        case UPDATE_ADDRESS_SUCCESS:
            return {...state};
    }

    return state;
};




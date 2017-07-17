import {
    GET_ADDRESS_SUCCESS,
    ADD_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_SUCCESS
} from '../HomeReducer';
import * as _ from 'lodash';
import * as firebase from 'firebase';
import 'whatwg-fetch';

firebase.initializeApp({
    apiKey: "AIzaSyAewqsBoiynEfSk6LniLt3UE8yqcG36b_4",
    authDomain: "bitrockstar-test.firebaseapp.com",
    databaseURL: "https://bitrockstar-test.firebaseio.com",
    projectId: "bitrockstar-test",
    storageBucket: " bitrockstar-test.appspot.com ",
    messagingSenderId: "210988794618"

});

export function getAddressList() {
    const address = firebase.database().ref('/addressList').once('value');
    return address.then(resp => getAddressListSuccess(decorateAddressList(resp)))
                .catch(error => {
                    alert('Website is upgrade, please comeback later !');
                    console.log(error);
                });
}

const getAddressListSuccess = (addressList) => {
    return {
        type: GET_ADDRESS_SUCCESS,
        addressList: addressList
    };
};

const decorateAddressList = (resp) => {
    const result = [];
    _.chain(resp.val())
        .keys()
        .forEach(key => {
            result.push(resp.val()[key]);
        })
        .value();
    return result;
};

export function addAddressRow(formData) {
    return addAddress(formData, Guid())
        .then(addAddressSuccess)
        .catch(error => {
            alert('Website is upgrade, please comeback later !');
            console.log(error);
        });;
}

const addAddressSuccess = () => {
    return {
        type: ADD_ADDRESS_SUCCESS,
        success: true
    };
};

export function deleteAddressRow(addressId) {
    return deleteAddress(addressId)
        .then(deleteAddressSuccess)
        .catch(error => {
            alert('Website is upgrade, please comeback later !');
            console.log(error);
        });;
}

const deleteAddress = (addressId) => {
    return firebase.database().ref('addressList/' + addressId).remove();
};

const deleteAddressSuccess = () => {
    return {
        type: DELETE_ADDRESS_SUCCESS,
        success: true
    };
};

export function updateAddressRow(data) {
    let addressId = data.id || '';
    return addAddress(data, addressId)
        .then(updateAddressSuccess)
        .catch(error => {
            alert('Website is upgrade, please comeback later !');
            console.log(error);
        });;
}

const updateAddressSuccess = () => {
    return {
        type: UPDATE_ADDRESS_SUCCESS,
        success: true
    };
};

const addAddress = (data, addressId) => {
    return firebase.database().ref('addressList/' + addressId).set({
        streetName: data.streetName,
        ward: data.ward,
        district: data.district,
        city: data.city,
        country: data.country,
        id: addressId
    });
};

const Guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

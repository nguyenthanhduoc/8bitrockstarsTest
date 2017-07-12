import {getAddressList, addAddressRow, deleteAddressRow, updateAddressRow} from './api/Address';
import {requestLocationFromLatLng} from './api/Google';

export const HomepageStateToPropsBinding = (state) => {
    return {
        addressList: state.homepage.addressList,
        locationData: state.homepage.locationData
    }
};

export const HomepageDispatchToPropsBinding = (dispatch, ownProps) => ({
    getAddressList: () => getAddressList().then(dispatch),
    addAddressRow: (values) => addAddressRow(values).then(dispatch),
    updateAddressRow: (data) => updateAddressRow(data).then(dispatch),
    deleteAddressRow: (addressId) => deleteAddressRow(addressId).then(dispatch),
    requestLocationFromLatLng: (data) => requestLocationFromLatLng(data).then(dispatch),
});
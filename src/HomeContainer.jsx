import React from 'react';
import {connect} from 'react-redux';
import {HomepageStateToPropsBinding, HomepageDispatchToPropsBinding} from "./HomeBind.jsx";
import AddressForm from './components/AddressForm.jsx';
import AddressList from './components/AddressList.jsx';
import {decorateLocation} from './api/Location';

@connect(HomepageStateToPropsBinding, HomepageDispatchToPropsBinding)
export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {}
        };
    }

    componentWillMount() {
        this.props.getAddressList();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            addressList: nextProps.addressList,
            formData: decorateLocation(nextProps.locationData)
        });
    }

    submit(values) {
        this.props.addAddressRow(values).then(resp => {
            if (resp.success) this.props.getAddressList()
        });
    };

    delete(id) {
        this.props.deleteAddressRow(id).then(resp => {
            if (resp.success) this.props.getAddressList()
        });
    }

    onGetLocation = () => {
        navigator.geolocation.getCurrentPosition(data => {
            this.props.requestLocationFromLatLng({lat: data.coords.latitude, lng: data.coords.longitude})
                .then(resp => decorateLocation(resp.locationData))
                .then(formData => ::this.setState({formData}));
        });
    };

    render() {
        return (
            <div className="row">
                <div className="row">
                    <AddressForm onSubmit={::this.submit}
                                 onGetLocation={::this.onGetLocation}
                                 initialValues={this.state.formData}/>
                </div>
                <div className="row">
                    <AddressList addressList={this.state.addressList}
                                 updateAddressRow={::this.props.updateAddressRow}
                                 getAddressList={::this.props.getAddressList}
                                 onDelete={::this.delete}/>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react';
import {requestLocationFromLatLng} from '../api/Google';
import {decorateLocation} from '../api/Location'
import FaCrosshairs from 'react-icons/lib/fa/crosshairs';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTrashO from 'react-icons/lib/fa/trash-o';

export default class AddressRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            rowData: {
                streetName: this.props.element.streetName,
                ward: this.props.element.ward,
                district: this.props.element.district,
                city: this.props.element.city,
                country: this.props.element.country
            }
        };
    }

    edit = () => this.setState({isEdit: true});

    delete = (id) => this.props.onDelete(id);

    onChangeField = event => {
        this.state.rowData[event.target.name] = event.target.value;
        let rowData = this.state.rowData;
        this.setState({rowData});
    };

    onGetLocation = () => {
        navigator.geolocation.getCurrentPosition(data => {
            requestLocationFromLatLng({lat: data.coords.latitude, lng: data.coords.longitude})
                .then(resp => decorateLocation(resp.locationData))
                .then(rowData => ::this.setState({rowData}));
        });
    };

    update = () => {
        let data = {...this.state.rowData, id: this.props.element.id};
        this.props.updateAddressRow(data)
            .then(resp => this.setState({isEdit: false}, this.updateSuccess(resp)));
    };

    updateSuccess = (resp) => {
        if (resp.success) this.props.getAddressList()
    };

    render() {
        let {element} = this.props;
        let {isEdit, rowData} = this.state;
        return (
            isEdit ?
            <tr>
                <td>
                    <input name="streetName" type="text" value={rowData.streetName} className="form-control" onChange={::this.onChangeField}/>
                </td>
                <td>
                    <input name="ward" type="text" value={rowData.ward} className="form-control" onChange={::this.onChangeField}/>
                </td>
                <td>
                    <input name="district" type="text" value={rowData.district} className="form-control" onChange={::this.onChangeField}/>
                </td>
                <td>
                    <input name="city" type="text" value={rowData.city} className="form-control" onChange={::this.onChangeField}/>
                </td>
                <td>
                    <input name="country" type="text" value={rowData.country} className="form-control" onChange={::this.onChangeField}/>
                </td>
                <td style={{textAlign: 'center', paddingTop: 0, paddingBottom: 0}}>
                    <span className="icon" title="Get your location" onClick={::this.onGetLocation}><FaCrosshairs /></span>
                    <button className="btn btn-info" style={{marginBottom: 10}} type="submit" onClick={::this.update}>Update</button>
                </td>
            </tr>
            :
            <tr>
                <td>{element.streetName}</td>
                <td>{element.ward}</td>
                <td>{element.district}</td>
                <td>{element.city}</td>
                <td>{element.country}</td>
                <td style={{textAlign: 'center'}}>
                    <span className="icon icon-danger" title="Delete this address" onClick={() => this.delete(element.id)}><FaTrashO /></span>
                    <span className="icon" title="Edit address" onClick={() => this.edit()}><FaPencil /></span>
                </td>
            </tr>
        )
    }
}
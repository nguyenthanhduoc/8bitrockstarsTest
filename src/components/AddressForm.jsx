import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import FaCrosshairs from 'react-icons/lib/fa/crosshairs';

class AddressForm extends Component {
    render() {
        const { handleSubmit, onGetLocation } = this.props;
        return (
            <form onSubmit={handleSubmit}  className="form-group col-md-12">
                <div className="form-group col-md-2">
                    <label className="control-label">Street Name</label>
                    <Field name="streetName" type="text" component="input" className="form-control"/>
                </div>
                <div className="form-group col-md-2">
                    <label className="control-label">Ward</label>
                    <Field name="ward" type="text" component="input" className="form-control"/>
                </div>
                <div className="form-group col-md-2">
                    <label className="control-label">District</label>
                    <Field name="district" type="text" component="input" className="form-control"/>
                </div>
                <div className="form-group col-md-2">
                    <label className="control-label">City</label>
                    <Field name="city" type="text" component="input" className="form-control"/>
                </div>
                <div className="form-group col-md-2">
                    <label className="control-label">Country</label>
                    <Field name="country" type="text" component="input" className="form-control"/>
                </div>
                <div className="form-group col-md-2" style={{paddingTop: 15}}>
                    <span className="icon" title="Get your location" onClick={::this.props.onGetLocation}><FaCrosshairs /></span>
                    <button className="btn btn-info" type="submit" style={{marginBottom: 10, width: 75}}>Add</button>
                </div>
            </form>
        )
    }
}

const afterSubmit = (result, dispatch) =>
    dispatch(reset('address'));

export default reduxForm({
    form: 'address',
    enableReinitialize: true,
    onSubmitSuccess: afterSubmit,
})(AddressForm);
import React, { Component } from 'react';
import {map} from 'lodash';
import AddressRow from './AddressRow';

export default class AddressList extends Component {

    render() {
        let {addressList, onDelete, getAddressList, updateAddressRow} = this.props;
        return (
            <table className="table table-bordered table-striped" style={{marginTop: 10}}>
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col style={{width: 150}}/>
                </colgroup>
                <thead>
                <tr>
                    <th>Street Name</th>
                    <th>Ward</th>
                    <th>District</th>
                    <th>City</th>
                    <th>Country</th>
                    <th>&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {
                    map(addressList, (e, index) => {
                        return <AddressRow key={index}
                                           element={e}
                                           onDelete={onDelete}
                                           getAddressList={getAddressList}
                                           updateAddressRow={updateAddressRow}/>
                    })
                }
                </tbody>
            </table>
        )
    }
}
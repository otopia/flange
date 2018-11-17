import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';

class DetailOfRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Submit: '',
            Products: 'none',
            SendParameters: {},
        };
        this.state.SendParameters['detail'] = {};
        this.GetKalaName = this.GetKalaName.bind(this);
        this.GetListOfRow = this.GetListOfRow.bind(this);
        this.SetParameterValue = this.SetParameterValue.bind(this);
        this.InitSendParameter = this.InitSendParameter.bind(this);
        this.AddRow = this.AddRow.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
    }
    AddRow() {
        let rows = this.state.SendParameters['detail'].length;
        this.SetParameterValue("row", rows, rows);
        this.SetParameterValue("kala_id", "", rows);
        this.SetParameterValue("qty_value", "", rows);
        this.SetParameterValue("kala_name", "", rows);
        this.SetParameterValue("kala_code", "", rows);
        this.SetParameterValue("kala_inventory", "", rows);
    }
    RemRow(value) {
        const RowObj = this.state.SendParameters.find(item => ((item !== undefined) && (item.row === value)));
        this.state.SendParameters[RowObj.row] = undefined;
        this.setState({
            SendParameters: this.state.SendParameters
        });
    }
    async InitSendParameter() {
        for (let item in Object.keys(this.state.SendParameters)) {
            this.state.SendParameters['detail'][item] = undefined;
        }
        this.setState({
            SendParameters: this.state.SendParameters
        });
        await this.GetListOfRow();
    }
    SetParameterValue(name, value, id) {
        this.state.SendParameters['detail'][id] = { ...this.state.SendParameters['detail'][id], [name]: value };
        this.setState({
            SendParameters: this.state.SendParameters,
        });
        console.log(this.state.SendParameters);
    }
    async GetKalaName() {
        const send_obj = {
            'method': 'get',
            'url': this.props.server + 'getdata/getkalaname',
            'params': { test: 'test' },
        }
        await axios(send_obj)
            .then((response) => {
                this.setState({
                    Products: response.data,
                });
            })
            .catch((error) => {
            });
    }
    async GetListOfRow() {
        const send_obj = {
            'method': 'get',
            'url': this.props.server + 'getdata/getdetailofrequest',
            'params': {
                request_code: this.props.request_code,
                progress: this.props.progress
            },
        }
        await axios(send_obj)
            .then((response) => {
                this.state.SendParameters.detail = response.data;
                this.setState({
                    SendParameters: this.state.SendParameters,
                });
            })
            .catch((error) => {
            });
        console.log(this.state.SendParameters);
    }
    async HandleSubmit() {
        this.state.SendParameters['request_code'] = this.props.request_code;
        this.state.SendParameters['progress'] =this.props.progress;
        this.setState({
            Submit: 'wait',
            SendParameters: this.state.SendParameters
        });
        console.log(this.state.SendParameters);
        const send_obj = {
            'method': 'get',
            'url': this.props.server + 'confirm/confirmrequest',
            'params': this.state.SendParameters,
        }
        console.log("start");
        await axios(send_obj)
            .then((response) => {
                console.log("stop");
                console.log(response.data);
                if (response.data.status.trim() === "OK") {
                    this.setState({
                        Submit: 'pass'
                    });
                }
            })
            .catch((error) => {
            });
    }

    async componentDidMount() {
        await this.GetKalaName();
        await this.GetListOfRow();
    }
    render() {
        //console.log(this.state.SendParameters.detail);
        switch (this.state.Submit) {
            case 'wait':
                return (
                    <div>Loading...</div>
                );
        }
        return (
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th >نام کالا</th>
                            <th>تعداد</th>
                            <th>موجودی</th>
                            <th></th>
                        </tr>
                        {(this.state.Submit === 'pass') ? ShowSubmitPishfactor(this.state.SendParameters.detail) :
                            Object.values(this.state.SendParameters['detail']).map((i, index) => (i === undefined ? null :
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td style={{ width: 350 }}>
                                        <Select
                                            options={this.state.Products}
                                            id={i.row}
                                            defaultValue={{ label: (i.kala_code === "" ? "" : (i.kala_code + ": " + i.kala_name)), value: i.kala_id }}
                                            onChange={(value) => (this.SetParameterValue("kala_inventory", "", i.row), this.SetParameterValue("kala_id", value.value, i.row))}
                                        />
                                    </td>
                                    <td><input type="text" className="form-control" id={i.row} value={i.qty_value} onChange={(e) => this.SetParameterValue("qty_value", e.target.value, e.target.id)} />
                                    </td>
                                    <td><GetInventory server={this.props.server} item={i} setParameter={(kala_inventory) => this.SetParameterValue("kala_inventory", kala_inventory, i.row)} /></td>
                                    <td><button className="btn btn-danger" onClick={() => this.RemRow(i.row)}>X</button>
                                    </td>
                                </tr>
                            ))}
                        <tr>
                            <td>
                                {(this.state.Submit === 'pass') ? null :
                                    <button className="btn btn-success" onClick={this.AddRow}>+</button>}
                            </td>
                            <td> </td>
                            <td></td>
                            <td></td>

                        </tr>
                        <tr>
                            <td>
                                {(this.state.Submit === 'pass') ? null :
                                    <button className="btn btn-success" onClick={this.HandleSubmit}>Register</button>}
                            </td>
                        </tr>
                    </tbody>
                </table>
                {(this.state.Submit === 'pass') ? null :
                    <button className="btn btn-warning" onClick={this.InitSendParameter}>Rest</button>}
            </div >
        );

    }
}
export default (DetailOfRequest);

const ShowSubmitPishfactor = (items) => (
    Object.values(items).map((i, index) => (i === undefined ? null :
        <tr key={index}>
            <td>{index + 1}</td>
            <td><label className="form-control">{i.kala_name}</label></td>
            <td><label className="form-control">{i.qty_value}</label></td>
            <td><label className="form-control">{i.kala_inventory}</label></td>
        </tr>
    ))
);
class GetInventory extends Component {
    constructor(props) {
        super(props);
    }
    async GetKalaInventory() {
        this.setParameter("Loading....");
        const send_obj = {
            'method': 'get',
            'url': this.props.server + 'getdata/getkalainventory',
            'params': { kala_id: this.props.item.kala_id },
        }
        await axios(send_obj)
            .then((response) => {

                //console.log(response.data);
                if (response.data.status === "OK") {

                    //console.log(response.data.status);
                    this.setParameter(response.data.kala_inventory);
                }
            })
            .catch((error) => {
            });
    }
    setParameter = (item) => (this.props.setParameter(item));

    componentDidUpdate() {
        if (this.props.item.kala_inventory === "" && this.props.item.kala_id !== "") {
            this.GetKalaInventory();
        }
    }
    render() {
        return (
            <label className="form-control" >{this.props.item.kala_inventory}</label>
        )
    }
}

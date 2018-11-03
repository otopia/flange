import React, { Component } from 'react';
import axios from 'axios';
import Select from 'react-select';
import LoadingButton from '../component/LoadingButton';

let myRef0 = undefined;
const styles = {
    textbox: {
        color: 'blue'
    }
}
// const options = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
// ]
let counter_select = 0;
class Newrequest extends Component {

    constructor(props) {
        super(props);
        this.ref_kala_qty = [];
        this.ref_kala_id = [];

        this.state = {
            products: 'none',
            ListOfRow: [],
            NumOfRow: 1,
            KeyOfRow: 0,
            send_parameters: {},
            valid_form: false,
            main_response: 'none',
            fire: 'ready'

        };
        this.GetKalaName = this.GetKalaName.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
        this.AddRow = this.AddRow.bind(this);
        this.RemRow = this.RemRow.bind(this);
        this.ValidatingForm = this.ValidatingForm.bind(this);

    }
    AddRow(obj_of_row) {
        //counter_select = counter_select + 1;
        this.SetParameterValue("kala_id", "", this.state.KeyOfRow);
        this.SetParameterValue("qty_value", "", this.state.KeyOfRow);
        this.state.ListOfRow.push(obj_of_row);

        this.setState({
            KeyOfRow: this.state.KeyOfRow + 1
        });


    }
    RemRow(e) {
        let value = e.target.value;
        const index1 = this.state.ListOfRow.findIndex(item => ((item.key.toString() === value)));
        this.state.ListOfRow.splice(index1, 1);
        this.state.send_parameters[index1] = undefined;
        //this.state.send_parameters.kala_id[index1+1]=undefined;
        this.setState({
            ListOfRow: this.state.ListOfRow,
            send_parameters: this.state.send_parameters
        });
    }
    GetKalaName() {

        //alert('salllllll');
        const params = {
            asas: "asas",
        }
        const send_obj = {
            'method': 'get',
            'url': 'http://localhost/flange-back/public/main/getdata/getkalaname',
            //'url': 'http://localhost/1/3.php',
            'params': params,

        }
        axios(send_obj)
            //fetch('http://localhost/1/3.php', {
            //  method: "GET" // POST
            .then((response) => {
                this.setState({
                    products: response.data,
                });
            })
            .catch((error) => {
            });
    }
    async HandleSubmit() {

        await this.ValidatingForm();
        if (this.state.valid_form === true) {

            this.setState({
                fire: 'wait'
            });
            const send_obj = {
                'method': 'get',
                'url': 'http://localhost/flange-back/public/main/confirm/confirmpishfactor',
                'params': this.state.send_parameters,
            }

            console.log("start");
            await axios(send_obj)
                .then((response) => {
                    console.log("stop");
                    console.log(response.data);
                    if (response.data.trim() === "OK") {
                        //alert(response.data);
                        this.setState({
                            //main_response: response.data,
                            fire: 'pass'
                        });
                      
                    }



                })
                .catch((error) => {
                });
            //console.log()
        }
        //alert(this.state.valid_form);
    }
    ValidatingForm() {
        console.log(this.state.send_parameters);
        const re = /^[0-9\b]+$/;

        let valid_state = false;
        for (let item of Object.keys(this.state.send_parameters)) {
            console.log(item);
            if (this.state.send_parameters[item] !== undefined) {
                valid_state = true;
                let qty = (this.state.send_parameters[item].qty_value);
                (qty === "" || qty === undefined) ? (this.ref_kala_qty[item].innerText = "it's Empty", valid_state = false) : this.ref_kala_qty[item].innerText = "";
                if (qty !== "" && qty !== undefined) {
                    re.test(qty.trim()) === true ? this.ref_kala_qty[item].innerText = "" : (this.ref_kala_qty[item].innerText = "Error", valid_state = false);
                }
            }
        }
        this.setState({
            valid_form: valid_state
        });
        console.log(valid_state);
    }
    SetParameterValue(name, value, id) {
        this.state.send_parameters[id] = { ...this.state.send_parameters[id], [name]: value };
        this.setState({
            send_parameters: this.state.send_parameters,

        });
        console.log(this.state.send_parameters);
    }
    componentDidMount() {
        this.GetKalaName();
    }
    render() {
        // if (this.state.products === 'none') {
        //     return <div>Loading...</div>
        // }
        console.log(this.state.fire);
        if (this.state.fire === 'pass') {
            return <div>PASS OK</div>
        }
        const myRef = React.createRef();
        return (
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>نام کالا</th>
                            <th>تعداد</th>
                            <th></th>
                        </tr>
                        {this.state.ListOfRow.map((i) => (<React.Fragment key={i.key}>{i.data}</React.Fragment>))}
                        <tr>
                            <td>
                                <button className="btn btn-info" onClick={() => this.AddRow(
                                    {
                                        key: this.state.KeyOfRow,
                                        data:
                                            <tr >
                                                <td key={this.state.KeyOfRow} >{this.state.ListOfRow.length + 1}</td>
                                                <td>
                                                    <Select
                                                        options={this.state.products}
                                                        id={this.state.KeyOfRow}
                                                        ref={myRef}
                                                        onChange={(value) => (this.SetParameterValue("kala_id", value.value, myRef.current.props.id))}
                                                    /><label ref={(ref) => this.ref_kala_id.push(ref)}></label>
                                                </td>
                                                <td><input mode="number" type="text" className="form-control" id={this.state.KeyOfRow} onChange={(e) => this.SetParameterValue("qty_value", e.target.value, e.target.id)} />
                                                    <label ref={(ref) => this.ref_kala_qty.push(ref)}></label>
                                                </td>
                                                <td><button className="btn btn-warning" onClick={this.RemRow} value={this.state.KeyOfRow}>X</button>
                                                </td>
                                            </tr>
                                    })}>+
                                    </button>
                            </td>
                            <td>   </td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>

                <br />
                <button id="12345" className="btn btn-success" onClick={() => this.HandleSubmit()}>{(this.state.fire === "wait" ? "Waiting..." : "Submit")}</button>
                <br />
                <br />
                <LoadingButton id="12345" className="btn btn-success" onClick={this.HandleSubmit} loading="SUBMIT..." loaded="SUBMIT" />

                <br />
                {this.props.children}

                <br />
                <LoadingButton id="12345" className="btn btn-success" onClick={() => this.ValidatingForm()} loading="Loading..." loaded="Check" />
                <br />

            </div >
        );
    }
}
export default (Newrequest);




import React, { Component } from 'react';
import axios from 'axios';


class TableOfPishfactor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            TableOfPishfactor: 'none',
            ListOfRow: [],
            NumOfRow: 1,
            KeyOfRow: 0,
            send_parameters: {},
            valid_form: false,
            main_response: 'none',
            fire: 'ready',
            TableRow: [],
            main_status: "Loading....",
            show_rem_row: false

        };
        this.GetTableOfPishfactor = this.GetTableOfPishfactor.bind(this);
        this.HandleSubmit = this.HandleSubmit.bind(this);
        this.AddRow = this.AddRow.bind(this);
        this.RemRow = this.RemRow.bind(this);
        this.CreateRow = this.CreateRow.bind(this);
        //this.CreateRow();
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
    async GetTableOfPishfactor() {
        const send_obj = {
            'method': 'get',
            'url': 'http://localhost/flange-back/public/main/getdata/gettableofpishfactor',
            'params': { test: 'test' },
        }
        await axios(send_obj)
            .then((response) => {
                this.setState({
                    TableOfPishfactor: (response.data),
                });

                console.log(this.state.TableOfPishfactor);
            })
            .catch((error) => {
            });
    }
    CreateRow() {
        let counter = 1;
        for (let item of this.state.TableOfPishfactor) {
            this.state.TableRow.push(
                <React.Fragment>
                    <td>{counter}</td>
                    <td>{item.request_code}</td>
                    <td>{item.date}</td>
                    <td><button className="btn btn-outline-danger" onClick={() => this.setState({ show_rem_row: true })}>حذف</button></td></React.Fragment>
            );
            counter++;
            // console.log("1: " + item.request_code);
        }
        this.setState({
            TableRow: this.state.TableRow
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
    SetParameterValue(name, value, id) {
        this.state.send_parameters[id] = { ...this.state.send_parameters[id], [name]: value };
        this.setState({
            send_parameters: this.state.send_parameters,

        });
        console.log(this.state.send_parameters);
    }
    async componentDidMount() {
        await this.GetTableOfPishfactor();
        //console.log("componentDidMount");
        this.CreateRow();
        this.setState({
            main_status: ""
        });
    }
    render() {
        // console.log("render");
        // if (this.state.products === 'none') {
        //     return <div>Loading...</div>
        // }
        console.log(this.state.fire);
        if (this.state.fire === 'pass') {
            return <div>PASS OK</div>
        }
        return (
            <div>
                {this.state.main_status}
                <table className="table">
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th>شماره سفارش </th>
                            <th>تاریخ</th>
                            <th>توضیحات</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {this.state.TableRow.map(
                            (item, index) => (
                                <React.Fragment key={index}>
                                    <tr>{item}</tr>
                                    {this.state.show_rem_row ? <RemRow /> : null}
                                </React.Fragment>
                            )
                        )}
                        <tr>
                            <td>
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
                <br />
                <br />
                <br />

            </div >
        );
    }
}
export default (TableOfPishfactor);

class RemRow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <React.Fragment>
                <tr> <td>آیا مایل به حذف درخواست هستید؟</td></tr>
                <tr><td><button>بله</button><button>خیر</button></td></tr>
            </React.Fragment>
        )
    }
}


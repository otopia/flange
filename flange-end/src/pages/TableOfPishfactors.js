import React, { Component } from 'react';
import DetailOfRequest from '../pages/DetailOfRequest';
import axios from 'axios';


class TableOfPishfactor extends Component {
    reqest_number="";
    constructor(props) {
        super(props);
        this.state = {
            TableOfPishfactor: 'none',
            TableRow: [],
            main_status: "Loading....",
            show_rem_row: [],
            sub_page: 'main',
            
        };
        this.GetTableOfPishfactor = this.GetTableOfPishfactor.bind(this);
        this.YesFunc = this.YesFunc.bind(this);
        this.NoFunc = this.NoFunc.bind(this);
        this.CreateRow = this.CreateRow.bind(this);
    }
    NoFunc(index) {
        this.state.show_rem_row[index] = false;
        this.setState({
            show_rem_row: this.state.show_rem_row
        });
    }
    async YesFunc(ReqNum) {
        const send_obj = {
            'method': 'get',
            'url': 'http://localhost/flange-back/public/main/confirm/confirmcancelpishfactor',
            'params': { 'request_code': ReqNum },
        }
        //console.log("start");
        await axios(send_obj)
            .then((response) => {
                //console.log("stop");
                //console.log(response.data);
                if (response.data.return.trim() === "OK") {
                    const index1 = this.state.TableRow.findIndex(item => ((item.ReqNum === ReqNum)));
                    this.state.TableRow[index1].Row =
                        <React.Fragment>
                            <td>{index1 + 1}</td><td colSpan="3">  درخواست شماره {ReqNum} حذف گردید</td>
                        </React.Fragment>;
                    this.state.show_rem_row[index1] = false;
                    this.setState({
                        TableRow: this.state.TableRow,
                        show_rem_row: this.state.show_rem_row
                    });
                }
            })
            .catch((error) => {
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
                //console.log(this.state.TableOfPishfactor);
            })
            .catch((error) => {
            });
    }
    CreateRow() {
        let counter = 0;
        for (let item of this.state.TableOfPishfactor) {
            this.state.TableRow.push({
                ReqNum: item.request_code,
                RowNum: item.row,
                Row: <React.Fragment>
                    <td>{counter + 1}</td>
                    <td>{item.request_code}</td>
                    <td>{item.date}</td>
                    <td></td>
                    <td><button className="btn btn-outline-success" onClick={
                        () => (this.ShowDetail(item.request_code))
                    }>مشاهده جزئیات </button></td>
                    <td><button className="btn btn-outline-danger" onClick={
                        () => (this.state.show_rem_row[item.row] = true, this.setState({ show_rem_row: this.state.show_rem_row }))
                    }>لغو سفارش</button></td>
                </React.Fragment>
            });
            this.state.show_rem_row[item.row] = false;
            counter++;
        }
        this.setState({
            TableRow: this.state.TableRow,
            show_rem_row: this.state.show_rem_row
        });
    }
    ShowDetail(req_num) {
        this.reqest_number=req_num;
        this.setState({
            sub_page:'detail'
        });
        //console.log(req_num);
    }
    async componentDidMount() {
        await this.GetTableOfPishfactor();
        this.CreateRow();
        this.setState({
            main_status: ""
        });
    }
    render() {
        switch (this.state.sub_page) {
            case 'main': {
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
                                            <tr>{item.Row}</tr>
                                            {this.state.show_rem_row[index] === true ? <RemRow ReqNum={item.ReqNum} no={() => this.NoFunc(item.RowNum)} yes={() => this.YesFunc(item.ReqNum)} /> : null}
                                        </React.Fragment>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div >
                );
                break;
            }
            case 'detail': {
              return  (<DetailOfRequest request_code={this.reqest_number} />);
                break;
            }
            default: {
                //statements; 
                break;
            }
        }
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
                <tr><td colSpan="4">آیا مایل به حذف درخواست {this.props.ReqNum} هستید؟</td></tr>
                <tr><td colSpan="4"><button onClick={this.props.yes}>بله</button><button onClick={this.props.no}>خیر</button></td></tr>
            </React.Fragment>
        )
    }
}


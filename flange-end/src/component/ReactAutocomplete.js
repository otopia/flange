import React, { Component } from 'react';
import ReactAutocomplete from 'react-autocomplete';
const styles = {
    textbox: {
        color: 'blue'
    }
}
class ReactAuto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
          
        };
    }
    render() {
        const { classes } = this.props;
        return (
            <ReactAutocomplete
                items={this.props.item_data}
                shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
                getItemValue={item => item.label}
                renderItem={(item, highlighted) =>
                    <div
                        key={item.id}
                        style={{ backgroundColor: highlighted ? '#eee' : 'transparent' }}
                    >
                        {item.label}
                    </div>
                }
                value={this.state.value}
                onChange={e => (this.setState({ value: e.target.value }),this.props.onfunc( e.target.value))}
                onSelect={value => (this.setState({
                    value,
                }), this.props.onfunc(value))}

            />
        );
    }
}
export default ReactAuto;
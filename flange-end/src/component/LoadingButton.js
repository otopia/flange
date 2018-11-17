import React from 'react';
class LoadingButton extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleClick = this.handleClick.bind(this);
        this.onClick2=this.props.onClick;
        this.state = {
            isLoading: false
        };
    }
    handleClick(e) {

        this.setState({ isLoading: true });
        this.onClick2();
        //alert(e[arr[1]].value2);
        //()=>e;  
        // This probably where you would have an `ajax` call
        setTimeout(() => {
            // Completed of async action, set loading state back
            this.setState({ isLoading: false });
        }, 2000);
    }
    render() {
        const { isLoading } = this.state;
        return (
            <button
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick : null}
                className={this.props.className}
            >
                {isLoading ? this.props.loading : this.props.loaded}
            </button>
        );
    }
}

export default (LoadingButton);
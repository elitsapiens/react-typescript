import React from "react";

class ErrorHandler extends React.Component {
    state = {
        error: false
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.log('에러가 발생했습니다.');
        console.log({
            error,
            info
        });

        this.setState({error: true});
    }

    render(): React.ReactNode {
        console.log('render: ErrorHandler');
        if(this.state.error) {
            return <h1>에러발생</h1>
        }
        return this.props.children;
    }
}

export default ErrorHandler;
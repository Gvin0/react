import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        // es xdeba child componentebis chatvirtvamde
        // componentWillMount() {
        //     console.log('aq rodis shemodixar bliad');
        //     axios.interceptors.request.use(req => {
        //         this.setState({ 
        //             error: null // prosta vasuptavebt
        //         });
        //         return req;
        //     });

        //     axios.interceptors.response.use(res => res, error => {
        //         console.log('aaaaq?');
        //         this.setState({
        //             error: error
        //         });
        //         //return error;
        //     });
        // }

        // constructor(props) {
        //     super(props);
        //     axios.interceptors.request.use(req => {
        //         this.setState({ 
        //             error: null // prosta vasuptavebt
        //         });
        //         return req;
        //     });

        //     axios.interceptors.response.use(res => res, error => {
        //         console.log('aaaaq?');
        //         this.setState({
        //             error: error
        //         });
        //         //return error;
        //     });

        // }

        reqInterceptor = axios.interceptors.request.use(
            req => {
                console.log('an aaaaaaaaaaaaq');
                this.setState({error: null});
                return req;
            }
        );
        resInterceptor = axios.interceptors.response.use(
            res => {
                console.log('jandabas aq iyos');
                return res;
                },
            err => {
                console.log('aq mainc shemovideees!!!');
                this.setState({error: err})
            }
        );
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message + 'bla' : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;
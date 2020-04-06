import React from 'react';
import useHttpErrorHandler from '../../hooks/http-error-handler';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return props => {
        // kargat gavitanet useHttpErrorHandler custom hookshi
        // magalitat modalshi gamotana rom ar gvindodes da sxva pormit - prosta text
        // axal wrappers gavaketebt da iq gamoviyenebt useHttpErrorHandler_s
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <Modal
                    show={error}
                    modalClosed={clearError}>
                    {error ? error.message + 'bla' : null}
                </Modal>
                <WrappedComponent {...props} />
            </Aux>
        );
    }
}

export default withErrorHandler;
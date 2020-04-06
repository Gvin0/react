import React, { useState, useEffect } from 'react';

// usaxelo punqciaa egreve vaexportebt
export default axios => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(
        req => {
            console.log('an aaaaaaaaaaaaq');
            setError(null);
            return req;
        }
    );
    const resInterceptor = axios.interceptors.response.use(
        res => {
            console.log('jandabas aq iyos');
            return res;
        },
        err => {
            console.log('aq mainc shemovideees!!!');
            setError(err);
        }
    );

    useEffect(() => {
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor])
    const errorConfirmedHandler = () => {
        setError(null);
    }
    // aq rasac ginda imas abruneb marto arrays ara!!!
    return [error, errorConfirmedHandler]
}
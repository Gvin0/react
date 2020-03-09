import reducer from '../reducers/auth';
import * as actionTypes from '../actions/actionTypes';


describe('auth render', () => {
    it('should return the initialState', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });

    it('should store token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'blblb',
            userId: 'didididi'
        })).toEqual({
            token: 'blblb',
            userId: 'didididi',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});
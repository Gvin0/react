import React, { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from './store/actions/index';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import './App.css';

//for lazy loading
const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
})

const App = props => {
  // aq punqcias rogorc obieqts gavuketet (js shi punqcia igive obieqtia)
  // gavuketet destructur/extract radganac realurat aris dependency
  // da mtlianat prop_is gadacema ar iqneba swori
  // es ro ar vqnat mashin qvevit gakomentarebuli rac aris eg unda warning ro avicilot
  // ideuratac sworia mament zeda variant
  const { onTryAutoSignup } = props;

  useEffect(() => {
    onTryAutoSignup(); // eslint-disable-next-line
  }, [onTryAutoSignup]);


  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div >
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actionCreators.authCheckState())
  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

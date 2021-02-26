import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router} from 'react-router-dom';
import { history } from './_helpers';

import MainPage from './Components/MainPage';
import UploadPage from './Components/UploadPage';
import DonorPage from './Components/DonorPage';


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route path="/upload" component={UploadPage} />
            <Route path="/donor" component={DonorPage} />
            <Redirect from="/" to="/" />
          </Switch>
        </Router>
    </div>
  );
}

export default App;


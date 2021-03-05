import logo from './logo.svg';
import './App.css';
import './tailwind.css';
import Map from './components/Map';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NotFound from './views/404'
import Focus from './views/Focus';
import { useState } from 'react';
import Header from './components/Header';
import MobileWrapper from './components/MobileWrapper';
import Home from './views/Home';

function App() {

  const [headerTitle, setHeaderTitle] = useState("Waterfront Trail")

  return (
    <MobileWrapper>
      <BrowserRouter>
        <Header title={headerTitle} />

        <Switch>
          <Route exact path="/">
            <Home setHeaderTitle={setHeaderTitle} />
          </Route>
          <Route path="/focus/:id?" render={(props) => ( <Focus {...props} setHeaderTitle={setHeaderTitle} /> )} />
          <Route path="*" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </MobileWrapper>
  );
}

export default App;

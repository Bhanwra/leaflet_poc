import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
// temp vars
import bckGnd from './assets/images/bg.jpg';
import './tailwind.css';
import NotFound from './views/404';
import Focus from './views/Focus';
import LoadingScreen from './views/LoadingScreen';
import Main from './views/Main';
import MapInput from './views/MapInput';

function App() {

  const [headerTitle, setHeaderTitle] = useState("Waterfront Trail")
  const [headerBackground, setHeaderBackground] = useState(bckGnd)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const item = JSON.parse(localStorage.getItem('expiryTime'))
    const now = new Date()
    if(item === null){ 
    } else if (item > now.getTime()) {
      setLoading(false)
    } else if (item < now.getTime()) {
      localStorage.removeItem('expiryTime')
    }


    setTimeout(() => {
      setLoading(false)

      const now = new Date()
	    localStorage.setItem('expiryTime', JSON.stringify(now.getTime() + 60000))
    }, 3000)

  }, [])




  let dataFile = require('./assets/data.json')

  let points = (dataFile.points) ? dataFile.points : '';


  // function newLat(lat) {
  //   // console.log(`From latitude: ${lat}`);
  //   lat *= 102.3396979576883;
  //   lat -= 4411.655218044352
  //   // console.log(`To ${lat}`);
  //   return lat;
  // }
  // function newLng(lng) {
  //   //  console.log(`From longitude: ${lng}`);
  //   lng *= 347.7784013019914;
  //   lng += 27491.40703887769;
  //   // console.log(`To: ${lng}`);
  //   return lng;

  // }
  // for (let n = 1; n <= 1; n++) {
  //   console.log(points[n].coordinates);
  //   points[n].coordinates.lat = newLat(points[n].coordinates.lat);
  //   points[n].coordinates.lng = newLng(points[n].coordinates.lng);
  //   console.log(points[n].coordinates);
  // }



  return (
    <>
      {loading === false ? (
        <BrowserRouter>
          {/* <Header title={headerTitle} background={headerBackground} /> */}

          <Switch>
            <Route exact path="/">
              <Main points={points} />
            </Route>
            <Route path="/:id?" render={(props) => <Main {...props} points={points} preload={true} /> } />
            {/* <Route path="/input">
              <MapInput />
            </Route> */}
            <Route path="*" component={NotFound} />
          </Switch>

        </BrowserRouter>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default App;

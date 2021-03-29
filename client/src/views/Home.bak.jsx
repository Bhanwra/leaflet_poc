import Card from "../components/Card"
import Map from "../components/Map"

import washrooms from './../assets/images/washrooms.png'
import parks from './../assets/images/parks.png'
import beach from './../assets/images/beach.png'
import lookout from './../assets/images/lookout.png'
import parking from './../assets/images/parking.png'
import picnic from './../assets/images/picnic.png'
import restaurants from './../assets/images/restaurants.png'

const Home = (props) => {

    props.setHeaderTitle(process.env.REACT_APP_TITLE)

    return (
        <main>
            <Map />
            <h2 className="px-3">Amenities</h2>
            <section className="card-wrapper p-3">
                <Card title="Washrooms" subtitle="8 points" thumbnail={washrooms} />
                <Card title="Parks &amp; Rec" subtitle="8 points" thumbnail={parks} />
                <Card title="Parking" subtitle="8 points" thumbnail={parking} />
                <Card title="Picnic Area" subtitle="8 points" thumbnail={picnic} />
                <Card title="Beach" subtitle="8 points" thumbnail={beach} />
                <Card title="Restaurants" subtitle="8 points" thumbnail={restaurants} />
                <Card title="Lookout Area" subtitle="8 points" thumbnail={lookout} />
            </section>

            <div className="h-64"></div>
        </main>
    )
}

export default Home
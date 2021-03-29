import waterfrontlogo from './../assets/images/waterfront-logo.png'
import loadinganimation from './../assets/images/loading-animation.svg'

import background from './../assets/splash_bg.png'

import TeachingCityLogo from './../assets/brand/teaching_city.png'
import DCLogo from './../assets/brand/dc.png'
import OshawaLogo from './../assets/brand/oshawa.png'

const LoadingScreen = () => {

    return (
        <main className="min-h-screen bg-cover bg-bottom grid grid-cols-1 grid-rows-3" style={{
            backgroundImage: `url(${background})`
        }}>
            <div>
                <section className="pt-3 flex justify-center">
                    <img src={TeachingCityLogo} alt="Teaching City Oshawa Logo" className="w-36"/>
                </section>
                <section className="flex justify-evenly">
                    <img src={OshawaLogo} alt="Teaching City Oshawa Logo" className="w-36"/>
                    <img src={DCLogo} alt="Teaching City Oshawa Logo" className="w-36"/>
                </section>
            </div>
            <section className="py-4 grid grid-cols-1 text-center gap-4 mt-12">
                <p>Welcome to the</p>
                <h1 className="text-4xl">Waterfront Trail</h1>
                <img className="w-8 mx-auto mt-4" src={loadinganimation}></img>
            </section>
        </main>
    )
}

export default LoadingScreen
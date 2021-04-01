import { useState } from "react"
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/swiper-bundle.css'


const Gallery = (props) => {

    const [swiperOpen, setSwiperOpen] = useState(false)
    const [swiperObj, setSwiperObj] = useState(null)

    let imageGrid = props.images.map((image, index) => {
        return (
            <div key={`image_${index}_${new Date}`} className={`gallery-thumbnail shadow-md bg-center bg-cover px-16 h-12 mr-3 rounded-2xl cursor-pointer${ (index+1)%3 == 0 ? ' row-span-2' : '' }`} style={{backgroundImage: `url(${image})`}} onClick={() => {
                setSwiperOpen(true)
            }} ></div>
        )
    })

    SwiperCore.use([Navigation])

    let gallery = () => {

        switch(props.variant) {
            case "grid": {
                return(
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 auto-rows-fr w-full">
                        {imageGrid}
                    </div>
                )
            } case "flex": {
                return(
                    <div className="flex overflow-x-auto w-full py-3">
                        {imageGrid}
                    </div>
                )
            } default: {
                return(
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 auto-rows-fr w-full">
                        {imageGrid}
                    </div>
                )
            }
        }
    }

    return (
        <>
            {( 1==1 ) ? (
                <div className={`fixed left-0 w-full h-full transition-all ${ (swiperOpen) ? 'top-0 visible opacity-100' : 'top-8 invisible opacity-0' }`}>
                    <div className="bg-black bg-opacity-70 absolute left-0 top-0 w-full h-full flex justify-end items-start" onClick={() => { setSwiperOpen(false) }}>
                        <a className="z-50 relative bg-red-500 text-white p-3 inline-block m-3 font-medium shadow-lg hover:bg-red-700 cursor-pointer transition">CLOSE</a>
                    </div>
                    <div className="swiper flex justify-center items-center h-full w-full">
                        <Swiper
                            slidesPerView={1}
                            navigation
                            onSwiper={setSwiperObj}>
                            {
                                props.images.map((image, index) => {
                                    return (
                                        <SwiperSlide className="m-auto" key={`image_${index}_${new Date}`}>
                                            <div className="flex justify-center items-center w-full p-5">
                                                <img src={image} className="shadow-lg" />
                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </div>
            ) : ('')}
            {gallery()}
        </>
    )

}

export default Gallery
const AmenitiesCard = (props) => {

    return (
        <div className="w-full px-2" onClick={props.clicked.bind('msg')}>
            <div className="flex items-center h-16 w-full shadow-lg overflow-hidden rounded-lg py-3 px-6 mb-4 bg-gray-100">
                <div className="card-thumbnail w-1/12 mr-3 bg-no-repeat" style={{backgroundImage: `url(${props.thumbnail})`}}></div>
                <div className="card-info w-11/12">
                    <h3 className="tracking-wide font-medium text-theme-grey-700">{props.title}</h3>
                </div>
            </div>
        </div>
    )
}

export default AmenitiesCard
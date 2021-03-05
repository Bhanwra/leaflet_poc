import { Link } from "react-router-dom"

const Card = (props) => {

    console.log(props.thumbnail)

    return (
        <Link to="/focus/123">
            <div className="card flex-none w-32 flex-col justify-center shadow-lg overflow-hidden rounded-2xl mr-4 mb-4 bg-white">
                <div className="card-thumbnail bg-center bg-cover" style={{backgroundImage: `url(${props.thumbnail})`}}></div>
                <div className="card-info px-3 py-2">
                    <h3 className="tracking-wide font-medium">{props.title}</h3>
                    <p className="tracking-wide text-sm text-gray-400">{(props.subtitle) ? props.subtitle : '-' }</p>
                </div>
            </div>
        </Link>
    )
}

export default Card
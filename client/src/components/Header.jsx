import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Header = (props) => {
    
    const history = useHistory()

    return (
        <header className="bg-indigo-300 bg-cover bg-center" style={{backgroundImage: `url(${props.background})`}}>
            <div className="header-content">
                <div className="h-52"></div>

                <div className="brand p-5">
                    {/* <p onClick={history.goBack}>Back</p> */}
                    <h1 className="font-bold text-white text-4xl tracking-widest">{ props.title }</h1>
                    <p className="text-white tracking-widest">{props.subtitle}</p>
                </div>
                <div className="h-8 ribbon"></div>
            </div>
        </header>
    )
}

export default Header
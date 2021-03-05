import { useHistory } from "react-router-dom";

const Header = (props) => {
    
    const history = useHistory()

    return (
        <header className="p-5 bg-indigo-300">
            <p onClick={history.goBack}>Back</p>
            <h1 className="text-2xl tracking-widest uppercase">{ props.title }</h1>
        </header>
    )
}

export default Header
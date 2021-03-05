import axios from "axios";
import { Component } from "react";
import { useParams } from "react-router-dom";

export default class Focus extends Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            response: ""
        }
    }

    componentDidMount() {
        let url = (typeof this.props.match.params.id === "undefined" ) 
            ? process.env.REACT_APP_API_ROOT+"focus" 
            : process.env.REACT_APP_API_ROOT+"focus/"+this.props.match.params.id

        console.log(url)
        axios.get(url)
            .then(response => {
                this.setState({
                    title: response.data.title,
                    response: response.data
                })

                this.props.setHeaderTitle(this.state.title)
            })
            .catch(error => {
                console.error(error)
            })
    }

    render() {
        return (
            <>
            { JSON.stringify(this.state.response) }
            </>
        )
    }

}
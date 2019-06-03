import React from "react";
import loader from "../images/loader.gif"

class Loader extends React.Component {
    render() {
        return (
            <img src={loader} alt="" id="loader" />
        )
    }
}

export default Loader;
import React from 'react'
import './LoadingIcon.css'

// Doing this lazy way
function LoadingIcon(props) {
    return (<React.Fragment>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </React.Fragment>)
}

export default LoadingIcon
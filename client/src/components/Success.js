import React from 'react'

function Success({ message }) {
    return (
        <div>
            <div className='alert alert-success' role='alert' style={{ marginTop: "50px" }}>
                {message}
            </div>
        </div>
    );
}

export default Success
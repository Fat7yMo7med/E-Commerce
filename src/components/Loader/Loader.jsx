import React from 'react'
import { ThreeDots } from 'react-loader-spinner';

export default function Loader() {
    return (
        <div className="d-flex justify-content-center vh-100 align-items-center">
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#dada0bff"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

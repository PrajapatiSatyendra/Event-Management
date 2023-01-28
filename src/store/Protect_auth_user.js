import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Protect_auth_user = (props) => {
    const navigation = useNavigate()
    const { Component } = props
    useEffect(() => {
        const storedToken = localStorage.getItem('userID');
        // const storedExpirationDate = localStorage.getItem('expirationTime');
        const storedUserId = localStorage.getItem('Token');
        const isLoggedIn = localStorage.getItem('IsLoggedIn');
        // if (!storedUserId) {
        if (!storedToken || !storedUserId) {

            navigation('/')

        } else {
            if (isLoggedIn === false) {

                navigation('/')
            }
        }
    }, [])

    return (
        <div>

            <Component />
        </div>
    )
}

export default Protect_auth_user
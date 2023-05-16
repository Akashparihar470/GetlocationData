import React from 'react'
import { Route, Routes } from 'react-router'
import Customer from './Customer';
import ServiceProvider from "./serviceProvider";
import Registerpage from './Registerpage';
import LoginPage from './Loginpage';

function Allroutes() {
    return (
        <Routes>
            <Route path="/customer" element={<Customer />} />
            <Route path="/serviceProvider" element={<ServiceProvider/>} />
            <Route path='/register' element={<Registerpage/>}/>
            <Route path='/' element = {<LoginPage/>} />
        </Routes>
    )
}

export default Allroutes

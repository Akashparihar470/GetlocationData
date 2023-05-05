import React from 'react'
import { Route, Routes } from 'react-router'
import Customer from './Customer';
import ServiceProvider from "./serviceProvider";

function Allroutes() {
    return (
        <Routes>
            <Route path="/customer" element={<Customer />} />
            <Route path="/serviceProvider" element={<ServiceProvider/>} />
        </Routes>
    )
}

export default Allroutes

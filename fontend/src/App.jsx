import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Login } from './Pages/Login'
import { AdminLogin } from './Pages/AdminLogin'
import { CreateService } from './Pages/CreateService'
import { VehicalProfile } from './Pages/VehicalProfile'
import { UserProvider } from './UserContext'
import { Sample } from './Pages/Sample'
import { VehicalRegister } from './Pages/VehicalRegister'
import { VehicalDetails } from './Pages/VehicalDetails'
import ServiceDetails from './Pages/ServiceDetails'
import { ServiceProfile } from './Pages/ServiceProfile'
import { ItemRegister } from './Pages/ItemRegister'
import { Dashboard } from './Pages/Dashboard'
import { VehiclePartDetails } from './Pages/VehiclePartDetails'
import { VehicleUpdate } from './Pages/VehicleUpdate'
import { UpdateVehiclePart } from './Pages/UpdateVehiclePart'
import UpdateService from './Pages/UpdateService'










const App = () => {
  return (
    <div>

     
       <UserProvider>
       <Routes>
          <Route index path='/' element={<Login/>} />
          <Route index path='/login' element={<Login/>} />
          <Route index path='/adminlogin' element={<AdminLogin/>} />
          <Route index path='/createservice' element={<CreateService/>} />
          <Route index path='/vehicalprofile' element={<VehicalProfile/>} />
          <Route index path='/vehical' element={<VehicalRegister/>} />
          <Route index path='/vehicaldetails' element={<VehicalDetails/>} />
          <Route index path='/servicedetails' element={<ServiceDetails/>} />
          <Route index path='/serviceprofile/:id' element={<ServiceProfile/>} />
          <Route index path='/itemregister' element={<ItemRegister/>} />
          <Route index path='/dashboard' element={<Dashboard/>} />
          <Route index path='/vehiclepartdetails' element={<VehiclePartDetails/>} />
          <Route index path='/updatevehicle/:id' element={<VehicleUpdate/>} />
          <Route index path='/updatevehiclepart/:id' element={<UpdateVehiclePart/>} />
          <Route index path='/updateservice/:id' element={<UpdateService/>} />
          <Route index path='/sample/:id' element={<Sample/>} />

          
        </Routes>
       </UserProvider>
      
    </div>
  )
}

export default App
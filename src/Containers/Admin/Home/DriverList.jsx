import React from 'react'
import UserListPage from '../../../Components/Admin/UserListPage'
import { getDrivers } from '../../../Utils/urls'

function DriverList() {
  return (
    <div>
      <UserListPage path={getDrivers}/>
    </div>
  )
}

export default DriverList
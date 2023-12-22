import React from 'react'
import UserListPage from '../../../Components/Admin/UserListPage'
import { getUsers } from '../../../Utils/urls'

function UserList() {
  return (
    <div>
      <UserListPage path={getUsers}/>
    </div>
  )
}

export default UserList
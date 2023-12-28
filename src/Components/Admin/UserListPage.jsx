
import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "../../Utils/axios";
import AdminSideBar from "../../Components/Admin/AdminSideBar";
import Button from '@mui/material/Button';

function UserListPage( props) {
  const {path} = props
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRow, setFilteredRow] = useState([]);
  const [blocked, setBlocked] = useState(false);

  const fetchData = async () => {
    try {
      const url = searchTerm
        ? path + `?search=${searchTerm}`
        : path;
      console.log(url);
      const res = await axios.get(url);
      console.log(res.data);
      setFilteredRow(res.data);
    } catch (error) {
      console.log(error, "the error");
    }
  };

  const blockData = async (userId) => {
    try {
      const res = await axios.patch(`/api/user/user-block/${userId}/`);
      if (res.status == 200) {
        // setUserStatus(true)
        setBlocked(!blocked);
      }
    } catch (error) {
      console.log(error, "eooorooooroo");
    }
  };

  const styles = {
    searchContainer: {
      marginTop: "20px",
      marginRight: "8px",
    },
    active: {
      color: "green",
    },
  };

  useEffect(() => {
    fetchData();
  }, [blocked,searchTerm]);

  const blockFunction = (UserId) => {
    blockData(UserId);
  };

  return (
    <>
    <div style={{display:"flex"}}>
      <div style={{flexBasis:".5",paddingRight:"60px"}}>
      <AdminSideBar/>   
      </div>   
      <div style={{flexBasis:"1.5"}}>
    
      <div
        className={`d-flex align-items-center p-4  ${styles.searchContainer}`}
      >
        <div className="data-grid-container">
          <div className="header d-flex justify-content-between align-items-center mb-4">
            <br />
            <div className="d-flex align-items-center">
              <input
                type="text"
                placeholder="Search User"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control"
                style={{ marginRight: "8px",marginLeft:"34px" }}
              />
              <button className="btn btn-primary"  onClick={fetchData}>
                <FaSearch className="search-icon" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="container px-5"  >
        <div className="container mx-auto ">
        
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  ID
                </th>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  First Name
                </th>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  Email
                </th>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  Phone
                </th>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  Joined Date
                </th>
                <th className="py-2 px-4 border-r border-t border-gray-300">
                  Status
                </th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRow.length > 0 ? (
                filteredRow.map((user) => (
                  <tr key={user.id}>
                    <td className="py-2 px-4 border-r border-t border-gray-300">
                      {user.id}
                    </td>
                    <td className="py-2 px-4 border-r border-t border-gray-300">
                      {user.first_name}
                    </td>
                    <td className="py-2 px-4 border-r border-t border-gray-300">
                      {user.email}
                    </td>
                    <td className="py-2 px-4 border-r border-t border-gray-300">
                      {user.phone}
                    </td>
                    <td className="py-2 px-4 border-r border-t border-gray-300">
                      {user.date_joined}
                    </td>
                    {user.is_active ? (
                      <td
                        className={`py-2 px-4 border-r border-t border-gray-300 `}
                        style={{color:"green"}}
                      >
                        Active
                      </td>
                    ) : (
                      <td className="py-2 px-4 border-r border-t border-gray-300"
                      style={{color:"red"}}>
                        Blocked
                      </td>
                    )}

                    <td className="py-2 px-4 border-t">
                      {user.is_active ? (
                    
                        <Button variant="outlined" color="error"
                          onClick={() => blockFunction(user.id)}>
                        Block
                      </Button>
                      ) : (

                        <Button variant="contained" color="success"
                          onClick={() => blockFunction(user.id)}
                        >
                          Unblock   
                      </Button>
                      )}

                   </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-white border-b hover:bg-gray-200">
                  <td
                    colSpan={8}
                    className="px-6 py-4 font-medium text-gray-900 text-center"
                  >
                    No users Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      </div>
      </div>   
    </>
  );
}

export default UserListPage;

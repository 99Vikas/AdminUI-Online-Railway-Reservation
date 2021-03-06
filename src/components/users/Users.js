import React, { useState, useEffect } from "react";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import Search from "@material-ui/icons/Search";
import PageHeader from "../pageHeader/PageHeader";
import useTable from "../useTable/useTable";
import Controls from "../controls/Controls";
import Popup from "../controls/Popup";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import CardTravelIcon from "@material-ui/icons/CardTravel";
// import AddTrip from './AddTrip'
import PeopleIcon from "@material-ui/icons/People";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
} from "@material-ui/core";
import AddUser from "./AddUser";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    background:'#b3c6ff',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    backgroundColor:'white',
    width: "75%",
  },
  newButton: {
    background:'#b9e03a',
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "ic", label: "Id" },
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "dob", label: "DOB" },
  { id: "mobile", label: "Mobile" },
  { id: "role", label: "Role" },
  { id: "action", label: "Action" },
];

function Users() {
  const classes = useStyles();
  const [userForEdit, setUserForEdit] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAdd, setIsAdd] = useState(false)
  const [open, setOpen] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const loadUsers = async () => {
    try {
      const users = await axios.get("http://localhost:8084/user/getAll", {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWthc0BnbWFpbC5jb20iLCJleHAiOjE2MTk3OTM5NTIsImlhdCI6MTYxOTc1Nzk1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.hE7guiOr8kkg-L63ieqlpEG0p3atdV6ZgkklB99o_gE",
        },
      });
      setUsers(users.data);
      console.log(users.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadUsers();
    console.log(open);
  }, []);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(users, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.email.includes(target.value));
      },
    });
  };


  const updateUser = async (user) => {
    console.log(user.name + " " + user.number + " " );
    console.log(JSON.stringify(user) + "data");
    const updatedUser = axios.put("http://localhost:8084/user/update/"+userForEdit.id,user,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWthc0BnbWFpbC5jb20iLCJleHAiOjE2MTk3OTM5NTIsImlhdCI6MTYxOTc1Nzk1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.hE7guiOr8kkg-L63ieqlpEG0p3atdV6ZgkklB99o_gE",
      },
    })
    return updatedUser;
  }

  const addUser = (user) => {
    console.log(JSON.stringify(user));
    const newUser = axios.post("http://localhost:8084/user/add",user,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWthc0BnbWFpbC5jb20iLCJleHAiOjE2MTk3OTM5NTIsImlhdCI6MTYxOTc1Nzk1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.hE7guiOr8kkg-L63ieqlpEG0p3atdV6ZgkklB99o_gE",
      },
    })
    console.log( newUser.data + "new");
    return newUser;
  };

  const deleteUser = (user) => {
    console.log(user + " delete");
    const deletedUser = axios.delete("http://localhost:8084/user/delete/"+user.id,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWthc0BnbWFpbC5jb20iLCJleHAiOjE2MTk3OTM5NTIsImlhdCI6MTYxOTc1Nzk1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.hE7guiOr8kkg-L63ieqlpEG0p3atdV6ZgkklB99o_gE",
      },
    })
  }

  const addOrEdit = (user, isAdd) => {
    if(isAdd){
      const newUser = addUser(user);
      console.log(newUser);
    }else{
      const updatedUser = updateUser(user);
      console.log(user + "addOrEdit");
    }
  };

  const getName = (firstName, lastName) => {
      return firstName + " " + lastName;
  }

  const onClickBtn = () => {
    setOpen(true);
    setUserForEdit(null);
    setIsAdd(true)
    console.log(open);
  };

  const openInPopup = (item) => {
    setOpen(true);
    setIsAdd(false)
    setUserForEdit(item);
    console.log(open);
  };

  const getDOB = (dateString) => {
    const date = new Date(dateString);
    return date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
  }

  return (
    <div style={{marginTop:'4%', width:'100%'}}>
      <PageHeader
        title="Users"
        subTitle="List of registered users."
        icon={<PeopleIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            label="Search Users"
            placeholder="Enter email"
            className={classes.searchInput}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleSearch}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{getName(item.firstName, item.lastName)}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{getDOB(item.dob)}</TableCell>
                <TableCell>{item.mobileNumber}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <Button
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Button>
                  <Button color="secondary"
                    onClick={()=>{
                      setUserForEdit(item)
                      deleteUser(item)
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <Popup title="Add User" openPopup={open} setOpenPopup={setOpen}>
        <AddUser userForEdit={userForEdit} addOrEdit={addOrEdit} setOpen={setOpen} isAdd={isAdd}/>
      </Popup>
    </div>
  );
}

export default Users;

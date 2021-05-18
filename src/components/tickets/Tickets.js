import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "@material-ui/icons/Search";
import PageHeader from "../pageHeader/PageHeader";
import useTable from "../useTable/useTable";
import Controls from "../controls/Controls";
import CloseIcon from "@material-ui/icons/Close";
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
// import AddUser from "./AddUser";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    background:'#b3c6ff',
    margin: theme.spacing(1),
    padding: theme.spacing(1),
  },
  searchInput: {
    backgroundColor:"white",
    width: "75%",
  },
  newButton: {
    background:'#b9e03a',
    position: "absolute",
    right: "10px",
  },
}));

const headCells = [
  { id: "pnr", label: "PNR" },
  { id: "tripScheduleId", label: "TripSchedule Id" },
  { id: "fromStationCode", label: "From" },
  { id: "toStationCode", label: "To" },
  { id: "journeyDate", label: "Journey Date" },
  { id: "status", label: "Status" },
  { id: "cancellable", label: "Cancellable" },
  { id: "class", label: "Class" },
  { id: "seats", label: "Seats" },
  { id: "action", label: "Action" },
];

function Tickets() {
  const classes = useStyles();
  const [tickets, setTickets] = useState([]);
  const [open, setOpen] = useState();
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const loadTickets = async () => {
    try {
      const tickets = await axios.get("http://localhost:8084/booking/getAll", {
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWthc0BnbWFpbC5jb20iLCJleHAiOjE2MTk3OTM5NTIsImlhdCI6MTYxOTc1Nzk1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.hE7guiOr8kkg-L63ieqlpEG0p3atdV6ZgkklB99o_gE",
        },
      });
      setTickets(tickets.data);
      console.log(tickets.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadTickets();
    console.log(open);
  }, []);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(tickets, headCells, filterFn);

  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else return items.filter((x) => x.pnr.includes(target.value));
      },
    });
  };

  const deleteTicket = (ticket) => {
    console.log(ticket + " delete");
    const deletedTicket = axios.delete("http://localhost:8084/booking/delete/"+ticket.ticketId,{
      mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ2aWthc0BnbWFpbC5jb20iLCJleHAiOjE2MTk3OTM5NTIsImlhdCI6MTYxOTc1Nzk1MiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9BRE1JTiJdfQ.hE7guiOr8kkg-L63ieqlpEG0p3atdV6ZgkklB99o_gE",
      },
    })
    loadTickets()
    console.log(deletedTicket.data);
    console.log(tickets);
  }

  const getClass = (seats)=>{
    return Object.keys(seats)[0];
  }
  return (
    <div style={{marginTop:'4%', width:'100%'}}>
      <PageHeader
        title="Tickets"
        subTitle="List of booked tickets."
        icon={<PeopleIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        {/* <EmployeeForm /> */}
        <Toolbar>
          <Controls.Input
            label="Search Tickets"
            placeholder="Enter PNR"
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
              <TableRow key={item.ticketId}>
                <TableCell>{item.pnr}</TableCell>
                <TableCell>{item.tripScheduleId}</TableCell>
                <TableCell>{item.fromStationCode}</TableCell>
                <TableCell>{item.toStationCode}</TableCell>
                <TableCell>{item.journeyDate}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.cancellable ? "Yes" : "No"}</TableCell>
                <TableCell>{getClass(item.seats)}</TableCell>
                <TableCell>{item.seats[getClass(item.seats)]}</TableCell>
                <TableCell>
                  <Button color="secondary"
                    onClick={()=>{
                      deleteTicket(item)
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
    </div>
  );
}

export default Tickets;

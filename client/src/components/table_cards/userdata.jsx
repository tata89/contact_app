import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  txtcls: {
    float: "left",
    paddingLeft: "10px",
    paddingTop: "10px",
  },
});
const UseTbl = ({ user_data }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Created_date</TableCell>
            <TableCell align="left">Number</TableCell>
            <TableCell align="left">Incoming call count</TableCell>
            <TableCell align="left">Location</TableCell>
            <TableCell align="left">Outgoing call count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {user_data.map((usr) => (
            <TableRow key={usr.id}>
              <TableCell component="th" scope="row">
                {" "}
                <Avatar style={{ float: "left" }}>
                  {usr.name.slice(0, 1).toUpperCase()}
                </Avatar>
                <div className={classes.txtcls}>{usr.name}</div>{" "}
              </TableCell>
              <TableCell align="left">{usr.created_date}</TableCell>
              <TableCell align="left">{usr.number}</TableCell>
              <TableCell align="left">{usr.incoming_call_count}</TableCell>
              <TableCell align="left">{usr.location}</TableCell>
              <TableCell align="left">{usr.outgoing_call_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default UseTbl;

import React, { Component } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from '../AdminDashboard/Title';
import axios from 'axios';
import { serverURL } from "../../utils/config";
import {getFormattedDate} from '../../utils/helper'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



class AdminBookings extends Component{

    state = {
        bookingsData: []
      }

    async componentDidMount(){
        try {
            //console.log("selected hotel: "+this.props.selectedHotel)
            const res = await axios.get(`${serverURL}/employee/bookings`);
            console.log("bookings data fetched : "+ res);
            this.setState({bookingsData: res.data});
          } catch (err) {
            console.log("Error while fetching bookings data "+err);
          }
    }

    render(){
        // console.log("selected hotel render : "+this.props.hotelData)
        return(
            <React.Fragment>
            <Title>Recent Bookings</Title>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Customer</StyledTableCell>
                  <StyledTableCell align="left">Location&nbsp;</StyledTableCell>
                  <StyledTableCell align="left">Start date&nbsp;</StyledTableCell>
                  <StyledTableCell align="left">End date&nbsp;</StyledTableCell>
                  {/* <StyledTableCell align="left">Room type&nbsp;</StyledTableCell> */}
                  <StyledTableCell align="left"># of Guests&nbsp;</StyledTableCell>
                  <StyledTableCell align="left">Amount&nbsp;</StyledTableCell>
                  <StyledTableCell align="left">Created At&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.bookingsData.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell align="left">{row.customerName}</StyledTableCell>
                    <StyledTableCell align="left">{row.hotelName}</StyledTableCell>
                    <StyledTableCell align="left">{getFormattedDate(row.startDate)}</StyledTableCell>
                    <StyledTableCell align="left">{getFormattedDate(row.endDate)}</StyledTableCell>
                    {/* <StyledTableCell align="left">{row.room.Room}</StyledTableCell> */}
                    <StyledTableCell align="left">{row.noOfGuests}</StyledTableCell>
                    <StyledTableCell align="left">{row.finalCost}</StyledTableCell>
                    <StyledTableCell align="left">{getFormattedDate(row.created)}</StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </React.Fragment>)
    }
}

export default AdminBookings;
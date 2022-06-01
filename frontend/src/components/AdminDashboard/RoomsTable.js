import React, { Component } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Title from './Title';
import AddRoomModal from './AddRoomModal';
import UpdateRoomModal from './UpdateRoomModal';

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



class RoomsTable extends Component{

    async componentDidMount(){
        try {
            //console.log("selected hotel: "+this.props.selectedHotel)
            // const res = await axios.get(`${serverURL}/employee/hotels`);
            // console.log("hotels data fetched : "+ res);
            // this.setState({hotelsData: res.data});
          } catch (err) {
            console.log("Error while fetching rooms data");
          }
    }

    onAddingRoom = () => {
      console.log("room state changed");
      this.props.onAddingRoom();
    }

    render(){
        console.log("selected hotel render : "+this.props.roomsData)
        return(
            <React.Fragment>

            <Title>Rooms</Title>
            <AddRoomModal onAddingRoom={this.onAddingRoom} selectedHotel={this.props.selectedHotel}/>
            <br/>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Type</StyledTableCell>
                  <StyledTableCell align="right">Base rent&nbsp;</StyledTableCell>
                  <StyledTableCell align="right"># of Guests&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">Room count&nbsp;</StyledTableCell>
                  <StyledTableCell align="right">Action&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.roomsData.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="right">{row.roomType}</StyledTableCell>
                    <StyledTableCell align="right">{row.baseRent}</StyledTableCell>
                    <StyledTableCell align="right">{row.noOfGuests}</StyledTableCell>
                    <StyledTableCell align="right">{row.roomCount}</StyledTableCell>
                    <StyledTableCell align="right"><UpdateRoomModal onAddingRoom={this.onAddingRoom} room={row}/></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </React.Fragment>)
    }
}

export default RoomsTable;
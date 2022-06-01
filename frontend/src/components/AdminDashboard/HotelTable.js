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
import LocationModal from './LocationModal';

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


class HotelTable extends Component{

    state = {
      isLocationAdded: false
    }

    async componentDidMount(){
        try {
            console.log("selected hotel: "+this.props.selectedHotel)
            const res = await axios.get(`${serverURL}/employee/hotels`);
            console.log("hotels data fetched : "+ res);
            this.setState({hotelsData: res.data});
          } catch (err) {
            console.log("Error while fetching rooms data");
          }
    }

    onAddingLocation = () => {
      console.log("hotel state changed");
      this.props.onAddingLocation();
    }


    render(){
        console.log("selected hotel render : "+this.props.hotelData)
        return(
            <React.Fragment>
            <Title>Locations</Title>
            <LocationModal onAddingLocation={this.onAddingLocation}/>
            <br/>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Location</StyledTableCell>
                  <StyledTableCell align="left">Description&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.props.hotelData.map((row) => (
                  <StyledTableRow onClick={() => this.props.handleHotelClick(row)} key={row.name}>
                    <StyledTableCell align="left">{row.location}</StyledTableCell>
                    <StyledTableCell align="left">{row.description}</StyledTableCell>

                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </React.Fragment>)
    }
}

export default HotelTable;
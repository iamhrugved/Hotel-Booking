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
import UpdateAmenityModal from './UpdateAmenityModal'
import axios from 'axios';
import { serverURL } from "../../utils/config";
import AddAmenityModal from './AddAmenityModal';

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



class AmenitiesTable extends Component{

    state = {
      amenitiesData: []
    }

    onUpdatingAmenity = () => {
        this.refreshAmenity();
    }

    async componentDidMount(){
        try {
            //console.log("selected hotel: "+this.props.selectedHotel)
            const res = await axios.get(`${serverURL}/employee/amenities`);
            console.log("amenities data fetched : "+ res);
            this.setState({amenitiesData: res.data});
          } catch (err) {
            console.log("Error while fetching amenities data "+err);
          }
    }

    refreshAmenity = async () => {
      try {
        //console.log("selected hotel: "+this.props.selectedHotel)
        const res = await axios.get(`${serverURL}/employee/amenities`);
        console.log("amenities data fetched : "+ res);
        this.setState({amenitiesData: res.data});
      } catch (err) {
        console.log("Error while fetching amenities data "+err);
      }
    }

    render(){
        console.log("selected hotel render : "+this.props.roomsData)
        return(
            <React.Fragment>
            <Title>Amenities</Title>
            <AddAmenityModal />
            <br/>

            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Charge&nbsp;</StyledTableCell>
                  <StyledTableCell align="left">Action&nbsp;</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.amenitiesData.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align="left">{row.name}</StyledTableCell>
                    <StyledTableCell align="left">{row.charge}</StyledTableCell>
                    <StyledTableCell align="left"><UpdateAmenityModal onUpdatingAmenity={this.onUpdatingAmenity} amenity={row}/></StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </React.Fragment>)
    }
}

export default AmenitiesTable;
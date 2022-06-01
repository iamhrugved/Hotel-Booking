import React, { Component } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import RoomsTable from './RoomsTable';
import { serverURL } from "../../utils/config";
import axios from 'axios';
import Title from './Title';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LocationModal from './LocationModal';
import HotelTable from './HotelTable';
import AmenitiesTable from './AmenitiesTable';
import AdminBookings from '../AdminBookings/AdminBookings';

class DashboardContent extends Component {

   state = {
    open: true,
    selectedHotel: "",
    isLocationAdded: false,
    hotelsData: [],
    roomsData:[]
   }

   onAddingLocation = () => {
    console.log("hotel state changed!!!!");
    // this.setState({isLocationAdded: true})
    this.refreshHotel();
  }

  onAddingRoom = () => {
    console.log("room state changed!!!!");
    // this.setState({isLocationAdded: true})
    this.refreshRoomData();
  }

    drawerWidth = 240;

   AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: this.drawerWidth,
      width: `calc(100% - ${this.drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

   Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: this.drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

   StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

   StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  handleHotelClick = async (hotel) => {
      console.log("hotel clicked")
      try {
        const res = await axios.get(`${serverURL}/employee/rooms/${hotel._id}`);
        console.log("room data fetched : "+ res);
        this.setState({roomsData: res.data});
      } catch (err) {
        console.log("Error while fetching rooms data");
      }

      this.setState({selectedHotel: hotel._id});
    }


  refreshRoomData =   async () => {
    console.log("hotel refreshed")
    try {
      const res = await axios.get(`${serverURL}/employee/rooms/${this.state.selectedHotel}`);
      console.log("room data fetched : "+ res);
      this.setState({roomsData: res.data});
    } catch (err) {
      console.log("Error while fetching rooms data");
    }

    // this.setState({selectedHotel: hotel._id});
  }

  async componentDidMount(){
    // try {
    //     const res = await axios.get(`${serverURL}/employee/hotels`);
    //     console.log("hotels data fetched : "+ res);
    //     this.setState({hotelsData: res.data});
    //   } catch (err) {
    //     console.log("Error while fetching hotels data");
    //   }

    this.refreshHotel()
  }

   refreshHotel = async () => {
    try {
      const res = await axios.get(`${serverURL}/employee/hotels`);
      console.log("hotels data fetched : "+ res);
      this.setState({hotelsData: res.data});
    } catch (err) {
      console.log("Error while fetching hotels data");
    }
   }

   mdTheme = createTheme();

    toggleDrawer = () => {
      console.log("Called hhereeerererer")
      this.setState({open: !this.state.open});
    };


    StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));

    renderHotels = () => {

      const hotels = this.state.hotelsData;
      console.log("hotels data : "+ hotels);
      return(<React.Fragment>
          <Title>Locations</Title>
          <LocationModal />
          <Table size="small">

                <TableBody>
                {hotels.map((hotel) => (
                    <TableRow key={hotel._id}>
                    <TableCell onClick={() => this.handleHotelClick(hotel)}>{hotel.location}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </React.Fragment>);
  }



    render(){
    return (
      <ThemeProvider theme={this.mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <this.AppBar position="absolute" open={this.state.open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={this.toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(this.state.open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Admin
              </Typography>
              <IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Toolbar>
          </this.AppBar>
          <this.Drawer variant="permanent" open={this.state.open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                px: [1],
              }}
            >
              <IconButton onClick={this.toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              {mainListItems}
              {/* <Divider sx={{ my: 1 }} /> */}

            </List>
          </this.Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                {/* Chart */}
                <Grid item xs={12} >
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',

                    }}
                  >
                      {/* {this.renderHotels()} */}
                      <HotelTable hotelData={this.state.hotelsData}
                                  handleHotelClick={this.handleHotelClick}
                                  onAddingLocation={this.onAddingLocation}/>
                    {/* <Chart /> */}
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
                {/* <Grid item xs={12} md={4} lg={3}>
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    // {/* <Deposits /> */}
                  {/* </Paper>
                </Grid> */}
                {/* Recent Orders */}
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <RoomsTable roomsData={this.state.roomsData}
                                selectedHotel={this.state.selectedHotel}
                                onAddingRoom={this.onAddingRoom}/>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <AmenitiesTable />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <AdminBookings />
                  </Paper>
                </Grid>
              </Grid>

            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    )
    };
  }


export default DashboardContent;
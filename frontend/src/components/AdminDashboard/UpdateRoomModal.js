import React, { Component } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { serverURL } from "../../utils/config";
import EditButton from '@mui/icons-material/Edit';


class UpdateRoomModal extends Component{

    state = {
        open: false,
        location: ""
    }

    handleClickOpen = () => {
        this.setState({open:true});
    }

    handleClose = () => {
        this.setState({open:false});
    }

    handleSubmit = async () => {
        try {
            const res = await axios.put(`${serverURL}/employee/updateRoom`, this.state);
            console.log("res from add hotel : "+ res);
            this.props.onAddingRoom();
            this.handleClose();
            // this.setState({hotelsData: res.data});
          } catch (err) {
            console.log("Error while fetching hotels data "+err);
          }
          this.handleClose();
    }

    onFieldChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    async componentDidMount(){
        try {
            this.setState(this.props.room);
          } catch (err) {
            console.log("Error while fetching hotels data");
          }
    }

    render(){
        return (
            <div>
              <EditButton variant="outlined" onClick={this.handleClickOpen} />
              <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Room</DialogTitle>
                <DialogContent>

                  <TextField
                    autoFocus
                    margin="dense"
                    id="roomType"
                    name="roomType"
                    label="Type"
                    value={this.state.roomType}
                    onChange={this.onFieldChange}
                    type="text"

                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="baseRent"
                    name="baseRent"
                    label="Base Rent"
                    value={this.state.baseRent}
                    onChange={this.onFieldChange}
                    type="text"

                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="noOfGuests"
                    name="noOfGuests"
                    label="Number of Guests"
                    value={this.state.noOfGuests}
                    onChange={this.onFieldChange}
                    type="text"

                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="roomCount"
                    name="roomCount"
                    label="Room count"
                    value={this.state.roomCount}
                    onChange={this.onFieldChange}
                    type="text"

                    variant="standard"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose}>Cancel</Button>
                  <Button onClick={this.handleSubmit}>Submit</Button>
                </DialogActions>
              </Dialog>
            </div>
          );
    }
}

export default UpdateRoomModal;
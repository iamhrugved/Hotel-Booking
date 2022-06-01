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

class LocationModal extends Component{

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
            const res = await axios.post(`${serverURL}/employee/addHotel`,
                        {
                            name: this.state.location,
                            location: this.state.location,
                            description: this.state.description
                        });
            console.log("res from add hotel : "+ res);
            this.props.onAddingLocation();
            this.handleClose();
            // this.setState({hotelsData: res.data});
          } catch (err) {
            console.log("Error while fetching hotels data "+err);
          }
    }

    onFieldChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render(){
        return (
            <div>
              <Button variant="outlined" onClick={this.handleClickOpen}>
                Add
              </Button>
              <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle>Add Location</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter the location
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="location"
                    name="location"
                    label="Location"
                    value={this.state.location}
                    onChange={this.onFieldChange}
                    type="text"

                    variant="standard"
                  />
                  <TextField

                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    value={this.state.description}
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

export default LocationModal;
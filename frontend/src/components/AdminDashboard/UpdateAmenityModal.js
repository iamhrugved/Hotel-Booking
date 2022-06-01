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
            const res = await axios.put(`${serverURL}/employee/amenity`, this.state);
            console.log("res from update amenity : "+ res);
            this.handleClose();
            // this.setState({hotelsData: res.data});
          } catch (err) {
            console.log("Error while update amenity data "+err);
          }
          this.props.onUpdatingAmenity();
          this.handleClose();
    }

    onFieldChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    async componentDidMount(){
        try {
            this.setState(this.props.amenity);
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
                    id="name"
                    name="name"
                    label="Name"
                    value={this.state.name}
                    onChange={this.onFieldChange}
                    type="text"

                    variant="standard"
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="charge"
                    name="charge"
                    label="Charge"
                    value={this.state.charge}
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
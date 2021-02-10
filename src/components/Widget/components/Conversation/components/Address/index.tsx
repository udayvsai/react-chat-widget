import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';

const D_LAT = 20.5937;
const D_LNG = 78.9629;

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column'
    },
    '& .MuiButton-root': {
      margin: theme.spacing(2),
      backgroundColor: '#226384'
    },
    '& .MuiButton-root.Mui-disabled': {
      backgroundColor: '#D3D3D3'
    },
    '& .Mui-focused.MuiFormLabel-root': {
      color: '#226384',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#226384'
    },
  },
}));

const MyMapComponent = withScriptjs(withGoogleMap((props: any) => {
  return(<GoogleMap
    defaultZoom={12}
    defaultCenter={{ lat: props.lat, lng: props.long  }}
    onClick={props.onChange}
  >
    <Marker position={{ lat: props.lat, lng: props.long }}  />
  </GoogleMap>
  )})
)

const AddressComponent = (props: any) => {
  const { lat, lng, apiKey } = props.defaultMapProps;
  const [location, setLocation] = React.useState({
    lat: lat || D_LAT, 
    lng: lng || D_LNG, 
    address: '', 
    doorNo: '', 
    landmark: '', 
    rawData: ''
  });
  const classes = useStyles();
  const G_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`;

  const onLocationChange = (data) => {
    const newLat = data.latLng.lat()
    const newLng = data.latLng.lng()
    const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLat},${newLng}&key=${apiKey}`;
    fetch(URL).then(res => res.json())
    .then(
      (result) => {
        const add = result.results[0].formatted_address
        return setLocation({ ...location, lat: newLat, lng: newLng, address: add, rawData: result });
      },
      (error) => {
        console.log(error)
      }
    )
  }

  return(
    <form className={classes.root} noValidate autoComplete="off">
    <div className={"map-container"}>
      <MyMapComponent
        lat={location.lat}
        long={location.lng}
        onChange={onLocationChange}
        googleMapURL={G_MAP_URL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `400px` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
      <TextField variant="outlined" label="Address" value={location.address} onChange={e => setLocation({ ...location, address: e.target.value})} />
      <TextField variant="outlined" label="Door/Flat No" value={location.doorNo} onChange={e => setLocation({ ...location, doorNo: e.target.value})} />
      <TextField variant="outlined" label="Landmark" value={location.landmark} onChange={e => setLocation({ ...location, landmark: e.target.value})} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
        <Button
          variant="contained"
          disabled={!(location.doorNo.length && location.landmark.length)}
          color="primary"
          onClick={() => props.onLocationSubmit(location)}
        >
          Save & Proceed
        </Button>
        <span style={{display: 'flex', justifyContent: 'center', cursor: 'pointer', margin: 16}}onClick={props.onMapClose}>
          close
        </span>
      </div>
    </div>
  </form>
  )
}

export default AddressComponent;
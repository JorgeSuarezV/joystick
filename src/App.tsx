// App.js
import React from 'react';
import VehicleControl from './VehicleControl';
import Joystick from "./Joystick";
import Cam from "./Cam";

const App = () => {
    return (
        <div style={{ display: 'flex' }}>
            <VehicleControl />
            <Cam/>
            <Joystick  /> {/* Joystick on the remaining two-thirds */}
        </div>
    );
};

export default App;

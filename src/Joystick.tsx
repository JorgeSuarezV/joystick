import {useEffect, useState} from 'react';

function JoystickComponent() {
    const [gamepadInfo, setGamepadInfo] = useState<any>(null);
    const [axes, setAxes] = useState([0, 0, 0, 0]);
    const [lastState, setLastState] = useState("");

    const commands = {
        FORWARD: 'forward',
        BACK: 'backward',
        LEFT: 'left',
        RIGHT: 'right',
        ROTLEFT: 'rotateLeft',
        ROTRIGHT: 'rotateRight',
        STOP: 'stop'
    };

    // Function to send a request to the Raspberry Pi
    const sendToRaspi = (command: any) => {
        fetch(`http://192.168.0.100/${command}`)
            .then(response => console.log(`${command} command sent`))
            .catch(error => console.error('Error:', error));
    };

    // Function to handle the movement based on joystick input
    const handleMovement = (state: any) => {
        if (lastState !== state) {
            setLastState(state);
            console.log("Current State:", state);
            sendToRaspi(state);
        }
    };

    useEffect(() => {
        const handleGamepadConnected = (event: any) => {
            const gamepad = event.gamepad;
            console.log(`Gamepad connected: ${gamepad.id}`);
            setGamepadInfo(gamepad);
        };

        const handleGamepadDisconnected = () => {
            console.log("Gamepad disconnected");
            setGamepadInfo(null);
        };

        window.addEventListener("gamepadconnected", handleGamepadConnected);
        window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

        return () => {
            window.removeEventListener("gamepadconnected", handleGamepadConnected);
            window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
        };
    }, []);

    useEffect(() => {
        const updateGamepadStatus = () => {
            const gamepads: any = navigator.getGamepads();
            if (gamepadInfo && gamepads[gamepadInfo?.index]) {
                const joystick = gamepads[gamepadInfo?.index];
                setAxes(joystick.axes);

                // Get axis values
                const vertMove = joystick.axes[1];  // Vertical axis
                const horMove = joystick.axes[0];   // Horizontal axis
                const yaw = joystick.axes[3];       // Rotation axis

                // Determine movement command
                if (vertMove < -0.8) {
                    handleMovement(commands.FORWARD);
                } else if (vertMove > 0.8) {
                    handleMovement(commands.BACK);
                } else if (horMove > 0.8) {
                    handleMovement(commands.RIGHT);
                } else if (horMove < -0.8) {
                    handleMovement(commands.LEFT);
                } else if (yaw > 0.8) {
                    handleMovement(commands.ROTRIGHT);
                } else if (yaw < -0.8) {
                    handleMovement(commands.ROTLEFT);
                } else {
                    handleMovement(commands.STOP);
                }
            }
        };

        const interval = setInterval(updateGamepadStatus, 100); // Update every 100ms
        return () => clearInterval(interval);
    }, [gamepadInfo, lastState]);

    const calculatePosition = (value: number, maxRange: number) => {
        return (value * maxRange) / 2 + maxRange / 2;
    };

    return (
        <div style={{display: 'flex',flex: '1', justifyContent: "center", height: '100vh'}}>
            <div style={{padding: '20px', boxSizing: 'border-box'}}>
                <h1 style={{textAlign: 'center'}}>Joystick Connection Status</h1>
                {gamepadInfo ? (
                    <div>
                        <p style={{textAlign: 'center'}}>Connected: {gamepadInfo?.id}</p>
                        <div
                            style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'center'}}>
                            <div>
                                <h2>Horizontal Axis (0):</h2>
                                <p>{axes[0].toFixed(2)}</p>
                            </div>
                            <div>
                                <h2>Vertical Axis (1):</h2>
                                <p>{(axes[1] * (-1)).toFixed(2)}</p>
                            </div>
                        </div>
                        <div style={{
                            position: 'relative',
                            width: '200px',
                            height: '200px',
                            margin: '20px auto',
                            border: '1px solid black'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '0',
                                width: '100%',
                                height: '1px',
                                backgroundColor: 'gray',
                            }}/>
                            <div style={{
                                position: 'absolute',
                                left: '50%',
                                top: '0',
                                width: '1px',
                                height: '100%',
                                backgroundColor: 'gray',
                            }}/>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: `${calculatePosition(-axes[1] * (-1), 200)}px`,
                                    left: `${calculatePosition(axes[0], 200)}px`,
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: 'blue',
                                    borderRadius: '50%',
                                    transform: 'translate(-50%, -50%)',
                                }}
                            />
                        </div>
                        <div>
                            <h2>Yaw Movement (Axis 3):</h2>
                            <input
                                type="range"
                                min="-1"
                                max="1"
                                value={axes[3] || 0}
                                step="0.01"
                                readOnly
                                style={{width: '100%'}}
                            />
                            <p>{axes[3]?.toFixed(2)}</p>
                        </div>
                    </div>
                ) : (
                    <p style={{textAlign: 'center'}}>No joystick detected.</p>
                )}
            </div>
        </div>
    );
}

export default JoystickComponent;

// VehicleControl.tsx
import React from 'react';

const VehicleControl: React.FC = () => {
    const sendCommand = (command: string) => {
        fetch(`http://192.168.0.100/${command}`)
            .then(response => console.log(`${command} command sent`))
            .catch(error => console.error('Error:', error));
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Control del Vehículo</h1>
            <button style={styles.button} onClick={() => sendCommand('forward')}>Adelante</button>
            <br />
            <button style={styles.button} onClick={() => sendCommand('left')}>Izquierda</button>
            <button style={styles.button} onClick={() => sendCommand('stop')}>Detener</button>
            <button style={styles.button} onClick={() => sendCommand('right')}>Derecha</button>
            <br />
            <button style={styles.button} onClick={() => sendCommand('backward')}>Atras</button>
            <br />
            <button style={styles.button} onClick={() => sendCommand('rotateLeft')}>Girar Izquierda</button>
            <button style={styles.button} onClick={() => sendCommand('rotateRight')}>Girar Derecha</button>
        </div>
    );
};

// Explicit typing for styles using React.CSSProperties
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        flex: '1',
        textAlign: 'center',
        backgroundColor: '#f0f8ff',
        padding: '20px',
        boxSizing: 'border-box' as 'border-box', // TypeScript fix for boxSizing
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        color: '#00509e',
        marginBottom: '30px',
    },
    button: {
        fontSize: '20px',
        width: '160px',
        height: '60px',
        margin: '15px',
        borderRadius: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};

export default VehicleControl;

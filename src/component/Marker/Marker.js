import React from 'react';
import './style.css';

const CustomMarker = (props) => {
    const { color, name, id } = props;
    return (
      <div className="marker"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default CustomMarker;
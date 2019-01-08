import React from 'react';

import classes from './BuildControl.css';

const BuildControl = (props) => (
    
    <div className={classes.BuildControl}>
    
        <div className={classes.Label}>{props.label}</div>
      
        <button className={classes.Less} 
            onClick={() => props.removeIngredients(props.type)}
            disabled={props.disableStatus}>Less
            </button>

        <button onClick={props.addIngredent}
          className={classes.More}>More</button>
    </div>
)

export default BuildControl;
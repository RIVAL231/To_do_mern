import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
export default function Notes (props){
    return(
        <div className="container--notes">
            <div className="cmain">
            <div className="container1"> <input type="checkbox" className={`check`} checked={props.isChecked } style={{marginBottom:"0"}}
          onChange={props.handleCheckboxChange}/>
          
          {props.isChecked && <h2 style={{color: "grey"}}><strike>{props.notes}</strike></h2>} {!props.isChecked && <h2>{props.notes}</h2>} 
          </div>
          <div className="icon">
          <FontAwesomeIcon icon={faTrash} onClick={props.handleDelete} />
          </div>
          
          </div>
            <hr></hr>
            
        </div>
    )
}
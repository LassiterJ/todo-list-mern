import React from "react";



export default function Modal(props) {
  

return (
        
  <div className="modal display-block">
    <section className="modal-main">
    {props.children}
      <button onClick={props.handleClose}>close</button>
    </section>
  </div>
);

}
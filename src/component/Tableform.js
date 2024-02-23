
import React from "react"
import "../App.css";
import { RxCross1 } from "react-icons/rx";
const Tableform=({handleSubmit,handleChange,closeHandle,rest})=>{
    return(
        <div className="addTask">
        
    <form onSubmit={handleSubmit}>
      <div className="close-btn" onClick={closeHandle}><RxCross1 /></div>
      <label htmlFor="title">Title:</label>
      <input type="text" id="title" title="title" onChange={handleChange} value={rest.title}/>

      <label htmlFor="description">Description:</label>
      <input type="text" id="description" title="description" onChange={handleChange} value={rest.description}/>

      <label htmlFor="status">Status:</label>
      <input type="boolean" id="status" title="status" onChange={handleChange} value={rest.status}/>

      <button>Save</button>
    </form>
</div>
    )
}
export default Tableform;
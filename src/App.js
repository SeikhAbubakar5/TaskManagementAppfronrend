import React, { useEffect, useState } from "react"
import axios from "axios"
import './App.css';
import Tableform from "./component/Tableform";
axios.defaults.baseURL="https://taskmanagementappbackend-5kbx.onrender.com";

 function App() {


  const [addsection,setAddSection]=useState(false)
  const [editSection,setEditSection]=useState(false)
  const [data,setData]=useState({
    title:"",
    description:"",
    status:""
  })
  const [dataEdit,setDataEdit]=useState({
    title:"",
    description:"",
    status:"",
    _id:""
  })
  const [list ,setList]=useState([]);

  const handleChange=(e)=>{
      const {value,title}=e.target
      setData((prev)=>{
        return{
          ...prev,[title]:value
        }
      })
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
const res=await axios.post("/create",data)
    console.log(res)
    if(res.data.success){
      setAddSection(false)
      alert(res.data.message)
    }
  }
//fetch data from API
  const fetchData =async()=>{
      const res=await axios.get("/")
      if(res.data.success){
        setList(res.data.data)
  }
}
      useEffect(()=>{
        fetchData()
      },[list])

      // console.log(list)
//delete form input
      const handleDelete=async(_id)=>{
        const res=await axios.delete("/delete/" + _id);
        if(res.data.success){
          fetchData()
          alert(res.data.message)
        }
      }
      //update form content
      const handleUpdate=async(e)=>{
          e.preventDefault()
          const res=await axios.put("/update",dataEdit);
          if(res.data.success){
            fetchData()
            alert(res.data.message)
      }
    }
    //edit form content
      const handleEidtChange=async(e)=>{
        const {value,title}=e.target
        setDataEdit((prev)=>{
          return{
            ...prev,[title]:value
          }
        })
      }
      const handleEdit=(el)=>{
        setDataEdit(el)
        setEditSection(true) 
        
      }
  return (
    <>
      <div className="container">
        <button className="btn" onClick={()=>setAddSection(true)}>Add task</button>
        {
          addsection && (
            <Tableform
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              closeHandle={()=>setAddSection(false)}
              rest={data}
            />
          )
        }
        {
          editSection && (
            <Tableform
              handleSubmit={handleUpdate}
              handleChange={handleEidtChange}
              closeHandle={()=>setEditSection(false)}
              rest={dataEdit}
            />
          )
        }
       <div className='tableHead'>
       <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>

              </th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((el,index)=>{
                return (
                  <tr key={index}>
                    <td>{el.title}</td>
                    <td>{el.description}</td>
                    <td>{el.status}</td>
                    <td>
                    <button className='btn-edit' onClick={()=>handleEdit(el)}>Edit</button>
                    <button className='btn-delete' onClick={()=>handleDelete(el._id)}>Delete</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
       </table>

       </div>
      </div>
    </>
  );
  }

export default App;

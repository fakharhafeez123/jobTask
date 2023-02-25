import React, { useState, useEffect } from 'react'
import { JobData } from '../utilities/JobsData'
import AddNewJob from './JobCard/AddNewJob'
import img1 from "./JobCard/img1.jpg"
import notificationAction from '../actions/notificationAction'
import { bindActionCreators } from 'redux'
import { connect, useSelector } from 'react-redux'

function JobTable(props) {
  const Notification = useSelector((state) => state.notification)
  const [showPopup, setshowPopup] = useState(false)
  const [obj, setObj] = useState({})
  const [id, setID] = useState(0)
  const [data, setData] = useState(JobData)
  const [dropdown, setDropdown] = useState(false)
  const openPopup = (id) => {
    let NewList = data.filter((row) => {
      return row.id === id
    })
    setshowPopup(true)
    setObj(NewList[0])
    setID(id)
  }

  useEffect(() => {
    props.notificationAction(data.length)
  }, [data])
  const handleClose = () => {
    setshowPopup(false)
    setObj({})
    setID(0)
  }

  const handleSave = (obj) => {
    let len = data.length
    let NewList = [...data]
    var foundIndex = NewList.findIndex((x) => x.id === obj.id)
    if (foundIndex !== -1) {
      NewList[foundIndex] = obj
    } else {
      obj.id = data[len - 1].id + 1
      NewList = NewList.concat(obj)
    }

    console.log('For Save and updated', NewList)
    setData(NewList)
    handleClose()
  }

  const dropDownHandle = () => {
    setDropdown(!dropdown)
  }
  let popup = ''
  if (showPopup) {
    popup = (
      <AddNewJob
        obj={obj}
        onClose={handleClose}
        onSave={(obj) => handleSave(obj)}
        id={id}
      />
    )
  }
  return (
    <>
      <div className="container">
        <div className="row my-5">
          <div className="col-md-12">
            <div className="row my-2">
              <div className="col-md-10 my-2 flex-1" style={{display:"flex", alignItems:"center" ,justifyContent:"space-between"}}>
                {' '}
                <img src={img1} alt="" />
                <h4>List of All Jobs Posted</h4>
              

              <div className="col-md-2" style={{display:"flex",right:"100%"}}>
                <div className="dropdown mx-3 my-2">
                  <i className="fas fa-bell" onClick={dropDownHandle}></i>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                    style={{ display: dropdown ? 'block' : 'none' }}
                  >
                    <a className="dropdown-item" href="#">
                      Total Jobs Added are {Notification}
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => openPopup(0)}
                >
                  Add New
                </button>
              </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                  <th>Job Title</th>
                  <th>Career Level</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((row) => {
                      return (
                        <tr>
                          <td>{row.lookingFor}</td>
                          <td>{row.experience}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => openPopup(row.id)}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <i className="fa fa-trash"></i>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </table>

              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
      {popup}
    </>
  )
}
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      notificationAction: notificationAction,
    },
    dispatch,
  )
}
export default connect(null, matchDispatchToProps)(JobTable)

import React from 'react'
import {ReactComponentProps} from 'react-router'
import {Link, NavLink} from 'react-router-dom'


class FetchEmployee extends React.Component    {
    constructor() {
        super()
        this.state = {empList : []}

        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
    }
  
    componentDidMount() {
        fetch('https://localhost:5001/api/Employee/Index')
            .then(response => response.json())
            .then(data => {
        
                this.setState({empList: data})
            })
   
        }

        handleDelete(id) {
            // eslint-disable-next-line no-restricted-globals
            if(!confirm("Are you sure you want to delete this employee?"))
                return
            else {
                fetch('https://localhost:5001/api/Employee/Delete/' + id, {
                    method: 'delete'
                }).then(data => {
                    this.setState({
                        empList: this.state.empList.filter((rec) => {
                            return (rec.employeeId !== id)
                        })
                    })
                })
            }
        
        }

        handleEdit(id) {
            this.props.history.push("/employee/edit" + id)
        }
    
        render() {
            return (<div>
                <table className='table'>
                    <tr>
                         <th>Name</th>
                         <th>Gender</th>
                         <th>Department</th>
                         <th>City</th>
                    </tr>
                 
                 {this.state.empList.map(emp => 
                    <tr>
                        <td>{emp.name}</td>
                        <td>{emp.gender}</td>
                        <td>{emp.department}</td>
                        <td>{emp.city}</td>
                        <td>
                            <button className="action" onClick={(id) => this.handleDelete(emp.employeeId)}>Delete</button>
                        </td>
                    </tr>
                 )}
                </table>
                  
            </div>)
        }

      
    
    }

export default FetchEmployee


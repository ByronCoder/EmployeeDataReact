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
        console.log(this.state.empList);
        fetch('https://c5i6dt6na2.execute-api.us-east-1.amazonaws.com/dev/api/Employee/Index')
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
                fetch('https://c5i6dt6na2.execute-api.us-east-1.amazonaws.com/dev/api/Employee/Delete/' + id, {
                    method: 'delete'
                }).then(data => {
                    this.setState({
                        empList: this.state.empList.filter((rec) => {
                            return (rec.id !== id)
                        })
                    })
                })
            }
        
        }

        handleEdit(id) {
            this.props.history.push("/employee/edit" + id)
        }
    
        render() {
            return (<div className="title">
                <h1>Employee List</h1>
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
                            <button className="btn btn-link" onClick={(id) => this.handleEdit(emp.id)}>Edit</button>  |  
                            <button className="btn btn-link" onClick={(id) => this.handleDelete(emp.id)}>Delete</button>
                        </td>
                    </tr>
                 )}
                </table>
                  
            </div>)
        }

      
    
    }

export default FetchEmployee


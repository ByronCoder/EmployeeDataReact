import React from 'react'

class FetchEmployee extends React.Component    {
    constructor() {
        super()
        this.state = {empList : []}
    }
  
    componentDidMount() {
        fetch('https://localhost:5001/api/Employee/Index')
            .then(response => response.json())
            .then(data => {
        
                this.setState({empList: data})
            })
   
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
                    </tr>
                 )}
                </table>
                  
            </div>)
        }
    
    }

export default FetchEmployee


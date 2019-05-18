import React from 'react'
import {ReactComponentProps} from 'react-router'

class AddEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: "", loading: false, cityList: [], empData: []}

        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.updateState = this.updateState.bind(this);
    }

    componentWillMount() {
        fetch('https://localhost:5001/api/Employee/GetCityList')
            .then(response => response.json())
            .then(data => {
                this.setState({cityList: data})
        
        })

        var empid = this.props.match.params["empid"];

        if(empid > 0) {
            fetch('https://localhost:5001/api/Employee/Details/' + empid)
                .then(response => response.json()
                .then(data => {
                    this.setState({title: "Edit", loading: false, empData: data})
                }))
            }
        else {
            this.setState({title: "Create", loading: false, cityList: [], empData: []})
        }
      
    }

    updateState(element) {
        this.setState({empData: element})
    }


    render() {
        
            let contents = this.state.loading
            ? <p><em>Loading...</em></p> 
            : this.renderCreateForm(this.state.cityList)

     return(
            <div className="titleDiv">
                <h1>{this.state.title}</h1>
               <h3>Employee</h3>
               <hr />
                 {contents}
            </div>
        )
    }


    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        if(this.state.empData.employeeId) {
            fetch('https://localhost:5001/api/Employee/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee")
                })
            
        }
        else {
            fetch('https://localhost:5001/api/Employee/Create', {
                method: 'POST',
                body: data,
            }).then((response) => response.json())
            .then((responseJson) => {
                this.props.history.push("/fetchemployee")
            })
        }
     
    
    }

    handleCancel(e) {
        e.preventDefault()
        this.props.history.push("/fetchemployee")
    }


     renderCreateForm() {
        return (
            <form onSubmit={this.handleSave} className="employeeForm">
                <div className="form-group row">
                    <input type="hidden" name="employeeid" value={this.state.empData.employeeId} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" value={this.state.empData.name} required />

                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" value={this.state.empData.gender} onChange={this.updateState} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department">Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" value={this.state.empData.department} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" value={this.state.empData.city}  onChange={this.updateState} required>
                            <option value=""> -- Select City --</option>
                            {this.state.cityList.map(city =>
                                <option key={city.cityId} value={city.cityName}>{city.cityName}</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        )
    }

}

export default AddEmployee
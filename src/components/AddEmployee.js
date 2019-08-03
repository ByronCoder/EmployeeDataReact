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
        fetch('https://c5i6dt6na2.execute-api.us-east-1.amazonaws.com/dev/api/Employee/GetCityList')
            .then(response => response.json())
            .then(data => {
                this.setState({cityList: data})
        
        })

        var id = this.props.match.params["id"];
        console.log(id);

        if(id != null) {
            fetch('https://c5i6dt6na2.execute-api.us-east-1.amazonaws.com/dev/api/Employee/Details/' + id)
                .then(response => response.json()
                .then(data => {
                    this.setState({title: "Edit", loading: false, empData: data})
                    console.log(this.state.empData.id);
                }))
            }
        else {
            this.setState({title: "Create", loading: false, cityList: [], empData: []})
        }
      
    }

    updateState(element) {
        this.setState({empData: element})
        console.log(this.state.empData)
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
        const data = new FormData(event.target)
        var id = this.props.match.params["id"];
        console.log(id)
        if(id != null) {
            console.log("Editing Employee...")
            console.log(this.state.empData.id)
            fetch('https://c5i6dt6na2.execute-api.us-east-1.amazonaws.com/dev/api/Employee/Edit', {
                method: 'PUT',
                body: data,
            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee")
                })
            
        }
        else {
            console.log("Create Employee...")
            fetch('https://c5i6dt6na2.execute-api.us-east-1.amazonaws.com/dev/api/Employee/Create', {
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
                    <input className="form-control displayNone" type="text" name="id" value={this.state.empData.id} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" value={this.state.empData.name} onChange={this.updateState} required />

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
                        <input className="form-control" type="text" name="department" value={this.state.empData.department} onChange={this.updateState} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="city" value={this.state.empData.city}  onChange={this.updateState} required>
                            <option value=""> -- Select City --</option>
                            {this.state.cityList.map(city =>
                                <option key={city.id} value={city.name}>{city.name}</option>
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
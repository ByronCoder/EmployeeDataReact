import React from 'react'


class AddEmployee extends React.Component {
    constructor(props) {
        super(props)
        this.state = {title: "", loading: false, cityList: [], empData: []}

        this.handleSave = this.handleSave.bind(this);
    }

    componentWillMount() {
        fetch('https://localhost:5001/api/Employee/GetCityList')
            .then(response => response.json())
            .then(data => {
                this.setState({cityList: data})
        
        })
      
    }

    handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
     

        fetch('https://localhost:5001/api/Employee/Create', {
            method: 'POST',
            body: data,
        })
    
    }



    render() {
        
            let contents = this.state.loading
            ? <p><em>Loading...</em></p> 
            : this.renderCreateForm()

     return(
            <div>
               <h3>Add Employee</h3>
                 {contents}
            </div>
        )
    }


     renderCreateForm() {
        return (
            <form onSubmit={this.handleSave}>
                <div className="form-group row">
                    <input type="hidden" name="employeeid" value={this.state.empData.employeeId} />
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.empData.name} required />

                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.empData.gender} required>
                            <option value="">-- Select Gender --</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Department">Department</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="Department" defaultValue={this.state.empData.department} required />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City">City</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="City" defaultValue={this.state.empData.city} required>
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
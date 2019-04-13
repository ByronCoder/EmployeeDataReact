import React from 'react'
import {Route} from 'react-router-dom'
import {Layout} from './components/Layout'
import {Home} from './components/Home'
import {AddEmployee} from './components/AddEmployee'
import {FetchEmployee} from './components/FetchEmployee'

const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route  path='/fetchemployee' component={FetchEmployee} />
    <Route  path='/addemployee' component={AddEmployee} />
    <Route  path='/employee/edit:empid' component={AddEmployee} />

</Layout>
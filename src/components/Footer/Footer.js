import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


class Footer extends Component {

    state={

    }

    render(){
        return(

            <footer>
                Copyright © Desk Sales by <a href="http://www.inup.hr">INUP</a> | Sva prava pridržana.
            </footer>

        )
    }

}


const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token 
    }
}

export default connect(mapStateToProps)(Footer);


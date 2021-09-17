import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import {connect} from 'react-redux'

import CurrentClient from './CurrentClient'

class CurrentClients extends Component {

    state={
        
    }

    render(){
        return(
            <Aux>
                <CurrentClient />
            </Aux>
        )
    }

}

const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token 
    }
}


export default connect(mapStateToProps)(CurrentClients);

import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import {connect} from 'react-redux'

import PotentialClient from './PotentialClient'

class PotentialClients extends Component {

    state={
        
    }

    render(){
        return(
            <Aux>
                <PotentialClient />
            </Aux>
        )
    }

}

const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token 
    }
}


export default connect(mapStateToProps)(PotentialClients);

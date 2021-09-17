import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import {connect} from 'react-redux'

import DelayClient from './DelayClient'

class DelayClients extends Component {

    state={
        
    }

    render(){
        return(
            <Aux>
                <DelayClient />
            </Aux>
        )
    }

}

const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token 
    }
}


export default connect(mapStateToProps)(DelayClients);

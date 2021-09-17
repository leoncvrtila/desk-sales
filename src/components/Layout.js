import React, {Component} from 'react'
import Aux from '../hoc/Aux'
import {Route, Switch} from 'react-router-dom'

import Auth from '../containers/Auth/Auth'
import Nav from '../components/Nav/Nav'
import Channels from '../components/Channels/Channels'
import Main from './Main/Main'
import Logout from '../containers/Auth/Logout/Logout'
import Footer from '../components/Footer/Footer'

import axios from 'axios'

import '../assets/css/main.css'
import '../assets/css/nav.css'

import {connect} from 'react-redux'

class Layout extends Component {

    state = {
        error: false,
        user: [],
        didMount: false
    }
    
    
    componentDidMount(){

          setTimeout(() => {
  
            axios.all([
              axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.token)
            ])
            .then(response => {
  

              const user = {
                role: response[0].data.role,
                name: response[0].data.name,
                token: response[0].data.token
              }
      
            this.setState({
              user: user
              });
      
            });
  
          }, 500);   
  
      }


    componentDidUpdate(prevProps, prevState){

        if(!this.state.didMount){
          setTimeout(() => {
  
            axios.all([
              axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.token)
            ])
            .then(response => {
  

              const user = {
                role: response[0].data.role,
                name: response[0].data.name,
                token: response[0].data.token
              }
      
            this.setState({
              user: user,
              didMount: true
              });
      
            });
  
          }, 500);   
    }
  
      }

    errorHandler = () => {
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }



    render() {


        return (
            <Aux>
                

                    <section style={{backgroundImage: this.props.isAuth === false ? 'linear-gradient(90deg, rgba(29,32,39,1) 30%, rgba(18,23,34,1) 100%)' : 'none'}}>
                
                        <div className="Auth">
                        <Route path="/" exact component={Auth} />
                        </div>     

                        <Route path="/(main|process|clients|potentional-clients|channels|users|delay)" component={(this.props.isAuth === true) ? Nav : null} />

                        <Route path="/main" exact component={(this.props.isAuth === true) ? Main : Auth} />  

                        <Route path="/channels" exact component={(this.props.isAuth === true) ? Channels : Auth} />

                        <Route path="/logout" exact component={Logout} /> 

                        <Route path="/(|main|process|clients|potentional-clients|channels|users|delay)" component={Footer} /> 
             
                    </section>

                


            </Aux>
        );
    } 
    
                                            // Rute za odredene linkove ali prije toga provjerava postoji li token tj mora se prvo netko ulogirati sa emailom i lozinkom da moze dobiti pristup ostalim componentama 


}


const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token !== null, // provjerava da ako token nije null tj postoji li token ili ne >>> ako postoji onda je true ako ne onda je null
        token: state.auth.token,
        userId: state.auth.userId
    }
}


export default connect(mapStateToProps)(Layout);

import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import {connect} from 'react-redux'
import * as axios from 'axios'
import * as action from '../../store/actions/auth'

let token           = '';
let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
let charactersLength = characters.length;
for ( let i = 0; i < charactersLength; i++ ) {
    token += characters.charAt(Math.floor(Math.random() * charactersLength));
}

let pass           = '';
let charactersPass       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*-+/:;,._{}[]?!=&%$%#"';
let charactersLengthPass = charactersPass.length;
for ( let i = 65; i < charactersLengthPass; i++ ) {
    pass += charactersPass.charAt(Math.floor(Math.random() * charactersLengthPass));
}


class Users extends Component {

    state = {

        potentionalClients: [],
        potentionalClient: [],
        user: [],
        username: '',
        password: pass,
        role: '',
        name: '',
        department: '',
        token: token
    }

    componentDidMount() {

      axios.all([
        axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.token)
                ])
      .then(response => {


        const user = {
          role: response[0].data.role,
          name: response[0].data.name,
          token: response[0].data.token,
          department: response[0].data.department,
          users: response[0].data.users
        }
    
    
        this.setState({
          user: user
          });
    
        });
    
    
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
                token: response[0].data.token,
                department: response[0].data.department,
                users: response[0].data.users
              }
    
    
                  this.setState({
                  didMount: true,
                  user: user

                  });
       
                });
    
          }, 500);   
    }
    
      }


      changeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

      }

      sendHandler = (event) => {

        event.preventDefault();
        this.props.onAuth(this.state.username, this.state.password, true)

        axios.put('https://desk-clients.firebaseio.com/users/' + this.props.userId + '/users/' + [localStorage.getItem('newUserId')] + '.json?auth=' + this.props.token, {
        
          role: this.state.role,
          name: this.state.name,
          department: this.state.department,
          token: this.state.token,
          uid: localStorage.getItem('newUserId'),
          dbToken: 'dbToken' + localStorage.getItem('newUserId')

          }

          )
          
          .then(response => {


          
          })
          .catch(error => {
            this.setState({error: true});							// hoc error
          });

          setTimeout(() => {

            let data = {

              role: this.state.role,
              name: this.state.name,
              department: this.state.department,
              token: this.state.token,
              uid: localStorage.getItem('newUserId'),
              dbToken: 'dbToken' + localStorage.getItem('newUserId')
            }

  
            axios.put('https://desk-clients.firebaseio.com/users/' + [localStorage.getItem('newUserId')] + '.json?auth=' + this.props.token, data
              
              )
        
        .then(response => {



          if(response){

            axios.all([
              axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.token)
                      ])
            .then(response => {
  
  
              const user = {
                role: response[0].data.role,
                name: response[0].data.name,
                token: response[0].data.token,
                department: response[0].data.department,
                users: response[0].data.users
              }


              this.setState({
                username: '',
                password: '',
                role: '',
                name: '',
                department: '',
                user: user

              });
   
            });


          }

        
        })
        .catch(error => {
          this.setState({error: true});							// hoc error
        });

      }, 700); 

      }

      tokenDice = () => {

        let token = '';
        let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( let i = 0; i < charactersLength; i++ ) {
            token += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        this.setState({
            token: token
        })

      }

      passDice = () => {

        let pass           = '';
        let charactersPass       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*-+/:;,._{}[]?!=&%$%#"';
        let charactersLengthPass = charactersPass.length;
        for ( let i = 65; i < charactersLengthPass; i++ ) {
            pass += charactersPass.charAt(Math.floor(Math.random() * charactersLengthPass));
        }
        

        this.setState({
            password: pass
        })

      }



    render(){

      let users = []

      for(let key in this.state.user.users){

        users.push({

          ...this.state.user.users[key]

        })

      }
       
      let usersMap = users.map(u => (


        <div key={u.token} className="User">

          <div>
            <h5>Ime i prezime: {u.name}</h5>
            <h5>Odjel: {u.department}</h5>
            <h5>Uloga: {u.role}</h5>
          </div>


        </div>

      ))
      
        return(

            <Aux>

                <div className="Users">

                  <div className="UsersForm">

                    <form onSubmit={(e) => this.sendHandler(e)} style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>

                        <input className="InputElement" onChange={(e) => this.changeHandler(e)} type="email" value={this.state.username} name="username" placeholder="Username" />
                        <input className="InputElement" onClick={this.passDice} type="text" value={this.state.password} name="password" placeholder="Password" readOnly />

                        <input className="InputElement" onChange={(e) => this.changeHandler(e)} type="text" value={this.state.role} name="role" placeholder="Role" />
                        <input className="InputElement" onChange={(e) => this.changeHandler(e)} type="text" value={this.state.name} name="name" placeholder="Name" />
                        <input className="InputElement" onChange={(e) => this.changeHandler(e)} type="text" value={this.state.department} name="department" placeholder="Department" />
                        <input className="InputElement" onClick={this.tokenDice} type="text" value={this.state.token} name="token" placeholder="Token" readOnly />


                        <button>DODAJ</button>

                    </form>

                  </div>

                <div className="UsersWrapp">

                  {usersMap}

                </div>

                </div>

            </Aux>

        )

    }

}

const mapStateToProps = state => {                                 // dolazim do globalnog sateta
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        userId: state.auth.userId,
        token: state.auth.token,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {                             // izvrsavam globalno akcije
    return {
        onAuth: (email, password, isSingup) => dispatch(action.auth(email, password, isSingup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);  // poveze se sa globalnim stateom i globalnim akcijama

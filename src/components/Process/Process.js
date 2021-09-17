import React, { Component } from "react";
import * as axios from 'axios'
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux'
import Spinner from '../../containers/Spinner/Spinner'
import { service } from "firebase-functions/lib/providers/analytics";

import uncorrect from '../../assets/images/uncorrect.svg'
import correct from '../../assets/images/correct.svg'

class Process extends Component {


    state = {

        potentionalClients: [],
        potentionalClient: [],
        searchValue: '',
        user: [],
        processType: 'U tijeku'

    }

    componentDidMount() {

        axios.all([
          axios.get('https://desk-clients.firebaseio.com/potentional-clients.json?auth=' + this.props.isAuth),
          axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth)
                  ])
        .then(response => {
    
          
                                                  // klijenti
          const fetchedClients = []
    
          for(let key in response[0].data) {                             // iz beckenda dobivam object pa ga moram pretvorit u array
              fetchedClients.push({                                      // key je id tj odredeni member
                  ...response[0].data[key],
                  id: key
              
              }) 
          }
    
          const ffetchedClientsNew = []
    
          for(let key in fetchedClients) {                             // iz beckenda dobivam object pa ga moram pretvorit u array
            ffetchedClientsNew.push({                                      // key je id tj odredeni member
                  ...fetchedClients[key],
                  num: key                
              }) 
          }
    
          const user = {
            role: response[1].data.role,
            name: response[1].data.name,
            token: response[1].data.token,
            department: response[1].data.department
          }
    
    
        this.setState({
          potentionalClients: ffetchedClientsNew,
          user: user
          });
    
        });
    
    
      }
    
      componentDidUpdate(prevProps, prevState){
        if(!this.state.didMount){
          setTimeout(() => {
    
              axios.all([
                  axios.get('https://desk-clients.firebaseio.com/potentional-clients.json?auth=' + this.props.isAuth),
                  axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth)
                          ])
                .then(response => {
      
                  
                                                          // klijenti
                  const fetchedClients = []
      
                  for(let key in response[0].data) {                             // iz beckenda dobivam object pa ga moram pretvorit u array
                      fetchedClients.push({                                      // key je id tj odredeni member
                          ...response[0].data[key],
                          id: key
                      
                      }) 
                  }
      
                  const ffetchedClientsNew = []
      
                  for(let key in fetchedClients) {                             // iz beckenda dobivam object pa ga moram pretvorit u array
                    ffetchedClientsNew.push({                                      // key je id tj odredeni member
                          ...fetchedClients[key],
                          num: key                
                      }) 
                  }
      
                  const user = {
                    role: response[1].data.role,
                    name: response[1].data.name,
                    token: response[1].data.token,
                    department: response[1].data.department
                  }
    
    
                  this.setState({
                  potentionalClients: ffetchedClientsNew,
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

    serviceClickHandler = (e, num, serviceId) => {

      for(let key in this.state.potentionalClients){
        if(key === num){
          this.setState({
            potentionalClient: this.state.potentionalClients[num]

          })
        }
      }

      
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
      let yyyy = today.getFullYear()

      today = dd + '.' + mm + '.' + yyyy + '.';


      setTimeout(() => {


      axios.put('https://desk-clients.firebaseio.com/potentional-clients/'  + this.state.potentionalClient.id + '.json?auth=' + this.props.isAuth, {

          ...this.state.potentionalClient,

          bills: {

           ...this.state.potentionalClient.bills,

              [this.state.potentionalClient.bills.length-1]: {

                ...this.state.potentionalClient.bills[this.state.potentionalClient.bills.length-1],

                  projectInfo: {

                    service: {

                      ...this.state.potentionalClient.bills[this.state.potentionalClient.bills.length-1].projectInfo.service,

                      [serviceId]: {

                        ...this.state.potentionalClient.bills[this.state.potentionalClient.bills.length-1].projectInfo.service[serviceId],
                        endDate: today
  
                      }

                    }
                      
                }
  
          }
        }

        })
        
        .then(response => {

          if (response) {


              axios.all([
                axios.get('https://desk-clients.firebaseio.com/potentional-clients.json?auth=' + this.props.isAuth)
              ])
              .then(response => {
        
                const fetchedMembers = []
        
                for(let key in response[0].data) {                             // iz beckenda dobivam object pa ga moram pretvorit u array
                    fetchedMembers.push({                                      // key je id tj odredeni member
                        ...response[0].data[key],
                        id: key
                    
                    }) 
                }
        
                const fetchedMembersNew = []
        
                for(let key in fetchedMembers) {                             // iz beckenda dobivam object pa ga moram pretvorit u array
                  fetchedMembersNew.push({                                      // key je id tj odredeni member
                        ...fetchedMembers[key],
                        num: key
                    
                    }) 
                }
        
        
              this.setState({
                potentionalClients: fetchedMembersNew,
                potentionalClient: []
                });
        
              });
        

          }
        
        })
        .catch(error => {
          this.setState({error: true});							// hoc error
        });

      }, 500);

    }

    render(){


       
        let potentionalClients

        let clientsMap
  
        let clients = []
  
        let finishedClients = []
        
        for(let key in this.state.potentionalClients) { // trenutni procesi
  
          if(
            
            this.state.potentionalClients[key].bills !== undefined && 
            //this.state.potentionalClients[key].shareTeam !== undefined && 
            this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo.service[this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo.service.length-1].endDate === ''
            
            ){

            if(
                this.state.potentionalClients[key].shareTeam !== undefined && 
                this.state.user.role === 'admin' && 
                this.state.potentionalClients[key].check === true && 
                this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo !== undefined
            ){
      
              if(this.state.potentionalClients[key].shareTeam.includes(this.state.user.token)){
      
                clients.push({
                  ...this.state.potentionalClients[key]
                })
    
              
            }
      
            } 
            else if (

                  this.state.user.role === 'superAdmin' && 
                  this.state.potentionalClients[key].check === true && 
                  this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo !== undefined && 
                  this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo.service[this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo.service.length-1].endDate === ''
                  ){
      
                    clients.push({
                      ...this.state.potentionalClients[key]
              })
      
            } 

          }     
    
        }

        for(let key in this.state.potentionalClients){ // zavrseni procesi

          if(
            
            this.state.potentionalClients[key].bills !== undefined && 
            //this.state.potentionalClients[key].shareTeam !== undefined && 
            this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo.service[this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo.service.length-1].endDate !== ''
            
            ){

            if(
                this.state.potentionalClients[key].shareTeam !== undefined && 
                this.state.user.role === 'admin' && 
                this.state.potentionalClients[key].check === true && 
                this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo !== undefined
            ){
      
              if(this.state.potentionalClients[key].shareTeam.includes(this.state.user.token)){
      
                finishedClients.push({
                  ...this.state.potentionalClients[key]
                })
    
              
            }
      
            } 
            else if (

                  this.state.user.role === 'superAdmin' && 
                  this.state.potentionalClients[key].check === true && 
                  this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo !== undefined && 
                  this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo.service[this.state.potentionalClients[key].bills[this.state.potentionalClients[key].bills.length-1].projectInfo.service.length-1].endDate !== ''
                  ){
      
                    finishedClients.push({
                      ...this.state.potentionalClients[key]
              })
      
            } 

          }     
        }
        
        if(this.state.searchValue !== ''){
  
          if(this.state.processType === 'U tijeku') {

            potentionalClients = clients.filter(
              (client) => {
    
                  return client.name && client.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                         client.surname && client.surname.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                         client.email && client.email.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                         client.companyName && client.companyName.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                         client.oib && client.oib.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                         client.tel && client.tel.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 &&
                         client.check === true
              }
          )

          } else {

            potentionalClients = finishedClients.filter(
              (client) => {
    
                  return client.name && client.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                         client.surname && client.surname.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                         client.email && client.email.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                         client.companyName && client.companyName.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                         client.oib && client.oib.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                         client.tel && client.tel.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 &&
                         client.check === true
              }
          )

          }
          

  
        } else if(this.state.processType === 'U tijeku') {
          

            potentionalClients = clients


          
  
        } else {

          potentionalClients = finishedClients

        }



                
      clientsMap = potentionalClients.map(c =>  {// povuć services sa njihovim vrijednostima 


        let rez

        let rezNew = 0
        let sumAll = 0

        let rezFinal 

        let s
        let service = []



        for(let key in c.bills[c.bills.length-1].projectInfo.service){

          sumAll += parseInt(c.bills[c.bills.length-1].projectInfo.service[key].value) 


        if(c.bills[c.bills.length-1].projectInfo.service[key].endDate !== ''){


            rezNew += parseInt(c.bills[c.bills.length-1].projectInfo.service[key].value)


        }
      }

        rezFinal = (rezNew*100)/sumAll


        for(let key in c.bills[c.bills.length-1].projectInfo.service){

          service.push({
            ...c.bills[c.bills.length-1].projectInfo.service[key],
            id: key
          })

        }


        
        return <div className="ProcessClient">

                <div className="ProcessClientLeft">

                  <div>
                    <h5>Ime i prezime:</h5>
                    <p>{c.name + ' ' + c.surname}</p>
                  </div>

                  <div>
                    <h5>Naziv tvrtke:</h5>
                    <p>{c.companyName}</p>
                  </div>

                  <div>
                    <h5>Telefon:</h5>
                    <p>{c.tel}</p>
                  </div>

                  <div>
                    <h5>Email:</h5>
                    <p>{c.email}</p>
                  </div>

                  <div>
                    <h5>Čime se bavi:</h5>
                    <p>{c.niche}</p>
                  </div>

                  <div>
                    <h5>Cilj:</h5>
                    <p>{c.goal}</p>
                  </div>

                  <div>
                    <h5>Početak projekta:</h5>
                    <p>{c.bills[c.bills.length-1].projectInfo.projectStart}</p>
                  </div>
                  
                </div>

                <div className="ProcessClientRight">

                          <div style={{textAlign: 'center'}}>

                            {
                                
                                Math.round(rezFinal) + '%' + ' odrađeno'
                                
                            }

                            {

                                <div style={{display: 'flex'}}>

                                  <div className="ProcessProgress" style={{width: rezFinal + '%'}}></div>
                                  <div className="ProcessProgressUndone" style={{width: 100 - rezFinal + '%'}}></div>

                                </div>
                                
                            }

                          </div>



                        <div style={{marginTop: '4%'}}>
                          

                          <div>

                              {

                                s = service.map(s => {


                                  return <div className="ProcessItems">
                                          <div>{s.endDate === '' ? <img src={uncorrect} /> : <img src={correct} />}</div>
                                          <div>{s.title}</div>
                                          <div>{s.endDate !== '' ? s.endDate : 'U procesu'}</div>
                                          <div style={{
                                            display: 
                                            (this.state.user.role === 'superAdmin' || this.state.user.department.includes(s.department)) 
                                            && s.endDate === '' ? 'block' : 'none'}}
                                            onDoubleClick={(e)=>this.serviceClickHandler(e, c.num, s.id)}>Potvrdi</div>
                                          <div style={{display: s.endDate !== '' ? 'block' : 'none', width: '22%'}}></div>
                                        </div>
                                })


                              }

                              <div>
                                  {  
                                  
                                      c.bills[c.bills.length-1].projectInfo.analyticsEnd !== '' ? c.bills[c.bills.length-1].projectInfo.analyticsEnd : 

                                      this.state.user.role === 'superAdmin' || this.state.user.department.includes(c.bills[c.bills.length-1].projectInfo.analyticsHead) === true ? 

                                      <div>Potvrdi</div> 
                                      
                                      : null

                                  }
                              </div>

                          </div>
                      


                    </div>

                </div>



            </div>

      } )


        return(

            <Aux>

                <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '2%', width: '50%', marginLeft: 'auto', marginRight: 'auto'}}>

                  <input className="InputElement" name="searchValue" onChange={(e)=>this.changeHandler(e)} value={this.state.searchValue} placeholder="Pretraži..."/>

                  <select className="InputElement" name="processType" onChange={(e)=>this.changeHandler(e)} value={this.state.processType}>
                    <option>U tijeku</option>
                    <option>Završeni</option>
                  </select>

                </div>

                {
                  this.state.potentionalClients.length > 0 || potentionalClients !== undefined ? potentionalClients.length === 0 ? null : clientsMap : <Spinner /> 
                }

                {
                  potentionalClients.length === 0 ? <h4 style={{textAlign: 'center', color: 'white', marginTop: '2%', width: '20%', marginLeft: 'auto', marginRight: 'auto', background: '#3f4552', borderRadius: '3px', padding: '8px'}}>Nema još podataka.</h4> : null  
                }

            </Aux>

        )

    }

}

const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token,
        userId: state.auth.userId
    }
  }
  
  export default connect(mapStateToProps)(Process);
import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import * as axios from 'axios'
import {connect} from 'react-redux'
import WorldMap from './WorldMap.json'
import MapChart from "./MapChart";

/*
function App() {
  const [content, setContent] = useState("");
  return (
    <div>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}
*/

class Map extends Component {


  state={
    content:'',
    potentionalClients: [],
    didMount: false
  }

  
  componentDidMount() {

    axios.all([
      axios.get('https://desk-clients.firebaseio.com/potentional-clients.json?auth=' + this.props.isAuth),
      axios.get('https://desk-clients.firebaseio.com/form.json')
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

                                                  // forma
      const fetchedForm = []

      for(let key in response[1].data) {                             
          fetchedForm.push({                                     
              ...response[1].data[key],
              id: key
          
          }) 
      }

      const fetchedFormNew = []

      for(let key in fetchedForm) {                             
          fetchedFormNew.push({                                     
              ...fetchedForm[key],
              num: key
          
          }) 
      }



    this.setState({
      potentionalClients: ffetchedClientsNew,
      form: fetchedFormNew,
      });

    });


  }

  componentDidUpdate(prevProps, prevState){
    if(!this.state.didMount){
      setTimeout(() => {

          axios.all([
              axios.get('https://desk-clients.firebaseio.com/potentional-clients.json?auth=' + this.props.isAuth),
              axios.get('https://desk-clients.firebaseio.com/form.json')
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
  
                                                          // forma
              const fetchedForm = []
  
              for(let key in response[1].data) {                             
                  fetchedForm.push({                                     
                      ...response[1].data[key],
                      id: key
                  
                  }) 
              }
  
              const fetchedFormNew = []
  
              for(let key in fetchedForm) {                             
                  fetchedFormNew.push({                                     
                      ...fetchedForm[key],
                      num: key
                  
                  }) 
              }


              this.setState({
              potentionalClients: ffetchedClientsNew,
              form: fetchedFormNew,
              didMount: true,
              });
   
            });

      }, 500);   
}

  }



  mouseEnterHandler = (name) =>{


    this.setState({
      content: name 
    })

    this.props.mouseEnterHandler(name)

  }

  mouseLeaveHandler = () =>{

    this.setState({
      content: ''
    })

    this.props.mouseLeaveHandler()

  }



  render(){

 
    let peopleNum = []

    if(this.props.potentionalClients !== undefined){

      for(let key in this.props.potentionalClients){

        if(this.state.content.includes(this.props.potentionalClients[key].country)){
  
          peopleNum.push({
            ...this.props.potentionalClients[key],
            clients: this.props.potentionalClients[key].clients.length,
            billsSum: this.props.potentionalClients[key].billsSum > 0 ? this.props.potentionalClients[key].billsSum : null
          })
  
        }
  
      }

    }




    
    return(

      <div style={{
        display: this.props.prijave ? 'block' : 'none', 
        border: '2px solid #238be2',
        background: '#1d2027'
        }}>
        <MapChart setTooltipContentEnter={this.mouseEnterHandler} setTooltipContentLeave={this.mouseLeaveHandler}/>
        {
           this.state.content !== '' ?
          <ReactTooltip>
          <h3>{this.state.content}</h3>
          {
            //peopleNum[0].clients !== undefined ?
            <div style={{display: peopleNum.length > 0 ? 'block' : 'none'}}>

              {
                peopleNum.length > 0 ? peopleNum[0].billsSum > 0 ? 
                <h4>{'Zarada: ' + new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(peopleNum[0].billsSum)}</h4>
                : null : null
              }

              <h4>{'Broj klijenata: ' + (peopleNum.length > 0 ? peopleNum[0].clients : null)}</h4>

              {
                peopleNum.length > 0 ? peopleNum[0].billsCounter !== undefined ? 
                <h4>{'Broj računa: ' + (peopleNum.length > 0 ? peopleNum[0].billsCounter : null)}</h4>
                : null : null
              }

            </div>
           // : null
          }
        </ReactTooltip>
        : null
        }
      </div>

    )
  }

}


const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
  return{
      isAuth: state.auth.token 
  }
}

export default connect(mapStateToProps)(Map);
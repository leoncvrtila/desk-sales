import React, {Component} from 'react'
import axios from 'axios'

import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'

import Error from '../../hoc/Error'
import Aux from '../../hoc/Aux'

import {connect} from 'react-redux'

import CountyInput from './CountyInput'

import Spinner from '../../containers/Spinner/Spinner'

import switchD from '../../assets/images/switchD.svg'
import switchL from '../../assets/images/switchL.svg'

class Main extends Component {

    state = {
        form: [],
        services: [],
        allServicesTrue: [],
        servicesWPrice: [],
        user: [],
        sexName: '',
        yearsName: '',
        companyName: '',
        channel: '',
        sex: [
            {active: false, id: 0, display: 'Odaberi'},
            {active: false, id: 1, display: 'Muško'},
            {active: false, id: 2, display: 'Žensko'}
        ],
        years: [
            {active: false, id: 0, display: 'Odaberi'},
            {active: false, id: 1, display: '18-24'},
            {active: false, id: 2, display: '25-34'},
            {active: false, id: 3, display: '35-44'},
            {active: false, id: 4, display: '45-54'},
            {active: false, id: 5, display: '55+'}
        ],
        channels: [
            {active: false, id: 0, display: 'Odaberi'},
            {active: false, id: 1, display: 'Facebook'},
            {active: false, id: 2, display: 'Instagram'},
            {active: false, id: 3, display: 'Google'},
            {active: false, id: 4, display: 'LinkedIn'},
            {active: false, id: 5, display: 'Email'},
            {active: false, id: 6, display: 'YouTube'},
            {active: false, id: 7, display: 'Preporuka'},
            {active: false, id: 8, display: 'Stalni klijent'},
            {active: false, id: 9, display: 'Kupon'},
            {active: false, id: 10, display: 'Letak'},
            {active: false, id: 11, display: 'Plakat'}
        ],
        didMount: true,
        servicesTab: false,
        serviceOne: '',
        serviceTwo: '',
        serviceThree: '',
        serviceFour: '',
        serviceFive: '',
        serviceSix: '',
        serviceSeven: '',
        serviceEight: '',
        serviceNine: '',
        serviceTen: ''

    }


    componentDidMount () {


        axios.all([
            axios.get('https://desk-sales.firebaseio.com/form.json'),
            axios.get('https://desk-sales.firebaseio.com/users/' + this.props.userId + '.json?auth=' + this.props.isAuth)
          ])
          .then(response => {


            let services = []
            
            for(let key in response[1].data.services){

                services.push({
                    ...response[1].data.services[key],
                    id: key,
                    active: false
                })
            }


            this.setState({
                form: response[0].data,
                user: response[1].data,
                services: services

                });
 
          })
          .catch(error => {
            //this.setState({error: true});
          });

    }


componentDidUpdate(prevProps, prevState){


    if(this.state.didMount){
        axios.all([
            axios.get('https://desk-sales.firebaseio.com/form.json'),
            axios.get('https://desk-sales.firebaseio.com/users/' + this.props.userId + '.json?auth=' + this.props.isAuth)
          ])
          .then(response => {
    
  
            let services = []
            
            for(let key in response[1].data.services){

                services.push({
                    ...response[1].data.services[key],
                    id: key,
                    active: false
                })
            }


            
            this.setState({
                didMount: false,
                form: response[0].data,
                user: response[1].data,
                services: services
                });


    
          })
          .catch(error => {
            //this.setState({error: true});
          });

    }


}

sexHandler = (e, id) => {

    const sex = []

    let i

    for(i = 0; i < this.state.sex.length; i++){
        sex.push({
            display: this.state.sex[i].display,
            id: this.state.sex[i].id,
            active: (id===this.state.sex[i].id) ? true : false
        });
    }

    this.setState({
        sex: sex
    })


}

yearsHandler = (e, id) => {

    const years = []

    let i

    for(i = 0; i < this.state.years.length; i++){
        years.push({
            display: this.state.years[i].display,
            id: this.state.years[i].id,
            active: (id===this.state.years[i].id) ? true : false
        });
    }

    this.setState({
        years: years
    })


}

countyChangedHandler = (event, formName) => { // county

		
    const updatedForm = {
        ...this.state.form,
        [formName]: {
            ...this.state.form[formName],
            value: event.target.value,
            valueId: this.state.form.county.elementConfig.options[event.target.selectedIndex].id,
            touched: true
        }
    };
    
    this.setState({form: updatedForm}); 

}


    errorHandler = () => {
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }

    tabHandler = () => {

        this.setState(prevState=>({
            servicesTab: !prevState.servicesTab
        }))

    }

    serviceClickHandler = (e,id) => {

        let services = []
        let allServicesTrue = []

        if(!this.state.services[id].active){

            services.push({
              ...this.state.services,
              [id]:{
                ...this.state.services[id],
                active: true
              }
            })
    
    
            for(let key in services[0]){
              if(services[0][key].active){
    
                allServicesTrue.push(services[0][key])
    
                
                //allServicesTrue.join(',')
    
              }
            }    
            
    
    
            this.setState({
              services: Object.values(services[0]),
              //service: allServicesTrue.join(', ')
              allServicesTrue: allServicesTrue
            })
    
    
          }
            else if(this.state.services[id].active){
    
              services.push({
                ...this.state.services,
                [id]:{
                  ...this.state.services[id],
                  active: false
                }
              })
    
              
              for(let key in services[0]){
                if(services[0][key].active){
      
                  allServicesTrue.push(services[0][key])
        
                }
              }    
              
      
      
              this.setState({
                services: Object.values(services[0]),
                //service: allServicesTrue.join(', ')
                allServicesTrue: allServicesTrue
              })
    
            }

        console.log(allServicesTrue)

        /*this.setState({
            services: services
        })*/

    }

    servicePriceHandler = (e,id) => {

        let services = []
        let servicesWPrice = []

        for(let key in this.state.services){

            if(this.state.services[key].active){
                
                    services.push({
                    ...this.state.services,
                    [id]:{
                        ...this.state.services[id],
                        price: e.target.value
                    }
                    })

                    this.setState({
                        services: Object.values(services[0]),
                      })

            } 


        }


        for(let key in this.state.services){

            if(this.state.services[key].price !== undefined){

                servicesWPrice.push({
                    ...this.state.services[key]
                })

            }
            
        }

        this.setState({
            servicesWPrice: Array.from(new Set (servicesWPrice)) 
          })
        
        

        console.log(this.state.servicesWPrice)

    }

    classicChangeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    makeServicesHandler = () => {


        if(
            (this.state.serviceOne !== '') ||
            (this.state.serviceTwo !== '') ||
            (this.state.serviceThree !== '') ||
            (this.state.serviceFour !== '') ||
            (this.state.serviceFive !== '') ||
            (this.state.serviceSix !== '') ||
            (this.state.serviceSeven !== '') ||
            (this.state.serviceEight !== '') ||
            (this.state.serviceNine !== '') ||
            (this.state.serviceTen !== '') 
        ){


            axios.put('https://desk-sales.firebaseio.com/users/' + this.props.userId +  '/services/.json?auth=' + this.props.isAuth, 
        
                
                [
                   
                    {display: this.state.serviceOne !== '' ? this.state.serviceOne : null},
                    {display: this.state.serviceTwo !== '' ? this.state.serviceTwo : null},
                    {display: this.state.serviceThree !== '' ? this.state.serviceThree : null},
                    {display: this.state.serviceFour !== '' ? this.state.serviceFour : null},
                    {display: this.state.serviceFive !== '' ? this.state.serviceFive : null},
                    {display: this.state.serviceSix !== '' ? this.state.serviceSix : null},
                    {display: this.state.serviceSeven !== '' ? this.state.serviceSeven : null},
                    {display: this.state.serviceEight !== '' ? this.state.serviceEight : null},
                    {display: this.state.serviceNine !== '' ? this.state.serviceNine : null},
                    {display: this.state.serviceTen !== '' ? this.state.serviceTen : null}
            
                ]

        
            )
            
            .then(response => {


                setTimeout(() => {

                    this.setState({
                        serviceOne: '',
                        serviceTwo: '',
                        serviceThree: '',
                        serviceFour: '',
                        serviceFive: '',
                        serviceSix: '',
                        serviceSeven: '',
                        serviceEight: '',
                        serviceNine: '',
                        serviceTen: '',
                        didMount: true
                    })

                }, 500); 
            
            })
            .catch(error => {
                this.setState({error: true});							// hoc error
            });



        }

    }

    addClientHandler = () => {


        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
        let yyyy = today.getFullYear()
  
        today = dd + '.' + mm + '.' + yyyy + '.';

        let years = ''

        for(let key in this.state.years){

            if(this.state.years[key].active){

                years = this.state.years[key].display

            }

        }



        let client = []

        for(let key in this.state.user.clients){

            if(this.state.companyName === this.state.user.clients[key].companyName){

                client.push({
                    ...this.state.user.clients[key],
                    firebasId: key
                })

            }

        }

        let clientClean = []

        for(let key in client){

            clientClean.push({
                ...client[key],
                id: key
            })

        }

        let price = 0

        for(let key in this.state.services){

            if(this.state.services[key].active){
               
                price += parseFloat(this.state.services[key].price)

            }

        }



        
        if(
            (this.state.sexName !== '') &&
            (this.state.yearsName !== '') &&
            (this.state.companyName !== '') &&
            (this.state.channel !== '') &&
            (this.state.allServicesTrue.length > 0) 
        ){  


            if(this.state.user.billsNum === 0){ // prvi racun

                axios.post('https://desk-sales.firebaseio.com/users/' + this.props.userId +  '/clients.json?auth=' + this.props.isAuth, 
               
                {
                    
                    sex: this.state.sexName,
                    years: this.state.yearsName,
                    companyName: this.state.companyName,
                    channel: this.state.channel,
                    billsNum: this.state.user.billsNum+1,
                    bills: [

                        {
                            billsNum: this.state.user.billsNum+1,
                            price: price,
                            date: today,
                            services: [

                                {display: this.state.services[0] !== undefined && this.state.services[0].active === true && this.state.services[0].display !== '' ? this.state.services[0].display : null, price: this.state.services[0] !== undefined && this.state.services[0].active === true && this.state.services[0].price !== '' ? this.state.services[0].price : null },

                                {display: this.state.services[1] !== undefined && this.state.services[1].active === true && this.state.services[2].display !== '' ? this.state.services[1].display : null, price: this.state.services[1] !== undefined && this.state.services[1].active === true && this.state.services[1].price !== '' ? this.state.services[1].price : null },

                                {display: this.state.services[2] !== undefined && this.state.services[2].active === true && this.state.services[2].display !== '' ? this.state.services[2].display : null, price: this.state.services[2] !== undefined && this.state.services[2].active === true && this.state.services[2].price !== '' ? this.state.services[2].price : null },

                                {display: this.state.services[3] !== undefined && this.state.services[3].active === true && this.state.services[3].display !== '' ? this.state.services[3].display : null, price: this.state.services[3] !== undefined && this.state.services[3].active === true && this.state.services[3].price !== '' ? this.state.services[3].price : null },

                                {display: this.state.services[4] !== undefined && this.state.services[4].active === true && this.state.services[4].display !== '' ? this.state.services[4].display : null, price: this.state.services[4] !== undefined && this.state.services[4].active === true && this.state.services[4].price !== '' ? this.state.services[4].price : null },

                                {display: this.state.services[5] !== undefined && this.state.services[5].active === true && this.state.services[5].display !== '' ? this.state.services[5].display : null, price: this.state.services[5] !== undefined && this.state.services[5].active === true && this.state.services[5].price !== '' ? this.state.services[5].price : null },

                                {display: this.state.services[6] !== undefined && this.state.services[6].active === true && this.state.services[6].display !== '' ? this.state.services[6].display : null, price: this.state.services[6] !== undefined && this.state.services[6].active === true && this.state.services[6].price !== '' ? this.state.services[6].price : null },

                                {display: this.state.services[7] !== undefined && this.state.services[7].active === true && this.state.services[7].display !== '' ? this.state.services[7].display : null, price: this.state.services[7] !== undefined && this.state.services[7].active === true && this.state.services[7].price !== '' ? this.state.services[7].price : null },

                                {display: this.state.services[8] !== undefined && this.state.services[8].active === true && this.state.services[8].display !== '' ? this.state.services[8].display : null, price: this.state.services[8] !== undefined && this.state.services[8].active === true && this.state.services[8].price !== '' ? this.state.services[8].price : null },

                                {display: this.state.services[9] !== undefined && this.state.services[9].active === true && this.state.services[9].display !== '' ? this.state.services[9].display : null, price: this.state.services[9] !== undefined && this.state.services[9].active === true && this.state.services[9].price !== '' ? this.state.services[9].price : null },
                            
                            ]
                            
                        },
                        
                    ],

                county: this.state.form.county.value
            
                }
            
        )
        
        .then(response => {


            setTimeout(() => {

                this.setState({
                    companyName: '',
                    sexName: '',
                    yearsName: '',
                    services: [],
                    channel: 'Odaberi',
                    servicesTab: false,
                    didMount: true
                })

                axios.put('https://desk-sales.firebaseio.com/users/' + this.props.userId + '/billsNum.json?auth=' + this.props.isAuth,

                    this.state.user.billsNum + 1
            
                )
                .then(response => {
                })
                .catch(error => {
                    this.setState({error: true});							// hoc error
                });

            }, 500); 

        })
        .catch(error => {
            this.setState({error: true});							// hoc error
        });
    
    } /*else if (clientClean.length > 0) {  // barem jedan racun i podudaranje firmi
        axios.put('https://desk-sales.firebaseio.com/users/' + this.props.userId +  '/clients/' + clientClean.firebasId + '.json?auth=' + this.props.isAuth, 
               
        
                {
                    
                    sex: this.state.sexName,
                    years: this.state.yearsName,
                    companyName: this.state.companyName,
                    channel: this.state.channel,
                    billsNum: this.state.user.billsNum+1,
                    bills: [

                        ...this.state.user.clients[clientClean.id].bills,

                        {
                            billsNum: this.state.user.billsNum+1,
                            price: price,
                            date: today,
                            services: [

                                {display: this.state.services[0] !== undefined && this.state.services[0].active === true && this.state.services[0].display !== '' ? this.state.services[0].display : null, price: this.state.services[0] !== undefined && this.state.services[0].active === true && this.state.services[0].price !== '' ? this.state.services[0].price : null },

                                {display: this.state.services[1] !== undefined && this.state.services[1].active === true && this.state.services[2].display !== '' ? this.state.services[1].display : null, price: this.state.services[1] !== undefined && this.state.services[1].active === true && this.state.services[1].price !== '' ? this.state.services[1].price : null },

                                {display: this.state.services[2] !== undefined && this.state.services[2].active === true && this.state.services[2].display !== '' ? this.state.services[2].display : null, price: this.state.services[2] !== undefined && this.state.services[2].active === true && this.state.services[2].price !== '' ? this.state.services[2].price : null },

                                {display: this.state.services[3] !== undefined && this.state.services[3].active === true && this.state.services[3].display !== '' ? this.state.services[3].display : null, price: this.state.services[3] !== undefined && this.state.services[3].active === true && this.state.services[3].price !== '' ? this.state.services[3].price : null },

                                {display: this.state.services[4] !== undefined && this.state.services[4].active === true && this.state.services[4].display !== '' ? this.state.services[4].display : null, price: this.state.services[4] !== undefined && this.state.services[4].active === true && this.state.services[4].price !== '' ? this.state.services[4].price : null },

                                {display: this.state.services[5] !== undefined && this.state.services[5].active === true && this.state.services[5].display !== '' ? this.state.services[5].display : null, price: this.state.services[5] !== undefined && this.state.services[5].active === true && this.state.services[5].price !== '' ? this.state.services[5].price : null },

                                {display: this.state.services[6] !== undefined && this.state.services[6].active === true && this.state.services[6].display !== '' ? this.state.services[6].display : null, price: this.state.services[6] !== undefined && this.state.services[6].active === true && this.state.services[6].price !== '' ? this.state.services[6].price : null },

                                {display: this.state.services[7] !== undefined && this.state.services[7].active === true && this.state.services[7].display !== '' ? this.state.services[7].display : null, price: this.state.services[7] !== undefined && this.state.services[7].active === true && this.state.services[7].price !== '' ? this.state.services[7].price : null },

                                {display: this.state.services[8] !== undefined && this.state.services[8].active === true && this.state.services[8].display !== '' ? this.state.services[8].display : null, price: this.state.services[8] !== undefined && this.state.services[8].active === true && this.state.services[8].price !== '' ? this.state.services[8].price : null },

                                {display: this.state.services[9] !== undefined && this.state.services[9].active === true && this.state.services[9].display !== '' ? this.state.services[9].display : null, price: this.state.services[9] !== undefined && this.state.services[9].active === true && this.state.services[9].price !== '' ? this.state.services[9].price : null },
                            
                            ]
                            
                        },
                        
                    ],

                county: this.state.form.county.value
            
                }
            
        )
        
        .then(response => {


            setTimeout(() => {

                this.setState({
                    companyName: '',
                    sexName: '',
                    yearsName: '',
                    channel: 'Odaberi',
                    services: [],
                    servicesTab: false,
                    didMount: true
                })

                axios.put('https://desk-sales.firebaseio.com/users/' + this.props.userId + '/billsNum.json?auth=' + this.props.isAuth,

                    this.state.user.billsNum + 1
            
                )
                .then(response => {
                })
                .catch(error => {
                    this.setState({error: true});							// hoc error
                });

            }, 500); 
        

        })
        .catch(error => {
            this.setState({error: true});							// hoc error
        });
    }*/ else if(this.state.user.billsNum > 0 && clientClean.length === 0){ // barem jedan racun i nula podudaranja firmi
        axios.post('https://desk-sales.firebaseio.com/users/' + this.props.userId +  '/clients.json?auth=' + this.props.isAuth, {
               
        
            sex: this.state.sexName,
            years: this.state.yearsName,
            companyName: this.state.companyName,
            channel: this.state.channel,
            billsNum: this.state.user.billsNum+1,
            bills: [

                {
                    billsNum: this.state.user.billsNum+1,
                    price: price,
                    date: today,
                    services: [

                        {display: this.state.services[0] !== undefined && this.state.services[0].active === true && this.state.services[0].display !== '' ? this.state.services[0].display : null, price: this.state.services[0] !== undefined && this.state.services[0].active === true && this.state.services[0].price !== '' ? this.state.services[0].price : null },

                        {display: this.state.services[1] !== undefined && this.state.services[1].active === true && this.state.services[2].display !== '' ? this.state.services[1].display : null, price: this.state.services[1] !== undefined && this.state.services[1].active === true && this.state.services[1].price !== '' ? this.state.services[1].price : null },

                        {display: this.state.services[2] !== undefined && this.state.services[2].active === true && this.state.services[2].display !== '' ? this.state.services[2].display : null, price: this.state.services[2] !== undefined && this.state.services[2].active === true && this.state.services[2].price !== '' ? this.state.services[2].price : null },

                        {display: this.state.services[3] !== undefined && this.state.services[3].active === true && this.state.services[3].display !== '' ? this.state.services[3].display : null, price: this.state.services[3] !== undefined && this.state.services[3].active === true && this.state.services[3].price !== '' ? this.state.services[3].price : null },

                        {display: this.state.services[4] !== undefined && this.state.services[4].active === true && this.state.services[4].display !== '' ? this.state.services[4].display : null, price: this.state.services[4] !== undefined && this.state.services[4].active === true && this.state.services[4].price !== '' ? this.state.services[4].price : null },

                        {display: this.state.services[5] !== undefined && this.state.services[5].active === true && this.state.services[5].display !== '' ? this.state.services[5].display : null, price: this.state.services[5] !== undefined && this.state.services[5].active === true && this.state.services[5].price !== '' ? this.state.services[5].price : null },

                        {display: this.state.services[6] !== undefined && this.state.services[6].active === true && this.state.services[6].display !== '' ? this.state.services[6].display : null, price: this.state.services[6] !== undefined && this.state.services[6].active === true && this.state.services[6].price !== '' ? this.state.services[6].price : null },

                        {display: this.state.services[7] !== undefined && this.state.services[7].active === true && this.state.services[7].display !== '' ? this.state.services[7].display : null, price: this.state.services[7] !== undefined && this.state.services[7].active === true && this.state.services[7].price !== '' ? this.state.services[7].price : null },

                        {display: this.state.services[8] !== undefined && this.state.services[8].active === true && this.state.services[8].display !== '' ? this.state.services[8].display : null, price: this.state.services[8] !== undefined && this.state.services[8].active === true && this.state.services[8].price !== '' ? this.state.services[8].price : null },

                        {display: this.state.services[9] !== undefined && this.state.services[9].active === true && this.state.services[9].display !== '' ? this.state.services[9].display : null, price: this.state.services[9] !== undefined && this.state.services[9].active === true && this.state.services[9].price !== '' ? this.state.services[9].price : null },
                    
                    ]
                    
                },
                
            ],

        county: this.state.form.county.value
    
        }
    
)

.then(response => {


    setTimeout(() => {

        this.setState({
            companyName: '',
            sexName: '',
            yearsName: '',
            channel: 'Odaberi',
            services: [],
            servicesTab: false,
            didMount: true
        })

        axios.put('https://desk-sales.firebaseio.com/users/' + this.props.userId + '/billsNum.json?auth=' + this.props.isAuth,

            this.state.user.billsNum + 1
    
        )
        .then(response => {
        })
        .catch(error => {
            this.setState({error: true});							// hoc error
        });

    }, 500); 


})
.catch(error => {
    this.setState({error: true});							// hoc error
});
    }
            
            

    }

    }

     render() {

        /*let sex = this.state.sex.map( s => ( 

            <div 
                className="sex"
                style={{background: s.active ? '#7d869c' : '#1d2027'}} // dodat boju
                key={s.id} 
                onClick={(e)=>this.sexHandler(e,s.id)}
                >{s.display}
            </div>

        ))

        
        let years = this.state.years.map( s => ( 

            <div 
                className="yearsNum"
                style={{background: s.active ? '#7d869c' : '#1d2027'}} // dodat boju
                key={s.id} 
                onClick={(e)=>this.yearsHandler(e,s.id)}
                >{s.display}
            </div>

        ))*/

        const formElementsArray = [];									// prolazi kroz form i pretvara ga u array
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
            });
        }

        let countyInput = formElementsArray.map(formElement => (
            <CountyInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementName={formElement.config.elementName}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                errorModal={this.state.errorModal}
                changedCounty={(event) => this.countyChangedHandler(event, formElement.id)}
            />
        ));

        let channels
        let services
        let sex
        let years

        let spinner = null

        if(this.state.didMount){
            spinner = <Spinner />
        }


        return (

            <Aux>

                <div className="spinnerDiv" style={{display: this.state.didMount === true ? 'block' : 'none'}}>
                    {spinner}
                </div>
                
                <div className="makeServices" style={{display: this.state.services.length > 0 ? 'none' : 'block'}}>

                    <h3>Upiši usluge</h3>
                    
                    <div className="makeServicesInputs">
                        <div>
                            <input className="InputElement" type="text" onChange={(e)=>this.classicChangeHandler(e)} name="serviceOne" placeholder="Naziv usluge" />

                            <input className="InputElement" type="text" onChange={(e)=>this.classicChangeHandler(e)} name="serviceTwo" placeholder="Naziv usluge" />

                            <input className="InputElement" type="text" onChange={(e)=>this.classicChangeHandler(e)} name="serviceThree" placeholder="Naziv usluge" />

                            <input className="InputElement" type="text" onChange={(e)=>this.classicChangeHandler(e)} name="serviceFour" placeholder="Naziv usluge" />

                            <input className="InputElement" type="text" onChange={(e)=>this.classicChangeHandler(e)} name="serviceFive" placeholder="Naziv usluge" />
                        </div>

                        <div>
                            <input className="InputElement" type="text" onChange={(e)=>this.classicChangeHandler(e)} name="serviceSix" placeholder="Naziv usluge" />

                            <input className="InputElement" type="text" onChange={(e)=>this.classicChangeHandler(e)} name="serviceSeven" placeholder="Naziv usluge" />

                            <input className="InputElement" type="text" onChange={(e)=>this.classicChangeHandler(e)} name="serviceEight" placeholder="Naziv usluge" />

                            <input className="InputElement" type="text" onChange={(e)=>this.classicChangeHandler(e)} name="serviceNine" placeholder="Naziv usluge" />

                            <input className="InputElement" type="text" onChange={(e)=>this.classicChangeHandler(e)} name="serviceTen" placeholder="Naziv usluge" />
                        </div>
                    </div>

                    <div className="makeServicesBtn" onDoubleClick={this.makeServicesHandler}>Spremi</div>

                </div>

                <div className="AddNewWrapp" style={{display: this.state.services.length > 0 ? 'block' : 'none'}}>
                    
                    <div className="contactInfo">

                        <div>
                            <h4>Spol</h4>
                            <select className="InputElement" onChange={(e)=>this.classicChangeHandler(e)} name="sexName" value={this.state.sexName} >
                                {
                                    sex = this.state.sex.map(m => (
                                        <option key={m.id}>{m.display}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <h4>Dob</h4>
                            <select className="InputElement" onChange={(e)=>this.classicChangeHandler(e)} name="yearsName" value={this.state.yearsName} >
                                {
                                    years = this.state.years.map(m => (
                                        <option key={m.id}>{m.display}</option>
                                    ))
                                }
                            </select>
                        </div>
                       
                        <input className="InputElement" onChange={(e)=>this.classicChangeHandler(e)} name="companyName" value={this.state.companyName} type="text" placeholder="Ime tvrtke" />


                    </div>

                    <div className="options">

                        <div>
                            <h4>Kanali</h4>
                            <select className="InputElement" onChange={(e)=>this.classicChangeHandler(e)} name="channel" value={this.state.channel} >
                                {
                                    channels = this.state.channels.map(m => (
                                        <option key={m.id}>{m.display}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div>
                            <h4>Usluge</h4>
                            <div className="services">

                                <div className="servicesUp">

                                    <div>Odaberi</div>
                                    <div className="tabSwitch" onClick={this.tabHandler}>
                                            {
                                                this.state.servicesTab ? <div><img src={switchD} /></div> : <div><img src={switchL} /></div> 
                                            }
                                    </div>

                                </div>

                                <div className="servicesOpt" style={{display: this.state.servicesTab ? 'block' : 'none'}}>
                                    {
                                        services = this.state.services.map(m => (
                                            <div key={m.display} className="service" style={{background: m.active ? 'aliceblue' : 'none'}}>
                                                
                                                <div onClick={(e)=>this.serviceClickHandler(e,m.id)}>{m.display}</div>
                                                <div style={{display: m.active ? 'block' : 'none'}}>
                                                    <input type="number" onChange={(e)=>this.servicePriceHandler(e,m.id)} />
                                                </div>

                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        {countyInput}

                    </div>

                    <div className="makeServicesBtn" onClick={this.addClientHandler}>
                        Spremi
                    </div>

                </div>

                <Error
                    error={this.state.error}
                    errorHandler={this.errorHandler}
                />


            </Aux>
        );
    }

}


const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token,
        email: state.auth.email,
        userId: state.auth.userId
    }
}


export default connect(mapStateToProps)(Main);
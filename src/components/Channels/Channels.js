import React, {Component} from 'react'

import * as axios from 'axios'
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveChoroplethCanvas  } from '@nivo/geo'

import bill from '../../assets/images/bill.svg'
import earning from '../../assets/images/money.svg'

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
let yyyy = today.getFullYear()

today = dd + '.' + mm + '.' + yyyy + '.';

let nowDate = mm + '.' + yyyy + '.'



class Channel extends Component {

    state={

        user: [],
        channel: '',
        period: 'Sve vrijeme',
        didMount: false,
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
        ]

    }


    componentDidMount () {


        axios.all([
            axios.get('https://desk-sales.firebaseio.com/users/' + this.props.userId + '.json?auth=' + this.props.isAuth)
          ])
          .then(response => {


            let services = []
            
            for(let key in response[0].data.services){

                services.push({
                    ...response[0].data.services[key],
                    id: key,
                    active: false
                })
            }


            this.setState({
                user: response[0].data,
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
            axios.get('https://desk-sales.firebaseio.com/users/' + this.props.userId + '.json?auth=' + this.props.isAuth)
          ])
          .then(response => {
    
  
            let services = []
            
            for(let key in response[0].data.services){

                services.push({
                    ...response[0].data.services[key],
                    id: key,
                    active: false
                })
            }


            
            this.setState({
                didMount: false,
                user: response[0].data,
                services: services
                });


    
          })
          .catch(error => {
            //this.setState({error: true});
          });

    }


    
}

classicChangeHandler = (e) => {

    this.setState({
        [e.target.name]: e.target.value
    })

}

    render(){

        let yearNum 

        let allYears = []

        for(yearNum = 0; yearNum < 50; yearNum++) {

        allYears.push(
            
            {month: '01.' + (2020 + yearNum) + '.'},
            {month: '02.' + (2020 + yearNum) + '.'},
            {month: '03.' + (2020 + yearNum) + '.'},
            {month: '04.' + (2020 + yearNum) + '.'},
            {month: '05.' + (2020 + yearNum) + '.'},
            {month: '06.' + (2020 + yearNum) + '.'},
            {month: '07.' + (2020 + yearNum) + '.'},
            {month: '08.' + (2020 + yearNum) + '.'},
            {month: '09.' + (2020 + yearNum) + '.'},
            {month: '10.' + (2020 + yearNum) + '.'},
            {month: '11.' + (2020 + yearNum) + '.'},
            {month: '12.' + (2020 + yearNum) + '.'},
        
        )

    }

    let month = []

    if(this.state.user.length !== 0){

        for(let key in this.state.user.clients){

        
                for(let m in allYears){

                    if(this.state.user.clients[key].bills[0].date.includes(allYears[m].month)){
        
                        month.push({date: allYears[m].month})        
            
                }
            }    
        }
    }



    month = month.filter((thing, index, self) =>
    index === self.findIndex((t) => (
        t.date === thing.date 
    ))
    )



        let sexData = []
        let dobData = []
        let countyData = []

        let money = 0
        let allMoney = 0
        let sex
        let years
        let county

        let clients = []

        if(this.state.user.clients){

            for(let key in this.state.user.clients){

                if(
                    this.state.channel === this.state.user.clients[key].channel &&
                    this.state.user.clients[key].bills[0].date.includes(this.state.period)
                ){
    
                    clients.push({
                        ...this.state.user.clients[key]
                    })
    
                    for(let c in clients){
    
                        money += parseFloat( clients[c].bills[0].price );
    
                    }
    
                    allMoney = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(money)
    
                }
    
                let men = []
                let women = []
    
                let birthdate1 = []
                let birthdate2 = []
                let birthdate3 = []
                let birthdate4 = []
                let birthdate5 = []

                let county1 = []
                let county2 = []
                let county3 = []
                let county4 = []
                let county5 = []
                let county6 = []
                let county7 = []
                let county8 = []
                let county9 = []
                let county10 = []
                let county11 = []
                let county12 = []
                let county13 = []
                let county14 = []
                let county15 = []
                let county16 = []
                let county17 = []
                let county18 = []
                let county19 = []
                let county20 = []
                let county21 = []

    
    
                for(let l in clients) {
                    if(clients[l].sex === 'Muško'){
                        men.push(clients[l])
                    } else {
                        women.push(clients[l])
                    }
                }
    
                 /// sex data pie
                 sexData = [
                     {   
                         "id": "Muškarci",
                         "label": "Muškarci",
                         "value": men.length,
                         "color": '#74859a'
                     },
                     {   
                         "id": "Žene",
                         "label": "Žene",
                         "value": women.length,
                         "color": '#83749a'
                     }
                     ]


                     // dob
                     for(let l in clients) {
                        if(clients[l].years === '18-24'){
                            birthdate1.push(clients[l])
                        } else if(clients[l].years === '25-34') {
                            birthdate2.push(clients[l])
                        } else if(clients[l].years === '35-44') {
                            birthdate3.push(clients[l])
                        } else if(clients[l].years === '45-54') {
                            birthdate4.push(clients[l])
                        } else if(clients[l].years === '55+') {
                            birthdate5.push(clients[l])
                        }
                    }
        
                    /// dob data pie
                    dobData = [
                       {   
                           "id": "18-24",
                           "label": "18-24",
                           "value": birthdate1.length,
                           "color": '#74859a'
                       },
                       {   
                           "id": "25-34",
                           "label": "25-34",
                           "value": birthdate2.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "35-44",
                           "label": "35-44",
                           "value": birthdate3.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "45-54",
                           "label": "45-54",
                           "value": birthdate4.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "55+",
                           "label": "55+",
                           "value": birthdate5.length,
                           "color": '#83749a'
                       }
                       ]

                       // zupanije
                       for(let l in clients) {
                        if(clients[l].county === 'Zagrebačka županija'){
                            county1.push(clients[l])
                        } else if(clients[l].county === 'Krapinsko-zagorska županija') {
                            county2.push(clients[l])
                        } else if(clients[l].county === 'Sisačko-moslavačka županija') {
                            county3.push(clients[l])
                        } else if(clients[l].county === 'Karlovačka županija') {
                            county4.push(clients[l])
                        } else if(clients[l].county === 'Varaždinska županija') {
                            county5.push(clients[l])
                        } else if(clients[l].county === 'Koprivničko-križevačka županija') {
                            county6.push(clients[l])
                        } else if(clients[l].county === 'Bjelovarsko-bilogorska županija') {
                            county7.push(clients[l])
                        } else if(clients[l].county === 'Primorsko-goranska županija') {
                            county8.push(clients[l])
                        } else if(clients[l].county === 'Ličko-senjska županija') {
                            county9.push(clients[l])
                        } else if(clients[l].county === 'Virovitičko-podravska županija') {
                            county10.push(clients[l])
                        } else if(clients[l].county === 'Požeško-slavonska županija') {
                            county11.push(clients[l])
                        } else if(clients[l].county === 'Brodsko-posavska županija') {
                            county12.push(clients[l])
                        } else if(clients[l].county === 'Zadarska županija') {
                            county13.push(clients[l])
                        } else if(clients[l].county === 'Osječko-baranjska županija') {
                            county14.push(clients[l])
                        } else if(clients[l].county === 'Šibensko-kninska županija') {
                            county15.push(clients[l])
                        } else if(clients[l].county === 'Vukovarsko-srijemska županija') {
                            county16.push(clients[l])
                        } else if(clients[l].county === 'Splitsko-dalmatinska županija') {
                            county17.push(clients[l])
                        } else if(clients[l].county === 'Istarska županija') {
                            county18.push(clients[l])
                        } else if(clients[l].county === 'Dubrovačko-neretvanska županija') {
                            county19.push(clients[l])
                        } else if(clients[l].county === 'Međimurska županija') {
                            county20.push(clients[l])
                        } else if(clients[l].county === 'Grad Zagreb') {
                            county21.push(clients[l])
                        }
                    }
        
                    /// zupanije data pie
                    countyData = [
                       {   
                           "id": "Zagrebačka županija",
                           "label": "Zagrebačka županija",
                           "value": county1.length,
                           "color": '#74859a'
                       },
                       {   
                           "id": "Krapinsko-zagorska županija",
                           "label": "Krapinsko-zagorska županija",
                           "value": county2.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Sisačko-moslavačka županija",
                           "label": "Sisačko-moslavačka županija",
                           "value": county3.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Karlovačka županija",
                           "label": "Karlovačka županija",
                           "value": county4.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Varaždinska županija",
                           "label": "Varaždinska županija",
                           "value": county5.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Koprivničko-križevačka županija",
                           "label": "Koprivničko-križevačka županija",
                           "value": county6.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Bjelovarsko-bilogorska županija",
                           "label": "Bjelovarsko-bilogorska županija",
                           "value": county7.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Primorsko-goranska županija",
                           "label": "Primorsko-goranska županija",
                           "value": county8.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Ličko-senjska županija",
                           "label": "Ličko-senjska županija",
                           "value": county9.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Virovitičko-podravska županija",
                           "label": "Virovitičko-podravska županija",
                           "value": county10.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Požeško-slavonska županija",
                           "label": "Požeško-slavonska županija",
                           "value": county11.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Brodsko-posavska županija",
                           "label": "Brodsko-posavska županija",
                           "value": county12.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Zadarska županija",
                           "label": "Zadarska županija",
                           "value": county13.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Osječko-baranjska županija",
                           "label": "Osječko-baranjska županija",
                           "value": county14.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Šibensko-kninska županija",
                           "label": "Šibensko-kninska županija",
                           "value": county15.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Vukovarsko-srijemska županija",
                           "label": "Vukovarsko-srijemska županija",
                           "value": county16.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Splitsko-dalmatinska županija",
                           "label": "Splitsko-dalmatinska županija",
                           "value": county17.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Istarska županija",
                           "label": "Istarska županija",
                           "value": county18.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Dubrovačko-neretvanska županija",
                           "label": "Dubrovačko-neretvanska županija",
                           "value": county19.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Međimurska županija",
                           "label": "Međimurska županija",
                           "value": county20.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Grad Zagreb",
                           "label": "Grad Zagreb",
                           "value": county21.length,
                           "color": '#83749a'
                       }


                       ]
    
            }
            
        }

        
        if(this.state.user.clients){

            for(let key in this.state.user.clients){

                if(
                    this.state.channel === this.state.user.clients[key].channel &&
                    this.state.period === 'Sve vrijeme'
                ){
    
                    clients.push({
                        ...this.state.user.clients[key]
                    })
    
                    for(let c in clients){
    
                        money += parseFloat( clients[c].bills[0].price );
    
                    }
    
                    allMoney = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(money)
    
                }
    
                let men = []
                let women = []
    
                let birthdate1 = []
                let birthdate2 = []
                let birthdate3 = []
                let birthdate4 = []
                let birthdate5 = []

                let county1 = []
                let county2 = []
                let county3 = []
                let county4 = []
                let county5 = []
                let county6 = []
                let county7 = []
                let county8 = []
                let county9 = []
                let county10 = []
                let county11 = []
                let county12 = []
                let county13 = []
                let county14 = []
                let county15 = []
                let county16 = []
                let county17 = []
                let county18 = []
                let county19 = []
                let county20 = []
                let county21 = []

    
    
                for(let l in clients) {
                    if(clients[l].sex === 'Muško'){
                        men.push(clients[l])
                    } else {
                        women.push(clients[l])
                    }
                }
    
                 /// sex data pie
                 sexData = [
                     {   
                         "id": "Muškarci",
                         "label": "Muškarci",
                         "value": men.length,
                         "color": '#74859a'
                     },
                     {   
                         "id": "Žene",
                         "label": "Žene",
                         "value": women.length,
                         "color": '#83749a'
                     }
                     ]


                     // dob
                     for(let l in clients) {
                        if(clients[l].years === '18-24'){
                            birthdate1.push(clients[l])
                        } else if(clients[l].years === '25-34') {
                            birthdate2.push(clients[l])
                        } else if(clients[l].years === '35-44') {
                            birthdate3.push(clients[l])
                        } else if(clients[l].years === '45-54') {
                            birthdate4.push(clients[l])
                        } else if(clients[l].years === '55+') {
                            birthdate5.push(clients[l])
                        }
                    }
        
                    /// dob data pie
                    dobData = [
                       {   
                           "id": "18-24",
                           "label": "18-24",
                           "value": birthdate1.length,
                           "color": '#74859a'
                       },
                       {   
                           "id": "25-34",
                           "label": "25-34",
                           "value": birthdate2.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "35-44",
                           "label": "35-44",
                           "value": birthdate3.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "45-54",
                           "label": "45-54",
                           "value": birthdate4.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "55+",
                           "label": "55+",
                           "value": birthdate5.length,
                           "color": '#83749a'
                       }
                       ]

                       // zupanije
                       for(let l in clients) {
                        if(clients[l].county === 'Zagrebačka županija'){
                            county1.push(clients[l])
                        } else if(clients[l].county === 'Krapinsko-zagorska županija') {
                            county2.push(clients[l])
                        } else if(clients[l].county === 'Sisačko-moslavačka županija') {
                            county3.push(clients[l])
                        } else if(clients[l].county === 'Karlovačka županija') {
                            county4.push(clients[l])
                        } else if(clients[l].county === 'Varaždinska županija') {
                            county5.push(clients[l])
                        } else if(clients[l].county === 'Koprivničko-križevačka županija') {
                            county6.push(clients[l])
                        } else if(clients[l].county === 'Bjelovarsko-bilogorska županija') {
                            county7.push(clients[l])
                        } else if(clients[l].county === 'Primorsko-goranska županija') {
                            county8.push(clients[l])
                        } else if(clients[l].county === 'Ličko-senjska županija') {
                            county9.push(clients[l])
                        } else if(clients[l].county === 'Virovitičko-podravska županija') {
                            county10.push(clients[l])
                        } else if(clients[l].county === 'Požeško-slavonska županija') {
                            county11.push(clients[l])
                        } else if(clients[l].county === 'Brodsko-posavska županija') {
                            county12.push(clients[l])
                        } else if(clients[l].county === 'Zadarska županija') {
                            county13.push(clients[l])
                        } else if(clients[l].county === 'Osječko-baranjska županija') {
                            county14.push(clients[l])
                        } else if(clients[l].county === 'Šibensko-kninska županija') {
                            county15.push(clients[l])
                        } else if(clients[l].county === 'Vukovarsko-srijemska županija') {
                            county16.push(clients[l])
                        } else if(clients[l].county === 'Splitsko-dalmatinska županija') {
                            county17.push(clients[l])
                        } else if(clients[l].county === 'Istarska županija') {
                            county18.push(clients[l])
                        } else if(clients[l].county === 'Dubrovačko-neretvanska županija') {
                            county19.push(clients[l])
                        } else if(clients[l].county === 'Međimurska županija') {
                            county20.push(clients[l])
                        } else if(clients[l].county === 'Grad Zagreb') {
                            county21.push(clients[l])
                        }
                    }
        
                    /// zupanije data pie
                    countyData = [
                       {   
                           "id": "Zagrebačka županija",
                           "label": "Zagrebačka županija",
                           "value": county1.length,
                           "color": '#74859a'
                       },
                       {   
                           "id": "Krapinsko-zagorska županija",
                           "label": "Krapinsko-zagorska županija",
                           "value": county2.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Sisačko-moslavačka županija",
                           "label": "Sisačko-moslavačka županija",
                           "value": county3.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Karlovačka županija",
                           "label": "Karlovačka županija",
                           "value": county4.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Varaždinska županija",
                           "label": "Varaždinska županija",
                           "value": county5.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Koprivničko-križevačka županija",
                           "label": "Koprivničko-križevačka županija",
                           "value": county6.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Bjelovarsko-bilogorska županija",
                           "label": "Bjelovarsko-bilogorska županija",
                           "value": county7.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Primorsko-goranska županija",
                           "label": "Primorsko-goranska županija",
                           "value": county8.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Ličko-senjska županija",
                           "label": "Ličko-senjska županija",
                           "value": county9.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Virovitičko-podravska županija",
                           "label": "Virovitičko-podravska županija",
                           "value": county10.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Požeško-slavonska županija",
                           "label": "Požeško-slavonska županija",
                           "value": county11.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Brodsko-posavska županija",
                           "label": "Brodsko-posavska županija",
                           "value": county12.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Zadarska županija",
                           "label": "Zadarska županija",
                           "value": county13.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Osječko-baranjska županija",
                           "label": "Osječko-baranjska županija",
                           "value": county14.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Šibensko-kninska županija",
                           "label": "Šibensko-kninska županija",
                           "value": county15.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Vukovarsko-srijemska županija",
                           "label": "Vukovarsko-srijemska županija",
                           "value": county16.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Splitsko-dalmatinska županija",
                           "label": "Splitsko-dalmatinska županija",
                           "value": county17.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Istarska županija",
                           "label": "Istarska županija",
                           "value": county18.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Dubrovačko-neretvanska županija",
                           "label": "Dubrovačko-neretvanska županija",
                           "value": county19.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Međimurska županija",
                           "label": "Međimurska županija",
                           "value": county20.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Grad Zagreb",
                           "label": "Grad Zagreb",
                           "value": county21.length,
                           "color": '#83749a'
                       }


                       ]
    
            }
            
        }


        
        return(

            <Aux>

                <div className="channelWrapp">

                    <div className="channelWrappFilters">
                        <select className="InputElement" onChange={(e)=>this.classicChangeHandler(e)} name="channel" value={this.state.channel} >
                                {
                                    this.state.channels.map(m => (
                                        <option key={m.id}>{m.display}</option>
                                    ))
                                }
                        </select>

                        <select className="InputElement" onChange={(e)=>this.classicChangeHandler(e)} name="period" value={this.state.period} >
                                <option>Sve vrijeme</option>
                                {
                                    month.map(m => (
                                        <option key={m.date}>{m.date}</option>
                                    ))
                                }
                        </select>
                    </div>

                    <div>

                        <div className="moneyInfo">

                            <div style={{backgroundImage: 'linear-gradient(to right, rgb(87 218 145) 20%, rgb(121 181 26) 100%)'}}><img src={bill} /><h4>Broj uplata: {clients.length}</h4></div>

                            <div style={{backgroundImage: 'linear-gradient(90deg, rgba(238,174,202,1) 20%, rgba(148,187,233,1) 100%)'}}><img src={earning} /><h4>Zarada: {allMoney}</h4></div>
                        </div>

                        <div className="pieInfo" style={{display: clients.length > 0 ? 'flex' : 'none'}}>
                            
                        <div>  

                        <h4>Analiza prema spolu</h4>

                        <ResponsivePie
                                data={sexData}
                                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                innerRadius={0.65}
                                padAngle={3}
                                cornerRadius={3}
                                colors={{ scheme: 'paired' }}
                                borderWidth={1}
                                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                                radialLabelsSkipAngle={10}
                                radialLabelsTextXOffset={6}
                                radialLabelsTextColor="#00000"
                                radialLabelsLinkOffset={0}
                                radialLabelsLinkDiagonalLength={16}
                                radialLabelsLinkHorizontalLength={24}
                                radialLabelsLinkStrokeWidth={1}
                                radialLabelsLinkColor={{ from: 'color' }}
                                slicesLabelsSkipAngle={10}
                                slicesLabelsTextColor="#00000"
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                                defs={[
                                    {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                                    }
                                ]}
                                legends={[
                                    {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                                }
                                            ]
                                        }
                                    ]}
                                />
                        </div>

                        <div>
                        
                        <h4>Analiza prema dobi</h4>

                        <ResponsivePie
                                data={dobData}
                                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                innerRadius={0.65}
                                padAngle={3}
                                cornerRadius={3}
                                colors={{ scheme: 'pastel1' }}
                                borderWidth={1}
                                borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                                radialLabelsSkipAngle={10}
                                radialLabelsTextXOffset={6}
                                radialLabelsTextColor="#00000"
                                radialLabelsLinkOffset={0}
                                radialLabelsLinkDiagonalLength={16}
                                radialLabelsLinkHorizontalLength={24}
                                radialLabelsLinkStrokeWidth={1}
                                radialLabelsLinkColor={{ from: 'color' }}
                                slicesLabelsSkipAngle={10}
                                slicesLabelsTextColor="#00000"
                                animate={true}
                                motionStiffness={90}
                                motionDamping={15}
                                defs={[
                                    {
                                id: 'dots',
                                type: 'patternDots',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                size: 4,
                                padding: 1,
                                stagger: true
                            },
                            {
                                id: 'lines',
                                type: 'patternLines',
                                background: 'inherit',
                                color: 'rgba(255, 255, 255, 0.3)',
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10
                                    }
                                ]}
                                legends={[
                                    {
                                anchor: 'bottom',
                                direction: 'row',
                                translateY: 56,
                                itemWidth: 100,
                                itemHeight: 18,
                                itemTextColor: '#999',
                                symbolSize: 18,
                                symbolShape: 'circle',
                                effects: [
                                    {
                                        on: 'hover',
                                        style: {
                                            itemTextColor: '#000'
                                        }
                                                }
                                            ]
                                        }
                                    ]}
                                />
                        </div>
                        
                    </div>

                    <div className="countyInfo" style={{display: clients.length > 0 ? 'flex' : 'none'}}>
                            
                            <div>  
    
                            <h4>Analiza prema županiji</h4>
    
                            <ResponsivePie
                                    data={countyData}
                                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                                    innerRadius={0.65}
                                    padAngle={3}
                                    cornerRadius={3}
                                    colors={{ scheme: 'paired' }}
                                    borderWidth={1}
                                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
                                    radialLabelsSkipAngle={10}
                                    radialLabelsTextXOffset={6}
                                    radialLabelsTextColor="#00000"
                                    radialLabelsLinkOffset={0}
                                    radialLabelsLinkDiagonalLength={16}
                                    radialLabelsLinkHorizontalLength={24}
                                    radialLabelsLinkStrokeWidth={1}
                                    radialLabelsLinkColor={{ from: 'color' }}
                                    slicesLabelsSkipAngle={10}
                                    slicesLabelsTextColor="#00000"
                                    animate={true}
                                    motionStiffness={90}
                                    motionDamping={15}
                                    defs={[
                                        {
                                    id: 'dots',
                                    type: 'patternDots',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    size: 4,
                                    padding: 1,
                                    stagger: true
                                },
                                {
                                    id: 'lines',
                                    type: 'patternLines',
                                    background: 'inherit',
                                    color: 'rgba(255, 255, 255, 0.3)',
                                    rotation: -45,
                                    lineWidth: 6,
                                    spacing: 10
                                        }
                                    ]}
                                    legends={[
                                        {
                                    anchor: 'left',
                                    direction: 'column',
                                    translateY: 38,
                                    itemWidth: 100,
                                    itemHeight: 22,
                                    itemTextColor: '#999',
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000'
                                            }
                                                    }
                                                ]
                                            }
                                        ]}
                                    />
                            </div>
    
                            
                        </div>

                    </div>

                </div>

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


export default connect(mapStateToProps)(Channel);
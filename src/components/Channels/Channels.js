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
                    if(clients[l].sex === 'Mu??ko'){
                        men.push(clients[l])
                    } else {
                        women.push(clients[l])
                    }
                }
    
                 /// sex data pie
                 sexData = [
                     {   
                         "id": "Mu??karci",
                         "label": "Mu??karci",
                         "value": men.length,
                         "color": '#74859a'
                     },
                     {   
                         "id": "??ene",
                         "label": "??ene",
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
                        if(clients[l].county === 'Zagreba??ka ??upanija'){
                            county1.push(clients[l])
                        } else if(clients[l].county === 'Krapinsko-zagorska ??upanija') {
                            county2.push(clients[l])
                        } else if(clients[l].county === 'Sisa??ko-moslava??ka ??upanija') {
                            county3.push(clients[l])
                        } else if(clients[l].county === 'Karlova??ka ??upanija') {
                            county4.push(clients[l])
                        } else if(clients[l].county === 'Vara??dinska ??upanija') {
                            county5.push(clients[l])
                        } else if(clients[l].county === 'Koprivni??ko-kri??eva??ka ??upanija') {
                            county6.push(clients[l])
                        } else if(clients[l].county === 'Bjelovarsko-bilogorska ??upanija') {
                            county7.push(clients[l])
                        } else if(clients[l].county === 'Primorsko-goranska ??upanija') {
                            county8.push(clients[l])
                        } else if(clients[l].county === 'Li??ko-senjska ??upanija') {
                            county9.push(clients[l])
                        } else if(clients[l].county === 'Viroviti??ko-podravska ??upanija') {
                            county10.push(clients[l])
                        } else if(clients[l].county === 'Po??e??ko-slavonska ??upanija') {
                            county11.push(clients[l])
                        } else if(clients[l].county === 'Brodsko-posavska ??upanija') {
                            county12.push(clients[l])
                        } else if(clients[l].county === 'Zadarska ??upanija') {
                            county13.push(clients[l])
                        } else if(clients[l].county === 'Osje??ko-baranjska ??upanija') {
                            county14.push(clients[l])
                        } else if(clients[l].county === '??ibensko-kninska ??upanija') {
                            county15.push(clients[l])
                        } else if(clients[l].county === 'Vukovarsko-srijemska ??upanija') {
                            county16.push(clients[l])
                        } else if(clients[l].county === 'Splitsko-dalmatinska ??upanija') {
                            county17.push(clients[l])
                        } else if(clients[l].county === 'Istarska ??upanija') {
                            county18.push(clients[l])
                        } else if(clients[l].county === 'Dubrova??ko-neretvanska ??upanija') {
                            county19.push(clients[l])
                        } else if(clients[l].county === 'Me??imurska ??upanija') {
                            county20.push(clients[l])
                        } else if(clients[l].county === 'Grad Zagreb') {
                            county21.push(clients[l])
                        }
                    }
        
                    /// zupanije data pie
                    countyData = [
                       {   
                           "id": "Zagreba??ka ??upanija",
                           "label": "Zagreba??ka ??upanija",
                           "value": county1.length,
                           "color": '#74859a'
                       },
                       {   
                           "id": "Krapinsko-zagorska ??upanija",
                           "label": "Krapinsko-zagorska ??upanija",
                           "value": county2.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Sisa??ko-moslava??ka ??upanija",
                           "label": "Sisa??ko-moslava??ka ??upanija",
                           "value": county3.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Karlova??ka ??upanija",
                           "label": "Karlova??ka ??upanija",
                           "value": county4.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Vara??dinska ??upanija",
                           "label": "Vara??dinska ??upanija",
                           "value": county5.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Koprivni??ko-kri??eva??ka ??upanija",
                           "label": "Koprivni??ko-kri??eva??ka ??upanija",
                           "value": county6.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Bjelovarsko-bilogorska ??upanija",
                           "label": "Bjelovarsko-bilogorska ??upanija",
                           "value": county7.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Primorsko-goranska ??upanija",
                           "label": "Primorsko-goranska ??upanija",
                           "value": county8.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Li??ko-senjska ??upanija",
                           "label": "Li??ko-senjska ??upanija",
                           "value": county9.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Viroviti??ko-podravska ??upanija",
                           "label": "Viroviti??ko-podravska ??upanija",
                           "value": county10.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Po??e??ko-slavonska ??upanija",
                           "label": "Po??e??ko-slavonska ??upanija",
                           "value": county11.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Brodsko-posavska ??upanija",
                           "label": "Brodsko-posavska ??upanija",
                           "value": county12.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Zadarska ??upanija",
                           "label": "Zadarska ??upanija",
                           "value": county13.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Osje??ko-baranjska ??upanija",
                           "label": "Osje??ko-baranjska ??upanija",
                           "value": county14.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "??ibensko-kninska ??upanija",
                           "label": "??ibensko-kninska ??upanija",
                           "value": county15.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Vukovarsko-srijemska ??upanija",
                           "label": "Vukovarsko-srijemska ??upanija",
                           "value": county16.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Splitsko-dalmatinska ??upanija",
                           "label": "Splitsko-dalmatinska ??upanija",
                           "value": county17.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Istarska ??upanija",
                           "label": "Istarska ??upanija",
                           "value": county18.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Dubrova??ko-neretvanska ??upanija",
                           "label": "Dubrova??ko-neretvanska ??upanija",
                           "value": county19.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Me??imurska ??upanija",
                           "label": "Me??imurska ??upanija",
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
                    if(clients[l].sex === 'Mu??ko'){
                        men.push(clients[l])
                    } else {
                        women.push(clients[l])
                    }
                }
    
                 /// sex data pie
                 sexData = [
                     {   
                         "id": "Mu??karci",
                         "label": "Mu??karci",
                         "value": men.length,
                         "color": '#74859a'
                     },
                     {   
                         "id": "??ene",
                         "label": "??ene",
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
                        if(clients[l].county === 'Zagreba??ka ??upanija'){
                            county1.push(clients[l])
                        } else if(clients[l].county === 'Krapinsko-zagorska ??upanija') {
                            county2.push(clients[l])
                        } else if(clients[l].county === 'Sisa??ko-moslava??ka ??upanija') {
                            county3.push(clients[l])
                        } else if(clients[l].county === 'Karlova??ka ??upanija') {
                            county4.push(clients[l])
                        } else if(clients[l].county === 'Vara??dinska ??upanija') {
                            county5.push(clients[l])
                        } else if(clients[l].county === 'Koprivni??ko-kri??eva??ka ??upanija') {
                            county6.push(clients[l])
                        } else if(clients[l].county === 'Bjelovarsko-bilogorska ??upanija') {
                            county7.push(clients[l])
                        } else if(clients[l].county === 'Primorsko-goranska ??upanija') {
                            county8.push(clients[l])
                        } else if(clients[l].county === 'Li??ko-senjska ??upanija') {
                            county9.push(clients[l])
                        } else if(clients[l].county === 'Viroviti??ko-podravska ??upanija') {
                            county10.push(clients[l])
                        } else if(clients[l].county === 'Po??e??ko-slavonska ??upanija') {
                            county11.push(clients[l])
                        } else if(clients[l].county === 'Brodsko-posavska ??upanija') {
                            county12.push(clients[l])
                        } else if(clients[l].county === 'Zadarska ??upanija') {
                            county13.push(clients[l])
                        } else if(clients[l].county === 'Osje??ko-baranjska ??upanija') {
                            county14.push(clients[l])
                        } else if(clients[l].county === '??ibensko-kninska ??upanija') {
                            county15.push(clients[l])
                        } else if(clients[l].county === 'Vukovarsko-srijemska ??upanija') {
                            county16.push(clients[l])
                        } else if(clients[l].county === 'Splitsko-dalmatinska ??upanija') {
                            county17.push(clients[l])
                        } else if(clients[l].county === 'Istarska ??upanija') {
                            county18.push(clients[l])
                        } else if(clients[l].county === 'Dubrova??ko-neretvanska ??upanija') {
                            county19.push(clients[l])
                        } else if(clients[l].county === 'Me??imurska ??upanija') {
                            county20.push(clients[l])
                        } else if(clients[l].county === 'Grad Zagreb') {
                            county21.push(clients[l])
                        }
                    }
        
                    /// zupanije data pie
                    countyData = [
                       {   
                           "id": "Zagreba??ka ??upanija",
                           "label": "Zagreba??ka ??upanija",
                           "value": county1.length,
                           "color": '#74859a'
                       },
                       {   
                           "id": "Krapinsko-zagorska ??upanija",
                           "label": "Krapinsko-zagorska ??upanija",
                           "value": county2.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Sisa??ko-moslava??ka ??upanija",
                           "label": "Sisa??ko-moslava??ka ??upanija",
                           "value": county3.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Karlova??ka ??upanija",
                           "label": "Karlova??ka ??upanija",
                           "value": county4.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Vara??dinska ??upanija",
                           "label": "Vara??dinska ??upanija",
                           "value": county5.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Koprivni??ko-kri??eva??ka ??upanija",
                           "label": "Koprivni??ko-kri??eva??ka ??upanija",
                           "value": county6.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Bjelovarsko-bilogorska ??upanija",
                           "label": "Bjelovarsko-bilogorska ??upanija",
                           "value": county7.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Primorsko-goranska ??upanija",
                           "label": "Primorsko-goranska ??upanija",
                           "value": county8.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Li??ko-senjska ??upanija",
                           "label": "Li??ko-senjska ??upanija",
                           "value": county9.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Viroviti??ko-podravska ??upanija",
                           "label": "Viroviti??ko-podravska ??upanija",
                           "value": county10.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Po??e??ko-slavonska ??upanija",
                           "label": "Po??e??ko-slavonska ??upanija",
                           "value": county11.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Brodsko-posavska ??upanija",
                           "label": "Brodsko-posavska ??upanija",
                           "value": county12.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Zadarska ??upanija",
                           "label": "Zadarska ??upanija",
                           "value": county13.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Osje??ko-baranjska ??upanija",
                           "label": "Osje??ko-baranjska ??upanija",
                           "value": county14.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "??ibensko-kninska ??upanija",
                           "label": "??ibensko-kninska ??upanija",
                           "value": county15.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Vukovarsko-srijemska ??upanija",
                           "label": "Vukovarsko-srijemska ??upanija",
                           "value": county16.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Splitsko-dalmatinska ??upanija",
                           "label": "Splitsko-dalmatinska ??upanija",
                           "value": county17.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Istarska ??upanija",
                           "label": "Istarska ??upanija",
                           "value": county18.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Dubrova??ko-neretvanska ??upanija",
                           "label": "Dubrova??ko-neretvanska ??upanija",
                           "value": county19.length,
                           "color": '#83749a'
                       },
                       {   
                           "id": "Me??imurska ??upanija",
                           "label": "Me??imurska ??upanija",
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
    
                            <h4>Analiza prema ??upaniji</h4>
    
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
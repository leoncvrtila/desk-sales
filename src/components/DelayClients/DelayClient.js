import React, {Component} from 'react'
import * as axios from 'axios'
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux'

import '../../assets/css/main.css'

import html2canvas from 'html2canvas'

import pdfMake from "pdfmake"

import pdfFonts from "pdfmake/build/vfs_fonts";


import info from '../../assets/images/info.svg'
import mission from '../../assets/images/mission.svg'
import pitch from '../../assets/images/pitch.svg'
import download from '../../assets/images/download.svg'
import offer from '../../assets/images/offer.svg'
import deleteI from '../../assets/images/deleteI.svg'
import delay from '../../assets/images/delay.svg'
import undo from '../../assets/images/undo.svg'
import close from '../../assets/images/close.svg'
import send from '../../assets/images/send.svg'
import save from '../../assets/images/save.svg'
import confirm from '../../assets/images/confirm.svg'
import plus from '../../assets/images/plus.svg'
import minus from '../../assets/images/minus.svg'

import Spinner from '../../containers/Spinner/Spinner'

class PotentialClient extends Component {

    state={
        potentionalClients: [],
        potentionalClient: [],
        offerCounter: null,
        companyName: '',
        companyAddress: '',
        price: '',
        didMount: false,
        PotentionalClientsModal: false,
        errorModal: false,
        deleteModal: false,
        deleteModalClick: false,
        delay: false,
        delayName: '',
        wordPrice: '',
        searchValue: ''
       }

    componentDidMount() {


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
            potentionalClients: fetchedMembersNew
            });
 
          });

         
    }

    componentDidUpdate(prevProps, prevState){

      if(!this.state.didMount){
        setTimeout(() => {

          axios.all([
            axios.get('https://desk-clients.firebaseio.com/potentional-clients.json?auth=' + this.props.isAuth),
            axios.get('https://desk-clients.firebaseio.com/offerCounter.json?auth=' + this.props.isAuth),
            axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth)
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

            const user = {
              role: response[2].data.role,
              name: response[2].data.name,
              token: response[2].data.token
            }
    
          this.setState({
            potentionalClients: fetchedMembersNew, 
            didMount: true,
            offerCounter: response[1].data.offerCounter,
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

    downloadOfferHandler = (e,num) => {

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
      let yyyy = today.getFullYear()

      today = dd + '.' + mm + '.' + yyyy + '.';

      pdfMake.fonts = {
        // Default font should still be available
        Roboto: {
         normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
         bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
         italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
         bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
        }
     }


     var docDefinition = {
     content: [
            {
            svg: '<svg version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"x="0px" y="0px" viewBox="0 0 815 180" xml:space="preserve"><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="81.8452" y1="90.1111" x2="718.3479" y2="90.1111"><stop  offset="0" style="stop-color:#C3A177"/><stop  offset="0.6464" style="stop-color:#D0AF81"/><stop  offset="1" style="stop-color:#DBB989"/></linearGradient><rect x="-4.4" y="-6.8" fill="url(#SVGID_1_)" width="824.9" height="193.8"/><g><polygon fill="#FFFFFF" points="42.2,143.2 97.6,111.2 97.6,96.5 42.2,128.8"/><polygon fill="#FFFFFF" points="87.1,142.9 97.6,136.8 97.6,122.2 62.5,142.9 	"/><polygon fill="#FFFFFF" points="29.8,143.2 42.2,98.5 42.2,143.2 	"/><polygon fill="#FFFFFF" points="97.6,73.1 97.6,89.6 81.9,99.5 81.9,60.4 73.6,65.3 73.6,104.3 42.2,122.2 42.2,66.8 52.9,75 52.9,99.1 62,94.4 62,54.9 93.1,37 93.1,76.3"/><polygon fill="#FFFFFF" points="99.5,73.1 99.5,89.6 115.2,99.5 115.2,60.4 123.5,65.3 123.5,104.3 154.9,122.2 154.9,66.8 144.2,75 144.2,99.1 135.1,94.4 135.1,54.9 104,37 104,76.3 "/><polygon fill="#FFFFFF" points="154.9,143.2 99.5,111.2 99.5,96.5 154.9,128.8"/>  <polygon fill="#FFFFFF" points="110,142.9 99.5,136.8 99.5,122.2 134.6,142.9"/><polygon fill="#FFFFFF" points="154.9,98.5 154.9,143.2 167.3,143.2"/></g><g><path fill="#FFFFFF" d="M251.4,87.5c0.7,0.6,1.3,1.3,1.6,2.1c0.3,0.8,0.5,1.6,0.5,2.5c0,1.4-0.3,2.7-1,3.7c-0.7,1.1-1.7,1.9-3.1,2.5c-1.4,0.6-3,0.9-5,0.9h-9.2V74.4h8.8c1.8,0,3.4,0.3,4.7,0.8c1.3,0.5,2.3,1.3,2.9,2.3c0.7,1,1,2.1,1,3.3c0,1.2-0.3,2.2-1,3.1s-1.7,1.6-3,2.1C249.7,86.4,250.7,86.8,251.4,87.5z M239.6,77.9v6.8h3.9c1.4,0,2.6-0.3,3.5-0.8c0.9-0.6,1.3-1.5,1.3-2.7c0-1-0.4-1.8-1.1-2.4c-0.7-0.6-1.8-0.9-3.1-0.9H239.6z M248,94.5c0.7-0.7,1.1-1.6,1.1-2.6c0-1.1-0.4-2-1.2-2.7c-0.8-0.7-2-1-3.5-1h-4.8v7.4h4.8C246,95.5,247.2,95.2,248,94.5z"/><path fill="#FFFFFF" d="M265.7,98.2c-1.6-0.9-2.7-2.1-3.4-3.7c-0.7-1.6-1.1-3.3-1.1-5.3V74.4h4.3v14c0,2.4,0.5,4.2,1.5,5.5c1,1.3,2.6,2,4.9,2c4.1,0,6.1-2.4,6.1-7.1V74.4h4.3V89c0,2.5-0.5,4.5-1.4,6c-0.9,1.6-2.2,2.7-3.8,3.4c-1.6,0.7-3.4,1.1-5.5,1.1C269.2,99.6,267.2,99.1,265.7,98.2z"/><path fill="#FFFFFF" d="M293.3,98.8c-1.5-0.5-2.9-1.2-4.1-2.1l2-3c1.1,0.8,2.3,1.4,3.5,1.7s2.4,0.6,3.5,0.6c1.7,0,3-0.3,3.8-0.9c0.9-0.6,1.3-1.4,1.3-2.6c0-0.7-0.2-1.3-0.5-1.7c-0.3-0.5-0.8-0.9-1.6-1.3c-0.7-0.4-1.8-0.8-3.2-1.3l-0.7-0.3c-1.6-0.6-2.9-1.2-3.9-1.7s-1.8-1.3-2.4-2.2c-0.6-0.9-0.9-2-0.9-3.4c0-1.5,0.4-2.7,1.2-3.7c0.8-1,1.9-1.7,3.2-2.2c1.3-0.5,2.7-0.7,4.2-0.7c3.1,0,5.9,0.9,8.5,2.6l-2,3c-1.1-0.7-2.2-1.2-3.2-1.6c-1-0.3-2.1-0.5-3.3-0.5c-1.3,0-2.3,0.2-3.1,0.7c-0.8,0.5-1.1,1.2-1.1,2.2c0,0.5,0.1,1,0.4,1.4c0.3,0.4,0.8,0.8,1.5,1.2c0.7,0.4,1.7,0.8,2.9,1.3l0.8,0.3c1.7,0.6,3,1.1,4,1.7c1,0.5,1.9,1.3,2.6,2.3c0.7,1,1.1,2.2,1.1,3.8c0,1.6-0.4,2.9-1.2,4c-0.8,1.1-1.9,1.9-3.3,2.5c-1.4,0.5-3,0.8-4.9,0.8C296.5,99.6,294.8,99.3,293.3,98.8z"/><path fill="#FFFFFF" d="M315.9,99.1V74.4h4.3v24.6H315.9z"/>  <path fill="#FFFFFF" d="M350.7,74.4v24.6h-4.9l-9.3-14c-0.1-0.2-0.4-0.6-0.7-1.1c-0.4-0.5-0.7-1.1-1-1.6c-0.3-0.5-0.5-1-0.8-1.5v18.2h-4.3V74.4h4.8l9.7,14.7c0.1,0.2,0.3,0.5,0.7,1c0.3,0.5,0.6,1,0.9,1.4c0.2,0.4,0.5,0.8,0.6,1.2V74.4H350.7z"/><path fill="#FFFFFF" d="M364.5,95.5h11.7v3.6h-16.1V74.4H376V78h-11.6v6.8h10l-0.5,3.5h-9.5V95.5z"/><path fill="#FFFFFF" d="M386.6,98.8c-1.5-0.5-2.9-1.2-4.1-2.1l2-3c1.1,0.8,2.3,1.4,3.5,1.7s2.4,0.6,3.5,0.6c1.7,0,3-0.3,3.8-0.9c0.9-0.6,1.3-1.4,1.3-2.6c0-0.7-0.2-1.3-0.5-1.7c-0.3-0.5-0.8-0.9-1.6-1.3c-0.7-0.4-1.8-0.8-3.2-1.3l-0.7-0.3c-1.6-0.6-2.9-1.2-3.9-1.7s-1.8-1.3-2.4-2.2c-0.6-0.9-0.9-2-0.9-3.4c0-1.5,0.4-2.7,1.2-3.7c0.8-1,1.9-1.7,3.2-2.2c1.3-0.5,2.7-0.7,4.2-0.7c3.1,0,5.9,0.9,8.5,2.6l-2,3c-1.1-0.7-2.2-1.2-3.2-1.6c-1-0.3-2.1-0.5-3.3-0.5c-1.3,0-2.3,0.2-3.1,0.7c-0.8,0.5-1.1,1.2-1.1,2.2c0,0.5,0.1,1,0.4,1.4c0.3,0.4,0.8,0.8,1.5,1.2c0.7,0.4,1.7,0.8,2.9,1.3l0.8,0.3c1.7,0.6,3,1.1,4,1.7c1,0.5,1.9,1.3,2.6,2.3c0.7,1,1.1,2.2,1.1,3.8c0,1.6-0.4,2.9-1.2,4c-0.8,1.1-1.9,1.9-3.3,2.5c-1.4,0.5-3,0.8-4.9,0.8S388.2,99.3,386.6,98.8z"/><path fill="#FFFFFF" d="M411.4,98.8c-1.5-0.5-2.9-1.2-4.1-2.1l2-3c1.1,0.8,2.3,1.4,3.5,1.7s2.4,0.6,3.5,0.6c1.7,0,3-0.3,3.8-0.9c0.9-0.6,1.3-1.4,1.3-2.6c0-0.7-0.2-1.3-0.5-1.7c-0.3-0.5-0.8-0.9-1.6-1.3c-0.7-0.4-1.8-0.8-3.2-1.3l-0.7-0.3c-1.6-0.6-2.9-1.2-3.9-1.7s-1.8-1.3-2.4-2.2c-0.6-0.9-0.9-2-0.9-3.4c0-1.5,0.4-2.7,1.2-3.7c0.8-1,1.9-1.7,3.2-2.2c1.3-0.5,2.7-0.7,4.2-0.7c3.1,0,5.9,0.9,8.5,2.6l-2,3c-1.1-0.7-2.2-1.2-3.2-1.6c-1-0.3-2.1-0.5-3.3-0.5c-1.3,0-2.3,0.2-3.1,0.7c-0.8,0.5-1.1,1.2-1.1,2.2c0,0.5,0.1,1,0.4,1.4c0.3,0.4,0.8,0.8,1.5,1.2c0.7,0.4,1.7,0.8,2.9,1.3l0.8,0.3c1.7,0.6,3,1.1,4,1.7c1,0.5,1.9,1.3,2.6,2.3c0.7,1,1.1,2.2,1.1,3.8c0,1.6-0.4,2.9-1.2,4c-0.8,1.1-1.9,1.9-3.3,2.5c-1.4,0.5-3,0.8-4.9,0.8S412.9,99.3,411.4,98.8z"/><path fill="#FFFFFF" d="M450.8,95.5h11.7v3.6h-16.1V74.4h15.9V78h-11.6v6.8h10l-0.5,3.5h-9.5V95.5z"/><path fill="#FFFFFF" d="M481.9,86.2l8.3,12.9H485l-5.8-9.8l-6.2,9.8h-4.7l8.2-12.6l-7.9-12h5.1l5.5,8.9l5.6-8.9h4.7L481.9,86.2z"/><path fill="#FFFFFF" d="M510.9,75.4c1.4,0.6,2.4,1.5,3.1,2.7c0.7,1.2,1,2.5,1,4c0,1.6-0.4,3-1.1,4.2c-0.7,1.2-1.8,2.2-3.2,2.9c-1.4,0.7-3.2,1.1-5.3,1.1h-3.8v8.7h-4.3V74.4h8.4C507.8,74.4,509.5,74.8,510.9,75.4z M510.6,82.3c0-1.4-0.4-2.5-1.3-3.2c-0.8-0.7-2.1-1.1-3.7-1.1h-4v8.8h3.5C508.8,86.8,510.6,85.3,510.6,82.3z"/><path fill="#FFFFFF" d="M532.1,74.4l9.1,24.4v0.3h-4.6l-2.3-6.5h-9.9l-2.3,6.5h-4.4v-0.3l9-24.4H532.1z M525.7,89h7.4l-3.7-10.6L525.7,89z"/><path fill="#FFFFFF" d="M569.2,74.4v24.6h-4.9l-9.3-14c-0.1-0.2-0.4-0.6-0.7-1.1c-0.4-0.5-0.7-1.1-1-1.6c-0.3-0.5-0.5-1-0.8-1.5v18.2h-4.3V74.4h4.8l9.7,14.7c0.1,0.2,0.3,0.5,0.7,1c0.3,0.5,0.6,1,0.9,1.4c0.2,0.4,0.5,0.8,0.6,1.2V74.4H569.2z"/><path fill="#FFFFFF" d="M596.2,77.3c2.3,1.9,3.4,5.1,3.4,9.4c0,2.8-0.6,5.1-1.8,6.9c-1.2,1.8-2.8,3.2-4.8,4.1s-4.4,1.3-7,1.3h-7.3V74.4h7.8C590.7,74.4,593.9,75.4,596.2,77.3z M590.8,94.7c1.4-0.5,2.5-1.3,3.2-2.6c0.8-1.3,1.1-3,1.1-5.3c0-3-0.7-5.2-2.1-6.6c-1.4-1.4-3.6-2-6.5-2H583v17.3h2.4C587.6,95.4,589.4,95.1,590.8,94.7z"/><path fill="#FFFFFF" d="M622.3,98.8c-1.5-0.5-2.9-1.2-4.1-2.1l2-3c1.1,0.8,2.3,1.4,3.5,1.7s2.4,0.6,3.5,0.6c1.7,0,3-0.3,3.8-0.9c0.9-0.6,1.3-1.4,1.3-2.6c0-0.7-0.2-1.3-0.5-1.7c-0.3-0.5-0.8-0.9-1.6-1.3c-0.7-0.4-1.8-0.8-3.2-1.3l-0.7-0.3c-1.6-0.6-2.9-1.2-3.9-1.7s-1.8-1.3-2.4-2.2c-0.6-0.9-0.9-2-0.9-3.4c0-1.5,0.4-2.7,1.2-3.7c0.8-1,1.9-1.7,3.2-2.2c1.3-0.5,2.7-0.7,4.2-0.7c3.1,0,5.9,0.9,8.5,2.6l-2,3c-1.1-0.7-2.2-1.2-3.2-1.6c-1-0.3-2.1-0.5-3.3-0.5c-1.3,0-2.3,0.2-3.1,0.7c-0.8,0.5-1.1,1.2-1.1,2.2c0,0.5,0.1,1,0.4,1.4c0.3,0.4,0.8,0.8,1.5,1.2c0.7,0.4,1.7,0.8,2.9,1.3l0.8,0.3c1.7,0.6,3,1.1,4,1.7c1,0.5,1.9,1.3,2.6,2.3c0.7,1,1.1,2.2,1.1,3.8c0,1.6-0.4,2.9-1.2,4c-0.8,1.1-1.9,1.9-3.3,2.5c-1.4,0.5-3,0.8-4.9,0.8S623.9,99.3,622.3,98.8z"/><path fill="#FFFFFF" d="M663.9,74.4v0.3l-9,14.5v9.9h-4.3v-9.9l-8.9-14.4v-0.3h4.8l6.3,10.8l6.5-10.8H663.9z"/><path fill="#FFFFFF" d="M672,98.8c-1.5-0.5-2.9-1.2-4.1-2.1l2-3c1.1,0.8,2.3,1.4,3.5,1.7s2.4,0.6,3.5,0.6c1.7,0,3-0.3,3.8-0.9c0.9-0.6,1.3-1.4,1.3-2.6c0-0.7-0.2-1.3-0.5-1.7c-0.3-0.5-0.8-0.9-1.6-1.3c-0.7-0.4-1.8-0.8-3.2-1.3l-0.7-0.3c-1.6-0.6-2.9-1.2-3.9-1.7s-1.8-1.3-2.4-2.2c-0.6-0.9-0.9-2-0.9-3.4c0-1.5,0.4-2.7,1.2-3.7c0.8-1,1.9-1.7,3.2-2.2c1.3-0.5,2.7-0.7,4.2-0.7c3.1,0,5.9,0.9,8.5,2.6l-2,3c-1.1-0.7-2.2-1.2-3.2-1.6c-1-0.3-2.1-0.5-3.3-0.5c-1.3,0-2.3,0.2-3.1,0.7c-0.8,0.5-1.1,1.2-1.1,2.2c0,0.5,0.1,1,0.4,1.4c0.3,0.4,0.8,0.8,1.5,1.2c0.7,0.4,1.7,0.8,2.9,1.3l0.8,0.3c1.7,0.6,3,1.1,4,1.7c1,0.5,1.9,1.3,2.6,2.3c0.7,1,1.1,2.2,1.1,3.8c0,1.6-0.4,2.9-1.2,4c-0.8,1.1-1.9,1.9-3.3,2.5c-1.4,0.5-3,0.8-4.9,0.8S673.5,99.3,672,98.8z"/><path fill="#FFFFFF" d="M712.6,74.4v3.7h-8.1v20.9h-4.3V78.2h-8.2v-3.7H712.6z"/><path fill="#FFFFFF" d="M724.1,95.5h11.7v3.6h-16.1V74.4h15.9V78h-11.6v6.8h10l-0.5,3.5h-9.5V95.5z"/><path fill="#FFFFFF" d="M769.8,74.4v24.6h-4.3V81.8c-0.4,1.1-0.9,2.3-1.5,3.5l-5.1,10.2h-3.7l-5.1-10.2c-0.8-1.6-1.4-2.8-1.7-3.6v17.4h-4.3V74.4h4.8l5.5,10.8c1.3,2.6,2.1,4.5,2.6,5.9c0.5-1.5,1.3-3.5,2.6-5.9l5.5-10.8H769.8z"/></g></svg>',
            width: 600,
        },
        {
            layout: 'noBorders',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 550 ],
              body: [
                  [ {text: 'Naziv tvrtke', alignment: 'right'}],
                  [ {text: 'Adresa', alignment: 'right'}],
                  [ {text: 'Datum', alignment: 'right'}]
              ],
            },
            margin: [10, 40, 10, 0]
          },
          {
            layout: 'noBorders',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 550 ],
              body: [
                  [ {text: 'Ponuda broj: ' + this.state.potentionalClients[num].offerNum + '/' + today, alignment: 'center'}]
              ],
            },
            margin: [10, 10, 10, 10]
          },
          {
            layout: 'noBorders',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 550 ],
              body: [
                  [ {text: 'Po??tovani,', alignment: 'left'}],
                  [ {text: 'sukladno na??im preliminarnim razgovorima vezano za razvitak Va??eg poslovanja, dostavljamo Vam ponudu.', alignment: 'left'}]
              ],
            },
            margin: [20, 10, 10, 0]
          },
        {
          layout: 'headerLineOnly',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 30, 30, 180, 50, 105, 100 ],
            body: [
                [ { text: 'Rbr.', style: 'headerStyle'} , { text: '??ifra', style: 'headerStyle'}, { text: 'Naziv usluge', style: 'headerStyle'}, { text: 'Koli??ina', style: 'headerStyle'}, { text: 'Pojedina??na cijena (HRK)', style: 'headerStyle', margin: [2, 2],}, { text: 'Ukupno (HRK)', style: 'headerStyle'} ],
                [ '1.', '', 'Business Expand System', '1', '156', '454']
            ],
          },
          margin: [10, 20, 10, 20]
        },

      ],
      pageMargins: [0, 0, 0, 0 ],

     defaultStyle: {
         font: 'Roboto',
         alignment: 'center',
         fontSize: 10
        
        },
     styles:{
        headerStyle: {
            font: 'Roboto',
            alignment: 'center',
            fillColor: '#dbb989',  
            margin: [2, 7], 
            fontSize: 11
        }
     }
    
     };

      

     pdfMake.createPdf(docDefinition).download('Ponuda.pdf');
    }

    offerHandler = (e, id, num) => {


      for(let key in this.state.potentionalClients){
        if(key === num){
          this.setState({
            potentionalClient: this.state.potentionalClients[num]

          })
        }
      }
       
      this.setState({
        PotentionalClientsModal: true
      })

      
    }

    deleteHandler = (e, id, num) => {

            
      for(let key in this.state.potentionalClients){
        if(key === num){
          this.setState({
            potentionalClient: this.state.potentionalClients[num]
          })
        }
      }

      for(let key in this.state.potentionalClients){
        if(key === num){

      setTimeout(() => {

          axios.put('https://desk-clients.firebaseio.com/potentional-clients/'  + this.state.potentionalClient.id + '.json?auth=' + this.props.isAuth, {
          ...this.state.potentionalClient,
          potentional: false,
          delayName: false
        })
        
        .then(response => {
        
        })
        .catch(error => {
          this.setState({error: true});							// hoc error
        });

        this.setState({
          deleteModal: true
        })

      }, 400); 

        }
      }  

      setTimeout(() => {

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
          potentionalClients: fetchedMembersNew
          });

        });

    }, 600); 

      setTimeout(() => {

        if(this.state.deleteModal){
          this.setState({
            deleteModalClick: false,
            deleteModal: false
          })
        }      

      }, 7000); 
   

    }

    deleteModalClick = (e) => {

        
        setTimeout(() => {
                
            axios.put('https://desk-clients.firebaseio.com/potentional-clients/'  + this.state.potentionalClient.id + '.json?auth=' + this.props.isAuth, {
              ...this.state.potentionalClient,
              delayName: true
            })
            
            .then(response => {
            
            })
            .catch(error => {
              this.setState({error: true});							// hoc error
            });    
        

      }, 1000);


    setTimeout(() => {

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
        potentionalClients: fetchedMembersNew
        });

      });

  }, 1400); 

      this.setState({
        deleteModalClick: false,
        deleteModal: false
      })
      

    }

    sendHandler = () => {

      
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
      let yyyy = today.getFullYear()

      today = dd + '.' + mm + '.' + yyyy + '.';

      if(
        ((this.state.companyName !== '') || (this.state.potentionalClient.companyName !== '')) &&
        ((this.state.companyAddress !== '') || (this.state.potentionalClient.companyAddress !== '')) &&
        (this.state.price !== '') &&
        (this.state.wordPrice !== '') && 
        (this.state.potentionalClient.offers !== undefined)
      ){

        axios.put('https://desk-clients.firebaseio.com/potentional-clients/'  + this.state.potentionalClient.id + '.json?auth=' + this.props.isAuth, {
          ...this.state.potentionalClient,
          companyName: this.state.companyName ? this.state.companyName : this.state.potentionalClient.companyName,
          companyAddress: this.state.companyAddress ? this.state.companyAddress : this.state.potentionalClient.companyAddress,
          offers:[
            ...this.state.potentionalClient.offers,
            {
            price: this.state.price,
            offerNum: this.state.offerCounter + 1,
            wordPrice: this.state.wordPrice,
            date: today
          }
          ],            
          potentional: true,
          delayName: false
        })
        
        .then(response => {
          this.setState({
            companyName: '',
            companyAddress: '',
            price: '',
          });	
        })
        .catch(error => {
          this.setState({error: true});							// hoc error
        });

        setTimeout(() => {

          axios.put('https://desk-clients.firebaseio.com/offerCounter.json?auth=' + this.props.isAuth, {
            offerCounter: this.state.offerCounter + 1
          })
          
          .then(response => {
          
          })
          .catch(error => {
            this.setState({error: true});							// hoc error
          });

          this.setState({
            PotentionalClientsModal: false
          })

      }, 200); 


        setTimeout(() => {

          axios.all([
            axios.get('https://desk-clients.firebaseio.com/potentional-clients.json?auth=' + this.props.isAuth),
            axios.get('https://desk-clients.firebaseio.com/offerCounter.json?auth=' + this.props.isAuth)
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
            offerCounter: response[1].data.offerCounter
            });
    
          });
    
      }, 450); 
  

      }else if(
        ((this.state.companyName !== '') || (this.state.potentionalClient.companyName !== '')) &&
        ((this.state.companyAddress !== '') || (this.state.potentionalClient.companyAddress !== '')) &&
        (this.state.price !== '') &&
        (this.state.wordPrice !== '') && 
        (this.state.potentionalClient.offers == undefined)
      ) {

        axios.put('https://desk-clients.firebaseio.com/potentional-clients/'  + this.state.potentionalClient.id + '.json?auth=' + this.props.isAuth, {
          ...this.state.potentionalClient,
          companyName: this.state.companyName ? this.state.companyName : this.state.potentionalClient.companyName,
          companyAddress: this.state.companyAddress ? this.state.companyAddress : this.state.potentionalClient.companyAddress,
          offers:[
            {
            price: this.state.price,
            offerNum: this.state.offerCounter + 1,
            wordPrice: this.state.wordPrice,
            date: today
          }
          ],            
          potentional: true,
          delayName: false
        })
        
        .then(response => {
          this.setState({
            companyName: '',
            companyAddress: '',
            price: '',
          });	
        })
        .catch(error => {
          this.setState({error: true});							// hoc error
        });

        setTimeout(() => {

          axios.put('https://desk-clients.firebaseio.com/offerCounter.json?auth=' + this.props.isAuth, {
            offerCounter: this.state.offerCounter + 1
          })
          
          .then(response => {
          
          })
          .catch(error => {
            this.setState({error: true});							// hoc error
          });

          this.setState({
            PotentionalClientsModal: false
          })

      }, 200); 


        setTimeout(() => {

          axios.all([
            axios.get('https://desk-clients.firebaseio.com/potentional-clients.json?auth=' + this.props.isAuth),
            axios.get('https://desk-clients.firebaseio.com/offerCounter.json?auth=' + this.props.isAuth)
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
            offerCounter: response[1].data.offerCounter
            });
    
          });
    
      }, 450); 
  

      }
      else if (
        ((this.state.companyName === '') && (this.state.potentionalClient.companyName === undefined)) ||
        ((this.state.companyAddress === '') && (this.state.potentionalClient.companyAddress === undefined)) ||
        (this.state.price === '') ||
        (this.state.wordPrice !== '')
      ) {

        this.setState({
          errorModal: true
        })

      }


    }

    closeHandler = () => {

      this.setState({
        PotentionalClientsModal: false,
        companyName: '',
        companyAddress: '',
        price: '',
        findOut: ''
      })

    }

    delayHandler = (e,id, num) => {

      for(let key in this.state.potentionalClients){
        if(key === num){
          this.setState({
            potentionalClient: this.state.potentionalClients[num]
          })
        }
      }

      this.setState({
        delay: true
      })

    }

    delayCloseHandler = () => {

      this.setState({
        delay: false
      })

    }

    delaySaveHandler = () => {

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
      let yyyy = today.getFullYear()

      today = dd + '.' + mm + '.' + yyyy + '.';

      if(this.state.delayName !== '' && this.state.potentionalClient.delayDate !== undefined){

        axios.put('https://desk-clients.firebaseio.com/potentional-clients/'  + this.state.potentionalClient.id + '.json?auth=' + this.props.isAuth, {
          ...this.state.potentionalClient,
          delayDate: [
            ...this.state.potentionalClient.delayDate,
            {
              display: this.state.delayName.split('-').reverse().join('.'),
              today: today
          }
        ],
        potentional: false,
        delayName: true
        })
        
        .then(response => {
        
        })
        .catch(error => {
          this.setState({error: true});							// hoc error
        });

        this.setState({
          delay: false,
          delayName: '',
          errorModal: false
        })

      }else if(this.state.delayName !== '' && this.state.potentionalClient.delayDate === undefined){
        axios.put('https://desk-clients.firebaseio.com/potentional-clients/'  + this.state.potentionalClient.id + '.json?auth=' + this.props.isAuth, {
          ...this.state.potentionalClient,
          delayDate: [
            {
              display: this.state.delayName.split('-').reverse().join('.'),
              today: today
          }
        ],
        potentional: false,
        delayName: true
        })
        
        .then(response => {
        
        })
        .catch(error => {
          this.setState({error: true});							// hoc error
        });

        this.setState({
          delay: false,
          delayName: '',
          errorModal: false
        })
      } 
      else {
        this.setState({
          errorModal: true
        })
      }

      setTimeout(() => {

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
  
    }, 400); 

    }

    delayChangeHandler = (e) => {

      this.setState({
        [e.target.name]: e.target.value
      })


    }

    checkOfferHandler = (e, num) => {

      for(let key in this.state.potentionalClients){
        if(key === num){
          this.setState({
            potentionalClient: this.state.potentionalClients[num]
          })
        }
      }

    setTimeout(() => {
        axios.put('https://desk-clients.firebaseio.com/potentional-clients/'  + this.state.potentionalClient.id + '.json?auth=' + this.props.isAuth, {
          ...this.state.potentionalClient,
          check: true,
          delayName:false
        })
        
        .then(response => {
        
        })
        .catch(error => {
          this.setState({error: true});							// hoc error
        });

      }, 300); 

      
      setTimeout(() => {

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
  
    }, 550); 

    }

    expandOfferHandler = (e,num) =>{

      let potentialClients = []

      for(let key in this.state.potentionalClients){
        if((key === num) && (this.state.potentionalClients[key].offersActive === false)){

          potentialClients.push({
            ...this.state.potentionalClients,
            [key]:{
              ...this.state.potentionalClients[key],
              offersActive: true
            }
            
          })

          this.setState({
            potentionalClients: Object.values(potentialClients[0])
          })



        } else if((key === num) && (this.state.potentionalClients[key].offersActive === true)){


          potentialClients.push({
            ...this.state.potentionalClients,
            [key]:{
              ...this.state.potentionalClients[key],
              offersActive: false
            }
            
          })

          this.setState({
            potentionalClients: Object.values(potentialClients[0])
          })

        }
      }

    }

    downloadAllOfferHandler = (e,offerNum, price, companyName, companyAddress, date) => {

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
      let yyyy = today.getFullYear()

      today = dd + '.' + mm + '.' + yyyy + '.';

      
      let years = []

      for(let key = 0; key < 50; key++){
      
        years.push({
          year: 2020 + key
        })
      
      
      }

      let realYear = []


      for(let key in years){

        if(date.includes(years[key].year)){

          realYear.push(years[key].year)
          console.log(realYear)

          

        }

      }


      pdfMake.fonts = {
        // Default font should still be available
        Roboto: {
         normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
         bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
         italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
         bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
        }
     }


     var docDefinition = {
     content: [
            {
            svg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 815 180" style="enable-background:new 0 0 815 180;" xml:space="preserve"><style type="text/css">	.st0{fill:url(#SVGID_1_);}	.st1{fill:#FFFFFF;}</style><linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="81.8452" y1="90.1111" x2="718.3479" y2="90.1111">	<stop  offset="0" style="stop-color:#C3A177"/>	<stop  offset="0.6464" style="stop-color:#D0AF81"/>	<stop  offset="1" style="stop-color:#DBB989"/></linearGradient><rect x="-4.4" y="-6.8" class="st0" width="824.9" height="193.8"/><polygon class="st1" points="42.2,143.2 97.6,111.2 97.6,96.5 42.2,128.8 "/><polygon class="st1" points="87.1,142.9 97.6,136.8 97.6,122.2 62.5,142.9 "/><polygon class="st1" points="29.8,143.2 42.2,98.5 42.2,143.2 "/><polygon class="st1" points="97.6,73.1 97.6,89.6 81.9,99.5 81.9,60.4 73.6,65.3 73.6,104.3 42.2,122.2 42.2,66.8 52.9,75 	52.9,99.1 62,94.4 62,54.9 93.1,37 93.1,76.3 "/><polygon class="st1" points="99.5,73.1 99.5,89.6 115.2,99.5 115.2,60.4 123.5,65.3 123.5,104.3 154.9,122.2 154.9,66.8 144.2,75 	144.2,99.1 135.1,94.4 135.1,54.9 104,37 104,76.3 "/><polygon class="st1" points="154.9,143.2 99.5,111.2 99.5,96.5 154.9,128.8 "/><polygon class="st1" points="110,142.9 99.5,136.8 99.5,122.2 134.6,142.9 "/><polygon class="st1" points="154.9,98.5 154.9,143.2 167.3,143.2 "/><g>	<path class="st1" d="M240,78.5c0.7,0.6,1.3,1.3,1.6,2.1c0.3,0.8,0.5,1.6,0.5,2.5c0,1.4-0.3,2.7-1,3.7c-0.7,1.1-1.7,1.9-3.1,2.5		c-1.4,0.6-3,0.9-5,0.9h-9.2V65.4h8.8c1.8,0,3.4,0.3,4.7,0.8c1.3,0.5,2.3,1.3,2.9,2.3c0.7,1,1,2.1,1,3.3c0,1.2-0.3,2.2-1,3.1		s-1.7,1.6-3,2.1C238.3,77.4,239.3,77.8,240,78.5z M228.2,68.9v6.8h3.9c1.4,0,2.6-0.3,3.5-0.8c0.9-0.6,1.3-1.5,1.3-2.7		c0-1-0.4-1.8-1.1-2.4c-0.7-0.6-1.8-0.9-3.1-0.9H228.2z M236.6,85.5c0.7-0.7,1.1-1.6,1.1-2.6c0-1.1-0.4-2-1.2-2.7		c-0.8-0.7-2-1-3.5-1h-4.8v7.4h4.8C234.6,86.5,235.8,86.2,236.6,85.5z"/>	<path class="st1" d="M254.3,89.2c-1.6-0.9-2.7-2.1-3.4-3.7c-0.7-1.6-1.1-3.3-1.1-5.3V65.4h4.3v14c0,2.4,0.5,4.2,1.5,5.5		c1,1.3,2.6,2,4.9,2c4.1,0,6.1-2.4,6.1-7.1V65.4h4.3V80c0,2.5-0.5,4.5-1.4,6c-0.9,1.6-2.2,2.7-3.8,3.4c-1.6,0.7-3.4,1.1-5.5,1.1		C257.8,90.6,255.8,90.1,254.3,89.2z"/>	<path class="st1" d="M281.9,89.8c-1.5-0.5-2.9-1.2-4.1-2.1l2-3c1.1,0.8,2.3,1.4,3.5,1.7s2.4,0.6,3.5,0.6c1.7,0,3-0.3,3.8-0.9		c0.9-0.6,1.3-1.4,1.3-2.6c0-0.7-0.2-1.3-0.5-1.7s-0.8-0.9-1.6-1.3c-0.7-0.4-1.8-0.8-3.2-1.3l-0.7-0.3c-1.6-0.6-2.9-1.2-3.9-1.7		s-1.8-1.3-2.4-2.2c-0.6-0.9-0.9-2-0.9-3.4c0-1.5,0.4-2.7,1.2-3.7c0.8-1,1.9-1.7,3.2-2.2c1.3-0.5,2.7-0.7,4.2-0.7		c3.1,0,5.9,0.9,8.5,2.6l-2,3c-1.1-0.7-2.2-1.2-3.2-1.6c-1-0.3-2.1-0.5-3.3-0.5c-1.3,0-2.3,0.2-3.1,0.7c-0.8,0.5-1.1,1.2-1.1,2.2		c0,0.5,0.1,1,0.4,1.4c0.3,0.4,0.8,0.8,1.5,1.2c0.7,0.4,1.7,0.8,2.9,1.3l0.8,0.3c1.7,0.6,3,1.1,4,1.7c1,0.5,1.9,1.3,2.6,2.3		c0.7,1,1.1,2.2,1.1,3.8c0,1.6-0.4,2.9-1.2,4c-0.8,1.1-1.9,1.9-3.3,2.5c-1.4,0.5-3,0.8-4.9,0.8C285.1,90.6,283.4,90.3,281.9,89.8z"		/>	<path class="st1" d="M304.5,90.1V65.4h4.3v24.6H304.5z"/>	<path class="st1" d="M339.3,65.4v24.6h-4.9l-9.3-14c-0.1-0.2-0.4-0.6-0.7-1.1c-0.4-0.5-0.7-1.1-1-1.6c-0.3-0.5-0.5-1-0.8-1.5v18.2		h-4.3V65.4h4.8l9.7,14.7c0.1,0.2,0.3,0.5,0.7,1c0.3,0.5,0.6,1,0.9,1.4c0.2,0.4,0.5,0.8,0.6,1.2V65.4H339.3z"/>	<path class="st1" d="M353.1,86.5h11.7v3.6h-16.1V65.4h15.9V69h-11.6v6.8h10l-0.5,3.5h-9.5V86.5z"/>	<path class="st1" d="M375.2,89.8c-1.5-0.5-2.9-1.2-4.1-2.1l2-3c1.1,0.8,2.3,1.4,3.5,1.7s2.4,0.6,3.5,0.6c1.7,0,3-0.3,3.8-0.9		c0.9-0.6,1.3-1.4,1.3-2.6c0-0.7-0.2-1.3-0.5-1.7s-0.8-0.9-1.6-1.3c-0.7-0.4-1.8-0.8-3.2-1.3l-0.7-0.3c-1.6-0.6-2.9-1.2-3.9-1.7		s-1.8-1.3-2.4-2.2c-0.6-0.9-0.9-2-0.9-3.4c0-1.5,0.4-2.7,1.2-3.7c0.8-1,1.9-1.7,3.2-2.2c1.3-0.5,2.7-0.7,4.2-0.7		c3.1,0,5.9,0.9,8.5,2.6l-2,3c-1.1-0.7-2.2-1.2-3.2-1.6c-1-0.3-2.1-0.5-3.3-0.5c-1.3,0-2.3,0.2-3.1,0.7c-0.8,0.5-1.1,1.2-1.1,2.2		c0,0.5,0.1,1,0.4,1.4c0.3,0.4,0.8,0.8,1.5,1.2c0.7,0.4,1.7,0.8,2.9,1.3l0.8,0.3c1.7,0.6,3,1.1,4,1.7c1,0.5,1.9,1.3,2.6,2.3		c0.7,1,1.1,2.2,1.1,3.8c0,1.6-0.4,2.9-1.2,4c-0.8,1.1-1.9,1.9-3.3,2.5c-1.4,0.5-3,0.8-4.9,0.8S376.8,90.3,375.2,89.8z"/>	<path class="st1" d="M400,89.8c-1.5-0.5-2.9-1.2-4.1-2.1l2-3c1.1,0.8,2.3,1.4,3.5,1.7s2.4,0.6,3.5,0.6c1.7,0,3-0.3,3.8-0.9		c0.9-0.6,1.3-1.4,1.3-2.6c0-0.7-0.2-1.3-0.5-1.7s-0.8-0.9-1.6-1.3c-0.7-0.4-1.8-0.8-3.2-1.3l-0.7-0.3c-1.6-0.6-2.9-1.2-3.9-1.7		s-1.8-1.3-2.4-2.2c-0.6-0.9-0.9-2-0.9-3.4c0-1.5,0.4-2.7,1.2-3.7c0.8-1,1.9-1.7,3.2-2.2c1.3-0.5,2.7-0.7,4.2-0.7		c3.1,0,5.9,0.9,8.5,2.6l-2,3c-1.1-0.7-2.2-1.2-3.2-1.6c-1-0.3-2.1-0.5-3.3-0.5c-1.3,0-2.3,0.2-3.1,0.7c-0.8,0.5-1.1,1.2-1.1,2.2		c0,0.5,0.1,1,0.4,1.4c0.3,0.4,0.8,0.8,1.5,1.2c0.7,0.4,1.7,0.8,2.9,1.3l0.8,0.3c1.7,0.6,3,1.1,4,1.7c1,0.5,1.9,1.3,2.6,2.3		c0.7,1,1.1,2.2,1.1,3.8c0,1.6-0.4,2.9-1.2,4c-0.8,1.1-1.9,1.9-3.3,2.5c-1.4,0.5-3,0.8-4.9,0.8S401.5,90.3,400,89.8z"/>	<path class="st1" d="M439.4,86.5h11.7v3.6H435V65.4h15.9V69h-11.6v6.8h10l-0.5,3.5h-9.5V86.5z"/>	<path class="st1" d="M470.5,77.2l8.3,12.9h-5.2l-5.8-9.8l-6.2,9.8H457l8.2-12.6l-7.9-12h5.1l5.5,8.9l5.6-8.9h4.7L470.5,77.2z"/>	<path class="st1" d="M499.5,66.4c1.4,0.6,2.4,1.5,3.1,2.7c0.7,1.2,1,2.5,1,4c0,1.6-0.4,3-1.1,4.2c-0.7,1.2-1.8,2.2-3.2,2.9		c-1.4,0.7-3.2,1.1-5.3,1.1h-3.8v8.7h-4.3V65.4h8.4C496.4,65.4,498.1,65.8,499.5,66.4z M499.2,73.3c0-1.4-0.4-2.5-1.3-3.2		c-0.8-0.7-2.1-1.1-3.7-1.1h-4v8.8h3.5C497.3,77.8,499.2,76.3,499.2,73.3z"/>	<path class="st1" d="M520.7,65.4l9.1,24.4v0.3h-4.6l-2.3-6.5H513l-2.3,6.5h-4.4v-0.3l9-24.4H520.7z M514.3,80h7.4l-3.7-10.6		L514.3,80z"/>	<path class="st1" d="M557.8,65.4v24.6h-4.9l-9.3-14c-0.1-0.2-0.4-0.6-0.7-1.1c-0.4-0.5-0.7-1.1-1-1.6c-0.3-0.5-0.5-1-0.8-1.5v18.2		h-4.3V65.4h4.8l9.7,14.7c0.1,0.2,0.3,0.5,0.7,1s0.6,1,0.9,1.4c0.2,0.4,0.5,0.8,0.6,1.2V65.4H557.8z"/>	<path class="st1" d="M584.8,68.3c2.3,1.9,3.4,5.1,3.4,9.4c0,2.8-0.6,5.1-1.8,6.9c-1.2,1.8-2.8,3.2-4.8,4.1s-4.4,1.3-7,1.3h-7.3		V65.4h7.8C579.3,65.4,582.5,66.4,584.8,68.3z M579.4,85.7c1.4-0.5,2.5-1.3,3.2-2.6c0.8-1.3,1.1-3,1.1-5.3c0-3-0.7-5.2-2.1-6.6		c-1.4-1.4-3.6-2-6.5-2h-3.5v17.3h2.4C576.2,86.4,578,86.1,579.4,85.7z"/>	<path class="st1" d="M610.9,89.8c-1.5-0.5-2.9-1.2-4.1-2.1l2-3c1.1,0.8,2.3,1.4,3.5,1.7s2.4,0.6,3.5,0.6c1.7,0,3-0.3,3.8-0.9		c0.9-0.6,1.3-1.4,1.3-2.6c0-0.7-0.2-1.3-0.5-1.7s-0.8-0.9-1.6-1.3c-0.7-0.4-1.8-0.8-3.2-1.3l-0.7-0.3c-1.6-0.6-2.9-1.2-3.9-1.7		s-1.8-1.3-2.4-2.2c-0.6-0.9-0.9-2-0.9-3.4c0-1.5,0.4-2.7,1.2-3.7c0.8-1,1.9-1.7,3.2-2.2c1.3-0.5,2.7-0.7,4.2-0.7		c3.1,0,5.9,0.9,8.5,2.6l-2,3c-1.1-0.7-2.2-1.2-3.2-1.6c-1-0.3-2.1-0.5-3.3-0.5c-1.3,0-2.3,0.2-3.1,0.7c-0.8,0.5-1.1,1.2-1.1,2.2		c0,0.5,0.1,1,0.4,1.4c0.3,0.4,0.8,0.8,1.5,1.2c0.7,0.4,1.7,0.8,2.9,1.3l0.8,0.3c1.7,0.6,3,1.1,4,1.7c1,0.5,1.9,1.3,2.6,2.3		c0.7,1,1.1,2.2,1.1,3.8c0,1.6-0.4,2.9-1.2,4c-0.8,1.1-1.9,1.9-3.3,2.5c-1.4,0.5-3,0.8-4.9,0.8S612.5,90.3,610.9,89.8z"/>	<path class="st1" d="M652.5,65.4v0.3l-9,14.5v9.9h-4.3v-9.9l-8.9-14.4v-0.3h4.8l6.3,10.8l6.5-10.8H652.5z"/>	<path class="st1" d="M660.6,89.8c-1.5-0.5-2.9-1.2-4.1-2.1l2-3c1.1,0.8,2.3,1.4,3.5,1.7s2.4,0.6,3.5,0.6c1.7,0,3-0.3,3.8-0.9		c0.9-0.6,1.3-1.4,1.3-2.6c0-0.7-0.2-1.3-0.5-1.7s-0.8-0.9-1.6-1.3c-0.7-0.4-1.8-0.8-3.2-1.3l-0.7-0.3c-1.6-0.6-2.9-1.2-3.9-1.7		s-1.8-1.3-2.4-2.2c-0.6-0.9-0.9-2-0.9-3.4c0-1.5,0.4-2.7,1.2-3.7c0.8-1,1.9-1.7,3.2-2.2c1.3-0.5,2.7-0.7,4.2-0.7		c3.1,0,5.9,0.9,8.5,2.6l-2,3c-1.1-0.7-2.2-1.2-3.2-1.6c-1-0.3-2.1-0.5-3.3-0.5c-1.3,0-2.3,0.2-3.1,0.7c-0.8,0.5-1.1,1.2-1.1,2.2		c0,0.5,0.1,1,0.4,1.4c0.3,0.4,0.8,0.8,1.5,1.2c0.7,0.4,1.7,0.8,2.9,1.3l0.8,0.3c1.7,0.6,3,1.1,4,1.7c1,0.5,1.9,1.3,2.6,2.3		c0.7,1,1.1,2.2,1.1,3.8c0,1.6-0.4,2.9-1.2,4c-0.8,1.1-1.9,1.9-3.3,2.5c-1.4,0.5-3,0.8-4.9,0.8S662.1,90.3,660.6,89.8z"/>	<path class="st1" d="M701.2,65.4v3.7H693v20.9h-4.3V69.2h-8.2v-3.7H701.2z"/>	<path class="st1" d="M712.7,86.5h11.7v3.6h-16.1V65.4h15.9V69h-11.6v6.8h10l-0.5,3.5h-9.5V86.5z"/>	<path class="st1" d="M758.4,65.4v24.6h-4.3V72.8c-0.4,1.1-0.9,2.3-1.5,3.5l-5.1,10.2h-3.7l-5.1-10.2c-0.8-1.6-1.4-2.8-1.7-3.6v17.4		h-4.3V65.4h4.8l5.5,10.8c1.3,2.6,2.1,4.5,2.6,5.9c0.5-1.5,1.3-3.5,2.6-5.9l5.5-10.8H758.4z"/></g><polygon class="st1" points="154.9,128.8 157.8,143.2 154.9,143.2 152.8,142 154.1,128.3 "/><polygon class="st1" points="42.2,98.5 46.2,98.4 45.1,120.6 42.2,122.2 40.1,123.3 40.3,105.4 "/><polygon class="st1" points="42.2,128.8 46.8,140.6 42.2,143.2 39.4,143.2 39.8,128 "/><polygon class="st1" points="154.9,98.5 150.5,96.4 149.9,119.4 154.9,122.2 158.7,123.9 159.3,114.7 "/><g>	<path class="st1" d="M226.5,116.7h3.9v1.5h-5.7v-8.4h5.6v1.5h-3.8v1.9h3.3l-0.2,1.5h-3.1V116.7z"/>	<path class="st1" d="M240.2,112.6c0.3,0.3,0.4,0.7,0.4,1.3v4.3h-1.8v-3.8c0-0.3-0.1-0.6-0.2-0.7c-0.1-0.1-0.3-0.2-0.5-0.2		c-0.3,0-0.7,0.1-1.1,0.4v0v4.3h-1.8v-3.8c0-0.3-0.1-0.6-0.2-0.7c-0.1-0.1-0.3-0.2-0.5-0.2c-0.3,0-0.7,0.1-1.1,0.4v4.3h-1.8v-5.8		l1.8-0.2v0.5c0.6-0.4,1.2-0.6,1.9-0.6c0.7,0,1.1,0.2,1.4,0.7c0.3-0.2,0.7-0.4,1-0.5s0.7-0.2,1.1-0.2		C239.5,112.1,239.9,112.3,240.2,112.6z"/>	<path class="st1" d="M246.5,112.6c0.4,0.3,0.6,0.8,0.6,1.5v4.1h-1.5l-0.1-0.5c-0.3,0.2-0.6,0.4-1,0.5c-0.3,0.1-0.6,0.1-1,0.1		c-0.4,0-0.7-0.1-1-0.2c-0.3-0.1-0.5-0.3-0.6-0.6s-0.2-0.5-0.2-0.9c0-0.7,0.3-1.2,1-1.6c0.7-0.4,1.6-0.6,2.7-0.6v-0.1		c0-0.2,0-0.4-0.1-0.6s-0.1-0.2-0.3-0.3c-0.1-0.1-0.3-0.1-0.5-0.1c-0.5,0-1.2,0.2-1.9,0.7l-0.7-1.1c0.5-0.3,0.9-0.5,1.4-0.7		s0.9-0.2,1.5-0.2C245.5,112.1,246.1,112.3,246.5,112.6z M243.6,116.9c0.1,0.1,0.3,0.1,0.5,0.1c0.4,0,0.8-0.1,1.2-0.4v-1.1		c-0.6,0-1.1,0.1-1.4,0.3c-0.3,0.2-0.4,0.4-0.4,0.6C243.5,116.7,243.5,116.8,243.6,116.9z"/>	<path class="st1" d="M248.9,111.3c-0.2-0.1-0.3-0.2-0.4-0.4c-0.1-0.2-0.2-0.3-0.2-0.5c0-0.2,0.1-0.4,0.2-0.6s0.2-0.3,0.4-0.4		s0.4-0.1,0.6-0.1c0.2,0,0.4,0,0.6,0.1s0.3,0.2,0.4,0.4s0.2,0.4,0.2,0.6c0,0.2-0.1,0.4-0.2,0.5c-0.1,0.2-0.2,0.3-0.4,0.4		s-0.4,0.1-0.6,0.1C249.2,111.5,249,111.4,248.9,111.3z M248.6,118.2v-5.8l1.8-0.2v6H248.6z"/>	<path class="st1" d="M251.9,118.2v-8.9l1.8-0.2v9.1H251.9z"/>	<path class="st1" d="M255.3,114.2c-0.2-0.1-0.3-0.2-0.4-0.4c-0.1-0.2-0.1-0.3-0.1-0.5c0-0.2,0-0.4,0.1-0.5c0.1-0.2,0.2-0.3,0.4-0.4		c0.2-0.1,0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.2,0.1,0.3,0.1,0.5c0,0.2,0,0.4-0.1,0.5		c-0.1,0.2-0.2,0.3-0.4,0.4s-0.3,0.1-0.5,0.1C255.6,114.3,255.4,114.3,255.3,114.2z M255.3,118.2c-0.2-0.1-0.3-0.2-0.4-0.4		c-0.1-0.2-0.1-0.3-0.1-0.5c0-0.2,0-0.4,0.1-0.5c0.1-0.2,0.2-0.3,0.4-0.4c0.2-0.1,0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1		c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.2,0.1,0.3,0.1,0.5c0,0.2,0,0.4-0.1,0.5c-0.1,0.2-0.2,0.3-0.4,0.4c-0.2,0.1-0.3,0.1-0.5,0.1		C255.6,118.4,255.4,118.3,255.3,118.2z"/>	<path class="st1" d="M261.1,111.2c-0.1-0.1-0.2-0.2-0.3-0.3s-0.1-0.3-0.1-0.4c0-0.1,0-0.3,0.1-0.4s0.2-0.2,0.3-0.3		c0.1-0.1,0.3-0.1,0.4-0.1c0.1,0,0.3,0,0.4,0.1c0.1,0.1,0.2,0.2,0.3,0.3s0.1,0.3,0.1,0.4c0,0.1,0,0.3-0.1,0.4s-0.2,0.2-0.3,0.3		c-0.1,0.1-0.3,0.1-0.4,0.1C261.4,111.3,261.2,111.3,261.1,111.2z M261,118.2v-5.7l1.1-0.1v5.8H261z"/>	<path class="st1" d="M268.8,114.1v4h-1.1v-3.6c0-0.3,0-0.6-0.1-0.7c-0.1-0.2-0.2-0.3-0.3-0.4c-0.2-0.1-0.4-0.1-0.6-0.1		c-0.3,0-0.5,0-0.8,0.1c-0.3,0.1-0.6,0.2-0.8,0.3v4.5h-1.1v-5.7l1.1-0.1v0.5c0.7-0.4,1.4-0.6,2.1-0.6		C268.3,112.3,268.8,112.9,268.8,114.1z"/>	<path class="st1" d="M272.3,110.4c-0.2,0.2-0.2,0.5-0.2,0.9v1.2h1.8l-0.1,0.9h-1.7v4.8H271v-4.8h-1v-0.9h1v-1.1		c0-0.4,0.1-0.8,0.2-1.1c0.2-0.3,0.4-0.6,0.7-0.8s0.7-0.3,1.1-0.3c0.5,0,0.9,0.1,1.3,0.2l-0.3,0.9c-0.3-0.1-0.6-0.2-1-0.2		C272.7,110.1,272.5,110.2,272.3,110.4z"/>	<path class="st1" d="M275.3,117.9c-0.4-0.3-0.7-0.6-0.9-1.1s-0.3-1-0.3-1.5c0-0.7,0.1-1.3,0.4-1.7c0.3-0.4,0.6-0.8,1.1-1		c0.4-0.2,0.9-0.3,1.5-0.3c0.6,0,1.1,0.1,1.5,0.4c0.4,0.3,0.7,0.6,0.9,1.1s0.3,1,0.3,1.5c0,0.7-0.1,1.3-0.4,1.7		c-0.3,0.4-0.6,0.8-1.1,1c-0.4,0.2-0.9,0.3-1.5,0.3C276.3,118.3,275.8,118.2,275.3,117.9z M278.6,115.3c0-0.6-0.1-1.1-0.4-1.5		c-0.3-0.4-0.7-0.6-1.2-0.6c-0.6,0-1,0.2-1.3,0.6c-0.3,0.4-0.4,0.9-0.4,1.5c0,0.6,0.1,1.2,0.4,1.5c0.3,0.4,0.7,0.6,1.2,0.6		C278.1,117.4,278.6,116.7,278.6,115.3z"/>	<path class="st1" d="M289.2,110.2c0.8,0.4,1.3,1,1.7,1.7s0.6,1.5,0.6,2.4c0,0.5-0.1,1-0.3,1.5c-0.2,0.5-0.4,0.8-0.8,1.1		c-0.4,0.3-0.8,0.4-1.3,0.4c-0.3,0-0.6,0-0.9-0.1c-0.2-0.1-0.4-0.2-0.6-0.4c-0.3,0.2-0.6,0.3-1,0.4c-0.3,0.1-0.6,0.1-0.9,0.1		c-0.5,0-0.9-0.1-1.2-0.4c-0.3-0.2-0.6-0.6-0.7-0.9c-0.2-0.4-0.2-0.8-0.2-1.3c0-0.6,0.1-1.1,0.4-1.5s0.6-0.7,1-0.9		c0.4-0.2,0.9-0.3,1.3-0.3c0.8,0,1.4,0.1,2,0.4v3.3c0,0.3,0.1,0.4,0.2,0.6c0.1,0.1,0.3,0.2,0.6,0.2c0.4,0,0.7-0.2,0.9-0.6		c0.2-0.4,0.3-0.9,0.3-1.5c0-0.7-0.1-1.3-0.4-1.9c-0.3-0.6-0.7-1-1.3-1.4c-0.6-0.3-1.4-0.5-2.3-0.5c-0.9,0-1.6,0.2-2.3,0.5		c-0.7,0.3-1.2,0.8-1.5,1.5c-0.4,0.7-0.5,1.4-0.5,2.3c0,0.8,0.2,1.5,0.5,2.1s0.8,1,1.4,1.4c0.6,0.3,1.3,0.5,2.2,0.5		c0.5,0,0.9,0,1.3-0.1c0.4-0.1,0.8-0.2,1.2-0.4l0.3,0.9c-0.5,0.2-0.9,0.3-1.4,0.4c-0.5,0.1-0.9,0.1-1.5,0.1c-1,0-1.9-0.2-2.7-0.6		c-0.8-0.4-1.4-1-1.9-1.7s-0.7-1.6-0.7-2.6c0-1.1,0.2-2.1,0.7-2.9s1.1-1.4,2-1.8c0.8-0.4,1.8-0.6,2.9-0.6		C287.5,109.6,288.4,109.8,289.2,110.2z M285.1,115.9c0.2,0.3,0.5,0.5,1,0.5c0.4,0,0.9-0.1,1.3-0.3v-3.1c-0.3-0.1-0.6-0.1-0.9-0.1		c-0.3,0-0.6,0.1-0.9,0.2c-0.3,0.1-0.5,0.3-0.6,0.6c-0.1,0.3-0.2,0.6-0.2,1C284.8,115.2,284.9,115.6,285.1,115.9z"/>	<path class="st1" d="M297.3,112.7c0.3,0.2,0.6,0.6,0.8,1c0.2,0.4,0.2,0.9,0.2,1.5c0,0.8-0.2,1.4-0.5,1.8c-0.3,0.5-0.7,0.8-1.2,1		c-0.5,0.2-1,0.3-1.5,0.3c-0.6,0-1.3-0.1-2-0.4v-8.7l1.1-0.1v3.7c0.6-0.3,1.3-0.5,1.9-0.5C296.5,112.3,296.9,112.5,297.3,112.7z		 M296.5,116.9c0.4-0.4,0.6-0.9,0.6-1.7c0-0.6-0.1-1-0.3-1.4c-0.2-0.3-0.6-0.5-1-0.5c-0.5,0-1,0.1-1.6,0.4v3.6		c0.3,0.1,0.6,0.1,0.9,0.1C295.6,117.4,296.1,117.2,296.5,116.9z"/>	<path class="st1" d="M304.5,112.4v5.8h-1l-0.1-0.4c-0.7,0.4-1.3,0.6-2,0.6c-0.5,0-1-0.1-1.3-0.4c-0.3-0.3-0.5-0.8-0.5-1.4v-4		l1.1-0.1v3.8c0,0.3,0,0.5,0.1,0.7c0.1,0.2,0.2,0.3,0.3,0.4c0.2,0.1,0.4,0.1,0.7,0.1c0.4,0,0.9-0.2,1.6-0.5v-4.4L304.5,112.4z"/>	<path class="st1" d="M306.8,118.2c-0.4-0.1-0.8-0.3-1.1-0.6l0.5-0.8c0.6,0.5,1.3,0.7,2,0.7c0.4,0,0.7-0.1,0.9-0.2		c0.2-0.1,0.3-0.3,0.3-0.6c0-0.2-0.1-0.4-0.3-0.5c-0.2-0.2-0.5-0.3-1-0.4l-0.4-0.1c-0.6-0.2-1.1-0.4-1.3-0.6s-0.4-0.6-0.4-1		c0-0.3,0.1-0.6,0.3-0.9s0.4-0.4,0.8-0.6c0.3-0.1,0.7-0.2,1.1-0.2c0.4,0,0.8,0,1.1,0.1c0.4,0.1,0.7,0.2,1.1,0.5l-0.5,0.8		c-0.4-0.2-0.7-0.3-0.9-0.4c-0.3-0.1-0.5-0.1-0.8-0.1c-0.3,0-0.6,0.1-0.7,0.2c-0.2,0.1-0.3,0.3-0.3,0.5c0,0.2,0.1,0.3,0.2,0.4		s0.4,0.2,0.7,0.3l0.4,0.1c0.5,0.1,0.9,0.3,1.2,0.4c0.3,0.2,0.5,0.4,0.7,0.6c0.1,0.2,0.2,0.5,0.2,0.8c0,0.3-0.1,0.7-0.3,0.9		c-0.2,0.3-0.4,0.5-0.8,0.6c-0.3,0.1-0.8,0.2-1.3,0.2C307.6,118.3,307.2,118.3,306.8,118.2z"/>	<path class="st1" d="M311.9,111.2c-0.1-0.1-0.2-0.2-0.3-0.3s-0.1-0.3-0.1-0.4c0-0.1,0-0.3,0.1-0.4s0.2-0.2,0.3-0.3		c0.1-0.1,0.3-0.1,0.4-0.1c0.1,0,0.3,0,0.4,0.1c0.1,0.1,0.2,0.2,0.3,0.3s0.1,0.3,0.1,0.4c0,0.1,0,0.3-0.1,0.4s-0.2,0.2-0.3,0.3		c-0.1,0.1-0.3,0.1-0.4,0.1C312.2,111.3,312,111.3,311.9,111.2z M311.8,118.2v-5.7l1.1-0.1v5.8H311.8z"/>	<path class="st1" d="M319.6,114.1v4h-1.1v-3.6c0-0.3,0-0.6-0.1-0.7c-0.1-0.2-0.2-0.3-0.3-0.4c-0.2-0.1-0.4-0.1-0.6-0.1		c-0.3,0-0.5,0-0.8,0.1c-0.3,0.1-0.6,0.2-0.8,0.3v4.5h-1.1v-5.7l1.1-0.1v0.5c0.7-0.4,1.4-0.6,2.1-0.6		C319.1,112.3,319.6,112.9,319.6,114.1z"/>	<path class="st1" d="M326,115.5h-4c0,0.7,0.2,1.1,0.5,1.4c0.3,0.3,0.7,0.4,1.2,0.4c0.3,0,0.6,0,0.9-0.1c0.3-0.1,0.5-0.2,0.9-0.4		l0.4,0.8c-0.7,0.5-1.5,0.7-2.2,0.7c-0.8,0-1.5-0.2-2-0.7c-0.5-0.5-0.7-1.2-0.7-2.2c0-0.6,0.1-1.1,0.3-1.6c0.2-0.5,0.5-0.8,0.9-1.1		c0.4-0.3,0.9-0.4,1.5-0.4c0.5,0,0.9,0.1,1.3,0.3c0.4,0.2,0.6,0.5,0.8,0.8c0.2,0.4,0.3,0.8,0.3,1.2L326,115.5z M322.6,113.6		c-0.3,0.3-0.4,0.6-0.5,1.1h2.8v-0.1c0-0.5-0.1-0.8-0.3-1.1c-0.2-0.2-0.5-0.4-0.9-0.4C323.2,113.2,322.9,113.3,322.6,113.6z"/>	<path class="st1" d="M327.9,118.2c-0.4-0.1-0.8-0.3-1.1-0.6l0.5-0.8c0.6,0.5,1.3,0.7,2,0.7c0.4,0,0.7-0.1,0.9-0.2		c0.2-0.1,0.3-0.3,0.3-0.6c0-0.2-0.1-0.4-0.3-0.5c-0.2-0.2-0.5-0.3-1-0.4l-0.4-0.1c-0.6-0.2-1.1-0.4-1.3-0.6s-0.4-0.6-0.4-1		c0-0.3,0.1-0.6,0.3-0.9s0.4-0.4,0.8-0.6c0.3-0.1,0.7-0.2,1.1-0.2c0.4,0,0.8,0,1.1,0.1c0.4,0.1,0.7,0.2,1.1,0.5l-0.5,0.8		c-0.4-0.2-0.7-0.3-0.9-0.4c-0.3-0.1-0.5-0.1-0.8-0.1c-0.3,0-0.6,0.1-0.7,0.2c-0.2,0.1-0.3,0.3-0.3,0.5c0,0.2,0.1,0.3,0.2,0.4		s0.4,0.2,0.7,0.3l0.4,0.1c0.5,0.1,0.9,0.3,1.2,0.4c0.3,0.2,0.5,0.4,0.7,0.6c0.1,0.2,0.2,0.5,0.2,0.8c0,0.3-0.1,0.7-0.3,0.9		c-0.2,0.3-0.4,0.5-0.8,0.6c-0.3,0.1-0.8,0.2-1.3,0.2C328.8,118.3,328.3,118.3,327.9,118.2z"/>	<path class="st1" d="M333.4,118.2c-0.4-0.1-0.8-0.3-1.1-0.6l0.5-0.8c0.6,0.5,1.3,0.7,2,0.7c0.4,0,0.7-0.1,0.9-0.2		c0.2-0.1,0.3-0.3,0.3-0.6c0-0.2-0.1-0.4-0.3-0.5c-0.2-0.2-0.5-0.3-1-0.4l-0.4-0.1c-0.6-0.2-1.1-0.4-1.3-0.6s-0.4-0.6-0.4-1		c0-0.3,0.1-0.6,0.3-0.9s0.4-0.4,0.8-0.6c0.3-0.1,0.7-0.2,1.1-0.2c0.4,0,0.8,0,1.1,0.1c0.4,0.1,0.7,0.2,1.1,0.5l-0.5,0.8		c-0.4-0.2-0.7-0.3-0.9-0.4c-0.3-0.1-0.5-0.1-0.8-0.1c-0.3,0-0.6,0.1-0.7,0.2c-0.2,0.1-0.3,0.3-0.3,0.5c0,0.2,0.1,0.3,0.2,0.4		s0.4,0.2,0.7,0.3l0.4,0.1c0.5,0.1,0.9,0.3,1.2,0.4c0.3,0.2,0.5,0.4,0.7,0.6c0.1,0.2,0.2,0.5,0.2,0.8c0,0.3-0.1,0.7-0.3,0.9		c-0.2,0.3-0.4,0.5-0.8,0.6c-0.3,0.1-0.8,0.2-1.3,0.2C334.2,118.3,333.8,118.3,333.4,118.2z"/>	<path class="st1" d="M343,115.5h-4c0,0.7,0.2,1.1,0.5,1.4c0.3,0.3,0.7,0.4,1.2,0.4c0.3,0,0.6,0,0.9-0.1c0.3-0.1,0.5-0.2,0.9-0.4		l0.4,0.8c-0.7,0.5-1.5,0.7-2.2,0.7c-0.8,0-1.5-0.2-2-0.7c-0.5-0.5-0.7-1.2-0.7-2.2c0-0.6,0.1-1.1,0.3-1.6c0.2-0.5,0.5-0.8,0.9-1.1		c0.4-0.3,0.9-0.4,1.5-0.4c0.5,0,0.9,0.1,1.3,0.3c0.4,0.2,0.6,0.5,0.8,0.8c0.2,0.4,0.3,0.8,0.3,1.2L343,115.5z M339.6,113.6		c-0.3,0.3-0.4,0.6-0.5,1.1h2.8v-0.1c0-0.5-0.1-0.8-0.3-1.1c-0.2-0.2-0.5-0.4-0.9-0.4C340.2,113.2,339.9,113.3,339.6,113.6z"/>	<path class="st1" d="M346.9,115.2l2,2.9v0.1h-1.3l-1.4-2.2l-1.5,2.2h-1.2v-0.1l2-2.8l-2-2.7v-0.1h1.3l1.4,2l1.4-2h1.2v0.1		L346.9,115.2z"/>	<path class="st1" d="M354.3,112.7c0.4,0.3,0.6,0.6,0.8,1c0.2,0.4,0.3,0.9,0.3,1.4c0,0.7-0.1,1.2-0.4,1.7s-0.6,0.8-1,1.1		s-0.9,0.4-1.5,0.4c-0.4,0-0.8-0.1-1.2-0.2v2.4H350v-8.1l1.1-0.1v0.5c0.3-0.2,0.6-0.3,0.9-0.4c0.3-0.1,0.6-0.1,0.9-0.1		C353.4,112.3,353.9,112.5,354.3,112.7z M353.2,117.2c0.3-0.2,0.5-0.4,0.7-0.7c0.2-0.3,0.2-0.8,0.2-1.3c0-0.7-0.1-1.1-0.4-1.4		c-0.3-0.3-0.6-0.5-1.1-0.5c-0.5,0-1,0.1-1.5,0.4v3.5c0.4,0.1,0.8,0.2,1.1,0.2S352.9,117.4,353.2,117.2z"/>	<path class="st1" d="M360.5,112.8c0.3,0.3,0.5,0.8,0.5,1.4v4h-1l-0.1-0.5c-0.6,0.4-1.3,0.7-2.1,0.7c-0.3,0-0.6-0.1-0.9-0.2		c-0.3-0.1-0.5-0.3-0.6-0.5s-0.2-0.5-0.2-0.8c0-0.5,0.2-0.9,0.5-1.2s0.8-0.5,1.4-0.7c0.6-0.1,1.2-0.2,1.9-0.2v-0.3		c0-0.4-0.1-0.7-0.2-0.9c-0.2-0.2-0.4-0.3-0.8-0.3c-0.6,0-1.3,0.2-2,0.7l-0.5-0.8c0.8-0.6,1.7-0.9,2.6-0.9		C359.7,112.3,360.2,112.5,360.5,112.8z M357.5,117.2c0.1,0.1,0.3,0.2,0.6,0.2c0.6,0,1.2-0.2,1.7-0.5v-1.4c-0.8,0-1.4,0.2-1.8,0.4		c-0.5,0.2-0.7,0.5-0.7,0.8C357.3,116.9,357.4,117.1,357.5,117.2z"/>	<path class="st1" d="M367.7,114.1v4h-1.1v-3.6c0-0.3,0-0.6-0.1-0.7c-0.1-0.2-0.2-0.3-0.3-0.4c-0.2-0.1-0.4-0.1-0.6-0.1		c-0.3,0-0.5,0-0.8,0.1c-0.3,0.1-0.6,0.2-0.8,0.3v4.5h-1.1v-5.7l1.1-0.1v0.5c0.7-0.4,1.4-0.6,2.1-0.6		C367.1,112.3,367.7,112.9,367.7,114.1z"/>	<path class="st1" d="M374.3,109.1v9.1h-1l-0.1-0.4c-0.3,0.2-0.6,0.3-0.9,0.4s-0.6,0.1-0.9,0.1c-0.5,0-0.9-0.1-1.3-0.3		s-0.6-0.6-0.8-1c-0.2-0.4-0.3-0.9-0.3-1.5c0-0.7,0.1-1.2,0.4-1.7c0.3-0.5,0.6-0.8,1-1.1c0.4-0.2,0.9-0.4,1.5-0.4		c0.4,0,0.8,0.1,1.2,0.2v-3.3L374.3,109.1z M370.6,116.9c0.3,0.3,0.6,0.5,1.1,0.5c0.5,0,1-0.1,1.5-0.4v-3.5		c-0.4-0.1-0.8-0.2-1.1-0.2c-0.4,0-0.7,0.1-0.9,0.2s-0.5,0.4-0.6,0.7c-0.2,0.3-0.2,0.8-0.2,1.3C370.2,116.1,370.3,116.6,370.6,116.9		z"/>	<path class="st1" d="M376.6,118.2c-0.4-0.1-0.8-0.3-1.1-0.6l0.5-0.8c0.6,0.5,1.3,0.7,2,0.7c0.4,0,0.7-0.1,0.9-0.2		c0.2-0.1,0.3-0.3,0.3-0.6c0-0.2-0.1-0.4-0.3-0.5c-0.2-0.2-0.5-0.3-1-0.4l-0.4-0.1c-0.6-0.2-1.1-0.4-1.3-0.6s-0.4-0.6-0.4-1		c0-0.3,0.1-0.6,0.3-0.9s0.4-0.4,0.8-0.6c0.3-0.1,0.7-0.2,1.1-0.2c0.4,0,0.8,0,1.1,0.1c0.4,0.1,0.7,0.2,1.1,0.5l-0.5,0.8		c-0.4-0.2-0.7-0.3-0.9-0.4c-0.3-0.1-0.5-0.1-0.8-0.1c-0.3,0-0.6,0.1-0.7,0.2c-0.2,0.1-0.3,0.3-0.3,0.5c0,0.2,0.1,0.3,0.2,0.4		s0.4,0.2,0.7,0.3l0.4,0.1c0.5,0.1,0.9,0.3,1.2,0.4c0.3,0.2,0.5,0.4,0.7,0.6c0.1,0.2,0.2,0.5,0.2,0.8c0,0.3-0.1,0.7-0.3,0.9		c-0.2,0.3-0.4,0.5-0.8,0.6c-0.3,0.1-0.8,0.2-1.3,0.2C377.4,118.3,377,118.3,376.6,118.2z"/>	<path class="st1" d="M386.4,112.5L386.4,112.5l-2.2,6.1c-0.2,0.5-0.4,1-0.6,1.3c-0.2,0.3-0.5,0.5-0.7,0.7c-0.3,0.1-0.6,0.2-1,0.2		c-0.4,0-0.8-0.1-1.1-0.2l0.3-0.9c0.3,0.1,0.5,0.1,0.7,0.1c0.2,0,0.4,0,0.5-0.1c0.1-0.1,0.3-0.2,0.4-0.4c0.1-0.2,0.3-0.4,0.4-0.8		l0.2-0.4H383l-2.2-5.6v-0.1h1.2l1.3,3.6l0.1,0.4l0.2,0.6l0.3-1l1.2-3.6H386.4z"/>	<path class="st1" d="M387.9,118.2c-0.4-0.1-0.8-0.3-1.1-0.6l0.5-0.8c0.6,0.5,1.3,0.7,2,0.7c0.4,0,0.7-0.1,0.9-0.2		c0.2-0.1,0.3-0.3,0.3-0.6c0-0.2-0.1-0.4-0.3-0.5c-0.2-0.2-0.5-0.3-1-0.4l-0.4-0.1c-0.6-0.2-1.1-0.4-1.3-0.6s-0.4-0.6-0.4-1		c0-0.3,0.1-0.6,0.3-0.9s0.4-0.4,0.8-0.6c0.3-0.1,0.7-0.2,1.1-0.2c0.4,0,0.8,0,1.1,0.1c0.4,0.1,0.7,0.2,1.1,0.5l-0.5,0.8		c-0.4-0.2-0.7-0.3-0.9-0.4c-0.3-0.1-0.5-0.1-0.8-0.1c-0.3,0-0.6,0.1-0.7,0.2c-0.2,0.1-0.3,0.3-0.3,0.5c0,0.2,0.1,0.3,0.2,0.4		s0.4,0.2,0.7,0.3l0.4,0.1c0.5,0.1,0.9,0.3,1.2,0.4c0.3,0.2,0.5,0.4,0.7,0.6c0.1,0.2,0.2,0.5,0.2,0.8c0,0.3-0.1,0.7-0.3,0.9		c-0.2,0.3-0.4,0.5-0.8,0.6c-0.3,0.1-0.8,0.2-1.3,0.2C388.7,118.3,388.3,118.3,387.9,118.2z"/>	<path class="st1" d="M396.3,118c-0.5,0.2-0.9,0.4-1.4,0.4c-0.5,0-1-0.2-1.3-0.5s-0.5-0.8-0.5-1.4v-3.1H392v-0.9h1.1v-1.3l1.1-0.2		v1.5h1.9l-0.1,0.9h-1.8v2.9c0,0.7,0.3,1.1,0.8,1.1c0.2,0,0.3,0,0.5-0.1c0.1,0,0.3-0.1,0.5-0.2L396.3,118z"/>	<path class="st1" d="M401.9,115.5h-4c0,0.7,0.2,1.1,0.5,1.4c0.3,0.3,0.7,0.4,1.2,0.4c0.3,0,0.6,0,0.9-0.1c0.3-0.1,0.5-0.2,0.9-0.4		l0.4,0.8c-0.7,0.5-1.5,0.7-2.2,0.7c-0.8,0-1.5-0.2-2-0.7c-0.5-0.5-0.7-1.2-0.7-2.2c0-0.6,0.1-1.1,0.3-1.6c0.2-0.5,0.5-0.8,0.9-1.1		c0.4-0.3,0.9-0.4,1.5-0.4c0.5,0,0.9,0.1,1.3,0.3c0.4,0.2,0.6,0.5,0.8,0.8c0.2,0.4,0.3,0.8,0.3,1.2L401.9,115.5z M398.5,113.6		c-0.3,0.3-0.4,0.6-0.5,1.1h2.8v-0.1c0-0.5-0.1-0.8-0.3-1.1c-0.2-0.2-0.5-0.4-0.9-0.4C399.2,113.2,398.8,113.3,398.5,113.6z"/>	<path class="st1" d="M411.2,112.8c0.3,0.3,0.4,0.7,0.4,1.4v4.1h-1.1v-3.6c0-0.3,0-0.6-0.1-0.7s-0.2-0.3-0.3-0.4s-0.3-0.1-0.5-0.1		c-0.3,0-0.5,0-0.8,0.1c-0.3,0.1-0.5,0.2-0.8,0.3c0,0.2,0,0.3,0,0.4v4.1h-1.1v-3.6c0-0.3,0-0.6-0.1-0.7c-0.1-0.2-0.1-0.3-0.3-0.4		s-0.3-0.1-0.5-0.1c-0.2,0-0.5,0-0.8,0.1c-0.3,0.1-0.5,0.2-0.8,0.3v4.5h-1.1v-5.7l1.1-0.1v0.5c0.7-0.4,1.3-0.6,2-0.6		c0.6,0,1.1,0.2,1.4,0.6c0.3-0.2,0.7-0.3,1.1-0.5s0.8-0.2,1.2-0.2C410.5,112.3,410.9,112.5,411.2,112.8z"/>	<path class="st1" d="M413.3,118.2c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.1-0.3-0.1-0.4c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.2-0.2,0.3-0.3		s0.3-0.1,0.4-0.1s0.3,0,0.4,0.1s0.2,0.2,0.3,0.3c0.1,0.1,0.1,0.3,0.1,0.4c0,0.1,0,0.3-0.1,0.4s-0.2,0.2-0.3,0.3s-0.3,0.1-0.4,0.1		S413.4,118.3,413.3,118.2z"/>	<path class="st1" d="M415.9,117.7c-0.5-0.5-0.7-1.2-0.7-2.2c0-0.7,0.1-1.3,0.4-1.8s0.6-0.8,1.1-1c0.4-0.2,0.9-0.3,1.4-0.3		c0.6,0,1.2,0.2,1.8,0.5l-0.4,0.9c-0.3-0.1-0.6-0.3-0.8-0.3s-0.4-0.1-0.7-0.1c-0.5,0-0.9,0.2-1.2,0.6s-0.4,0.9-0.4,1.6		c0,0.7,0.1,1.2,0.4,1.5s0.7,0.4,1.2,0.4c0.3,0,0.6,0,0.8-0.1s0.5-0.2,0.8-0.4l0.4,0.8c-0.3,0.2-0.7,0.4-1,0.5		c-0.3,0.1-0.7,0.2-1.1,0.2C417.1,118.3,416.4,118.1,415.9,117.7z"/>	<path class="st1" d="M421.9,117.9c-0.4-0.3-0.7-0.6-0.9-1.1s-0.3-1-0.3-1.5c0-0.7,0.1-1.3,0.4-1.7c0.3-0.4,0.6-0.8,1.1-1		c0.4-0.2,0.9-0.3,1.5-0.3c0.6,0,1.1,0.1,1.5,0.4c0.4,0.3,0.7,0.6,0.9,1.1s0.3,1,0.3,1.5c0,0.7-0.1,1.3-0.4,1.7s-0.6,0.8-1.1,1		c-0.4,0.2-0.9,0.3-1.5,0.3C422.8,118.3,422.3,118.2,421.9,117.9z M425.2,115.3c0-0.6-0.1-1.1-0.4-1.5c-0.3-0.4-0.7-0.6-1.2-0.6		c-0.6,0-1,0.2-1.3,0.6c-0.3,0.4-0.4,0.9-0.4,1.5c0,0.6,0.1,1.2,0.4,1.5c0.3,0.4,0.7,0.6,1.2,0.6		C424.6,117.4,425.2,116.7,425.2,115.3z"/>	<path class="st1" d="M435.5,112.8c0.3,0.3,0.4,0.7,0.4,1.4v4.1h-1.1v-3.6c0-0.3,0-0.6-0.1-0.7s-0.2-0.3-0.3-0.4		c-0.1-0.1-0.3-0.1-0.5-0.1c-0.3,0-0.5,0-0.8,0.1c-0.3,0.1-0.5,0.2-0.8,0.3c0,0.2,0,0.3,0,0.4v4.1h-1.1v-3.6c0-0.3,0-0.6-0.1-0.7		c-0.1-0.2-0.1-0.3-0.3-0.4c-0.1-0.1-0.3-0.1-0.5-0.1c-0.2,0-0.5,0-0.8,0.1c-0.3,0.1-0.5,0.2-0.8,0.3v4.5h-1.1v-5.7l1.1-0.1v0.5		c0.7-0.4,1.3-0.6,1.9-0.6c0.6,0,1.1,0.2,1.4,0.6c0.3-0.2,0.7-0.3,1.1-0.5s0.8-0.2,1.2-0.2C434.8,112.3,435.2,112.5,435.5,112.8z"/>	<path class="st1" d="M226.2,136.8c-0.6-0.4-1.1-0.9-1.4-1.6s-0.5-1.4-0.5-2.3c0-1,0.2-1.8,0.6-2.4s0.9-1.1,1.6-1.5		c0.6-0.3,1.4-0.5,2.2-0.5c0.9,0,1.7,0.2,2.3,0.6s1.1,0.9,1.4,1.6s0.5,1.4,0.5,2.3c0,1-0.2,1.8-0.6,2.4s-0.9,1.1-1.5,1.5		c-0.6,0.3-1.4,0.5-2.2,0.5C227.6,137.4,226.8,137.2,226.2,136.8z M229.8,135.5c0.4-0.2,0.6-0.6,0.8-1c0.2-0.4,0.3-0.9,0.3-1.5		c0-0.9-0.2-1.6-0.6-2.2c-0.4-0.5-1-0.8-1.7-0.8c-0.8,0-1.4,0.3-1.8,0.8c-0.4,0.5-0.6,1.2-0.6,2.1c0,0.9,0.2,1.6,0.6,2.2		c0.4,0.5,1,0.8,1.7,0.8C229,135.9,229.5,135.7,229.8,135.5z"/>	<path class="st1" d="M234.2,137.2v-8.4h1.8v8.4H234.2z"/>	<path class="st1" d="M243.7,133.2c0.2,0.2,0.4,0.4,0.5,0.7c0.1,0.3,0.2,0.5,0.2,0.8c0,0.8-0.3,1.4-0.8,1.8s-1.3,0.6-2.4,0.6h-3.3		v-8.4h3.1c0.7,0,1.2,0.1,1.7,0.3c0.5,0.2,0.8,0.4,1,0.8c0.2,0.3,0.4,0.7,0.4,1.2c0,0.4-0.1,0.7-0.3,1s-0.5,0.6-1,0.7		C243.1,132.8,243.4,133,243.7,133.2z M239.7,130.2v2h1c1,0,1.4-0.3,1.4-1c0-0.3-0.1-0.5-0.3-0.7c-0.2-0.2-0.5-0.2-0.9-0.2H239.7z		 M242.2,135.4c0.2-0.2,0.3-0.5,0.3-0.8c0-0.3-0.1-0.6-0.4-0.8c-0.2-0.2-0.6-0.3-1.1-0.3h-1.4v2.1h1.3		C241.5,135.7,241.9,135.6,242.2,135.4z"/>	<path class="st1" d="M245.7,133.2c-0.2-0.1-0.3-0.2-0.4-0.4c-0.1-0.2-0.1-0.3-0.1-0.5c0-0.2,0-0.4,0.1-0.5c0.1-0.2,0.2-0.3,0.4-0.4		c0.2-0.1,0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.2,0.1,0.3,0.1,0.5c0,0.2,0,0.4-0.1,0.5		c-0.1,0.2-0.2,0.3-0.4,0.4s-0.3,0.1-0.5,0.1C246,133.3,245.9,133.3,245.7,133.2z M245.7,137.2c-0.2-0.1-0.3-0.2-0.4-0.4		c-0.1-0.2-0.1-0.3-0.1-0.5c0-0.2,0-0.4,0.1-0.5c0.1-0.2,0.2-0.3,0.4-0.4c0.2-0.1,0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1		c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.2,0.1,0.3,0.1,0.5c0,0.2,0,0.4-0.1,0.5c-0.1,0.2-0.2,0.3-0.4,0.4c-0.2,0.1-0.3,0.1-0.5,0.1		C246,137.4,245.9,137.3,245.7,137.2z"/>	<path class="st1" d="M255.9,132.1c0.4,0.2,0.7,0.5,0.9,0.9c0.2,0.4,0.4,0.9,0.4,1.5c0,0.7-0.1,1.2-0.4,1.6		c-0.3,0.4-0.6,0.7-1.1,0.9c-0.4,0.2-0.9,0.3-1.4,0.3c-0.6,0-1.1-0.1-1.6-0.4c-0.4-0.3-0.7-0.7-1-1.2c-0.2-0.5-0.3-1.1-0.3-1.8		c0-1.1,0.2-2.1,0.5-2.9c0.3-0.8,0.7-1.4,1.3-1.8c0.5-0.4,1.1-0.6,1.8-0.6c0.5,0,1.1,0.1,1.6,0.3l-0.2,0.9c-0.5-0.2-0.9-0.2-1.4-0.2		c-0.7,0-1.2,0.3-1.6,0.8c-0.4,0.5-0.6,1.2-0.7,2.1c0.7-0.4,1.4-0.7,2-0.7C255.1,131.8,255.5,131.9,255.9,132.1z M255.6,135.9		c0.3-0.3,0.5-0.7,0.5-1.3c0-0.6-0.1-1.1-0.4-1.4c-0.3-0.3-0.7-0.4-1.3-0.4c-0.3,0-0.6,0.1-0.9,0.2c-0.3,0.1-0.6,0.3-0.9,0.4		c0,0.1,0,0.3,0,0.5c0,0.8,0.1,1.4,0.4,1.9c0.3,0.4,0.7,0.6,1.3,0.6C254.8,136.4,255.3,136.2,255.6,135.9z"/>	<path class="st1" d="M262.9,132.1c0.4,0.2,0.7,0.5,0.9,0.9c0.2,0.4,0.4,0.9,0.4,1.5c0,0.7-0.1,1.2-0.4,1.6		c-0.3,0.4-0.6,0.7-1.1,0.9c-0.4,0.2-0.9,0.3-1.4,0.3c-0.6,0-1.1-0.1-1.6-0.4c-0.4-0.3-0.7-0.7-1-1.2c-0.2-0.5-0.3-1.1-0.3-1.8		c0-1.1,0.2-2.1,0.5-2.9c0.3-0.8,0.7-1.4,1.3-1.8c0.5-0.4,1.1-0.6,1.8-0.6c0.5,0,1.1,0.1,1.6,0.3l-0.2,0.9c-0.5-0.2-0.9-0.2-1.4-0.2		c-0.7,0-1.2,0.3-1.6,0.8c-0.4,0.5-0.6,1.2-0.7,2.1c0.7-0.4,1.4-0.7,2-0.7C262.1,131.8,262.5,131.9,262.9,132.1z M262.6,135.9		c0.3-0.3,0.5-0.7,0.5-1.3c0-0.6-0.1-1.1-0.4-1.4c-0.3-0.3-0.7-0.4-1.3-0.4c-0.3,0-0.6,0.1-0.9,0.2c-0.3,0.1-0.6,0.3-0.9,0.4		c0,0.1,0,0.3,0,0.5c0,0.8,0.1,1.4,0.4,1.9c0.3,0.4,0.7,0.6,1.3,0.6C261.8,136.4,262.3,136.2,262.6,135.9z"/>	<path class="st1" d="M265.9,136.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5s0.8,0.8,1,1.5s0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4c-0.5,0.3-1,0.4-1.6,0.4		C267.2,137.3,266.4,137,265.9,136.2z M269.3,136c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9c0-1.1-0.2-2-0.5-2.5		s-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8c-0.3,0.6-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5s0.8,0.8,1.4,0.8		C268.7,136.4,269,136.2,269.3,136z"/>	<path class="st1" d="M277.4,129.5c0.5,0.6,0.7,1.4,0.7,2.5c0,1.2-0.1,2.1-0.4,2.9c-0.3,0.8-0.7,1.4-1.2,1.8		c-0.5,0.4-1.2,0.6-1.9,0.6c-0.6,0-1.1-0.1-1.7-0.3l0.3-0.9c0.2,0.1,0.5,0.2,0.7,0.2c0.3,0,0.5,0.1,0.7,0.1c0.7,0,1.2-0.3,1.6-0.8		s0.6-1.2,0.8-2.1c-0.3,0.2-0.6,0.4-1,0.5c-0.3,0.1-0.7,0.2-1.1,0.2c-0.5,0-0.9-0.1-1.3-0.3s-0.7-0.5-0.9-0.9		c-0.2-0.4-0.3-0.9-0.3-1.6c0-0.6,0.1-1.1,0.4-1.6s0.7-0.7,1.1-0.9c0.4-0.2,0.9-0.3,1.4-0.3C276.2,128.6,276.9,128.9,277.4,129.5z		 M277,132.6c0-0.1,0-0.3,0-0.6c0-0.8-0.1-1.4-0.4-1.9c-0.3-0.4-0.7-0.6-1.3-0.6c-0.4,0-0.7,0.1-1,0.2c-0.3,0.2-0.5,0.4-0.6,0.7		c-0.1,0.3-0.2,0.6-0.2,1c0,0.6,0.1,1.1,0.4,1.4c0.3,0.3,0.7,0.5,1.3,0.5C275.7,133.2,276.3,133,277,132.6z"/>	<path class="st1" d="M285.4,134.2v1h-1.2v1.9H283v-1.9h-3.8v-0.5l2.4-6h1.4l-2.4,5.5h2.4l0.2-2.7h1v2.7H285.4z"/>	<path class="st1" d="M292.2,128.8v0.5c-1,1.4-1.8,2.7-2.4,4c-0.6,1.3-1,2.6-1.2,4h-1.3c0.2-1.2,0.5-2.5,1.1-3.7		c0.5-1.2,1.3-2.4,2.2-3.7h-4.3l0.1-1H292.2z"/>	<path class="st1" d="M298,132.1c0.4,0.2,0.7,0.5,0.9,0.9c0.2,0.4,0.4,0.9,0.4,1.5c0,0.7-0.1,1.2-0.4,1.6c-0.3,0.4-0.6,0.7-1.1,0.9		c-0.4,0.2-0.9,0.3-1.4,0.3c-0.6,0-1.1-0.1-1.6-0.4c-0.4-0.3-0.7-0.7-1-1.2c-0.2-0.5-0.3-1.1-0.3-1.8c0-1.1,0.2-2.1,0.5-2.9		c0.3-0.8,0.7-1.4,1.3-1.8c0.5-0.4,1.1-0.6,1.8-0.6c0.5,0,1.1,0.1,1.6,0.3l-0.2,0.9c-0.5-0.2-0.9-0.2-1.4-0.2		c-0.7,0-1.2,0.3-1.6,0.8c-0.4,0.5-0.6,1.2-0.7,2.1c0.7-0.4,1.4-0.7,2-0.7C297.2,131.8,297.6,131.9,298,132.1z M297.7,135.9		c0.3-0.3,0.5-0.7,0.5-1.3c0-0.6-0.1-1.1-0.4-1.4c-0.3-0.3-0.7-0.4-1.3-0.4c-0.3,0-0.6,0.1-0.9,0.2c-0.3,0.1-0.6,0.3-0.9,0.4		c0,0.1,0,0.3,0,0.5c0,0.8,0.1,1.4,0.4,1.9c0.3,0.4,0.7,0.6,1.3,0.6C296.9,136.4,297.4,136.2,297.7,135.9z"/>	<path class="st1" d="M306.5,134.2v1h-1.2v1.9h-1.2v-1.9h-3.8v-0.5l2.4-6h1.4l-2.4,5.5h2.4l0.2-2.7h1v2.7H306.5z"/>	<path class="st1" d="M313.3,128.8v0.5c-1,1.4-1.8,2.7-2.4,4c-0.6,1.3-1,2.6-1.2,4h-1.3c0.2-1.2,0.5-2.5,1.1-3.7		c0.5-1.2,1.3-2.4,2.2-3.7h-4.3l0.1-1H313.3z"/>	<path class="st1" d="M319.6,133.4c0.3,0.4,0.4,0.8,0.4,1.4c0,0.5-0.1,0.9-0.4,1.3c-0.2,0.4-0.6,0.7-1.1,0.9		c-0.5,0.2-1.1,0.3-1.7,0.3c-0.4,0-0.9,0-1.3-0.1s-0.8-0.2-1-0.4l0.4-0.9c0.3,0.1,0.5,0.2,0.9,0.3c0.3,0.1,0.7,0.1,1,0.1		c0.6,0,1.1-0.1,1.4-0.4c0.3-0.3,0.5-0.6,0.5-1.1c0-0.3-0.1-0.6-0.2-0.9c-0.1-0.2-0.4-0.4-0.7-0.5c-0.3-0.1-0.8-0.2-1.3-0.2H316		l0.1-0.9h1c0.4-0.1,0.7-0.3,0.9-0.4c0.2-0.2,0.4-0.3,0.5-0.5c0.1-0.2,0.1-0.4,0.1-0.7c0-0.2-0.1-0.4-0.2-0.5		c-0.1-0.2-0.3-0.3-0.5-0.4c-0.2-0.1-0.5-0.1-0.8-0.1c-0.3,0-0.7,0.1-1,0.2c-0.4,0.2-0.7,0.3-1,0.6l-0.6-0.7		c0.4-0.3,0.8-0.6,1.3-0.8s0.9-0.3,1.4-0.3c0.6,0,1.1,0.1,1.5,0.3c0.4,0.2,0.7,0.4,0.9,0.7c0.2,0.3,0.3,0.7,0.3,1.1		c0,0.5-0.1,0.8-0.4,1.2s-0.7,0.6-1.2,0.8C318.8,132.8,319.3,133,319.6,133.4z"/>	<path class="st1" d="M233.9,147.8v8.4h-1.8v-5.2c-0.1,0.3-0.3,0.7-0.6,1.3l-1.5,2.9h-1.4l-1.5-2.9c-0.3-0.5-0.5-0.9-0.6-1.3v5.2		h-1.8v-8.4h1.9l1.9,3.7c0.1,0.3,0.3,0.6,0.4,0.9c0.1,0.3,0.2,0.6,0.3,0.8c0.1-0.4,0.4-1,0.7-1.7l2-3.7H233.9z"/>	<path class="st1" d="M241.5,152.2c0.2,0.2,0.4,0.4,0.5,0.7c0.1,0.3,0.2,0.5,0.2,0.8c0,0.8-0.3,1.4-0.8,1.8s-1.3,0.6-2.4,0.6h-3.3		v-8.4h3.1c0.7,0,1.2,0.1,1.7,0.3c0.5,0.2,0.8,0.4,1,0.8c0.2,0.3,0.4,0.7,0.4,1.2c0,0.4-0.1,0.7-0.3,1s-0.5,0.6-1,0.7		C240.9,151.8,241.3,152,241.5,152.2z M237.5,149.2v2h1c1,0,1.4-0.3,1.4-1c0-0.3-0.1-0.5-0.3-0.7c-0.2-0.2-0.5-0.2-0.9-0.2H237.5z		 M240,154.4c0.2-0.2,0.3-0.5,0.3-0.8c0-0.3-0.1-0.6-0.4-0.8c-0.2-0.2-0.6-0.3-1.1-0.3h-1.4v2.1h1.3		C239.4,154.7,239.7,154.6,240,154.4z"/>	<path class="st1" d="M243.5,152.2c-0.2-0.1-0.3-0.2-0.4-0.4c-0.1-0.2-0.1-0.3-0.1-0.5c0-0.2,0-0.4,0.1-0.5c0.1-0.2,0.2-0.3,0.4-0.4		c0.2-0.1,0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.2,0.1,0.3,0.1,0.5c0,0.2,0,0.4-0.1,0.5		c-0.1,0.2-0.2,0.3-0.4,0.4s-0.3,0.1-0.5,0.1C243.9,152.3,243.7,152.3,243.5,152.2z M243.5,156.2c-0.2-0.1-0.3-0.2-0.4-0.4		c-0.1-0.2-0.1-0.3-0.1-0.5c0-0.2,0-0.4,0.1-0.5c0.1-0.2,0.2-0.3,0.4-0.4c0.2-0.1,0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1		c0.2,0.1,0.3,0.2,0.4,0.4c0.1,0.2,0.1,0.3,0.1,0.5c0,0.2,0,0.4-0.1,0.5c-0.1,0.2-0.2,0.3-0.4,0.4c-0.2,0.1-0.3,0.1-0.5,0.1		C243.9,156.4,243.7,156.3,243.5,156.2z"/>	<path class="st1" d="M253.9,148.5c0.5,0.6,0.7,1.4,0.7,2.5c0,1.2-0.1,2.1-0.4,2.9c-0.3,0.8-0.7,1.4-1.2,1.8		c-0.5,0.4-1.2,0.6-1.9,0.6c-0.6,0-1.1-0.1-1.7-0.3l0.3-0.9c0.2,0.1,0.5,0.2,0.7,0.2c0.3,0,0.5,0.1,0.7,0.1c0.7,0,1.2-0.3,1.6-0.8		s0.6-1.2,0.8-2.1c-0.3,0.2-0.6,0.4-1,0.5c-0.3,0.1-0.7,0.2-1.1,0.2c-0.5,0-0.9-0.1-1.3-0.3s-0.7-0.5-0.9-0.9		c-0.2-0.4-0.3-0.9-0.3-1.6c0-0.6,0.1-1.1,0.4-1.6s0.7-0.7,1.1-0.9c0.4-0.2,0.9-0.3,1.4-0.3C252.8,147.6,253.5,147.9,253.9,148.5z		 M253.5,151.6c0-0.1,0-0.3,0-0.6c0-0.8-0.1-1.4-0.4-1.9c-0.3-0.4-0.7-0.6-1.3-0.6c-0.4,0-0.7,0.1-1,0.2c-0.3,0.2-0.5,0.4-0.6,0.7		c-0.1,0.3-0.2,0.6-0.2,1c0,0.6,0.1,1.1,0.4,1.4c0.3,0.3,0.7,0.5,1.3,0.5C252.3,152.2,252.9,152,253.5,151.6z"/>	<path class="st1" d="M261.1,152.3c0.3,0.2,0.5,0.4,0.7,0.7c0.2,0.3,0.2,0.6,0.2,0.9c0,0.5-0.1,0.9-0.4,1.3s-0.6,0.6-1.1,0.8		c-0.5,0.2-1,0.3-1.7,0.3c-0.6,0-1.2-0.1-1.7-0.3s-0.8-0.5-1.1-0.8s-0.4-0.8-0.4-1.2c0-0.5,0.2-0.9,0.5-1.3s0.8-0.7,1.5-1		c-0.5-0.2-0.8-0.5-1.1-0.8c-0.3-0.3-0.4-0.7-0.4-1.2c0-0.4,0.1-0.8,0.4-1.1s0.6-0.6,1-0.7c0.4-0.2,0.9-0.2,1.4-0.2		c0.6,0,1.1,0.1,1.5,0.3c0.4,0.2,0.7,0.4,0.9,0.7c0.2,0.3,0.3,0.6,0.3,1c0,0.4-0.1,0.8-0.4,1.2c-0.3,0.4-0.7,0.7-1.2,0.9		C260.5,151.9,260.8,152.1,261.1,152.3z M259.9,155.2c0.3-0.1,0.5-0.3,0.6-0.5c0.1-0.2,0.2-0.4,0.2-0.7c0-0.3-0.1-0.6-0.3-0.8		c-0.2-0.2-0.4-0.4-0.7-0.6c-0.3-0.1-0.7-0.3-1.2-0.5c-0.6,0.2-1,0.5-1.2,0.8c-0.2,0.3-0.3,0.6-0.3,0.9c0,0.3,0.1,0.6,0.2,0.8		s0.4,0.4,0.6,0.5c0.3,0.1,0.6,0.2,1,0.2C259.3,155.4,259.7,155.3,259.9,155.2z M257.8,148.9c-0.3,0.2-0.4,0.5-0.4,0.8		c0,0.2,0.1,0.4,0.2,0.6c0.1,0.2,0.3,0.3,0.6,0.5c0.2,0.2,0.6,0.3,1,0.5c0.4-0.2,0.7-0.4,0.9-0.7c0.2-0.3,0.3-0.5,0.3-0.8		c0-0.4-0.1-0.7-0.4-0.9c-0.3-0.2-0.6-0.3-1.1-0.3C258.4,148.6,258.1,148.7,257.8,148.9z"/>	<path class="st1" d="M263.5,155.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5s0.8,0.8,1,1.5s0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4c-0.5,0.3-1,0.4-1.6,0.4		C264.8,156.3,264.1,156,263.5,155.2z M266.9,155c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9c0-1.1-0.2-2-0.5-2.5		s-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8c-0.3,0.6-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5s0.8,0.8,1.4,0.8		C266.3,155.4,266.6,155.2,266.9,155z"/>	<path class="st1" d="M275,148.5c0.5,0.6,0.7,1.4,0.7,2.5c0,1.2-0.1,2.1-0.4,2.9c-0.3,0.8-0.7,1.4-1.2,1.8c-0.5,0.4-1.2,0.6-1.9,0.6		c-0.6,0-1.1-0.1-1.7-0.3l0.3-0.9c0.2,0.1,0.5,0.2,0.7,0.2c0.3,0,0.5,0.1,0.7,0.1c0.7,0,1.2-0.3,1.6-0.8s0.6-1.2,0.8-2.1		c-0.3,0.2-0.6,0.4-1,0.5c-0.3,0.1-0.7,0.2-1.1,0.2c-0.5,0-0.9-0.1-1.3-0.3s-0.7-0.5-0.9-0.9c-0.2-0.4-0.3-0.9-0.3-1.6		c0-0.6,0.1-1.1,0.4-1.6s0.7-0.7,1.1-0.9c0.4-0.2,0.9-0.3,1.4-0.3C273.8,147.6,274.5,147.9,275,148.5z M274.6,151.6		c0-0.1,0-0.3,0-0.6c0-0.8-0.1-1.4-0.4-1.9c-0.3-0.4-0.7-0.6-1.3-0.6c-0.4,0-0.7,0.1-1,0.2c-0.3,0.2-0.5,0.4-0.6,0.7		c-0.1,0.3-0.2,0.6-0.2,1c0,0.6,0.1,1.1,0.4,1.4c0.3,0.3,0.7,0.5,1.3,0.5C273.3,152.2,274,152,274.6,151.6z"/>	<path class="st1" d="M282.1,152.4c0.3,0.4,0.4,0.8,0.4,1.4c0,0.5-0.1,0.9-0.4,1.3c-0.2,0.4-0.6,0.7-1.1,0.9		c-0.5,0.2-1.1,0.3-1.7,0.3c-0.4,0-0.9,0-1.3-0.1s-0.8-0.2-1-0.4l0.4-0.9c0.3,0.1,0.5,0.2,0.9,0.3c0.3,0.1,0.7,0.1,1,0.1		c0.6,0,1.1-0.1,1.4-0.4c0.3-0.3,0.5-0.6,0.5-1.1c0-0.3-0.1-0.6-0.2-0.9c-0.1-0.2-0.4-0.4-0.7-0.5c-0.3-0.1-0.8-0.2-1.3-0.2h-0.6		l0.1-0.9h1c0.4-0.1,0.7-0.3,0.9-0.4c0.2-0.2,0.4-0.3,0.5-0.5c0.1-0.2,0.1-0.4,0.1-0.7c0-0.2-0.1-0.4-0.2-0.5		c-0.1-0.2-0.3-0.3-0.5-0.4c-0.2-0.1-0.5-0.1-0.8-0.1c-0.3,0-0.7,0.1-1,0.2c-0.4,0.2-0.7,0.3-1,0.6l-0.6-0.7		c0.4-0.3,0.8-0.6,1.3-0.8s0.9-0.3,1.4-0.3c0.6,0,1.1,0.1,1.5,0.3c0.4,0.2,0.7,0.4,0.9,0.7c0.2,0.3,0.3,0.7,0.3,1.1		c0,0.5-0.1,0.8-0.4,1.2s-0.7,0.6-1.2,0.8C281.4,151.8,281.8,152,282.1,152.4z"/>	<path class="st1" d="M284.6,155.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5s0.8,0.8,1,1.5s0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4c-0.5,0.3-1,0.4-1.6,0.4		C285.9,156.3,285.1,156,284.6,155.2z M288,155c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9c0-1.1-0.2-2-0.5-2.5		s-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8c-0.3,0.6-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5s0.8,0.8,1.4,0.8		C287.3,155.4,287.7,155.2,288,155z"/>	<path class="st1" d="M296.1,152.4c0.3,0.4,0.4,0.8,0.4,1.4c0,0.5-0.1,0.9-0.4,1.3c-0.2,0.4-0.6,0.7-1.1,0.9		c-0.5,0.2-1.1,0.3-1.7,0.3c-0.4,0-0.9,0-1.3-0.1s-0.8-0.2-1-0.4l0.4-0.9c0.3,0.1,0.5,0.2,0.9,0.3c0.3,0.1,0.7,0.1,1,0.1		c0.6,0,1.1-0.1,1.4-0.4c0.3-0.3,0.5-0.6,0.5-1.1c0-0.3-0.1-0.6-0.2-0.9c-0.1-0.2-0.4-0.4-0.7-0.5c-0.3-0.1-0.8-0.2-1.3-0.2h-0.6		l0.1-0.9h1c0.4-0.1,0.7-0.3,0.9-0.4c0.2-0.2,0.4-0.3,0.5-0.5c0.1-0.2,0.1-0.4,0.1-0.7c0-0.2-0.1-0.4-0.2-0.5		c-0.1-0.2-0.3-0.3-0.5-0.4c-0.2-0.1-0.5-0.1-0.8-0.1c-0.3,0-0.7,0.1-1,0.2c-0.4,0.2-0.7,0.3-1,0.6l-0.6-0.7		c0.4-0.3,0.8-0.6,1.3-0.8s0.9-0.3,1.4-0.3c0.6,0,1.1,0.1,1.5,0.3c0.4,0.2,0.7,0.4,0.9,0.7c0.2,0.3,0.3,0.7,0.3,1.1		c0,0.5-0.1,0.8-0.4,1.2s-0.7,0.6-1.2,0.8C295.4,151.8,295.8,152,296.1,152.4z"/>	<path class="st1" d="M303.9,147.8v0.5c-1,1.4-1.8,2.7-2.4,4c-0.6,1.3-1,2.6-1.2,4H299c0.2-1.2,0.5-2.5,1.1-3.7		c0.5-1.2,1.3-2.4,2.2-3.7H298l0.1-1H303.9z"/></g><g>	<path class="st1" d="M691,117.8c-0.6-0.4-1.1-0.9-1.4-1.6s-0.5-1.4-0.5-2.3c0-1,0.2-1.8,0.6-2.4c0.4-0.7,0.9-1.1,1.6-1.5		c0.6-0.3,1.4-0.5,2.2-0.5c0.9,0,1.7,0.2,2.3,0.6s1.1,0.9,1.4,1.6s0.5,1.4,0.5,2.3c0,1-0.2,1.8-0.6,2.4c-0.4,0.7-0.9,1.1-1.5,1.5		c-0.6,0.3-1.4,0.5-2.2,0.5C692.4,118.4,691.6,118.2,691,117.8z M694.6,116.5c0.4-0.2,0.6-0.6,0.8-1c0.2-0.4,0.3-0.9,0.3-1.5		c0-0.9-0.2-1.6-0.6-2.2c-0.4-0.5-1-0.8-1.7-0.8c-0.8,0-1.4,0.3-1.8,0.8c-0.4,0.5-0.6,1.2-0.6,2.1c0,0.9,0.2,1.6,0.6,2.2		c0.4,0.5,1,0.8,1.7,0.8C693.8,116.9,694.2,116.7,694.6,116.5z"/>	<path class="st1" d="M705.1,109.8v1.6h-2.7v6.9h-1.8v-6.9h-2.7v-1.6H705.1z"/>	<path class="st1" d="M711,110.1c0.5,0.2,0.9,0.6,1.1,1c0.2,0.4,0.4,0.9,0.4,1.4c0,0.6-0.1,1.1-0.4,1.5c-0.3,0.4-0.6,0.8-1.2,1		c-0.5,0.2-1.1,0.4-1.9,0.4h-1.1v2.8h-1.8v-8.4h3C709.8,109.8,710.5,109.9,711,110.1z M710.1,113.6c0.3-0.2,0.4-0.6,0.4-1.1		c0-0.4-0.1-0.7-0.4-1c-0.3-0.2-0.6-0.3-1.1-0.3h-1.1v2.6h0.9C709.4,113.9,709.8,113.8,710.1,113.6z"/>	<path class="st1" d="M722.3,114.2c0.2,0.2,0.4,0.4,0.5,0.7s0.2,0.5,0.2,0.8c0,0.8-0.3,1.4-0.8,1.8s-1.3,0.6-2.4,0.6h-3.3v-8.4h3.1		c0.7,0,1.2,0.1,1.7,0.3c0.5,0.2,0.8,0.4,1,0.8c0.2,0.3,0.4,0.7,0.4,1.2c0,0.4-0.1,0.7-0.3,1s-0.5,0.6-1,0.7		C721.8,113.8,722.1,114,722.3,114.2z M718.4,111.2v2h1c1,0,1.4-0.3,1.4-1c0-0.3-0.1-0.5-0.3-0.7s-0.5-0.2-0.9-0.2H718.4z		 M720.8,116.4c0.2-0.2,0.3-0.5,0.3-0.8c0-0.3-0.1-0.6-0.4-0.8s-0.6-0.3-1.1-0.3h-1.4v2.1h1.3C720.2,116.7,720.6,116.6,720.8,116.4z		"/>	<path class="st1" d="M728.9,109.8l3,8.3v0.1h-2l-0.7-2h-3.1l-0.7,2h-1.9v-0.1l3-8.3H728.9z M726.6,114.7h2.1l-1.1-3.2L726.6,114.7z		"/>	<path class="st1" d="M740.5,109.8v8.4h-2l-2.6-3.9c-0.2-0.3-0.4-0.6-0.6-0.9c-0.2-0.3-0.3-0.5-0.5-0.9v5.7H733v-8.4h2l2.9,4.3		c0,0.1,0.1,0.2,0.2,0.4c0.1,0.2,0.2,0.4,0.3,0.5c0.1,0.2,0.2,0.3,0.3,0.5v-5.7H740.5z"/>	<path class="st1" d="M746.1,113.7l3.5,4.3v0.1h-2.3l-3.3-4.2v4.2h-1.8v-8.4h1.8v3.9l3.3-3.9h2.1v0.1L746.1,113.7z"/>	<path class="st1" d="M755.2,109.8l3,8.3v0.1h-2l-0.7-2h-3.1l-0.7,2h-1.9v-0.1l3-8.3H755.2z M753,114.7h2.1l-1.1-3.2L753,114.7z"/>	<path class="st1" d="M578.8,128.8v0.9l-4.1,6h4v1.6h-6.6v-0.9l4.2-6h-3.9l0.2-1.6H578.8z M574.9,128.3l-1.4-1.4l0.7-0.7l1.3,0.8		l1.3-0.8l0.7,0.7l-1.4,1.4H574.9z"/>	<path class="st1" d="M580.4,130.3c-0.2-0.1-0.3-0.2-0.4-0.4c-0.1-0.2-0.2-0.3-0.2-0.5c0-0.2,0.1-0.4,0.2-0.6		c0.1-0.2,0.2-0.3,0.4-0.4c0.2-0.1,0.4-0.1,0.6-0.1c0.2,0,0.4,0,0.6,0.1s0.3,0.2,0.4,0.4s0.2,0.4,0.2,0.6c0,0.2-0.1,0.4-0.2,0.5		c-0.1,0.2-0.2,0.3-0.4,0.4s-0.4,0.1-0.6,0.1C580.8,130.5,580.6,130.4,580.4,130.3z M580.1,137.2v-5.8l1.8-0.2v6H580.1z"/>	<path class="st1" d="M587.5,131.3l-0.3,1.8c-0.1-0.1-0.3-0.1-0.4-0.1c-0.1,0-0.2,0-0.4,0c-0.2,0-0.4,0.1-0.7,0.2		c-0.2,0.1-0.4,0.3-0.6,0.6v3.6h-1.8v-5.8l1.8-0.2v0.8c0.4-0.6,1-0.9,1.6-0.9C587.1,131.1,587.3,131.2,587.5,131.3z"/>	<path class="st1" d="M589.2,137c-0.5-0.3-0.8-0.7-1-1.1c-0.2-0.5-0.3-1-0.3-1.6c0-0.7,0.1-1.3,0.4-1.8c0.3-0.5,0.7-0.8,1.2-1		c0.5-0.2,1-0.3,1.6-0.3c0.7,0,1.2,0.1,1.7,0.4s0.8,0.6,1,1.1c0.2,0.5,0.3,1,0.3,1.6c0,0.7-0.1,1.3-0.4,1.8s-0.7,0.8-1.1,1		c-0.5,0.2-1,0.3-1.6,0.3C590.2,137.4,589.6,137.2,589.2,137z M591.9,135.6c0.2-0.3,0.3-0.8,0.3-1.3c0-0.6-0.1-1-0.3-1.3		c-0.2-0.3-0.5-0.5-0.9-0.5c-0.5,0-0.8,0.2-1,0.4s-0.3,0.7-0.3,1.3c0,0.6,0.1,1,0.3,1.3c0.2,0.3,0.5,0.5,1,0.5		C591.4,136.1,591.7,135.9,591.9,135.6z"/>	<path class="st1" d="M602.2,131.3L602,133c-0.1-0.1-0.3-0.1-0.4-0.1c-0.1,0-0.2,0-0.4,0c-0.2,0-0.4,0.1-0.7,0.2		c-0.2,0.1-0.4,0.3-0.6,0.6v3.6h-1.8v-5.8l1.8-0.2v0.8c0.4-0.6,1-0.9,1.6-0.9C601.8,131.1,602,131.2,602.2,131.3z"/>	<path class="st1" d="M607.3,131.6c0.4,0.3,0.6,0.8,0.6,1.5v4.1h-1.5l-0.1-0.5c-0.3,0.2-0.6,0.4-1,0.5c-0.3,0.1-0.6,0.1-1,0.1		c-0.4,0-0.7-0.1-1-0.2c-0.3-0.1-0.5-0.3-0.6-0.6s-0.2-0.5-0.2-0.9c0-0.7,0.3-1.2,1-1.6s1.6-0.6,2.7-0.6v-0.1c0-0.2,0-0.4-0.1-0.6		s-0.1-0.2-0.3-0.3c-0.1-0.1-0.3-0.1-0.5-0.1c-0.5,0-1.2,0.2-1.9,0.7l-0.7-1.1c0.5-0.3,0.9-0.5,1.4-0.7s0.9-0.2,1.5-0.2		C606.4,131.1,606.9,131.3,607.3,131.6z M604.4,135.9c0.1,0.1,0.3,0.1,0.5,0.1c0.4,0,0.8-0.1,1.2-0.4v-1.1c-0.6,0-1.1,0.1-1.4,0.3		c-0.3,0.2-0.4,0.4-0.4,0.6C604.3,135.7,604.3,135.8,604.4,135.9z"/>	<path class="st1" d="M614.2,132.4l-1.4,0.3c-0.1-0.7-0.4-1.1-1-1.1c-0.4,0-0.7,0.2-0.9,0.5c-0.2,0.3-0.3,0.8-0.3,1.5		c0,0.8,0.1,1.4,0.3,1.7s0.5,0.5,0.9,0.5c0.3,0,0.5-0.1,0.7-0.3c0.2-0.2,0.3-0.5,0.4-1l1.4,0.3c-0.3,1.6-1.1,2.4-2.6,2.4		c-0.9,0-1.6-0.3-2-1c-0.4-0.7-0.7-1.5-0.7-2.5c0-1.2,0.2-2,0.7-2.6c0.5-0.6,1.1-0.9,1.9-0.9c0.6,0,1.2,0.2,1.6,0.5		S614,131.7,614.2,132.4z M610.1,127.7h1.2l0.6,0.9l0.6-0.9h1.2l-1.1,1.9h-1.4L610.1,127.7z"/>	<path class="st1" d="M620.8,131.2v6h-1.5l-0.1-0.5c-0.7,0.4-1.4,0.6-2.1,0.6c-0.6,0-1-0.2-1.4-0.5c-0.3-0.3-0.5-0.8-0.5-1.3v-4.2		l1.8-0.2v3.8c0,0.3,0.1,0.6,0.2,0.7c0.1,0.2,0.3,0.2,0.6,0.2c0.3,0,0.7-0.1,1.2-0.4v-4.2L620.8,131.2z"/>	<path class="st1" d="M627.4,131.6c0.3,0.3,0.5,0.7,0.5,1.3v4.3h-1.8v-3.8c0-0.2,0-0.4-0.1-0.6c0-0.1-0.1-0.2-0.2-0.3		c-0.1-0.1-0.3-0.1-0.5-0.1c-0.4,0-0.8,0.1-1.2,0.4v4.3h-1.8v-5.8l1.8-0.2v0.6c0.3-0.2,0.6-0.4,1-0.5s0.7-0.2,1-0.2		C626.7,131.1,627.1,131.3,627.4,131.6z"/>	<path class="st1" d="M629.4,133.2c-0.1-0.1-0.2-0.2-0.3-0.3c-0.1-0.1-0.1-0.3-0.1-0.4s0-0.3,0.1-0.4c0.1-0.1,0.2-0.2,0.3-0.3		c0.1-0.1,0.3-0.1,0.4-0.1c0.1,0,0.3,0,0.4,0.1c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.1,0.3,0.1,0.4s0,0.3-0.1,0.4		c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.1-0.4,0.1C629.7,133.3,629.5,133.3,629.4,133.2z M629.4,137.2c-0.1-0.1-0.2-0.2-0.3-0.3		s-0.1-0.3-0.1-0.4c0-0.1,0-0.3,0.1-0.4c0.1-0.1,0.2-0.2,0.3-0.3c0.1-0.1,0.3-0.1,0.4-0.1c0.1,0,0.3,0,0.4,0.1		c0.1,0.1,0.2,0.2,0.3,0.3c0.1,0.1,0.1,0.3,0.1,0.4c0,0.1,0,0.3-0.1,0.4c-0.1,0.1-0.2,0.2-0.3,0.3c-0.1,0.1-0.3,0.1-0.4,0.1		C629.7,137.3,629.5,137.3,629.4,137.2z"/>	<path class="st1" d="M640.3,136.2v1h-5.5v-0.6l0.5-0.5c1-1,1.8-1.8,2.2-2.3c0.5-0.5,0.8-1,1.1-1.4c0.3-0.4,0.4-0.8,0.4-1.2		c0-0.5-0.1-0.9-0.4-1.1s-0.6-0.4-1.1-0.4c-0.4,0-0.7,0.1-1.1,0.2s-0.7,0.4-1,0.6l-0.6-0.8c0.4-0.4,0.8-0.7,1.3-0.9s1-0.3,1.6-0.3		c0.5,0,0.9,0.1,1.3,0.3s0.7,0.5,0.9,0.8c0.2,0.4,0.3,0.8,0.3,1.3c0,0.5-0.1,1-0.4,1.5c-0.2,0.5-0.6,1-1.1,1.6s-1.2,1.3-2.1,2.1		H640.3z"/>	<path class="st1" d="M647.8,134.2v1h-1.2v1.9h-1.2v-1.9h-3.8v-0.5l2.4-6h1.4l-2.4,5.5h2.4l0.2-2.7h1v2.7H647.8z"/>	<path class="st1" d="M649.4,136.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5c0.4,0.3,0.8,0.8,1,1.5c0.2,0.7,0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4		c-0.5,0.3-1,0.4-1.6,0.4C650.6,137.3,649.9,137,649.4,136.2z M652.8,136c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9		c0-1.1-0.2-2-0.5-2.5c-0.3-0.6-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8s-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5s0.8,0.8,1.4,0.8		C652.1,136.4,652.5,136.2,652.8,136z"/>	<path class="st1" d="M661.6,128.8v0.5c-1,1.4-1.8,2.7-2.4,4c-0.6,1.3-1,2.6-1.2,4h-1.3c0.2-1.2,0.5-2.5,1.1-3.7		c0.5-1.2,1.3-2.4,2.2-3.7h-4.3l0.1-1H661.6z"/>	<path class="st1" d="M663.4,136.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5c0.4,0.3,0.8,0.8,1,1.5c0.2,0.7,0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4		c-0.5,0.3-1,0.4-1.6,0.4C664.7,137.3,663.9,137,663.4,136.2z M666.8,136c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9		c0-1.1-0.2-2-0.5-2.5c-0.3-0.6-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8c-0.3,0.6-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5		s0.8,0.8,1.4,0.8C666.2,136.4,666.5,136.2,666.8,136z"/>	<path class="st1" d="M670.4,136.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6c0.3-0.7,0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5s0.8,0.8,1,1.5s0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4c-0.5,0.3-1,0.4-1.6,0.4		C671.7,137.3,671,137,670.4,136.2z M673.8,136c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9c0-1.1-0.2-2-0.5-2.5		s-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8s-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5c0.3,0.5,0.8,0.8,1.4,0.8		C673.2,136.4,673.6,136.2,673.8,136z"/>	<path class="st1" d="M677.5,136.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5c0.4,0.3,0.8,0.8,1,1.5c0.2,0.7,0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4		c-0.5,0.3-1,0.4-1.6,0.4C678.7,137.3,678,137,677.5,136.2z M680.8,136c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9		c0-1.1-0.2-2-0.5-2.5c-0.3-0.6-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8s-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5s0.8,0.8,1.4,0.8		C680.2,136.4,680.6,136.2,680.8,136z"/>	<path class="st1" d="M684,134.2v-1h3.6v1H684z"/>	<path class="st1" d="M692.7,136.2h1.8v1h-5.2v-1h2.3v-6.1l-1.9,1.1l-0.5-0.7l2.4-1.7h1.2V136.2z"/>	<path class="st1" d="M699.7,136.2h1.8v1h-5.2v-1h2.2v-6.1l-1.9,1.1l-0.5-0.7l2.4-1.7h1.2V136.2z"/>	<path class="st1" d="M703.5,136.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5c0.4,0.3,0.8,0.8,1,1.5c0.2,0.7,0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4		c-0.5,0.3-1,0.4-1.6,0.4C704.7,137.3,704,137,703.5,136.2z M706.8,136c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9		c0-1.1-0.2-2-0.5-2.5c-0.3-0.6-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8s-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5s0.8,0.8,1.4,0.8		C706.2,136.4,706.6,136.2,706.8,136z"/>	<path class="st1" d="M710.5,136.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6c0.3-0.7,0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5s0.8,0.8,1,1.5s0.4,1.4,0.4,2.4c0,1.1-0.2,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4c-0.5,0.3-1,0.4-1.6,0.4		C711.8,137.3,711,137,710.5,136.2z M713.9,136c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9c0-1.1-0.2-2-0.5-2.5		s-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8c-0.3,0.6-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5c0.3,0.5,0.8,0.8,1.4,0.8		C713.2,136.4,713.6,136.2,713.9,136z"/>	<path class="st1" d="M717.5,136.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5c0.4,0.3,0.8,0.8,1,1.5c0.2,0.7,0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4		c-0.5,0.3-1,0.4-1.6,0.4C718.8,137.3,718,137,717.5,136.2z M720.9,136c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9		c0-1.1-0.2-2-0.5-2.5c-0.3-0.6-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8c-0.3,0.6-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5		s0.8,0.8,1.4,0.8C720.3,136.4,720.6,136.2,720.9,136z"/>	<path class="st1" d="M729,129.5c0.5,0.6,0.7,1.4,0.7,2.5c0,1.2-0.1,2.1-0.4,2.9c-0.3,0.8-0.7,1.4-1.2,1.8c-0.5,0.4-1.2,0.6-1.9,0.6		c-0.6,0-1.1-0.1-1.7-0.3l0.3-0.9c0.2,0.1,0.5,0.2,0.7,0.2c0.3,0,0.5,0.1,0.7,0.1c0.7,0,1.2-0.3,1.6-0.8s0.6-1.2,0.8-2.1		c-0.3,0.2-0.7,0.4-1,0.5c-0.3,0.1-0.7,0.2-1.1,0.2c-0.5,0-0.9-0.1-1.3-0.3s-0.7-0.5-0.9-0.9s-0.3-0.9-0.3-1.6		c0-0.6,0.1-1.1,0.4-1.6c0.3-0.4,0.7-0.7,1.1-0.9c0.4-0.2,0.9-0.3,1.4-0.3C727.8,128.6,728.5,128.9,729,129.5z M728.6,132.6		c0-0.1,0-0.3,0-0.6c0-0.8-0.1-1.4-0.4-1.9s-0.7-0.6-1.3-0.6c-0.4,0-0.7,0.1-1,0.2c-0.3,0.2-0.5,0.4-0.6,0.7s-0.2,0.6-0.2,1		c0,0.6,0.1,1.1,0.4,1.4c0.3,0.3,0.7,0.5,1.3,0.5C727.3,133.2,727.9,133,728.6,132.6z"/>	<path class="st1" d="M736,129.5c0.5,0.6,0.7,1.4,0.7,2.5c0,1.2-0.1,2.1-0.4,2.9c-0.3,0.8-0.7,1.4-1.2,1.8c-0.5,0.4-1.2,0.6-1.9,0.6		c-0.6,0-1.1-0.1-1.7-0.3l0.3-0.9c0.2,0.1,0.5,0.2,0.7,0.2s0.5,0.1,0.7,0.1c0.7,0,1.2-0.3,1.6-0.8s0.6-1.2,0.8-2.1		c-0.3,0.2-0.7,0.4-1,0.5c-0.3,0.1-0.7,0.2-1.1,0.2c-0.5,0-0.9-0.1-1.3-0.3s-0.7-0.5-0.9-0.9c-0.2-0.4-0.3-0.9-0.3-1.6		c0-0.6,0.1-1.1,0.4-1.6s0.7-0.7,1.1-0.9c0.4-0.2,0.9-0.3,1.4-0.3C734.8,128.6,735.5,128.9,736,129.5z M735.6,132.6		c0-0.1,0-0.3,0-0.6c0-0.8-0.1-1.4-0.4-1.9c-0.3-0.4-0.7-0.6-1.3-0.6c-0.4,0-0.7,0.1-1,0.2c-0.3,0.2-0.5,0.4-0.6,0.7		c-0.1,0.3-0.2,0.6-0.2,1c0,0.6,0.1,1.1,0.4,1.4c0.3,0.3,0.7,0.5,1.3,0.5C734.3,133.2,734.9,133,735.6,132.6z"/>	<path class="st1" d="M742.9,132.6c0.5,0.5,0.8,1.1,0.8,2c0,0.6-0.1,1.1-0.3,1.5c-0.2,0.4-0.6,0.7-1.1,1c-0.5,0.2-1.1,0.3-1.8,0.3		c-0.9,0-1.7-0.2-2.3-0.5l0.4-0.9c0.6,0.3,1.2,0.4,1.9,0.4c0.4,0,0.8-0.1,1.1-0.2s0.5-0.3,0.7-0.6c0.2-0.2,0.2-0.5,0.2-0.8		c0-0.4-0.1-0.7-0.2-1c-0.1-0.3-0.3-0.5-0.7-0.6c-0.3-0.1-0.7-0.2-1.3-0.2c-0.5,0-0.9,0-1.2,0.1l-0.4-0.4v-3.9h4.7l-0.1,1h-3.4v2.3		c0.3-0.1,0.6-0.1,0.9-0.1C741.7,131.9,742.4,132.2,742.9,132.6z"/>	<path class="st1" d="M750.1,133.4c0.3,0.4,0.4,0.8,0.4,1.4c0,0.5-0.1,0.9-0.4,1.3c-0.2,0.4-0.6,0.7-1.1,0.9		c-0.5,0.2-1.1,0.3-1.7,0.3c-0.4,0-0.9,0-1.3-0.1c-0.4-0.1-0.8-0.2-1-0.4l0.4-0.9c0.3,0.1,0.5,0.2,0.9,0.3c0.3,0.1,0.7,0.1,1,0.1		c0.6,0,1.1-0.1,1.4-0.4s0.5-0.6,0.5-1.1c0-0.3-0.1-0.6-0.2-0.9s-0.4-0.4-0.7-0.5c-0.3-0.1-0.8-0.2-1.3-0.2h-0.6l0.1-0.9h1		c0.4-0.1,0.7-0.3,0.9-0.4c0.2-0.2,0.4-0.3,0.5-0.5c0.1-0.2,0.1-0.4,0.1-0.7c0-0.2-0.1-0.4-0.2-0.5c-0.1-0.2-0.3-0.3-0.5-0.4		s-0.5-0.1-0.8-0.1c-0.3,0-0.7,0.1-1,0.2c-0.4,0.2-0.7,0.3-1,0.6l-0.6-0.7c0.4-0.3,0.8-0.6,1.3-0.8s0.9-0.3,1.4-0.3		c0.6,0,1.1,0.1,1.5,0.3c0.4,0.2,0.7,0.4,0.9,0.7c0.2,0.3,0.3,0.7,0.3,1.1c0,0.5-0.1,0.8-0.4,1.2s-0.7,0.6-1.2,0.8		C749.4,132.8,749.8,133,750.1,133.4z"/>	<path class="st1" d="M756.9,132.6c0.5,0.5,0.8,1.1,0.8,2c0,0.6-0.1,1.1-0.3,1.5c-0.2,0.4-0.6,0.7-1.1,1s-1.1,0.3-1.8,0.3		c-0.9,0-1.7-0.2-2.3-0.5l0.4-0.9c0.6,0.3,1.2,0.4,1.9,0.4c0.4,0,0.8-0.1,1.1-0.2c0.3-0.1,0.5-0.3,0.7-0.6s0.2-0.5,0.2-0.8		c0-0.4-0.1-0.7-0.2-1c-0.1-0.3-0.3-0.5-0.7-0.6c-0.3-0.1-0.7-0.2-1.3-0.2c-0.5,0-0.9,0-1.2,0.1l-0.4-0.4v-3.9h4.7l-0.1,1h-3.4v2.3		c0.3-0.1,0.6-0.1,0.9-0.1C755.7,131.9,756.4,132.2,756.9,132.6z"/>	<path class="st1" d="M569.1,156.2v-8.4h1.8v8.4H569.1z"/>	<path class="st1" d="M578.6,152.2c0.2,0.2,0.4,0.4,0.5,0.7c0.1,0.3,0.2,0.5,0.2,0.8c0,0.8-0.3,1.4-0.8,1.8s-1.3,0.6-2.4,0.6h-3.3		v-8.4h3.1c0.7,0,1.2,0.1,1.7,0.3c0.5,0.2,0.8,0.4,1,0.8c0.2,0.3,0.4,0.7,0.4,1.2c0,0.4-0.1,0.7-0.3,1s-0.5,0.6-1,0.7		C578,151.8,578.3,152,578.6,152.2z M574.6,149.2v2h1c1,0,1.4-0.3,1.4-1c0-0.3-0.1-0.5-0.3-0.7s-0.5-0.2-0.9-0.2H574.6z		 M577.1,154.4c0.2-0.2,0.3-0.5,0.3-0.8c0-0.3-0.1-0.6-0.4-0.8c-0.2-0.2-0.6-0.3-1.1-0.3h-1.4v2.1h1.3		C576.4,154.7,576.8,154.6,577.1,154.4z"/>	<path class="st1" d="M585.1,147.8l3,8.3v0.1h-2l-0.7-2h-3.1l-0.7,2h-1.9v-0.1l3-8.3H585.1z M582.8,152.7h2.1l-1.1-3.2L582.8,152.7z		"/>	<path class="st1" d="M596.7,147.8v8.4h-2l-2.6-3.9c-0.2-0.3-0.4-0.6-0.6-0.9c-0.2-0.3-0.3-0.5-0.5-0.9v5.7h-1.8v-8.4h2l2.9,4.3		c0,0.1,0.1,0.2,0.2,0.4c0.1,0.2,0.2,0.4,0.3,0.5c0.1,0.2,0.2,0.3,0.3,0.5v-5.7H596.7z"/>	<path class="st1" d="M598.4,152.2c-0.2-0.1-0.3-0.2-0.4-0.4c-0.1-0.2-0.1-0.3-0.1-0.5c0-0.2,0-0.4,0.1-0.5c0.1-0.2,0.2-0.3,0.4-0.4		c0.2-0.1,0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1c0.2,0.1,0.3,0.2,0.4,0.4s0.2,0.3,0.2,0.5c0,0.2,0,0.4-0.1,0.5		c-0.1,0.2-0.2,0.3-0.4,0.4c-0.2,0.1-0.3,0.1-0.5,0.1C598.7,152.3,598.6,152.3,598.4,152.2z M598.4,156.2c-0.2-0.1-0.3-0.2-0.4-0.4		c-0.1-0.2-0.1-0.3-0.1-0.5c0-0.2,0-0.4,0.1-0.5c0.1-0.2,0.2-0.3,0.4-0.4s0.3-0.1,0.5-0.1c0.2,0,0.4,0,0.5,0.1		c0.2,0.1,0.3,0.2,0.4,0.4s0.2,0.3,0.2,0.5c0,0.2,0,0.4-0.1,0.5c-0.1,0.2-0.2,0.3-0.4,0.4c-0.2,0.1-0.3,0.1-0.5,0.1		C598.7,156.4,598.6,156.3,598.4,156.2z"/>	<path class="st1" d="M610.3,147.8h1.2v8.4h-1.2v-3.8h-4.7v3.8h-1.2v-8.4h1.2v3.6h4.7V147.8z"/>	<path class="st1" d="M619.9,156.1L619.9,156.1l-1.4,0.1l-2.4-3.3h-1.2v3.3h-1.2v-8.4h2.7c0.7,0,1.2,0.1,1.7,0.3s0.8,0.5,1,0.9		c0.2,0.4,0.3,0.8,0.3,1.3c0,0.4-0.1,0.8-0.2,1.1s-0.4,0.6-0.7,0.9c-0.3,0.2-0.7,0.4-1.1,0.5L619.9,156.1z M614.8,151.9h1.4		c0.7,0,1.1-0.1,1.5-0.4c0.3-0.3,0.5-0.7,0.5-1.2c0-0.5-0.2-0.9-0.5-1.1c-0.3-0.3-0.8-0.4-1.4-0.4h-1.5V151.9z"/>	<path class="st1" d="M624.5,155.2h1.8v1h-5.2v-1h2.2v-6.1l-1.9,1.1l-0.5-0.7l2.4-1.7h1.2V155.2z"/>	<path class="st1" d="M633.3,155.2v1h-5.5v-0.6l0.5-0.5c1-1,1.8-1.8,2.3-2.3c0.5-0.5,0.8-1,1.1-1.4c0.3-0.4,0.4-0.8,0.4-1.2		c0-0.5-0.1-0.9-0.4-1.1c-0.3-0.3-0.6-0.4-1.1-0.4c-0.4,0-0.7,0.1-1.1,0.2s-0.7,0.4-1,0.6l-0.6-0.8c0.4-0.4,0.8-0.7,1.3-0.9		c0.5-0.2,1-0.3,1.6-0.3c0.5,0,0.9,0.1,1.3,0.3c0.4,0.2,0.7,0.5,0.9,0.8c0.2,0.4,0.3,0.8,0.3,1.3c0,0.5-0.1,1-0.4,1.5		c-0.2,0.5-0.6,1-1.1,1.6c-0.5,0.5-1.2,1.3-2.1,2.1H633.3z"/>	<path class="st1" d="M640.3,155.2v1h-5.5v-0.6l0.5-0.5c1-1,1.8-1.8,2.2-2.3c0.5-0.5,0.8-1,1.1-1.4c0.3-0.4,0.4-0.8,0.4-1.2		c0-0.5-0.1-0.9-0.4-1.1s-0.6-0.4-1.1-0.4c-0.4,0-0.7,0.1-1.1,0.2s-0.7,0.4-1,0.6l-0.6-0.8c0.4-0.4,0.8-0.7,1.3-0.9s1-0.3,1.6-0.3		c0.5,0,0.9,0.1,1.3,0.3s0.7,0.5,0.9,0.8c0.2,0.4,0.3,0.8,0.3,1.3c0,0.5-0.1,1-0.4,1.5c-0.2,0.5-0.6,1-1.1,1.6s-1.2,1.3-2.1,2.1		H640.3z"/>	<path class="st1" d="M647.8,153.2v1h-1.2v1.9h-1.2v-1.9h-3.8v-0.5l2.4-6h1.4l-2.4,5.5h2.4l0.2-2.7h1v2.7H647.8z"/>	<path class="st1" d="M649.4,155.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5c0.4,0.3,0.8,0.8,1,1.5c0.2,0.7,0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4		c-0.5,0.3-1,0.4-1.6,0.4C650.6,156.3,649.9,156,649.4,155.2z M652.8,155c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9		c0-1.1-0.2-2-0.5-2.5c-0.3-0.6-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8s-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5s0.8,0.8,1.4,0.8		C652.1,155.4,652.5,155.2,652.8,155z"/>	<path class="st1" d="M661.6,147.8v0.5c-1,1.4-1.8,2.7-2.4,4c-0.6,1.3-1,2.6-1.2,4h-1.3c0.2-1.2,0.5-2.5,1.1-3.7		c0.5-1.2,1.3-2.4,2.2-3.7h-4.3l0.1-1H661.6z"/>	<path class="st1" d="M663.4,155.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5c0.4,0.3,0.8,0.8,1,1.5c0.2,0.7,0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4		c-0.5,0.3-1,0.4-1.6,0.4C664.7,156.3,663.9,156,663.4,155.2z M666.8,155c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9		c0-1.1-0.2-2-0.5-2.5c-0.3-0.6-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8c-0.3,0.6-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5		s0.8,0.8,1.4,0.8C666.2,155.4,666.5,155.2,666.8,155z"/>	<path class="st1" d="M670.4,155.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6c0.3-0.7,0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5s0.8,0.8,1,1.5s0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4c-0.5,0.3-1,0.4-1.6,0.4		C671.7,156.3,671,156,670.4,155.2z M673.8,155c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9c0-1.1-0.2-2-0.5-2.5		s-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8s-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5c0.3,0.5,0.8,0.8,1.4,0.8		C673.2,155.4,673.6,155.2,673.8,155z"/>	<path class="st1" d="M677.5,155.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5c0.4,0.3,0.8,0.8,1,1.5c0.2,0.7,0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4		c-0.5,0.3-1,0.4-1.6,0.4C678.7,156.3,678,156,677.5,155.2z M680.8,155c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9		c0-1.1-0.2-2-0.5-2.5c-0.3-0.6-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8s-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5s0.8,0.8,1.4,0.8		C680.2,155.4,680.6,155.2,680.8,155z"/>	<path class="st1" d="M684,153.2v-1h3.6v1H684z"/>	<path class="st1" d="M692.7,155.2h1.8v1h-5.2v-1h2.3v-6.1l-1.9,1.1l-0.5-0.7l2.4-1.7h1.2V155.2z"/>	<path class="st1" d="M699.7,155.2h1.8v1h-5.2v-1h2.2v-6.1l-1.9,1.1l-0.5-0.7l2.4-1.7h1.2V155.2z"/>	<path class="st1" d="M703.5,155.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5c0.4,0.3,0.8,0.8,1,1.5c0.2,0.7,0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4		c-0.5,0.3-1,0.4-1.6,0.4C704.7,156.3,704,156,703.5,155.2z M706.8,155c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9		c0-1.1-0.2-2-0.5-2.5c-0.3-0.6-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8s-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5s0.8,0.8,1.4,0.8		C706.2,155.4,706.6,155.2,706.8,155z"/>	<path class="st1" d="M710.5,155.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6c0.3-0.7,0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5s0.8,0.8,1,1.5s0.4,1.4,0.4,2.4c0,1.1-0.2,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4c-0.5,0.3-1,0.4-1.6,0.4		C711.8,156.3,711,156,710.5,155.2z M713.9,155c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9c0-1.1-0.2-2-0.5-2.5		s-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8c-0.3,0.6-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5c0.3,0.5,0.8,0.8,1.4,0.8		C713.2,155.4,713.6,155.2,713.9,155z"/>	<path class="st1" d="M717.5,155.2c-0.5-0.7-0.8-1.8-0.8-3.2c0-1.1,0.2-1.9,0.5-2.6s0.7-1.1,1.2-1.4c0.5-0.3,1-0.4,1.5-0.4		c0.6,0,1.2,0.2,1.6,0.5c0.4,0.3,0.8,0.8,1,1.5c0.2,0.7,0.4,1.4,0.4,2.4c0,1.1-0.1,1.9-0.4,2.6c-0.3,0.6-0.7,1.1-1.2,1.4		c-0.5,0.3-1,0.4-1.6,0.4C718.8,156.3,718,156,717.5,155.2z M720.9,155c0.3-0.2,0.5-0.6,0.6-1.1c0.1-0.5,0.2-1.1,0.2-1.9		c0-1.1-0.2-2-0.5-2.5c-0.3-0.6-0.8-0.8-1.4-0.8c-0.6,0-1.1,0.3-1.4,0.8c-0.3,0.6-0.5,1.4-0.5,2.6c0,1.2,0.2,2,0.5,2.5		s0.8,0.8,1.4,0.8C720.3,155.4,720.6,155.2,720.9,155z"/>	<path class="st1" d="M729,148.5c0.5,0.6,0.7,1.4,0.7,2.5c0,1.2-0.1,2.1-0.4,2.9c-0.3,0.8-0.7,1.4-1.2,1.8c-0.5,0.4-1.2,0.6-1.9,0.6		c-0.6,0-1.1-0.1-1.7-0.3l0.3-0.9c0.2,0.1,0.5,0.2,0.7,0.2c0.3,0,0.5,0.1,0.7,0.1c0.7,0,1.2-0.3,1.6-0.8s0.6-1.2,0.8-2.1		c-0.3,0.2-0.7,0.4-1,0.5c-0.3,0.1-0.7,0.2-1.1,0.2c-0.5,0-0.9-0.1-1.3-0.3s-0.7-0.5-0.9-0.9s-0.3-0.9-0.3-1.6		c0-0.6,0.1-1.1,0.4-1.6c0.3-0.4,0.7-0.7,1.1-0.9c0.4-0.2,0.9-0.3,1.4-0.3C727.8,147.6,728.5,147.9,729,148.5z M728.6,151.6		c0-0.1,0-0.3,0-0.6c0-0.8-0.1-1.4-0.4-1.9s-0.7-0.6-1.3-0.6c-0.4,0-0.7,0.1-1,0.2c-0.3,0.2-0.5,0.4-0.6,0.7s-0.2,0.6-0.2,1		c0,0.6,0.1,1.1,0.4,1.4c0.3,0.3,0.7,0.5,1.3,0.5C727.3,152.2,727.9,152,728.6,151.6z"/>	<path class="st1" d="M736,148.5c0.5,0.6,0.7,1.4,0.7,2.5c0,1.2-0.1,2.1-0.4,2.9c-0.3,0.8-0.7,1.4-1.2,1.8c-0.5,0.4-1.2,0.6-1.9,0.6		c-0.6,0-1.1-0.1-1.7-0.3l0.3-0.9c0.2,0.1,0.5,0.2,0.7,0.2s0.5,0.1,0.7,0.1c0.7,0,1.2-0.3,1.6-0.8s0.6-1.2,0.8-2.1		c-0.3,0.2-0.7,0.4-1,0.5c-0.3,0.1-0.7,0.2-1.1,0.2c-0.5,0-0.9-0.1-1.3-0.3s-0.7-0.5-0.9-0.9c-0.2-0.4-0.3-0.9-0.3-1.6		c0-0.6,0.1-1.1,0.4-1.6s0.7-0.7,1.1-0.9c0.4-0.2,0.9-0.3,1.4-0.3C734.8,147.6,735.5,147.9,736,148.5z M735.6,151.6		c0-0.1,0-0.3,0-0.6c0-0.8-0.1-1.4-0.4-1.9c-0.3-0.4-0.7-0.6-1.3-0.6c-0.4,0-0.7,0.1-1,0.2c-0.3,0.2-0.5,0.4-0.6,0.7		c-0.1,0.3-0.2,0.6-0.2,1c0,0.6,0.1,1.1,0.4,1.4c0.3,0.3,0.7,0.5,1.3,0.5C734.3,152.2,734.9,152,735.6,151.6z"/>	<path class="st1" d="M742.9,151.6c0.5,0.5,0.8,1.1,0.8,2c0,0.6-0.1,1.1-0.3,1.5c-0.2,0.4-0.6,0.7-1.1,1c-0.5,0.2-1.1,0.3-1.8,0.3		c-0.9,0-1.7-0.2-2.3-0.5l0.4-0.9c0.6,0.3,1.2,0.4,1.9,0.4c0.4,0,0.8-0.1,1.1-0.2s0.5-0.3,0.7-0.6c0.2-0.2,0.2-0.5,0.2-0.8		c0-0.4-0.1-0.7-0.2-1c-0.1-0.3-0.3-0.5-0.7-0.6c-0.3-0.1-0.7-0.2-1.3-0.2c-0.5,0-0.9,0-1.2,0.1l-0.4-0.4v-3.9h4.7l-0.1,1h-3.4v2.3		c0.3-0.1,0.6-0.1,0.9-0.1C741.7,150.9,742.4,151.2,742.9,151.6z"/>	<path class="st1" d="M750.1,152.4c0.3,0.4,0.4,0.8,0.4,1.4c0,0.5-0.1,0.9-0.4,1.3c-0.2,0.4-0.6,0.7-1.1,0.9		c-0.5,0.2-1.1,0.3-1.7,0.3c-0.4,0-0.9,0-1.3-0.1c-0.4-0.1-0.8-0.2-1-0.4l0.4-0.9c0.3,0.1,0.5,0.2,0.9,0.3c0.3,0.1,0.7,0.1,1,0.1		c0.6,0,1.1-0.1,1.4-0.4s0.5-0.6,0.5-1.1c0-0.3-0.1-0.6-0.2-0.9s-0.4-0.4-0.7-0.5c-0.3-0.1-0.8-0.2-1.3-0.2h-0.6l0.1-0.9h1		c0.4-0.1,0.7-0.3,0.9-0.4c0.2-0.2,0.4-0.3,0.5-0.5c0.1-0.2,0.1-0.4,0.1-0.7c0-0.2-0.1-0.4-0.2-0.5c-0.1-0.2-0.3-0.3-0.5-0.4		s-0.5-0.1-0.8-0.1c-0.3,0-0.7,0.1-1,0.2c-0.4,0.2-0.7,0.3-1,0.6l-0.6-0.7c0.4-0.3,0.8-0.6,1.3-0.8s0.9-0.3,1.4-0.3		c0.6,0,1.1,0.1,1.5,0.3c0.4,0.2,0.7,0.4,0.9,0.7c0.2,0.3,0.3,0.7,0.3,1.1c0,0.5-0.1,0.8-0.4,1.2s-0.7,0.6-1.2,0.8		C749.4,151.8,749.8,152,750.1,152.4z"/>	<path class="st1" d="M756.9,151.6c0.5,0.5,0.8,1.1,0.8,2c0,0.6-0.1,1.1-0.3,1.5c-0.2,0.4-0.6,0.7-1.1,1s-1.1,0.3-1.8,0.3		c-0.9,0-1.7-0.2-2.3-0.5l0.4-0.9c0.6,0.3,1.2,0.4,1.9,0.4c0.4,0,0.8-0.1,1.1-0.2c0.3-0.1,0.5-0.3,0.7-0.6s0.2-0.5,0.2-0.8		c0-0.4-0.1-0.7-0.2-1c-0.1-0.3-0.3-0.5-0.7-0.6c-0.3-0.1-0.7-0.2-1.3-0.2c-0.5,0-0.9,0-1.2,0.1l-0.4-0.4v-3.9h4.7l-0.1,1h-3.4v2.3		c0.3-0.1,0.6-0.1,0.9-0.1C755.7,150.9,756.4,151.2,756.9,151.6z"/></g></svg>',
            width: 600,
        },
        {
            layout: 'noBorders',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 550 ],
              body: [
                [ {text: companyName, alignment: 'right'}],
                [ {text: companyAddress, alignment: 'right'}],
                [ {text: today, alignment: 'right'}]
              ],
            },
            margin: [10, 40, 10, 0]
          },
          {
            layout: 'noBorders',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 550 ],
              body: [
                  [ {text: 'Ponuda broj: ' + offerNum + '/' + realYear, alignment: 'center'}]
              ],
            },
            margin: [10, 13, 10, 10]
          },
          {
            layout: 'noBorders',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 550 ],
              body: [
                  [ {text: 'Po??tovani,', alignment: 'left', bold: true}],
                  [ {text: 'sukladno na??im preliminarnim razgovorima vezano za razvitak Va??eg poslovanja, dostavljamo Vam ponudu.', alignment: 'left'}]
              ],
            },
            margin: [20, 17, 10, 0]
          },
        {
          layout: 'headerLineOnly',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 30, 30, 160, 45, 115, 115 ],
            body: [
                [
                   { text: 'Rbr.', style: 'headerStyle'} , { text: '??ifra', style: 'headerStyle'}, { text: 'Naziv usluge', style: 'headerStyle'}, { text: 'Koli??ina', style: 'headerStyle'}, { text: 'Pojedina??na cijena', style: 'headerStyle'}, { text: 'Ukupno', style: 'headerStyle'} 
                ],

                [ 
                  {text: '1.', style:['header2']}, '', {text: 'Business Expand System', style:['header2']}, {text: '1', style:['header2']}, 

                  {text: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(price), style:['header2']} , 

                  {text: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(price), style:['header2']} 
              ]

              
            ],
          },
          margin: [10, 20, 10, 20]
        },
        {
          layout: 'headerLineOnly',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 30, 30, 180, 50, 105, 100 ],
            body: [
                [
                   '','','','','',''
                ],

                [ 
                  '', '', {text:'AVANS', style:['header2'], bold: true}, '','', 
                  {text: '50% (' + new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(price / 2)  + ')', style:['header2']}
              ]

              
            ],
          },
          margin: [10, -13, 10, 0]
        },
        {
          layout: 'headerLineOnly',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 30, 30, 180, 50, 105, 100 ],
            body: [
                [
                   '','','','','',''
                ],

                [ 
                  '', '', {text: 'SVEUKUPNO', style:['header2'], bold: true}, '','',
                  {text: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(price), style:['header2']} 
              ]

              
            ],
          },
          margin: [10, 3, 10, 0]
        },
        {
          layout: 'headerLineOnly',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 575],
            body: [
                [''],
                [ {text: 'Oslobo??eno pla??anja PDV-a prema ??l.90.st.1. i st.2. Zakona o PDV-u.', style: 'pdv'}]
            ],
          },
          margin: [10, 0, 10, 20]
        },
        {
          layout: 'noBorders',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 550 ],
            body: [
                [ {text: 'Na??in pla??anja - jednokratno pla??anje.', alignment: 'left'}]
            ],
          },
          margin: [20, 35, 10, 0]
        },
        {
          layout: 'noBorders',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 240,370 ],
            body: [
                [ {text: 'Srda??an pozdrav,', alignment: 'left', bold: true, fontSize: 11.5}, ''],
                ['', {svg: '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 121.8 23.7" style="enable-background:new 0 0 121.8 23.7;" xml:space="preserve"><style type="text/css">.st0{fill:url(#SVGID_1_);}.st1{fill:url(#SVGID_2_);}.st2{fill:url(#SVGID_3_);}.st3{fill:url(#SVGID_4_);}.st4{fill:url(#SVGID_5_);}.st5{fill:url(#SVGID_6_);}.st6{fill:url(#SVGID_7_);}.st7{fill:url(#SVGID_8_);}.st8{fill:url(#SVGID_9_);}.st9{fill:url(#SVGID_10_);}</style><linearGradient id="SVGID_1_" radientUnits="userSpaceOnUse" x1="13.7904" y1="10.6906" x2="0.8567" y2="17.5676"><stop  offset="0" style="stop-color:#606994"/><stop  offset="1" style="stop-color:#1D3252"/></linearGradient><path class="st0" d="M12.4,20.2c-0.3,0-0.7,0.1-1.1,0.1c-2,0.2-3.9,0.5-5.9,0.6c-1.7,0.1-1.8,0-1.5-1.4C4.8,16,6.5,12.7,7.7,9.2 c0.7-1.9,1.7-3.7,2-5.7c0-0.2,0.2-0.5-0.2-0.6C9.1,2.8,9,3.1,9,3.3c-0.7,2.4-2,4.6-2.7,7c-1,3.3-2.8,6.4-3.5,9.7 c-0.3,1.4,0.1,1.9,2.1,2c2.4-0.2,4.9-0.5,7.5-0.8c0.6-0.1,1.5-0.1,1.5-0.6C13.8,20,12.9,20.3,12.4,20.2z"/><linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="69.5619" y1="9.8194" x2="57.2813" y2="16.3491"><stop  offset="0" style="stop-color:#606994"/><stop  offset="1" style="stop-color:#1D3252"/></linearGradient><path class="st1" d="M69.5,16.3c-1.3,1.7-2.9,2.9-4.8,4c-2.8,1.6-5.3-0.7-5.4-3.2c-0.1-5.3,1.9-9.6,6-13.2c0.6,0.9,0,1.9,0.2,3 c0.6-1.1,0.8-1.5,0.8-2.2c0-0.5,0.2-1.1-0.4-1.5c-0.6-0.3-1,0.1-1.5,0.4c-1.6,0.8-2.4,2.3-3.3,3.7c-2.2,3.1-2.8,6.7-2.6,10.3 c0.3,3.9,4.1,5.3,6.8,3.6c1.6-1,3.1-2.1,4.2-3.7c0.5-0.7,1.3-1.2,0.9-2.3C69.8,15.3,69.8,15.9,69.5,16.3z"/><linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="25.1991" y1="15.8916" x2="17.8053" y2="19.8229"><stop  offset="0" style="stop-color:#606994"/><stop  offset="1" style="stop-color:#1D3252"/></linearGradient><path class="st2" d="M25.4,20.9c-1.6,0.3-3.3,0.1-4.9-0.3c-2.1-0.5-2.9-2.5-2-4.4c0.6-1.2,1.3-2.5,2.6-3c0.5-0.2,1.1-0.6,1.7,0 c0.6,0.5,0.4,1.3,0,1.8c-0.8,1.2-1.5,2.6-3.2,2.8c-0.2,0-0.6,0.1-0.6,0.4c0,0.4,0.9,0.4,0.7,0.5c-0.1,0,1-0.1,1.4-0.5 c1.1-0.9,2.1-1.9,2.5-3.2c0.3-0.9,0.4-2-0.6-2.6c-0.9-0.6-2-0.4-2.7,0.2c-1.2,1-2.1,2.2-2.9,3.6c-0.7,1.3-0.6,2.3,0.3,3.4 c1.5,1.8,5.4,2.9,7.6,2c0.4-0.2,0.8-0.3,0.8-0.8C26,20.5,25.7,20.9,25.4,20.9z"/><linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="46.7696" y1="17.0783" x2="38.3797" y2="21.5392"><stop  offset="0" style="stop-color:#606994"/><stop  offset="1" style="stop-color:#1D3252"/></linearGradient><path class="st3" d="M44.4,16c-0.4,0.2-0.7,0.5-1.1,0.7c-1.3,0.9-2.2,2.5-3.7,3.1c-0.3,0.1-0.8,0.6-1.1,0.3c-0.3-0.3-0.1-1,0-1.3 c0.4-1,0.9-1.9,1.4-3c-1.5,0.4-2.8,3.4-2.2,4.6c0.4,0.8,1,1.1,1.9,0.5c1.2-0.8,2.3-1.8,3.3-2.9c0.6-0.6,1.6-1.8,2.5-1.4 c0.8,0.3,0.3,1.5,0.5,2.3c0.3,1,0,2.1,1,3c0.3-1.7-0.2-3.2-0.4-4.7C46.2,15.5,45.9,15.2,44.4,16z"/><linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="34.7086" y1="15.2591" x2="27.4378" y2="19.125"><stop  offset="0" style="stop-color:#606994"/><stop  offset="1" style="stop-color:#1D3252"/></linearGradient><path class="st4" d="M31.4,12.8c-1.3,0.2-1.9,1.2-2.1,2.3c-0.1,1.1-0.3,2-1.1,2.8c-0.7,0.9-0.4,1.9,0.1,2.9c0.3,0.6,0.6,1.2,1.5,1.2 c1.8,0,5-3.4,5.1-5.5c0-0.3-0.1-0.7-0.2-1.2C34.4,14.2,32.4,12.6,31.4,12.8z M34,16.4c-0.1,1.3-2.2,4-3.4,4.3 c-1,0.3-1.6-0.2-1.7-1.2c-0.1-0.6,0.3-1,0.5-1.6c0.2-0.6,0.7-1.1,0.6-2.3c0-0.8,0.2-1.6,1-2c0.7-0.4,1.3,0,1.7,0.6 C33.2,15,34.2,15.4,34,16.4z"/><linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="88.6487" y1="15.3226" x2="80.7244" y2="19.536"><stop  offset="0" style="stop-color:#606994"/><stop  offset="1" style="stop-color:#1D3252"/></linearGradient><path class="st5" d="M86.5,14.6c-0.2,0.1-0.4,0.5-0.6,0.7c-0.7,1-1.9,2.8-2.8,4c-0.1-1.3,0.6-3.1,0-4.4c-0.6,2.2-1,4-1.2,6 c-0.1,0.4-0.2,1,0.4,1.1c0.5,0.1,0.6-0.4,0.8-0.7c0.9-1.8,2-3.5,3.3-5.1c1.1-1.4,1.3-1.3,1.9,0.4c0.3-0.9,0.6-1.2-0.2-1.9 C87.3,13.9,87.2,14,86.5,14.6z"/><linearGradient id="SVGID_7_" gradientUnits="userSpaceOnUse" x1="80.3337" y1="15.8113" x2="73.1748" y2="19.6177"><stop  offset="0" style="stop-color:#606994"/><stop  offset="1" style="stop-color:#1D3252"/></linearGradient><path class="st6" d="M79.3,15.6c-0.5,0.6-0.8,1.2-1.2,1.9c-0.8,1.1-1.6,2.5-3,3.3c0-1,0-2.1,0-2.9c0-0.8,0.2-1.7-0.3-2.5 c-0.4,1.7-1.3,3.3-0.7,5.2c0.2,0.6-0.2,1.4,0.5,1.5c0.6,0.1,1.2-0.3,1.6-0.8c1.4-1.6,2.7-3.3,3.7-5.2c0.1-0.2,0.4-0.4,0.1-0.7 C79.7,15.1,79.5,15.3,79.3,15.6z"/><linearGradient id="SVGID_8_" gradientUnits="userSpaceOnUse" x1="101.9075" y1="10.3646" x2="90.5161" y2="16.4215"><stop  offset="0" style="stop-color:#606994"/><stop  offset="1" style="stop-color:#1D3252"/></linearGradient><path class="st7" d="M98.8,13.1c-0.9-0.1-1.8-0.2-2.7-0.5c-0.8-0.3-1.1-0.7-0.8-1.4C96.1,8.5,96.4,5.7,98,3c-1,0.2-1,0.7-1.3,1.2 c-1.3,2-1.5,4.3-2,6.5c-0.3,1.1-0.7,1.1-1.6,0.3c-0.9-0.7-1.5-0.5-1.8,0.5c-0.2,0.6,0,1.2-0.2,1.8c-0.3,1,1,1.6,1.8,2.4 c0.8,0.8,0.4,1,0.2,1.8c-0.3,1.2-0.4,2.4,0.1,3.6c0.2,0.4,0.1,0.9,0.7,0.8c0.6,0,0.8-0.5,0.9-0.9c0.1-0.4,0.3-0.8-0.2-1.1 c-0.6,0-0.3,0.6-0.9,0.7c-0.4-2.4,0.2-4.6,0.8-6.8c0.2-0.7,1.1-0.6,1.6-0.5c0.9,0.3,2,0.1,2.7,0.9c0,0,0.1,0.3,0.1,0.3 c-0.4,1.8-0.1,3.7-0.8,5.4c-0.1,0.3-0.1,0.7-0.1,1.1c0,0.3-0.1,0.6,0.2,0.6c0.4,0,0.4-0.3,0.4-0.6c0.4-2.3,0.8-4.6,1.2-6.9 C100.1,13.5,99.7,13.1,98.8,13.1z M92.7,14.7c-0.6,0-1.2-0.6-1.2-1.4c-0.1-0.8,0.4-1.5,1-1.5c0.6,0,1.2,0.6,1.2,1.4 C93.7,14,93.3,14.7,92.7,14.7z"/><linearGradient id="SVGID_9_" gradientUnits="userSpaceOnUse" x1="100.6645" y1="10.0244" x2="99.2786" y2="10.7613"><stop  offset="0" style="stop-color:#606994"/><stop  offset="1" style="stop-color:#1D3252"/></linearGradient><path class="st8" d="M99.1,10.4c0,0,0.3,0.4,0.5,0.4c0.2,0,1.3-0.4,1.3-0.4s-0.8-0.2-1-0.2S99.1,10.4,99.1,10.4z"/><linearGradient id="SVGID_10_" gradientUnits="userSpaceOnUse" x1="114.4905" y1="12.1614" x2="102.7737" y2="18.3913"><stop  offset="0" style="stop-color:#606994"/><stop  offset="1" style="stop-color:#1D3252"/></linearGradient><path class="st9" d="M117.1,19.4c-1.5-1-2.5-1.9-3.8-3.1c-0.3-0.3-0.4-0.7-1-0.5c-0.5,0.3-0.4,0.6-0.3,1c0.1,1.5-0.8,2.6-1.7,3.5	c-0.3,0.3-0.6,0.6-1,0.2c-0.3-0.4-0.2-0.8,0.1-1.2c0.3-0.4,0.6-0.8,0.9-1.3c0.3-0.5,0.4-1.1-0.1-1.6c-0.6-0.5-1.1,0-1.5,0.4	c-0.6,0.6-0.9,1.4-1.1,2.3c-0.2,1.2-1.1,1.3-1.9,1.5c-0.5,0.1-1-0.2-1.1-0.8c-0.2-1.5-0.9-3.1-0.5-4.6c1.1-4.4,1.5-9.1,5.3-12.3	c-1.9,0.3-3,1.7-3.6,3.4c-0.9,2.4-1.7,4.8-2.2,7.2c-0.5,2.1-0.5,4.3,0.2,6.4c0.5,1.6,1.4,2.1,2.8,1.5c0.8-0.3,1.4-0.5,2.2,0.1 c0.7,0.6,1.4,0.3,2.1-0.3c0.6-0.6,0.9-1.3,1.3-2c0.9-1.7,1.3-1.9,2.8-0.7c1.7,1.4,2.8,2.3,4.7,3.2C118.8,20.6,118.1,20,117.1,19.4z M108.4,19.5c-0.1-0.1,0.2-1.7,0.5-2c0.3-0.4,0.7-0.4,0.8-0.3c0.1,0.1,0.2,0.6-0.1,0.9C109.3,18.4,108.5,19.6,108.4,19.5z"/></svg>',
                  width: 170}
            ]
            ],
          },
          margin: [20, 70, 10, 20]
        },
        {
          layout: 'noBorders',
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 1,
            widths: [ 550 ],
            body: [
                [ {text: 'INUP, obrt za ra??unalne i druge usluge, vl. Leon Cvrtila, Zagreb, Jurja Njavre 29', alignment: 'center', color: '#aaafb4'}]
            ],
          },
          margin: [20, 170, 10, 0]
        },
      ],
      pageMargins: [0, 0, 0, 0 ],

     defaultStyle: {
         font: 'Roboto',
         alignment: 'center',
         fontSize: 10
        
        },
     styles:{
        headerStyle: {
            font: 'Roboto',
            alignment: 'center',
            fillColor: '#dbb989',  
            margin: [2, 7], 
            fontSize: 11
        },
        header2: {
          margin: [0, 5,0,0], 
      },
      pdv: {
        font: 'Roboto',
        alignment: 'left',
        margin: [3, 2, 7, 0], 
        fontSize: 10
    }
     }
    
     };

     pdfMake.createPdf(docDefinition).download('Ponuda.pdf');



    }


    render(){


        
      let clients = this.state.potentionalClients

      let potentionalClients

      let clientsMap


      
      if(this.state.searchValue !== ''){

        
        potentionalClients = clients.filter(
          (client) => {

              return client.name && client.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                    client.surname && client.surname.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                    client.email && client.email.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                    client.companyName && client.companyName.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                    client.oib && client.oib.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                    client.tel && client.tel.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 
          }
      )

      } else {

        potentionalClients = clients.filter(
          (client) => {

              return client.delayName === true 
          }
      )

      }


        
      clientsMap = potentionalClients.map(p => (

            
            <div className="PotentialClient" key={p.name + p.surname + p.problem} style={{display: (p.potentional===false) && (p.delayName===true) && (p.check!==true) ? 'block' : 'none'}}>

                <div className="PotentialClientDelay">
                  {p.delayName ? 
                      <div>{'Odgo??eno za: ' + p.delayDate[p.delayDate.length-1].display}</div>
                    : null
                  }
                </div>

                <div className="PotentialClientBtns">
                  
                    <div onClick={(e)=>this.checkOfferHandler(e,p.num)} style={{display: p.companyName ? 'flex' : 'none', width: '18%'}} >
                          <img src={confirm} />
                          <div>Potvrdi Ponudu</div>
                    </div>

                    <div onClick={(e)=>this.offerHandler(e,p.id, p.num)} style={{width: '20%'}}>
                      <img src={offer} />
                      <div>Napravi Ponudu</div>
                    </div>

                    <div onClick={(e)=>this.delayHandler(e,p.id, p.num)}  style={{width: '10%'}}>
                      <img src={delay}/>
                      <div>Odgodi</div>
                    </div>

                    <div onClick={(e)=>this.deleteHandler(e,p.id, p.num)} style={{width: '10%'}}>
                      <img src={deleteI}  />
                      <div>Obri??i</div>
                    </div>

                </div>

                <div className="PotentialClientWrapp">

                    <div className="PotentialClientPart">
                        <div className="PotentialClientPartHead"><img src={info} /><h3>Osnovne informacije</h3></div>

                        <div className="PotentialClientPartBody"><h5>Ime i prezime:</h5><p>{p.name + ' ' + p.surname}</p></div>

                        <div className="PotentialClientPartBody"><h5>Spol:</h5><p>{p.sex}</p></div>

                        <div className="PotentialClientPartBody"><h5>Godine:</h5><p>{p.birthdate}</p></div>

                        <div className="PotentialClientPartBody"><h5>Email:</h5><p>{p.email}</p></div>

                        <div className="PotentialClientPartBody"><h5>Broj:</h5><p>{p.tel}</p></div>

                        <div className="PotentialClientPartBody"><h5>??upanija:</h5><p>{p.county}</p></div>

                        <div className="PotentialClientPartBody"><h5>Datum prijave:</h5><p>{p.date}</p></div>

                        <div className="PotentialClientPartBody"><h5>Kako su saznali za nas:</h5><p>{p.findOut}</p></div>
                    </div>

                    <div className="PotentialClientPart">
                        <div className="PotentialClientPartHead"><img src={mission} /><h3>Trenutna situacija i ciljevi</h3></div>

                        <div className="PotentialClientPartBody"><h5>Trenutni status:</h5><p>{p.currentStatus}</p></div>

                        <div className="PotentialClientPartBody" style={{paddingTop: p.company ? '5px' : '0px', paddingBottom: p.company ? '5px' : '0px'}}><h5 style={{display: p.company ? 'block' : 'none'}}>Otvara?? novu tvrtku:</h5><p>{p.company}</p></div>

                        <div className="PotentialClientPartBody"><h5>Glavne djelatnosti tvrtke:</h5><p>{p.niche}</p></div>

                        <div className="PotentialClientPartBody"><h5>Godi??nji prihodi:</h5><p>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(p.revenue)}</p></div>

                        <div className="PotentialClientPartBody"><h5>??eljeni godi??nji prihodi:</h5><p>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(p.goal)}</p></div>
                    </div>

                    <div className="PotentialClientPart">
                        <div className="PotentialClientPartHead"><img src={pitch} /><h3>Obja??njenja</h3></div>

                        <div className="PotentialClientPartBody"><h5>Za??to ba?? toliko:</h5><p>{p.why}</p></div>

                        <div className="PotentialClientPartBody"><h5>Glavni problem u postizanju toga:</h5><p>{p.problem}</p></div>

                        <div className="PotentialClientPartBody"><h5>Koliko je {p.sex === 'Mu??ko' ? ' spreman ' : ' spremna '} ulo??iti:</h5><p>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(p.invest)}</p></div>

                        <div className="PotentialClientPartBody" style={{display: 'block'}}><h5>Trenutna situacija:</h5><p>{p.currentSituation}</p></div>

                        <div className="PotentialClientPartBody"><h5>Za??to bi ba?? njega/nju odabrali:</h5><p>{p.whyYou}</p></div>

                        <div className="PotentialClientPartBody"><h5>Kada bi mogli zapo??eti:</h5><p>{p.howSoon}</p></div>
                    </div>

                </div>

                <div className="PotentialClientOffersWrapp">
                  <div onClick={(e)=>this.expandOfferHandler(e, p.num)} className="PotentialClientOffersExpand">
                    {p.offersActive ? <img src={minus} />: <img src={plus} />}<p>{p.offersActive ? ' Zatvori' : ' Pogledaj sve ponude'}</p>
                  </div>
                  {p.offers ?
                    p.offers.map(o =>(
                      <div key={o.offerNum} className="PotentialClientOffers" style={{display: p.offersActive ? 'flex' : 'none'}}> 
                        <div className="PotentialClientOffersDiv"><h5>Datum:</h5> <p>{' ' + o.date}</p></div>
                        <div className="PotentialClientOffersDiv" style={{display: o.service ? 'flex' : 'none'}}><h5>Usluge:</h5> <p>{' ' + o.service}</p></div>
                        <div className="PotentialClientOffersDiv"><h5>Broj ponude:</h5> <p>{' ' + o.offerNum}</p></div>
                        <div className="PotentialClientOffersDiv"><h5>Cijena:</h5> <p>{' ' + new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(o.price)}</p></div>
                        <div className="PotentialClientOffersBtn" onClick={(e)=>this.downloadAllOfferHandler(e, o.offerNum, o.price, p.companyName, p.companyAddress, o.date)}><img src={download} /><div>Skini ponudu</div></div>
                      </div>
                    ))
                    : null
                  }
                </div>


            </div>
        
        ))



        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
        let yyyy = today.getFullYear()

        today = dd + '.' + mm + '.' + yyyy + '.';


        let heightModal = ((this.state.companyName === '') && (this.state.errorModal === true)) ? 30 : 0

        let heightModal1 = ((this.state.companyAddress === '') && (this.state.errorModal === true)) ? 30 : 0

        let heightModal2 = ((this.state.price === '') && (this.state.errorModal === true)) ? 30 : 0

        let heightModal4 = ((this.state.wordPrice === '') && (this.state.errorModal === true)) ? 40 : 0

        let rez = heightModal + heightModal1 + heightModal2 + heightModal4

        console.log(potentionalClients)

        return(
            <Aux>

                <div className="deleteModal" onClick={(e)=>this.deleteModalClick(e)} style={{display: this.state.deleteModal ? 'flex' : 'none'}}>
                  <img src={undo} /> 
                  <div>Poni??ti Brisanje</div>
                </div>

                <div className="delayModal" style={{display: this.state.delay ? 'flex' : 'none'}}>

                  <div onClick={this.delayCloseHandler}  className="PotentionalClientsModalBtn" style={{marginLeft: '13%'}}>
                    <img src={close} /> 
                    <div>Zatvori</div>
                  </div>

                  <h5>Odgodi za:</h5>
                  <input onChange={(e)=>this.delayChangeHandler(e)} className="InputElement" name="delayName" type="date" value={this.state.delayName} />
                  <div className="currentSituationDivError"  style={{display: (this.state.delayName === '') && (this.state.errorModal === true) ? 'block' : 'none', marginLeft: 'auto', marginRight: 'auto', marginTop: '-1%'}}>??? Molim te ispuni polje</div>

                  <div className="PotentionalClientsModalBtn" style={{marginLeft: '40%'}} onClick={this.delaySaveHandler}>
                    <img src={save} /> 
                    <div>Spremi</div>
                  </div>
                  
                </div>

                <div style={{display: (this.state.PotentionalClientsModal === true) || (this.state.delay === true) ? 'block' : 'none'}} className="Backdrop"></div>

                <div className="PotentionalClientsModal" style={{display: this.state.PotentionalClientsModal ? 'block' : 'none', height: rez ? 420 + rez + 'px' : '420px'}}>

                <div onClick={this.closeHandler} className="PotentionalClientsModalBtn">
                  <img src={close} /> 
                  <div>Zatvori</div>
                </div>

                  <div className="PotentionalClientsModalDivWrapp">

                    <div className="PotentionalClientsModalDivInfo">
                      <div><h5>Ime i prezime: </h5>{" " + this.state.potentionalClient.name + " " + this.state.potentionalClient.surname}</div>
                      <div><h5>Djelatnosti tvrtke:</h5>{" " + this.state.potentionalClient.niche}</div>
                      <div><h5>Trenutni status:</h5>{" " + this.state.potentionalClient.currentStatus}</div>
                      <div><h5>Trenutna situacija:</h5>{" " + this.state.potentionalClient.currentSituation}</div>
                      <div><h5>Datum prijave:</h5>{" " + this.state.potentionalClient.date}</div>
                    </div>

                    <div className="PotentionalClientsModalDiv">

                      <h5 style={{display: (this.state.potentionalClient.companyName === undefined) ? 'block' : 'none'}}>Ime tvrtke</h5>

                      <input style={{display: (this.state.potentionalClient.companyName === undefined) ? 'block' : 'none'}} className="InputElement" type="text" onChange={(e)=>this.changeHandler(e)} name="companyName" value={this.state.companyName} />

                      <div className="currentSituationDivError"  style={{display: ((this.state.companyName === '') &&  (this.state.potentionalClient.companyName === undefined)) && (this.state.errorModal === true) ? 'block' : 'none'}}>??? Molim te ispuni polje</div>



                      <h5  style={{display: (this.state.potentionalClient.companyAddress === undefined) ? 'block' : 'none'}}>Adresa tvrtke</h5>

                      <input  style={{display: (this.state.potentionalClient.companyAddress === undefined) ? 'block' : 'none'}} className="InputElement" type="text" onChange={(e)=>this.changeHandler(e)} name="companyAddress" value={this.state.companyAddress} />

                      <div className="currentSituationDivError"  style={{display: ((this.state.companyAddress === '')  &&  (this.state.potentionalClient.companyAddress === undefined)) && (this.state.errorModal === true) ? 'block' : 'none'}}>??? Molim te ispuni polje</div>

                      
                      
                      <h5>Cijena</h5>
                      <input className="InputElement" type="number" onChange={(e)=>this.changeHandler(e)} name="price" value={this.state.price} />
                      <div className="currentSituationDivError"  style={{display: (this.state.price === '') && (this.state.errorModal === true) ? 'block' : 'none'}}>??? Molim te ispuni polje</div>

                      <h5>Cijena rije??ima</h5>
                      <input className="InputElement" type="text" onChange={(e)=>this.changeHandler(e)} name="wordPrice" value={this.state.wordPrice} />
                      <div className="currentSituationDivError"  style={{display: (this.state.wordPrice === '') && (this.state.errorModal === true) ? 'block' : 'none'}}>??? Molim te ispuni polje</div>

                    </div>

                  </div>

                  <div onClick={this.sendHandler} className="PotentionalClientsModalBtn" style={{marginLeft: 'auto', marginRight: '10%'}}>
                    <img src={send} /> 
                    <div>Spremi</div>
                  </div>
                    

                </div>

                <div style={{display: 'flex', justifyContent: 'center', marginTop: '2%'}}>
                  <input className="InputElement" name="searchValue" onChange={(e)=>this.changeHandler(e)} value={this.state.searchValue} placeholder="Pretra??i..."/>
                </div>

                {
                  this.state.potentionalClients.length > 0 ? potentionalClients.length === 0 ? null : clientsMap  :  <Spinner /> 
                }

                {
                  potentionalClients.length === 0 ? <h4 style={{textAlign: 'center', color: 'white', marginTop: '2%', width: '20%', marginLeft: 'auto', marginRight: 'auto', background: '#3f4552', borderRadius: '3px', padding: '8px'}}>Nema jo?? podataka.</h4> : null  
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


export default connect(mapStateToProps)(PotentialClient);

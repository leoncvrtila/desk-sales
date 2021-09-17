import React, {Component} from 'react'
import Aux from '../../hoc/Aux'
import {connect} from 'react-redux'
import axios from 'axios'

import close from '../../assets/images/close.svg'
import deleteNote from '../../assets/images/deleteNote.svg'

class Notes extends Component {


    state={

        notes: [],
        user: [],
        note: '',
        title: '',
        didMount: false,
        selectOpt: 'Privatno',
        noteModal: false,
        noteModalTitle: '',
        noteModalNote: '',
        noteModalCreator: '',
        noteModalDate: '',
        noteModalType: '',
        error: false,
        key: ''
    }


 componentDidMount() {

        axios.all([
          axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth),
          axios.get('https://desk-clients.firebaseio.com/public-notes.json?auth=' + this.props.isAuth)
                  ])
        .then(response => {
    
          let notes = []

          for(let key in response[1].data){
            notes.push({
              ...response[1].data[key],
              key: key
            })
          }

          const user = {
            role: response[0].data.role,
            name: response[0].data.name,
            token: response[0].data.token,
            department: response[0].data.department,
            notes: response[0].data.notes
          }
    
    
        this.setState({
          notes: notes,
          user: user
          });
    
        });
    
    
      }
    
      componentDidUpdate(prevProps, prevState){
        if(!this.state.didMount){
          setTimeout(() => {
    
              axios.all([
                  axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth),
                  axios.get('https://desk-clients.firebaseio.com/public-notes.json?auth=' + this.props.isAuth)
                          ])
                .then(response => {



      
                  let notes = []

                  for(let key in response[1].data){
                    notes.push({
                      ...response[1].data[key],
                      key: key
                    })
                  }
          
      
                  const user = {
                    role: response[0].data.role,
                    name: response[0].data.name,
                    token: response[0].data.token,
                    department: response[0].data.department,
                    notes: response[0].data.notes
                  }
    
    
                  this.setState({
                  notes: notes,
                  didMount: true,
                  user: user

                  });
       
                });
    
          }, 500);   
    }
    
      }

    changeHandler = (e) => {


        this.setState({
            [e.target.name]:e.target.value
        })


    }

    postHandler = () => {

      let today = new Date();

      let day = String(today.getDay());
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
      let yyyy = today.getFullYear()

      let seconds = String(today.getSeconds());
      let minutes = String(today.getMinutes());
      let hour = String(today.getHours());

      let realDay = ''

      if(day === '0'){
        realDay = 'Nedjelja'
      } else if(day === '1'){
        realDay = 'Ponedjeljak'
      }else if(day === '2'){
        realDay = 'Utorak'
      }else if(day === '3'){
        realDay = 'Srijeda'
      }else if(day === '4'){
        realDay = 'Četvrtak'
      }else if(day === '5'){
        realDay = 'Petak'
      }else if(day === '6'){
        realDay = 'Subota'
      }


      today = realDay + ' - ' + dd + '.' + mm + '.' + yyyy + '.' + ' u ' +  hour + ':' + minutes + ':' + seconds;


      if(this.state.title !== '' && this.state.note !== ''){

        if(this.state.selectOpt === 'Javno'){


          axios.post('https://desk-clients.firebaseio.com/public-notes.json?auth=' + this.props.isAuth, {
            
            note: this.state.note,
            title: this.state.title,
            creator: this.state.user.name,
            date: today
          
          })
          
          .then(response => {

              if(response){

                axios.all([
                  axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth),
                  axios.get('https://desk-clients.firebaseio.com/public-notes.json?auth=' + this.props.isAuth)
                          ])
                .then(response => {
            
                  let notes = []
        
                  for(let key in response[1].data){
                    notes.push({
                      ...response[1].data[key],
                      key: key
                    })
                  }
        
                  const user = {
                    role: response[0].data.role,
                    name: response[0].data.name,
                    token: response[0].data.token,
                    department: response[0].data.department,
                    notes: response[0].data.notes
                  }
            
            
                this.setState({
                  notes: notes,
                  user: user,
                  selectOpt: 'Privatno',
                  note: '',
                  title: ''
                  });
            
                });


  
            }
          
          })
          .catch(error => {
            this.setState({error: true});							// hoc error
          });
  



        } else {

          axios.post('https://desk-clients.firebaseio.com/users/' + this.props.userId + '/notes.json?auth=' + this.props.isAuth, {
            
            note: this.state.note,
            title: this.state.title,
            creator: this.state.user.name,
            date: today
          
          })
          
          .then(response => {

            if(response){

              axios.all([
                axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth),
                axios.get('https://desk-clients.firebaseio.com/public-notes.json?auth=' + this.props.isAuth)
                        ])
              .then(response => {
          
                let notes = []
      
                for(let key in response[1].data){
                  notes.push({
                    ...response[1].data[key],
                    key: key
                  })
                }
      
                const user = {
                  role: response[0].data.role,
                  name: response[0].data.name,
                  token: response[0].data.token,
                  department: response[0].data.department,
                  notes: response[0].data.notes
                }
          
          
              this.setState({
                notes: notes,
                user: user,
                note: '',
                title: ''
                });
          
              });



          }
          
          })
          .catch(error => {
            this.setState({error: true});							// hoc error
          });

        }

      } else {

        this.setState({
          error: true
        })

      }



    }

    noteHandler = (e, title, note, creator, date, type, key) => {


      this.setState({
        noteModal: true,
        noteModalTitle: title,
        noteModalNote: note,
        checkNote: note,
        noteModalCreator: creator,
        noteModalDate: date,
        noteModalType: type,
        key: key
      })

    }


    closeModalHandler = () => {

      let today = new Date();
      let day = String(today.getDay());
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
      let yyyy = today.getFullYear()

      let realDay = ''

      if(day === '0'){
        realDay = 'Nedjelja'
      } else if(day === '1'){
        realDay = 'Ponedjeljak'
      }else if(day === '2'){
        realDay = 'Utorak'
      }else if(day === '3'){
        realDay = 'Srijeda'
      }else if(day === '4'){
        realDay = 'Četvrtak'
      }else if(day === '5'){
        realDay = 'Petak'
      }else if(day === '6'){
        realDay = 'Subota'
      }

      today = realDay + ' - ' + dd + '.' + mm + '.' + yyyy + '.';

      if(
        this.state.noteModalNote !== this.state.checkNote 
      ){

        
      if(this.state.noteModalType === 'public'){


        
        axios.put('https://desk-clients.firebaseio.com/public-notes' + this.state.key + '.json?auth=' + this.props.isAuth, {
            
          note: this.state.noteModalNote,
          title: this.state.noteModalTitle,
          creator: this.state.noteModalCreator,
          date: today
        
        })
        
        .then(response => {

          if(response){

            axios.all([
              axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth),
              axios.get('https://desk-clients.firebaseio.com/public-notes.json?auth=' + this.props.isAuth)
                      ])
            .then(response => {



  
              let notes = []

              for(let key in response[1].data){
                notes.push({
                  ...response[1].data[key]
                })
              }
      
  
              const user = {
                role: response[0].data.role,
                name: response[0].data.name,
                token: response[0].data.token,
                department: response[0].data.department,
                notes: response[0].data.notes
              }


              this.setState({
              notes: notes,
              didMount: true,
              user: user,
              noteModal: false,
              noteModalTitle: '',
              noteModalNote: '',
              noteModalCreator: '',
              noteModalDate: '',
              noteModalType: '',
              key: '',
              checkNote: ''

              });
   
            });



          }
        
        })
        .catch(error => {
          this.setState({error: true});							// hoc error
        });


      } else {

        axios.put('https://desk-clients.firebaseio.com/users/' + this.props.userId +  '/notes/' + this.state.key + '.json?auth=' + this.props.isAuth, {
            
          note: this.state.noteModalNote,
          title: this.state.noteModalTitle,
          creator: this.state.noteModalCreator,
          date: today
        
        })
        
        .then(response => {


          if(response){

            axios.all([
              axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth),
              axios.get('https://desk-clients.firebaseio.com/public-notes.json?auth=' + this.props.isAuth)
                      ])
            .then(response => {



  
              let notes = []

              for(let key in response[1].data){
                notes.push({
                  ...response[1].data[key]
                })
              }
      
  
              const user = {
                role: response[0].data.role,
                name: response[0].data.name,
                token: response[0].data.token,
                department: response[0].data.department,
                notes: response[0].data.notes
              }


              this.setState({
              notes: notes,
              didMount: true,
              user: user,
              noteModal: false,
              noteModalTitle: '',
              noteModalNote: '',
              noteModalCreator: '',
              noteModalDate: '',
              noteModalType: '',
              key: '',
              checkNote: ''

              });
   
            });



          }
        
        })
        .catch(error => {
          this.setState({error: true});							// hoc error
        });


      }

      } else {

        this.setState({
          noteModal: false
        })

      }

    }

    NoteDelete = (e, title, note, creator, date, type, key) => {



      if(type === 'public' && this.state.user.name === creator){

        console.log(key)

        axios.delete('https://desk-clients.firebaseio.com/public-notes/' + key + '.json?auth=' + this.props.isAuth)
        
        .then(response => {

          if(response){


            axios.all([
              axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth),
              axios.get('https://desk-clients.firebaseio.com/public-notes.json?auth=' + this.props.isAuth)
                      ])
            .then(response => {

  
              let notes = []

              for(let key in response[1].data){
                notes.push({
                  ...response[1].data[key]
                })
              }
      
  
              const user = {
                role: response[0].data.role,
                name: response[0].data.name,
                token: response[0].data.token,
                department: response[0].data.department,
                notes: response[0].data.notes
              }


              this.setState({
              notes: notes,
              user: user
              });
   
            });



          }
        
        })
        .catch(error => {
         // this.setState({error: true});							// hoc error
        });



      } else {

        console.log(key)

        axios.delete('https://desk-clients.firebaseio.com/users/' + this.props.userId +  '/notes/' + key + '.json?auth=' + this.props.isAuth)
        
        .then(response => {


          if(response){

            axios.all([
              axios.get('https://desk-clients.firebaseio.com/users/'+ this.props.userId + '.json?auth=' + this.props.isAuth),
              axios.get('https://desk-clients.firebaseio.com/public-notes.json?auth=' + this.props.isAuth)
                      ])
            .then(response => {

  
              let notes = []

              for(let key in response[1].data){
                notes.push({
                  ...response[1].data[key]
                })
              }
      
  
              const user = {
                role: response[0].data.role,
                name: response[0].data.name,
                token: response[0].data.token,
                department: response[0].data.department,
                notes: response[0].data.notes
              }

              this.setState({
                notes: notes,
                user: user
                });
   
            });

          }
        
        })
        .catch(error => {
         // this.setState({error: true});							// hoc error
        });
        
      }


    }

    render(){



        let allNotes = null

        let stateNotes = []

        for(let key in this.state.notes){

          stateNotes.push({
            ...this.state.notes[key],
            type: 'public'
          
          })

        }


        console.log(stateNotes)

        let userNotes = []

        for(let key in this.state.user.notes){

          userNotes.push({
            ...this.state.user.notes[key],
            key: key
          })

        }

        

        let fullNotes = stateNotes.concat(userNotes)


        let fullNotesMap = []

        for(let key in fullNotes){

          fullNotesMap.push({
            ...fullNotes[key],
            id: key
          })

        }
        
        

      if(fullNotes[0] !== undefined){


        allNotes = fullNotesMap.map(n => (

          <div className="Note" key={n.note}>

            <div className="NoteDelete" onDoubleClick={(e)=>this.NoteDelete(e, n.title, n.note, n.creator, n.date, n.type, n.key)} style={{display: (n.creator === this.state.user.name) ? 'block' : 'none'}}>
              <img src={deleteNote} />
            </div>


            <div onClick={(e)=>this.noteHandler(e, n.title, n.note, n.creator, n.date, n.type, n.key)}>

              <div>
                <h4>{n.title}</h4>
                <p>{n.note.substring(0,150)}</p>
              </div>

              <div className="NoteInfo" style={{width: n.type === 'public' ? '45%' : '40%'}}>
                <div>↪</div>
                <div>{n.date}</div>
                <div style={{display: n.type === 'public' ? 'block' : 'none'}}>{n.creator === this.state.user.name ? 'Ti' : n.creator}</div>
                <div style={{background: n.type === 'public' ? '#c3ab7d' : '#2a9c8c'}}>{n.type === 'public' ? 'Javno' : 'Privatno'}</div>
              </div>

            </div>

          </div>

      ))

      }





      
        return(




            <Aux>

                <div style={{display: this.state.noteModal ? 'block' : 'none'}} className="Backdrop"></div>

                <div className="NotesModal" style={{display: this.state.noteModal ? 'block' : 'none'}}>
                  
                  <div onClick={this.closeModalHandler} className="NotesModalClose">
                    <img src={close} />
                    <div>Zatvori</div>
                  </div>

                  <div style={{width: '90%', marginLeft: 'auto', marginRight: 'auto', borderLeft: '1px solid #4f5665', paddingLeft: '15px'}}>

                    <h3>{this.state.noteModalTitle}</h3>

                    <div className="NoteInfo" style={{width: this.state.noteModalType === 'public' ? '45%' : '40%'}}>
                      <div>↪</div>
                      <div>{this.state.noteModalDate}</div>
                      <div style={{display: this.state.noteModalType === 'public' ? 'block' : 'none'}}>{this.state.noteModalCreator === this.state.user.name ? 'Ti' : this.state.noteModalCreator}</div>
                      <div style={{background: this.state.noteModalType === 'public' ? '#c3ab7d' : '#2a9c8c'}}>{this.state.noteModalType === 'public' ? 'Javno' : 'Privatno'}</div>
                    </div>

                  </div>

                  {

                    this.state.noteModalCreator === this.state.user.name ?
                    
                    <textarea value={this.state.noteModalNote} name="noteModalNote" onChange={(e)=>this.changeHandler(e)} ></textarea>

                    :

                    <p>{this.state.noteModalNote}</p>

                  }
                  

                </div>

               <div className="Notes">



                    <div className="NotesBox">

                      <h3 style={{color: 'whitesmoke', marginTop: '2%', marginBottom: '2%', textAlign: 'center'}}>Bilješke</h3>

                        <div className="NotesWrapp">
                          {allNotes !== null ? allNotes : <h4 className="NoteBoxH4">Nema još bilješki.</h4>}
                        </div>

                    </div>

                    <div className="NotesBox">

                    <h3 style={{color: 'whitesmoke', marginTop: '2%', marginBottom: '2%', textAlign: 'center'}}>Napravi bilješku</h3>

                      <div className="NotesBoxInputs">

                        <select value={this.state.selectOpt} name="selectOpt" onChange={(e)=>this.changeHandler(e)}>
                          <option>Privatno</option>
                          <option>Javno</option>
                        </select>

                        <input placeholder="Naslov" value={this.state.title} name="title" onChange={(e)=>this.changeHandler(e)} style={{border: this.state.title === '' && this.state.error === true ? '1px solid red' : '0px'}} />

                        <textarea value={this.state.note} name="note" onChange={(e)=>this.changeHandler(e)} style={{border: this.state.note === '' && this.state.error === true ? '1px solid red' : '0px'}}></textarea>

                      </div>

                        <div onClick={this.postHandler} className="NotesBoxPostBtn">Objavi</div>

                    </div>

                </div>



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



export default connect(mapStateToProps)(Notes);
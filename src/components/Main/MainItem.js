import React, {Component} from 'react'
import '../../assets/css/main.css'


class MainItem extends Component {                              // prikazuje boxove sa statistickim podacima


    render() {

        let number = null                                       // prikazi onaj broj koji je filtriran u Main.js ovisno o value

        if (this.props.itemValue === 'potentional'){
            number = this.props.potentional

        } else if (this.props.itemValue === 'check'){
            number = this.props.check 

        } else if (this.props.itemValue === 'delayName') {
            number = this.props.delayName 

        } else if (this.props.itemValue === 'money') {
            number = this.props.money 

        } else if (this.props.itemValue === 'process') {
            number = this.props.process 
        } else if (this.props.itemValue === 'signIn') {
            number = this.props.signIn 
        } else if (this.props.itemValue === 'inProcess') {
            number = this.props.inProcess 
        }


        return(

            <div className="MainItem" style={{
                backgroundImage: this.props.bg

            }}>
                <h5>{this.props.itemName === 'Današnja zarada' ? this.props.itemName : 'Broj ' + this.props.itemName}</h5>
                <img src={this.props.img} />
                <p>{this.props.itemValue === 'money' ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'HRK' }).format(number) : number}</p>
            </div>

        )
    }

}


export default MainItem;
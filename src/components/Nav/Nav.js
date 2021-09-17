import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'


import Home from '../../assets/images/pyramid.svg'
import Funnel from '../../assets/images/funnel.svg'
import Logout from '../../assets/images/logout.svg' 


class Nav extends Component {


    state = {
        nav: [ 
    
            {name: 'Početna', url: Home, path: '/main'},
            {name: 'Kanali', url: Funnel, path: '/channels'},
            {name: 'Odjava', url: Logout, path: '/logout'}        
        ]
        }



    render() {


        const nav = this.state.nav.map((i) => {
            return( <NavLink to={i.path} activeClassName='is-active' key={i.name} > 
                    <img src={i.url} alt={i.name}/>{i.name}
                 </NavLink>
            )
            }
        );

        return(

            <nav>
                {nav}
            </nav>

        );   
    }
}

    



export default Nav;
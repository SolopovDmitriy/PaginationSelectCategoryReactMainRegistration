import React, { Component } from 'react';
import { render } from 'react-dom';


export class Test extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0                // количество всех страниц       
        };      
    }

    componentDidMount() {
      
    }

    render() {        
        return (
            <div>
                <h1 id="tabelLabel" className='text-center'>Hello</h1>               
            </div>
        );
    }

            
    
}


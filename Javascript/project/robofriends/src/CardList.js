import React from 'react';
import Card from './card';

const CardList = ({robots}) => {
    return(
    <div>
        {robots.map((user, i) => {
        return < Card 
            key={i} id={ robots[i].id} 
            name={robots[i].name} e
            mail={ robots[i].email}/>
    })}
    </div>
    );
}

export default CardList;
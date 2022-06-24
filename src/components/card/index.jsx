import React from 'react';
import './card.scss';

const Card = ({active,cardData,clickHandler}) =>{
    return (
    <a href="javascript:void(0);" className={"card " + active} onClick ={clickHandler}>
      <img src={cardData.icon} class="card__image" alt="" />
      <div class="card__overlay">
        <div class="card__header">
          <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>                     
          <div class="card__header-text">
            <h3 class="card__title">{cardData.name}</h3>            
            {/* <span class="card__status">1 hour ago</span> */}
          </div>
        </div>
        <p class="card__description">{cardData.description}</p>
      </div>
    </a>
    
    )
}

export default Card;
// export default class Card extends React.Component {
//      // eslint-disable-next-line no-useless-constructor
//      constructor(props) {
//         super(props);
//     }
// clickHandler(name) {
//     this.props.clickHandler(name);
//     this.props.cardData.selected = true
// }
//   render(){
//     return (
//       <div key={this.props.cardData.name} className={"card " + this.props.cardData.selected} onClick ={this.clickHandler.bind(this,this.props.cardData.name)}>
//         <p>{this.props.cardData.name}</p> <p>{this.props.cardData.description}</p> <img src={this.props.cardData.icon} />
//       </div>
//     )
//   }
// }
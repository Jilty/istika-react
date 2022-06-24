import React,{useState} from 'react';
import Card from '../card';
import './cardContainer.scss';

const CardContainer = ({data,onClick}) =>{
    const [chosen, setChosen] = useState();
    console.log(data);
    const clickFunction = (item) =>{
        console.log(item)
        setChosen(item);
        // clickhandler(item.name)
        onClick(item.name)
    }
   
     return (
      <div className="card-container">
          {
            data != undefined?
              data.map( item =>{
                  return(
                    <Card active ={item === chosen} cardData={item}  clickHandler={()=>clickFunction(item)} ></Card>
                  )
              }) : null
          }
      </div>
    )
}
export default CardContainer
// export default  class CardContainer extends React.Component {
//      // eslint-disable-next-line no-useless-constructor
//      constructor(props) {
//         super(props);
//     }
// clickHandler=(name) =>{
//     this.props.onClick(name);
    
// }

//   render(){
//     const [chosen, setChosen] = useState();
//     return (
//       <div className="card-container">
//           {
//               this.props.data.map( item =>{
//                   return(
//                     <Card key={item} active ={item === chosen} cardData={item} clickHandler={this.clickHandler,setChosen(item)} ></Card>
//                   )
//               })
//           }
//       </div>
//     )
//   }
// }
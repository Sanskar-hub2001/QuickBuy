import React from 'react'
import './Item.css';
import { Link } from 'react-router-dom';


var currency = '$';

const Item = (props) => {

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // This makes the scroll smooth
    });
  }
  return (
    <div className='item' >
      <Link to={`/product/${props.id}`}><img onClick={handleScrollToTop} src={props.image} alt="" /></Link>
        
      <p>{props.name}</p>

      <div className="item-prices">
        <div className="item-price-new">{currency}{props.new_price}</div>
        <div className="item-price-old">{currency}{props.old_price}</div>
      </div>
    </div>
  )
}

export default Item
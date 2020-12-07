import React from 'react';
import { withRouter } from 'react-router-dom';
//withRouter -- higher order component -- 
//--is a function that takes a component as an argument and returns a modified component

import './menu-item.styles.scss';

const MenuItem = ({title, imageUrl, size, linkUrl, history, match}) => {
  console.log(match)
  return(
    <div className={`menu-item ${size}`} onClick={() => history.push(`${match.url}${linkUrl}`)}>
    <div className = 'background-image' style={{backgroundImage: `url(${imageUrl})`}} />
        <div className='content'>
          <h1 className='title'>{title.toUpperCase()}</h1>
          <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
  )
}
export default withRouter(MenuItem);
//withRouter -- returns a powered MenuItem component with access to location, match and history props
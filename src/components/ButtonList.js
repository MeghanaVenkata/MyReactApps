import React from 'react';
import Button from './Button';

const list = ["All","Music","Live","News","Telugu Cinema", "comedies","Novels","New to You","Korean","Movies","Sports"];

const ButtonList = () => {
  return (
    <div className='flex'>
      {list.map((list) => (<Button name= {list} />))}
        
    </div>
  )
}

export default ButtonList
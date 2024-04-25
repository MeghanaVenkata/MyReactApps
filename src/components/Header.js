import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import appSlice, { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';
import { cacheResults } from "../utils/searchSlice";

const Header = () => {


  const [searchQuery,setSearchQuery] = useState([]);
  const [suggestions,setSuggestions] = useState([]);
  const [showSuggestions,setShowSuggestions] = useState([false]);

  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();
  const togglemenuHandler = () => {

  dispatch(toggleMenu());

  }

  
  useEffect(() => {

  const timer = setTimeout(() => {

  if(searchCache[searchQuery]) {
    setSuggestions(searchCache[searchQuery]);
   
  } else {
    getSearchApi();
  }
},200);

   return () => {
    clearTimeout(timer);
   }
  },[searchQuery]);

  const getSearchApi = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);
    dispatch(
      cacheResults({
        [searchQuery]: json[1],
      })
    );


  }

  
  return (
    <div className='grid grid-flow-col p-5 m-2 shadow-lg'>
    <div className='flex col-span-1' >
       <img onClick={() => togglemenuHandler()} className='h-10 cursor-pointer'
       alt="menu" 
       src="https://static.vecteezy.com/system/resources/previews/021/190/402/original/hamburger-menu-filled-icon-in-transparent-background-basic-app-and-web-ui-bold-line-icon-eps10-free-vector.jpg"
       />
       <a href='/'>
       <img className='h-8 mx-2'
       alt="youtube" 
       src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/512px-YouTube_Logo_2017.svg.png?20220605194644"
       />
       </a>
    </div>
   
   <div className='col-span-10 center px-12'>
    <div>
    <input type="text" value={searchQuery} 
    onChange={(e) => setSearchQuery(e.target.value)} 
    onFocus={() => setShowSuggestions(true)}
    onBlur={() => setShowSuggestions(false)}
    className="w-1/2 border border-solid border-gray-400 p-2 rounded-l-full" />
    <button className='border border-gray-400 p-2 rounded-r-full bg-gray-100 px-5'>🔍</button>
    </div>
    {showSuggestions && <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div> }
   </div>

   <div>
    <img className=" h-10 col-span-1" alt='user-icon' src="https://th.bing.com/th/id/R.7ea4af7d8401d2b43ee841bfa2abe89d?rik=xidyUKdveUKULQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fuser-png-icon-download-icons-logos-emojis-users-2240.png&ehk=2%2bOqgdMZqFkKaBclc%2fPL9B86vLju3iBGiFmH64kXaTM%3d&risl=&pid=ImgRaw&r=0"/>
   </div>
   </div>
  )
}

export default Header
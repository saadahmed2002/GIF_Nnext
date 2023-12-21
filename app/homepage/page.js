'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Heart, HeartOff, HeartOffIcon, Search } from 'lucide-react';
import { doc, getDocs, setDoc } from "firebase/firestore"; 
import { collection, deleteDoc, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
function SearchGifs() {
  const [keyword, setKeyword] = useState('');
  const [gifs, setGifs] = useState([]);

  const fetchGifs = async () => {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=GlVGYHkr3WSBnllca54iNt0yFbjz7L65&q=${keyword}&limit=25`
    );
    setGifs(response.data.data);
  };

  useEffect(()=>{
    if (!localStorage.getItem('user')){
      window.location = '/'
    }
    else{
      getLikedGifs()
    }
  },[])
  useEffect(() => {
    if (keyword) {
      fetchGifs();
    
    }
  }, [keyword]);
  const [isLiked, setIsLiked] = useState(false);
  const [LikedArr, setLiked] = useState([]);

  const handleLike = async ( gifId) => {
  
  
    try {
      setLiked(gifId)
      await addDoc(collection(db, 'gifapplication'), { gifId });
    console.log('GIF added to Firestore:', gifId);
      
    } catch (error) {
      console.error('Error adding liked gif:', error);
    }
  };
  const deleteLike = async (gifId) => {
    try {
      await deleteDoc(doc(db, 'gifapplication', gifId));
    } catch (error) {
      alert('Error deleting liked GIF:', error);
    }
  };
  const getLikedGifs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'gifapplication'));
      const likedGifIds = querySnapshot.docs.map((doc) => doc.id);
   setLiked(likedGifIds)
    } catch (error) {
      console.error('Error retrieving liked GIFs:', error);
      return []; 
    }
  };
  

  return (
    <div className='w-[100%]  max-h-max bg-white rounded-xl'>
      
    <div className=" w-full p-4 flex rounded-lg">
    <Search color='white ' size={40} className='p-1' strokeWidth={3} />
    <input 
                      className=" p-2 bg-indigo-900shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
placeholder='Enter Keyword' 
    type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
  <div className="p-1 border-blue-300 mx-2 rounded-md">

    <button className='p-3 border-2 text-xl bg-black rounded-xl text-white my' onClick={fetchGifs}>Search</button>
  </div>
    </div>
   
    <div className='cards p-3 rounded-xl border-8 w-auto text-center columns-3  '>
      {gifs.map((gif) => (<>
      <div className="  border-3 flex flex-col  p-2 ">
        <img
          className="w-50  h-60 object-cover rounded-lg"
        //  className=' h-36 w-50 '
          height={400} width={400} src={gif.images.original.url} alt={gif.title} key={gif.id} />
<div className=' bg-rose-200 justify-between flex'><h1>{gif.title}</h1> <button
            onClick={() => handleLike(gif.id)}
            className=''
       
          >
            {LikedArr.includes(gif.id) ? <HeartOffIcon/>: <Heart/>}</button></div>
      </div>
      
       
      </>
      ))}
    </div>
  </div>
    
   
  );
}

export default SearchGifs;

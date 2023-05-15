import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ShowPage = () => {
    const { id } = useParams();
  const [collectionItem, setCollectionItem] = useState(null);

  useEffect(() => {
    console.log('Idd::', id);
    const fetchCollection = async () => {
      try {
        if(id){
        const response = await axios.get(`https://images-api.nasa.gov/search?nasa_id=${id}`);
        console.log("responseeShowPg::", response); 
        const item = response.data.collection.items[0];
        console.log("item::", item);
        setCollectionItem(item);
        console.log("colectionItem::", collectionItem);
      }} catch (error) {
        console.error(error);
      }
    };
    fetchCollection();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
    {collectionItem ? (
      <div>
        <img src={collectionItem.links[0].href} alt={collectionItem.title} />
        <h2>{collectionItem.data[0].title}</h2>
        <p>{collectionItem.data[0].location}</p>
        <p>{collectionItem.data[0].photographer}</p>
        <p>{collectionItem.data[0].description}</p>
        <p>{collectionItem.data[0].keywords.join(', ')}</p>
        <p>{collectionItem.data[0].date_created}</p>
        <button onClick={() => window.history.back()}>Back</button>
      </div>
    ) : (
        <div>Loading...</div>
    )}
    </div>
    )
};
export default ShowPage;


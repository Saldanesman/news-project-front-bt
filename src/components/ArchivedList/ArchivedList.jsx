import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { NewsCard } from '../NewsCard/NewsCard';

const ArchivedList = () => {

  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios.get('api/new/getnews').then(res => {
      setNewsData(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  //Mapping archived news list in news objects
  const newsArchivedList = newsData.map((news) => {
    const dateExist = news.archivedDate !== null ? true : false;
    return (
      <div>
        {dateExist &&
          <NewsCard news={news}/>
        }
      </div>
    );
  });

  return (
    <div>
      &nbsp;
      <h1 className={"text-center"}><strong> Archived news list </strong></h1>
      &nbsp;
      {newsArchivedList}
    </div>
  )
}

export default ArchivedList
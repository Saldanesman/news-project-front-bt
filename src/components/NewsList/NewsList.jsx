import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { NewsCard } from '../NewsCard/NewsCard';

const NewsList = () => {

  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    axios.get('api/new/getnews').then(res => {
      setNewsData(res.data);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  // Sorted news list
  const sortedNews = newsData.sort((a, b) => b.date - a.date);
  console.log(sortedNews.map(x => x.title + ' ---- ' + x.date));
  //Mapping news list in news objects
  const newsList = sortedNews.map((news) => {
    const dateNotExist = news.archivedDate === null ? true : false;
    return (
      <div>
        {dateNotExist &&
          <NewsCard news={news}/>
        }
      </div>
    );
  });

  return (
      <div>
        &nbsp;
        <h1 className={"text-center"}><strong> News list </strong></h1>
        &nbsp;
        {newsList}
      </div>
  );
};

export default NewsList;
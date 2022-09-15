import axios from 'axios';
import  React, { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Import AOS --> animations
import AOS from 'aos';
import 'aos/dist/aos.css';

// Import for alerts styles
import Swal from 'sweetalert2';


export const NewsCard = ({news}) => {

  // boolean constant to determine the drawing of the buttons
  const inArchivedNews = window.location.href.includes('/archivednews');

  const navigate = useNavigate();

  // Scroll animations
  useEffect(() => {
    AOS.init();
  }, []);

  // Function to archive news
  function archiveNews(news) {

    const currentDate = new Date();

    var archivedNewsForm = {
      title: news.title,
      description: news.description,
      date: news.date,
      content: news.content,
      author: news.author,
      idNews: news.idNews,
      archivedDate: currentDate.toLocaleDateString()
    };

    axios.post('/api/new/archivednews', archivedNewsForm)
    .then(res => {
      Swal.fire('Nice!', 'News successfully added to the ARCHIVED list');
      navigate('/');
    })
    .then(err => {
      console.log(err);
    });

    axios.post('/api/new/deletearchivednews', {idNews: news.idNews}).then( res => {
      navigate(0);
    }).catch(err => {
      console.log(err);
    });
  };

  // Function to delete news
  function deleteNews(idNews) {
    axios.post('/api/new/deletenews', {idNews: idNews}).then( res => {
      navigate(0);
      Swal.fire('Nice!', 'News successfully deleted to the list');
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <div className={'container'}>
      <div className={'row'}>
        <div className={'col-sm-6 offset-3'} data-aos={'fade-up'}>
          <div className={'card'}>
            <div className="card-body">
              <h5 className="card-title"> {news.title} </h5>
              &nbsp;
              &nbsp;
              <h6 className="card-subtitle mb-4 text-muted"> {news.description} </h6>
              <p className="card-text"> {news.content} </p>
              &nbsp;
              <footer className="blockquote-footer"> {news.author} --- <cite title="Source Title"> {news.date} </cite></footer>
              {inArchivedNews &&
                <h6 className="col-sm-6 offset-8 card-subtitle mb-6 text-muted"> Archived Data: {news.archivedDate} </h6>
              }
            </div>
            <div className={'col-sm-5 offset-5'}>
              {!inArchivedNews &&
                <button className={'btn btn-outline-success btn-sm'} onClick={() => archiveNews(news)}> Archive </button>
              }
              &nbsp;
              {inArchivedNews &&
                <button className={'btn btn-outline-danger btn-sm'} onClick={() => {deleteNews(news.idNews)}}> Delete </button>
              }
            </div>
            &nbsp;
          </div>
        </div>
      </div>
      &nbsp;
    </div>
  );
};


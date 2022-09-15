import { React, useState } from 'react';
import uniquid from 'uniqid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Import for alerts styles
import Swal from 'sweetalert2';


const NewsList = () => {

  // Return to home
  const navigate = useNavigate();

  // States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDate = (e) => {
    setDate(e.target.value);
  };

  const onChangecontent = (e) => {
    setContent(e.target.value);
  };

  const onChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };
 
  // Save form
  const addNew = () => {

    const goodForm = title !== "" && description !== "" && date !=="" && content !== "" && author !== "";
    //eslint-disable-next-line
    var regexDate = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    if (goodForm) {
      if (regexDate.test(date)) {
        var newsForm = {
          title: title,
          description: description,
          date: date,
          content: content,
          author: author,
          idNews: uniquid(),
          archivedDate: null
        };
    
        axios.post('/api/new/addnews', newsForm)
        .then(res => {
          Swal.fire('Nice!', 'News successfully added to the list');
          navigate('/');
        })
        .then(err => {
          console.log(err);
        })
      } else {
        Swal.fire('Ouch!', 'Maybe you should put a date with this format: 01/01/2000');
      }
    } else {
      Swal.fire('Ouch!', 'Try again. All fields must be filled');
    }
  };

  return (
    <div className={'container'}>
      <div className={'row'}>
        &nbsp;
        <h1 className="text-center"><strong> Create News </strong></h1>
        &nbsp;
      </div>
      <div className={'row'}>
        <div className={'col-sm-6 offset-3'}>
          <div className={'mb-3'}>
            <label htmlFor={"title"} className={'form-label'}> Title </label>
            <input type={'text'} className={'form-control'} value={title} onChange={onChangeTitle} placeholder={"The title of the news is..."}></input>
          </div>
          <div className={'mb-3'}>
            <label htmlFor={"description"} className={'form-label'}> Description </label>
            <textarea className="form-control" aria-label="With textarea" value={description} onChange={onChangeDescription} placeholder={"The news claims that..."}></textarea>
          </div>
          <div className={'mb-3'}>
            <label htmlFor={"date"} className={'form-label'}> Date </label>
            <input type={'text'} className={'form-control'} value={date} onChange={onChangeDate} placeholder={"MM/DD/YYYY"}></input>
          </div>
          <div className={'mb-3'}>
            <label htmlFor={"content"} className={'form-label'}> Content </label>
            <textarea className="form-control" aria-label="With textarea" value={content} onChange={onChangecontent} placeholder={"We can detail that..."}></textarea>
          </div>
          <div className={'mb-3'}>
            <label htmlFor={"author"} className={'form-label'}> Author </label>
            <input type={'text'} className={'form-control'} value={author} onChange={onChangeAuthor} placeholder={"The author's name is..."}></input>
          </div>
          <button onClick={addNew} className={'btn btn-success'}> Create News </button>
        </div>
      </div>
    </div>
  )
};

export default NewsList;

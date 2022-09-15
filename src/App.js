import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import Components
import NewsList from './components/NewsList/NewsList';
import ArchivedList from './components/ArchivedList/ArchivedList';
import CreateNews from './components/CreateNews/CreateNews';


function App() {
  return (
    <div className={"App"}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <a className="navbar-brand ml-4" href="/"> NewsApp </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/"> Home </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/archivednews"> Archived News </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="createnews"> Add News </a>
            </li>
          </ul>
        </div>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<NewsList />} exact />
          <Route path='/createnews' element={<CreateNews />} exact />
          <Route path='/archivednews' element={<ArchivedList />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

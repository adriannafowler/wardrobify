import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ShoesList from './Shoes'
import ShoeForm from './ShoeForm';
import Nav from './Nav';
import HatsList from './HatsList';
import HatForm from './HatForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="hats">
            <Route index element={<HatsList />} />
            <Route path="new" element={<HatForm />} />
          </Route>
          <Route path="/shoes" element={<ShoesList />} />
          <Route path="/shoes/create" element={<ShoeForm />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;

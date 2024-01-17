import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ShoesList from './Shoes/Shoes'
import ShoeForm from './Shoes/ShoeForm';
import Nav from './Nav';
import HatsList from './Hats/HatsList';
import HatForm from './Hats/HatForm';
import Locations from './Storage Locations/locations_list';
import StorageLocationForm from './Storage Locations/locations_form';
import Scratch from './Storage Locations/scratch';

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
          <Route path="/storage-locations">
            <Route index element={<Locations />} />
            <Route path=":id/" element={<ShoesList  />} />
            <Route path="new/" element={<StorageLocationForm />} />
          </Route>
          <Route path="/item/create" element={<ShoeForm />} />
          <Route path="/scratch/" element={<Scratch  />} />
        </Routes>


      </div>
    </BrowserRouter>
  );
}

export default App;

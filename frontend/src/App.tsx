import { Routes, Route, Navigate } from 'react-router-dom';
import ClientList from './components/ClientList';
import ClientDetails from './components/ClientDetails';
import AddClient from './components/AddClient';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ClientList />} />
      <Route path='/client/new' element={<AddClient />} />
      <Route path='/client/:id' element={<ClientDetails />} />
      <Route path='*' element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;

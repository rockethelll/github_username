import Navbar from './components/Navbar';
import Card from './components/Card';
import { useFetch } from './utils/useFetch';
import SearchBar from './components/SearchBar';
import { useState } from 'react';

function App() {
  const [username, setUsername] = useState<string>('octocat');
  const { data } = useFetch(username);

  return (
    <div className='mx-auto bg-primary text-primary-foreground lg:max-w-3xl'>
      <Navbar />
      <SearchBar username={username} setUsername={setUsername} />
      {data && <Card data={data} />}
    </div>
  );
}

export default App;

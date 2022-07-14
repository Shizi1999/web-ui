import { useEffect, useState } from 'react';
import axiosClient from '~/api/axiosClient';

function HomePage() {
  const [user, setUser] = useState({});
  useEffect(() => {
    axiosClient.get('/user').then((data) => {
      setUser(data);
    });
  });

  return (
    <div>
      <h1>HomePage</h1>
      <div>{user.message}</div>
    </div>
  );
}

export default HomePage;

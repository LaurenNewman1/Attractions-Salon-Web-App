import { useState, useEffect } from 'react';

export default () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const callUsers = async () => {
      const usersRequestFetch = async (role) => (await fetch(`/api/users/roles/${role}`)).json();

      const workers = await usersRequestFetch(1);
      const admin = await usersRequestFetch(2);

      setStaff(workers.concat(admin));
      setLoading(false);
    };

    if (loading) {
      callUsers();
    }
  }, []);

  return [staff, loading];
};

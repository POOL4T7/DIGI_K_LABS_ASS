import React, { useState, useEffect } from 'react';
import Profile from '../components/Profile';
import Spinner from '../components/Spinner';
import axios from 'axios';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const queryString = window.location.search;
  const urlParam = new URLSearchParams(queryString);
  const code = urlParam.get('code');

  const getCode = async () => {
    setLoading(true);
    try {
      if (code && localStorage.getItem('accessToken') === null) {
        let data = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}accesstoken?code=${code}`
        );
        data = data.data;
        data = data.split('=');
        const token = data[1].split('&')[0];
        if (data[0] === 'access_token') {
          localStorage.setItem('accessToken', token);
          window.location.href = '/';
        }
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const fetchProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const headers = { 'user-agent': 'node.js' };
      const data = await axios.get(
        `https://api.github.com/users/${userName}?sort=created:asc`,
        headers
      );
      if (data.status === 200) {
        setUser(data.data);
      } else {
        setUser(null);
        setError(`No account found with username ${userName}`);
      }
    } catch (e) {
      setUser(null);
      console.log(e.message);
      setError(`No account found with username ${userName}`);
    }
    setLoading(false);
  };

  /**
   * @description Garbage data coming in response
   */
  // const fetchProfileUsingToken = async () => {
  //   try {
  //     const token = localStorage.getItem('accessToken');
  //     const config = {
  //       headers: {
  //         'x-auth-token': token,
  //       },
  //     };
  //     const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}getuserdata`, config);
  //     console.log(res);
  //   } catch (e) {
  //     console.log(e.message);
  //     setError('Something went wrong');
  //   }
  // };

  // useEffect(() => {
  //   if (localStorage.getItem('accessToken')) {
  //     fetchProfileUsingToken();
  //   }
  // }, []);

  return (
    <>
      <div className='container mt-5'>
        <div className=' row justify-content-md-center'>
          <div className='col col-xs-12 col-md-6' xs={12} md={6}>
            <h3>Get Repositries of the Github User</h3>
            <form className='form my-1'>
              <div className='form-floating'>
                <input
                  type='text'
                  className='form-control'
                  id='username'
                  placeholder='Password'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor='username'>Username</label>
              </div>
              <button
                className='mt-3 btn btn-outline-success'
                type='submit'
                onClick={fetchProfile}
              >
                Fetch Profile
              </button>
            </form>
          </div>
        </div>
        {error && <h3 className='text-center mt-3'>{error}</h3>}
        {loading ? <Spinner /> : user && <Profile uprofile={user} />}
      </div>
    </>
  );
};

export default Home;

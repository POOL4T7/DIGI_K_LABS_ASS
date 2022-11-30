import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import Card from './Card';

const Profile = ({ uprofile }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);
  const [dummy, setDummy] = useState([]);

  const filterRepo = async (e) => {
    const value = e.target.value.toLowerCase();
    try {
      if (value) {
        const data = repos.filter((repo) => {
          const name = repo.name.toLowerCase();
          const language = repo.language ? repo.language.toLowerCase() : '';
          return name.includes(value) || language.includes(value);
        });
        setDummy(data);
      } else {
        fetchRepo(e);
      }
    } catch (e) {
      console.log(e.message);
      setError(e.message);
    }
  };

  const fetchRepo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const headers = { 'user-agent': 'node.js' };
      const data = await axios.get(
        `https://api.github.com/users/${uprofile.login}/repos`,
        headers
      );
      if (data.status === 200) {
        setRepos(data.data);
        setDummy(data.data);
        if (data.data.length === 0) {
          setError(`No Repo found for ${uprofile.login}`);
        }
      } else {
        setError(`No account found with username ${uprofile.login}`);
      }
    } catch (e) {
      console.log(e.message);
      setError(`No account found with username ${uprofile.login}`);
    }
    setLoading(false);
  };

  return (
    <div className='p-5'>
      <div className='card mb-3'>
        <div className='row g-0'>
          <div className='col-md-4'>
            <img
              src={uprofile.avatar_url}
              className='img-fluid rounded-start'
              alt='user profile'
            />
          </div>
          <div className='col-md-8'>
            <div className='card-body'>
              <h5 className='card-title'>
                <a
                  href={uprofile.html_url}
                  target='_blank'
                  rel='noreferrer'
                  style={{ textDecoration: 'none', color: 'red' }}
                >
                  {uprofile.login}
                </a>
                <span className='text-color-blue'>
                  {' :: ' + uprofile.name}
                </span>
              </h5>
              <p className='card-text'>{uprofile.bio}</p>
              <p className='card-text'>
                <strong>Type: </strong> {uprofile.type}
              </p>
              <p className='card-text'>
                <strong>Email: </strong> {uprofile.email}
              </p>

              <ul>
                <li className='badge bg-primary m-1'>
                  Followers: {uprofile.followers || 0}
                </li>
                <li className='badge bg-dark m-1'>
                  Following: {uprofile.following || 0}
                </li>
              </ul>
              <button className='btn btn-outline-success' onClick={fetchRepo}>
                Fetch Repo
              </button>
            </div>
          </div>
        </div>
      </div>
      {error && <h3 className='text-center mt-5'>{error}</h3>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {repos.length > 0 && (
            <>
              <h4 className='text-center p-3'>Total Repo: {repos.length}</h4>
              <div className='input-group mb-3'>
                <span
                  className='input-group-text'
                  id='inputGroup-sizing-default'
                >
                  Search
                </span>
                <input
                  type='text'
                  className='form-control'
                  aria-label='Sizing example input'
                  aria-describedby='inputGroup-sizing-default'
                  onChange={filterRepo}
                  placeholder='Search by name or language'
                />
              </div>
            </>
          )}
          {dummy.map((repo, id) => (
            <Card key={id} repo={repo} />
          ))}
        </>
      )}
    </div>
  );
};

export default Profile;

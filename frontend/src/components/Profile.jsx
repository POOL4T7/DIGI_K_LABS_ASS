import React, { useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import Card from './Card';

const Profile = ({ uprofile }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [repos, setRepos] = useState([]);

  const fetchRepo = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const headers = { 'user-agent': 'node.js' };
      const data = await axios.get(
        `https://api.github.com/users/${uprofile.login}/repos?sort=created:asc`,
        headers
      );
      if (data.status === 200) {
        setRepos(data.data);
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
                  style={{ textDecoration: 'none', color: 'blue' }}
                >
                  {uprofile.login}
                </a>
              </h5>
              <h5 className='card-title'>{uprofile.name}</h5>
              <p className='card-text'>{uprofile.bio}</p>

              <ul>
                <li className='badge bg-primary m-1'>
                  <a
                    href={uprofile.followers_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Followers: {uprofile.followers || 0}
                  </a>
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
      {error && <h3>{error}</h3>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {repos.length > 0 && (
            <h4 className='text-center p-3'>Total Repo: {repos.length}</h4>
          )}
          {repos.map((repo, id) => (
            <Card key={id} repo={repo} />
          ))}
        </>
      )}
    </div>
  );
};

export default Profile;

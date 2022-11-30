import React from 'react';

const Navbar = () => {
  const logout = () => {
    localStorage.removeItem('accessToken');
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            DIGI-K-LABS
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>{/*  */}</ul>
            <form className='d-flex'>
              {localStorage.getItem('accessToken')? (
                <button className='btn btn-outline-danger' onClick={logout}>
                  Logout
                </button>
              ) : (
                <a
                  href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&allow_signup=true`}
                  className='btn btn-outline-success'
                >
                  Login
                </a>
              )}
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

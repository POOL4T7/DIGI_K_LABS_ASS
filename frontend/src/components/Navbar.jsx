import React from 'react';

const Navbar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            DIGI-K
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
              <a
                href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&scope=user&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`}
                className='btn btn-outline-success'
                type='submit'
              >
                Search
              </a>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

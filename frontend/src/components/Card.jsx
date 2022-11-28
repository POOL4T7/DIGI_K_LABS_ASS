const Card = ({ repo }) => {
  return (
    <>
      <div className='row border rounded  m-1'>
        <div className='col-sm-12 col-md-9 p-2'>
          <a
            href={repo.html_url}
            target='_blank'
            rel='noreferrer'
            className='card-title'
            style={{ textDecoration: 'none', color: 'blue' }}
          >
            <h4>{repo.name}</h4>
          </a>
          {repo.description && (
            <p className='card-text'>
              <em>{repo.description}</em>
            </p>
          )}
          {repo.language && (
            <p className='card-text'>
              <strong>Language</strong>: {repo.language}
            </p>
          )}
          {repo.topics.length > 0 && (
            <p className='card-text'>
              <strong>Topics</strong>:{' '}
              {repo.topics.map((topic) => (
                <span className='card-text'>{topic + ', '}</span>
              ))}
            </p>
          )}
        </div>
        <div className='col-sm-12 col-md-3 p-2'>
          <p className='card-text badge bg-warning text-dark m-1'>
            Stars: {repo.stargazers_count || 0}
          </p>
          <p className='card-text badge bg-primary m-1'>
            Watchers: {repo.watchers_count || 0}
          </p>
          <p className='card-text badge bg-success m-1'>
            Forks: {repo.forks_count || 0}
          </p>
        </div>
      </div>
    </>
  );
};

export default Card;

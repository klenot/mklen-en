export default function OnePageFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className='page-footer' id='contact'>
      <div className='arch-container'>
        <div className='arch-grid'>
          <div className='nav-row'>
            <a href='https://www.linkedin.com/' target='_blank' rel='noreferrer'>
              LinkedIn
            </a>
            <a href='https://mklenotic.com' target='_blank' rel='noreferrer'>
              Website
            </a>
            <a href='mailto:mklen@mklenotic.cz'>Email</a>
          </div>
          <div className='nav-row'>
            <span className='muted'>© {year} Marek Klenotic</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

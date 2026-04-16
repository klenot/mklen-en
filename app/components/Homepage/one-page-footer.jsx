export default function OnePageFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bento-footer" id="footer">
      <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a href="https://mklenotic.com" target="_blank" rel="noreferrer">
        Website
      </a>
      <a href="mailto:mklen@mklenotic.cz">Email</a>
      <span className="muted">&copy; {year} Marek Klenotic</span>
    </footer>
  );
}

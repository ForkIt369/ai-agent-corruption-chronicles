import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-copyright">
          &copy; {new Date().getFullYear()} AI Agent Corruption Chronicles
        </div>
        <div className="footer-links">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            <FaGithub className="footer-icon" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

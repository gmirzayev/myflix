import './Footer.css';

const Footer = () => {
    return (
        <div className="footer-wrapper">
            <div className="footer">
                <p className="footer-top">
                    Questions?
                </p>
                <ul className="footer-links">
                    <li className="footer-link-item"><a href="https://www.linkedin.com/in/gleb-mirzayev-63990a86/" target="_blank">Github</a></li>
                    <li className="footer-link-item"><a href="https://github.com/gmirzayev" target="_blank">Linkedin</a></li>
                    <li className="footer-link-item">React</li>
                    <li className="footer-link-item">Ruby on Rails</li>
                    <li className="footer-link-item">PostgreSQL</li>
                    <li className="footer-link-item">Javascript</li>
                    <li className="footer-link-item">CSS</li>
                    <li className="footer-link-item">HTML</li>
                </ul>
            </div>
        </div>
    )
}

export default Footer;
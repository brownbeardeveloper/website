import React from "react";
import '../styles/Footer.css';

export default function Footer() {
    return (
        <footer className="footer-container">
            <div className="footer-content">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h2>Our Associations</h2>
                        <p>Learn more about our member organizations:</p>
                        <ul>
                            <li>Örebro Deaf Association</li>
                            <li>Nerike Sports Association</li>
                            <li>Örebro Deaf Seniors Association</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h2>Contact Us</h2>
                        <p>Have questions? Reach out to us:</p>
                        <ul>
                            <li>Email: info@example.com</li>
                            <li>Phone: +1234567890</li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h2>Quick Links</h2>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/activities">Activities</a></li>
                            <li><a href="/events">Events</a></li>
                            <li><a href="/login">Login</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} Örebro Deaf Association</p>
            </div>
        </footer>
    );
}

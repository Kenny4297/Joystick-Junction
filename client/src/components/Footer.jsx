import React from "react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer>
            <section className="footer-information-section">
                <div>
                    <h3>Joystick Junction</h3>
                    <p>Discuss and share your favorite games, strategies, and experiences with others!</p>
                </div>
                <div>
                    <h3>Contact Us</h3>
                    <p>Email: geckob4i@gmail.com</p>
                    {/* <p>Phone: (123) 456-7890</p> */}
                </div>
            </section>

            <section className="footer-legal-section">
                <p>© {year} Gaming Forum. All Rights Reserved.</p>
                <p>Privacy Policy | Terms of Service</p>
            </section>
        </footer>
    );
};

export default Footer;

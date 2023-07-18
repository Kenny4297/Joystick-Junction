import React from 'react';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer style={{backgroundColor: '#101010', color: '#fff', padding: '3rem', position: 'relative', bottom: '0', width: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div>
                    <h3>Gaming Forum</h3>
                    <p>Discuss and share your favorite games, strategies, and experiences with others!</p>
                </div>
                <div>
                    <h3>Contact Us</h3>
                    <p>Email: geckob4i@gmail.com</p>
                    {/* <p>Phone: (123) 456-7890</p> */}
                </div>
            </div>
            <div style={{marginTop: '20px', borderTop: '1px solid #fff', paddingTop: '20px', textAlign: 'center'}}>
                <p>© {year} Gaming Forum. All Rights Reserved.</p>
                <p>Privacy Policy | Terms of Service</p>
            </div>
        </footer>
    );
};

export default Footer;

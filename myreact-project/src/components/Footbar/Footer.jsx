import React from 'react';
import styles from './Footer.module.css';
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa';

const Footer = () => {
    return (

  
        <footer className = {styles.footer}>
            
            <ul className={styles.social_list}>
                {/* <li>
                    <FaFacebook /> 
                </li>
                <li>
                    <FaInstagram /> 
                </li>
                <li>
                    <FaLinkedin /> 
                </li> */}
            </ul>
            <p className={styles.copy_right}>
                <span>Costs</span> & copy; 2025
            </p>


            <p>Developed by Mariah.       Find this source on {""}
                <a href="https://github.com/Mah30/react-project-frontend" target='_blank'>
                    
                        GitHub! 

                </a>
            </p>    
            
        </footer>

    );
};


export default Footer;
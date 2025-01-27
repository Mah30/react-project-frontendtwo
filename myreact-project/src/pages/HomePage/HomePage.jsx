import styles from '../HomePage/HomePage';
/* import Carousel from 'react-material-ui-carousel'; */
/* import img1 from '../../assets/images/img1.jpg';
import img2 from '../../assets/images/img2.jpg';
import img3 from '../../assets/images/img3.jpg';
import img4 from '../../assets/images/img4.jpg';
import img5 from '../../assets/images/img5.jpg'; */
/* import SearchBar from '../../components/SearchBar';
import CoursePage from '../CoursePage/CoursePage';
import Space from '../../components/Space';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; */

import Button from '@mui/material/Button';
/* import Box from '@mui/material/Box'; */
import { Link } from 'react-router-dom';




const HomePage = () => {

    return ( 
        
        <div>

          {/*   <SearchBar/> */}
            
           {/*  <Carousel
             NextIcon = {<ChevronRightIcon />}
             PrevIcon = {<ChevronLeftIcon />}
         
            navButtonsAlwaysVisible 
            animation="slide" 
            navButtonsProps={{
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '50%',
                    height: '40px',
                    width: '40px', 
                },
            }}
            navButtonsWrapperProps={{
                style: {
                position: 'absolute',
                bottom: '-10px', 
                left: '20%' ,
            
                transform: 'translateX(20%)', 
                display: 'flex', 
                justifyContent: 'center', 
                gap: '5px',
                 },
            }}
            >
                
            <div style={{ 
                backgroundImage: `url(${img1})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                height: "300px", 
                width: "100vw" 
                }}
                ></div>
            <div style={{ 
                backgroundImage: `url(${img2})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                height: "300px", 
                width: "100vw" 
                }}
                ></div>
            <div style={{ 
                backgroundImage: `url(${img3})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                height: "300px", 
                width: "100vw" 
                }}
                ></div>
            <div style={{ 
                backgroundImage: `url(${img4})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                height: "300px", 
                width: "100vw" 
                }}
                ></div>
            <div style={{ 
                backgroundImage: `url(${img5})`, 
                backgroundSize: "cover", 
                backgroundPosition: "center", 
                height: "300px", 
                width: "100vw" 
                }}
                ></div>

            </Carousel> 
 */}
           {/*  <Space /> */}



            <h1 className= {styles.title}>The best FitnessStudio platform for you! </h1>


           {/*  <CoursePage isHomepage={true} /> */}

             <div>  
              <Button className={styles.btnposition}
              color="primary"
              variant="contained"
            
              sx={{
              position: 'relative',
              alignSelf: 'flex-end', 
              margin: '16px 0', 
              width: 'auto', 
              padding: '8px 16px',
              backgroundColor: '#1976d2',
              color: 'white',
              borderRadius: '6px',
              boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
              '@media (max-width: 768px)': {
                display: 'block', 
                margin: '0 auto', 
              },
              '&:hover': {
                backgroundColor: '#bc3908',
              },
            }}
            component={Link}
            to="/coursepage"
          >
            Click for more
            </Button>
          </div> 
          
        </div>
        
     );
}
 
export default HomePage;
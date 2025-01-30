import { Button } from "flowbite-react";
import { Link } from "react-router-dom";



const NotFoundPage = () => {
    return (   
        <div>
            <h1>
                NotFoundPage
            </h1>

            <Link to="/">
                <Button color="blue">Back to Home</Button>
            </Link>  
            
        </div>
     );




}
 export default NotFoundPage;
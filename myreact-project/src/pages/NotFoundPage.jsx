import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import notfoundimage from "../../src/assets/images/notfoundimage.jpg";



const NotFoundPage = () => {
   

    


    return ( 

        <div >
           
        
            <div style={{ textAlign: "center", marginTop: "10px" }}>
                <h1 className="text-4xl font-bold text-[#16425b] mb-4">404 Not Found</h1>
                <h3 
                className="text-lg text-[#16425b] mb-6">Sorry, the page you're looking for doesn't exist.</h3>
                
                <div className="w-full flex justify-center">
        <img
          src={notfoundimage}
          alt="Not Found"
          className="w-2/3 md:w-1/2 lg:w-1/3 h-auto rounded-lg shadow-md"
        />
            </div>

            </div>

                <div className="w-full flex justify-center">

                <Link to ="/" style = {{color:"blue", textDecoration: "underline"}}>

                    <Button
                    className="w-full flex justify-center"
                    >
                    Back to Homepage
                    </Button>
                </Link>

            </div>
                
            
        </div>
     );
}
 export default NotFoundPage;
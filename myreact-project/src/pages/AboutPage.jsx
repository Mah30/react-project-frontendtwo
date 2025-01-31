import Space from '../components/Space';
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return ( 
        <div>
            <h1 className="text-3xl font-bold text-[#16425b] mb-4">
                About This Project
            </h1>
            <Space />
            <p>
            This project was built as a practice exercise to improve my skills in modern web development. It serves as a learning experience in both frontend and backend technologies, focusing on building a full-stack application.
            </p>
            <Space />
            <h2 className="text-2xl font-bold text-[#16425b] mb-4">
            Tech Stack:
            </h2>
            <Space />
            <p>🔹 Frontend: React (Hooks), React Router, CSS frameworks/libraries</p>
            <p>🔹 Backend: Node.js, Express, MongoDB, JWT Tokens</p>
            <Space />
            <p>
            The main goal of this project is to explore best practices in component-based development, state management, routing, authentication, and database integration.
            </p>

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
 
export default AboutPage;

import { Footer } from "flowbite-react";
import { NavLink } from "react-router-dom";

const MyFooter = () => {
    return (
        <Footer id="footer" className="" style={{ marginTop: '0px' }}>
      <Footer.Copyright by="FitnessStudio™" year={2025} className="p-4" />
      <Footer.LinkGroup className="pr-4">
        <NavLink to="/about" className="p-4">About</NavLink>
        <NavLink to="/about"className="p-4">Privacy Policy</NavLink>
        <NavLink to="https://github.com/Mah30" className="p-4">Github</NavLink>
        <NavLink to="https://www.linkedin.com/in/alinemariah-webdeveloper/" className="p-4">Contact</NavLink>
      </Footer.LinkGroup>
    </Footer>
    );
};


export default MyFooter;
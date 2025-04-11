import { Link } from "react-router-dom";
import profilePic from '../assets/images/MariahLinkedin.png'; 

const AboutPage = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold text-[#16425b] mb-6">About This Project</h1>

      <p className="mb-4">
        This app was created as a hands-on learning project to help me grow as a full stack developer. 
        It brings together everything I’ve been studying — from React components and state management to backend authentication and database logic.
      </p>

      <p className="mb-4">
        While developing this project, I focused on writing clean, modular code and applying best practices in modern web development.
      </p>

      <h2 className="text-2xl font-bold text-[#16425b] mt-8 mb-4">⚙️ Tech Stack</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Frontend:</strong> React (Hooks), React Router, Tailwind CSS</li>
        <li><strong>Backend:</strong> Node.js, Express, PostgreSQL, Prisma, JWT Tokens</li>
      </ul>

      <h2 className="text-2xl font-bold text-[#16425b] mt-8 mb-4">👩‍💻 About Me</h2>

      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src={profilePic}
          alt="Mariah's Avatar"
          className="w-28 h-28 rounded-full shadow-md object-cover -mt-80"
        />
        <div>
          <p className="mb-2">
            I&apos;m Mariah, a Brazilian designer and full stack web development junior based in Berlin.
            I&apos;m passionate about creating digital experiences that are both beautiful and functional.
          </p>
          <p className="mb-2">
            My background in Design and Education helps me approach tech projects with empathy,
            structure, and creativity. I&apos;m currently focused on JavaScript, React, TypeScript, and backend logic with NodeJS, Express, Prisma, Mongoose, PostgreSQL.
          </p>
          
          <h2 className="text-2xl font-bold text-[#16425b] mt-8 mb-4">⚙️ Tech Stack</h2>
            <ul className="list-disc list-inside mb-4">
                <li><strong>Frontend:</strong> React (Hooks), React Router, Tailwind CSS</li>
                <li><strong>Backend:</strong> Node.js, Express, TypeScript</li>
                <li><strong>Database:</strong> PostgreSQL with Prisma ORM, MongoDB (planned)</li>
                <li><strong>Auth & Security:</strong> JWT, Bcrypt, custom middleware</li>
                <li><strong>Dev Tools:</strong> Nodemon, Git & GitHub, ts-node</li>
            </ul>

            <div className="mt-6">
  <p className="mb-2">Connect with me on:</p>
  <div className="flex flex-wrap gap-4">
    <a
      href="https://www.linkedin.com/in/mariahgraumann-fullstackwebdeveloper/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-blue-800"
    >
      LinkedIn
    </a>
    <a
      href="https://github.com/Mah30"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-lg bg-gray-800 px-5 py-2 text-sm font-medium text-white shadow-md transition-all duration-300 hover:bg-gray-700"
    >
      GitHub
    </a>
  </div>
</div>

          
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Link to="/" className="block text-center text-sm text-blue-600 hover:underline mt-6">
          ⬅ Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AboutPage;

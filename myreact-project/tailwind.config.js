import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */

/* const flowbite = require("flowbite-react/tailwind");  */

export default {
    content: [
      "./index.html", // Inclua os caminhos dos seus arquivos HTML ou React
      "./src/**/*.{js,ts,jsx,tsx}", // Inclua todos os arquivos relevantes
      ...flowbite.content(),
    ],
    theme: {
      extend: {},
    },
    plugins: [ 
        flowbite.plugin(),

    ],
    
  };
  
  

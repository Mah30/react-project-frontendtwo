Hello, 

This project is solely intended for study practice, developed by me during my Web Developer course at Ironhack Berlin. All copyright rights of the images used in this project are reserved to their respective owners.

The images are used exclusively for study purposes. Reproduction and/or commercialization of these images without authorization is strictly prohibited.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## Backend (/backend)


/backend
├── config/
│   ├── index.js            # Middleware configuration
├── db/
│   ├── index.js            # MongoDB connection
├── middlewares/
│   ├── route-guard.middleware.js  # JWT authentication middleware
├── models/
│   ├── Student.model.js    # Student model
│   ├── Class.model.js      # Class model
│   ├── Booking.model.js    # Booking model
├── routes/
│   ├── auth.routes.js      # Authentication routes (Signup, Login, Verify)
│   ├── students.routes.js  # Student-related routes
│   ├── classes.routes.js   # Class-related routes
│   ├── bookings.routes.js  # Booking routes
│   ├── index.routes.js     # Main route file
├── error-handling/
│   ├── index.js            # Error handling middleware
├── server.js               # Server entry point
├── app.js                  # Express setup
├── .env                    # Environment variables




## Frontend (/frontend)

/frontend
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Booking.jsx       # Booking component
│   │   ├── DeleteBooking.jsx # Booking deletion component
│   ├── pages/
│   │   ├── HomePage.jsx      # Homepage
│   │   ├── SignupPage.jsx    # Signup page
│   │   ├── LoginPage.jsx     # Login page
│   │   ├── MyClasses.jsx     # User's booked classes
│   ├── context/
│   │   ├── AuthContext.jsx   # Authentication management (Context API)
│   ├── App.jsx               # React Router setup
│   ├── main.jsx              # React main entry file
├── .env                      # Environment variables (VITE_API_URL)



# How to Run the Project

1️⃣ Backend Setup
Install dependencies:
cd backend
npm install
Start the server:
npm run dev

2️⃣ Frontend Setup
Install dependencies:
cd frontend
npm install
Start the React app:
npm run dev


# 🛠️ Features

🟢 Authentication
✅ Signup (POST /auth/signup) → Students can create an account.
✅ Login (POST /auth/login) → User authentication.
✅ Verify (GET /auth/verify) → Keeps users logged in across sessions.
📚 Class Management
✅ List all classes (GET /classes) → Available for all users.
✅ View class details (GET /classes/:classId).
📌 Booking System
✅ Book a class (POST /bookings) → Only authenticated students.
✅ List all bookings (GET /bookings) → Admins can see all bookings.
✅ List student’s bookings (GET /bookings/student) → Only authenticated students.
✅ Cancel a booking (DELETE /bookings/:bookingId).
🔒 Business Rules
❌ Prevents students from booking the same class multiple times.
❌ Prevents students from booking classes that overlap in schedule.
🔍 API Endpoints

🔹 Authentication
Method	Route	Description
POST	/auth/signup	Student registration
POST	/auth/login	Student login
GET	/auth/verify	Verifies authentication

🔹 Classes
Method	Route	Description
GET	/api/classes	Lists all classes
GET	/api/classes/:classId	Gets details of a specific class

🔹 Bookings
Method	Route	Description
POST	/api/bookings	Creates a booking
GET	/api/bookings	Lists all bookings
GET	/api/bookings/student	Lists bookings for the authenticated student
DELETE	/api/bookings/:bookingId	Cancels a booking


📜 Important Notes

✅ Authenticated requests → Protected routes require a Bearer Token stored in localStorage.

✅ Single booking per class → The backend prevents students from booking the same class twice.

✅ Schedule conflicts → The backend prevents students from booking classes that overlap in time.

💡 Future Improvements

📌 Admin panel for managing students and classes.
📌 Payment integration via Stripe.
📌 Advanced filtering for class schedules and availability.



Fork the repository
Create a branch (git checkout -b my-feature)
Commit your changes (git commit -m "Add feature")
Push to the remote branch (git push origin my-feature)
Open a Pull Request 🎉

Thank you 
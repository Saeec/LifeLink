<p align="center">
  <img src="https-i-imgur-com-your-logo-image-png.png" alt="LifeLink Logo" width="120">
</p>

<h1 align="center">🩸 LifeLink Blood Bank</h1>

<p align="center">
  A full-stack MERN-like (MySQL, Express, React, Node) application designed to bridge the critical gap between blood donors, patients, and hospitals.
  <br />
  <br />
  <a href="#about-the-project"><strong>Explore the docs »</strong></a>
  <br />
  <br />
  <a href="#screenshots">View Demo</a>
  ·
  <a href="#bug-report">Report Bug</a>
  ·
  <a href="#request-feature">Request Feature</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1?logo=mysql&logoColor=white" alt="MySQL">
</p>

---

<a name="screenshots"></a>
## 📸 Application Screenshots

*<img width="1839" height="865" alt="image" src="https://github.com/user-attachments/assets/e697a289-95b2-4be8-8309-08f13cce003b" />
*

![LifeLink App Demo](https-i-imgur-com-your-app-screenshot-gif.gif)

---

<a name="about-the-project"></a>
## 🚀 About The Project

LifeLink is a digital platform designed to solve the urgent and persistent problem of blood shortages. It connects generous, voluntary donors with patients in need and provides hospitals with a powerful tool to manage their blood inventory and streamline the request process.

This application features two distinct portals:
* A **User Portal** for donors and patients to register, pledge donations, and submit/track urgent blood requests.
* A **Hospital Admin Portal** for hospital staff to register their facility, manage their live blood inventory (with capacity checks), and respond to the public pool of requests and donor pledges.

This system creates a transparent, real-time, and efficient life-saving network for an entire community.

---

<a name="built-with"></a>
## 🛠️ Built With

This project is built with a modern, full-stack architecture.

* **Frontend:**
    ![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
    ![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white&style=for-the-badge)
    ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white&style=for-the-badge)
* **Backend:**
    ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
    ![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge)
    ![MySQL2](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white&style=for-the-badge)
* **Authentication:**
    ![JWT](https://img.shields.io/badge/JSON_Web_Tokens-000000?logo=jsonwebtokens&logoColor=white&style=for-the-badge)
    ![bcrypt.js](https://img.shields.io/badge/bcrypt-62438C?logo=bcrypt&logoColor=white&style=for-the-badge)

---

<a name="features"></a>
## ✨ Key Features

### 👤 User & Public Features
* **User Authentication:** Secure registration and login for donors/patients.
* **Personalized Dashboard:** View the status of your blood requests (Pending, Approved, Rejected) and your history of donation pledges.
* **Submit Blood Requests:** A dedicated form to submit urgent blood requests linked to your profile.
* **Pledge to Donate:** A form to register as a potential donor.
* **Find Hospitals:** A public, searchable list of all partner hospitals.
* **Aesthetic UI:** A clean, modern interface with a combined About/FAQ page.

### 🏥 Hospital Admin Features
* **Hospital Authentication:** Separate, secure registration and login for hospital facilities.
* **Admin Dashboard:** A central hub showing key stats:
    * Pending requests you have claimed.
    * The public pool of unclaimed requests.
    * The public pool of donor pledges.
* **Stock Management:**
    * Add/update blood inventory by blood type.
    * **Capacity Check:** Prevents a hospital from adding stock beyond its registered capacity.
* **Request Management:**
    * View all *unclaimed* public requests and "Claim" them.
    * View all *your* claimed requests and "Approve" or "Reject" them.
    * Approved/Rejected status is reflected on the User's dashboard.
* **Donor Management:**
    * View all public donor pledges and "Accept" them to coordinate a donation.

---

<a name="getting-started"></a>
## ⚙️ Getting Started

Follow these instructions to get a local copy of the project up and running.

### 1. Prerequisites

Make sure you have the following installed on your machine:
* [Node.js](https://nodejs.org/en/)
* [npm](https://www.npmjs.com/)
* [MySQL Server](https://www.mysql.com/products/workbench/) (and a client like MySQL Workbench)

### 2. Database Setup

1.  Open your MySQL client.
2.  Run the entire `database_setup.sql` script provided in the repository. This will create the `bloodybank` database, all tables, and insert sample data.

### 3. Backend Setup

1.  Navigate to the backend folder:
    ```bash
    cd lifelink/backend
    ```
2.  Install NPM packages:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` folder and add your environment variables:
    ```env
    # Server Configuration
    PORT=5000

    # MySQL Database Configuration
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=your_mysql_password
    DB_NAME=bloodybank

    # JWT Secret Key
    JWT_SECRET=your_super_secret_key_12345
    ```
4.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server will be running on `http://localhost:5000`.

### 4. Frontend Setup

1.  Open a **new terminal** and navigate to the frontend folder:
    ```bash
    cd lifelink/frontend
    ```
2.  Install NPM packages:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm start
    ```
    The application will open automatically on `http://localhost:3000`.

---
<a name="bug-report"></a>
<a name="request-feature"></a>
## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

<a name="license"></a>
## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

<a name="contact"></a>
## 📬 Contact

**Saee Chavan** - **SaeeC** 

Project Link: [https://github.com/Saeec/LifeLink](https://github.com/Saeec/LifeLink)

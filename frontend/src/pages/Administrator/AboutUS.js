import React from "react";
import AdminLayout from "../../components/AdminLayout"; // Use the AdminLayout for structure
import AdminSidebar from "../../components/AdminSidebar"; // Sidebar for navigation
import "./abt.css"; // Page-specific styles

const AboutUs = () => {
  return (
    <AdminLayout>
      <div className="admin-dashboard-containerq">
        {/* Sidebar for navigation */}
        

        {/* Main content */}
        <div className="admin-contentw"> {/* Restoring the admin-content class */}
          <div className="about-us-box">
            <h1>...
              ...
            </h1>
            <h1>About Us</h1>

            <h2>Our Mission</h2>
            <p>
              We aim to provide efficient, automated solutions for HR and payroll management to streamline business operations and make employee management seamless.
            </p>

            <h2>Who We Are</h2>
            <p>
              We are a team of passionate professionals committed to leveraging technology to enhance business productivity and employee satisfaction. With years of expertise in HR solutions, we aim to build better workplaces for the future.
            </p>

            <h2>Core Values</h2>
            <ul>
              <li>Innovation: We continuously improve our solutions to meet the evolving needs of businesses.</li>
              <li>Integrity: We value transparency, honesty, and ethical practices in all our endeavors.</li>
              <li>Customer-Centric: Our solutions are designed to provide the best user experience and meet customer expectations.</li>
              <li>Collaboration: We believe in fostering strong partnerships both within our team and with our clients.</li>
            </ul>

            <h2>Contact Us</h2>
            <p>If you'd like to know more about our services, feel free to get in touch with us. We are here to help!</p>
            <p>Email: contact@company.com</p>
            <p>Phone: (123) 456-7890</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AboutUs;

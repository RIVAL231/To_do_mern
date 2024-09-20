import React, { useEffect, useState, useRef } from 'react';
import { CheckCircle, ListTodo, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const targetScrollY = useRef(0);
  const rafId = useRef(null);

  const lerp = (start, end, factor) => {
    return start * (1 - factor) + end * factor;
  };

  const smoothScroll = () => {
    setScrollY(prevScrollY => lerp(prevScrollY, targetScrollY.current, 0.1));
    rafId.current = requestAnimationFrame(smoothScroll);
  };

  useEffect(() => {
    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    rafId.current = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div className="landing-page">
      <header>
        <div className="logo">
          <ListTodo />
          <span>TaskMaster</span>
        </div>
        <nav>
          <Link to="/login"><button className="login-btn">Login</button></Link>
          <Link to="/register"><button className="signup-btn">Sign Up</button></Link>
        </nav>
      </header>

      <main>
        <section className="hero" style={{ backgroundPositionY: `${scrollY * 0.5}px` }}>
          <div className="hero-content">
            <h1>Organize Your Life with TaskMaster</h1>
            <p>The simple, intuitive to-do list app that helps you stay on top of your tasks and boost your productivity.</p>
            <div className="cta-buttons">
              <button className="get-started-btn">Get Started</button>
              <button className="learn-more-btn">Learn More</button>
            </div>
          </div>
        </section>

        <section className="features">
          <h2>Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <CheckCircle />
              <h3>Easy Task Management</h3>
              <p>Create, edit, and complete tasks with just a few clicks.</p>
            </div>
            <div className="feature-card">
              <Bell />
              <h3>Smart Reminders</h3>
              <p>Never miss a deadline with our intelligent notification system.</p>
            </div>
            <div className="feature-card">
              <ListTodo />
              <h3>Customizable Lists</h3>
              <p>Organize your tasks into personalized lists and categories.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <p>&copy; 2024 TaskMaster. All rights reserved.</p>
        <nav>
          <a href="#">Terms of Service</a>
          <a href="#">Privacy</a>
        </nav>
      </footer>

      <style jsx>{`
        .landing-page {
          font-family: 'Kanit', sans-serif;
          color: #333;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        header {
          background-color: rgba(255, 255, 255, 0.9);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

        .logo {
          display: flex;
          align-items: center;
          font-size: 1.5rem;
          font-weight: bold;
          color: #7c3aed;
        }

        .logo svg {
          margin-right: 0.5rem;
        }

        nav button {
          margin-left: 1rem;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-btn {
          background-color: transparent;
          color: #7c3aed;
        }

        .login-btn:hover {
          background-color: #f3e8ff;
        }

        .signup-btn {
          background-color: #7c3aed;
          color: white;
        }

        .signup-btn:hover {
          background-color: #6d28d9;
        }

        main {
          flex: 1;
          margin-top: 60px;
        }

        .hero {
          background-image: url('https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=2560&q=80');
          background-size: cover;
          background-position: center;
          color: white;
          text-align: center;
          padding: 8rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(124, 58, 237, 0.7);
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .hero p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto 2rem;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }

        .cta-buttons button {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 0 0.5rem;
        }

        .get-started-btn {
          background-color: white;
          color: #7c3aed;
        }

        .get-started-btn:hover {
          background-color: #f3e8ff;
          transform: translateY(-2px);
        }

        .learn-more-btn {
          background-color: transparent;
          color: white;
          border: 2px solid white;
        }

        .learn-more-btn:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .features {
          padding: 4rem 2rem;
          background-color: #f9fafb;
        }

        .features h2 {
          text-align: center;
          font-size: 2.5rem;
          color: #7c3aed;
          margin-bottom: 2rem;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .feature-card {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .feature-card svg {
          color: #7c3aed;
          width: 48px;
          height: 48px;
          margin-bottom: 1rem;
        }

        .feature-card h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: #4b5563;
        }

        .feature-card p {
          color: #6b7280;
        }

        footer {
          background-color: #f3e8ff;
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        footer p {
          font-size: 0.9rem;
          color: #4b5563;
        }

        footer nav a {
          color: #7c3aed;
          text-decoration: none;
          margin-left: 1rem;
          font-size: 0.9rem;
          transition: color 0.3s ease;
        }

        footer nav a:hover {
          color: #6d28d9;
        }

        @media (max-width: 768px) {
          .hero h1 {
            font-size: 2rem;
          }

          .hero p {
            font-size: 1rem;
          }

          .feature-grid {
            grid-template-columns: 1fr;
          }

          footer {
            flex-direction: column;
            text-align: center;
          }

          footer nav {
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
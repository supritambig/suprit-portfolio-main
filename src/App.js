import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

const SKILLS = {
  'Languages & Frameworks': ['Java', 'Spring Boot', 'Hibernate', 'JDBC', 'REST APIs', 'React', 'JavaScript', 'HTML', 'CSS'],
  'Databases': ['MySQL', 'SQL'],
  'Tools & Platforms': ['Docker', 'Git', 'GitHub', 'Jenkins', 'Linux', 'AWS', 'Shell Scripting'],
  'Concepts': ['DSA', 'OOP', 'Layered Architecture', 'ORM', 'JWT Authentication', 'CI/CD', 'DevOps'],
};

const PROJECTS = [
  {
    title: 'SalesSavvy',
    subtitle: 'Full Stack E-Commerce Application',
    date: 'Dec 2025 – Feb 2026',
    tech: ['Java', 'Spring Boot', 'Hibernate', 'JPA', 'MySQL', 'JWT', 'React', 'Docker'],
    color: '#00ff9d',
    points: [
      'Built with secure JWT-based authentication and role-based access control for Admin and Customer roles.',
      'Implemented normalized relational database schema covering users, categories, products, cart, and orders.',
      'Constructed 10+ RESTful APIs for product management, cart operations, order processing, stock control.',
      'Applied layered architecture using Controller, Service, and Repository layers with Hibernate and JPA.',
    ],
  },
  {
    title: 'Yoga Posture Detection',
    subtitle: 'Deep Learning Detection & Correction System',
    date: 'Jul 2024 – Dec 2024',
    tech: ['Python', 'TensorFlow', 'Keras', 'OpenCV', 'HTML', 'CSS', 'JavaScript'],
    color: '#ff6b6b',
    points: [
      'Engineered a deep learning system to detect yoga postures and provide real-time correction feedback for 5+ pose categories.',
      'Designed responsive front-end interfaces using HTML, CSS, and JavaScript.',
      'Integrated a Python-based model using TensorFlow, Keras, and OpenCV with the front-end for live result display.',
      'Enhanced user experience with clear visual posture predictions and accuracy feedback.',
    ],
  },
  {
    title: 'Canteen Management',
    subtitle: 'Web-Based Canteen Automation System',
    date: 'Dec 2023 – Feb 2024',
    tech: ['Java', 'JDBC', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    color: '#a78bfa',
    points: [
      'Designed and deployed a web-based application to automate food ordering and billing operations.',
      'Created front-end pages for login, menu display, and order placement using HTML, CSS, and JavaScript.',
      'Implemented client-side form validations and interactive UI features using JavaScript.',
      'Established database connectivity to MySQL backend using Java with JDBC.',
    ],
  },
];

function useIntersection(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">SA<span className="dot">.</span></div>
      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {NAV_LINKS.map(l => (
          <li key={l}><a href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a></li>
        ))}
      </ul>
      <button className="hamburger" onClick={() => setOpen(!open)} aria-label="menu">
        <span /><span /><span />
      </button>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="about">
      <div className="hero-noise" />
      <div className="hero-grid" />
      <div className="hero-content">
        <div className="hero-badge">Available for opportunities</div>
        <h1 className="hero-name">
          <span className="line">Suprit</span>
          <span className="line accent">Ambig</span>
        </h1>
        <p className="hero-title">Full Stack Developer</p>
        <p className="hero-desc">
          BE graduate in Computer Science with a strong foundation in Java, Spring Boot, MySQL, and full-stack development.
          Building scalable backend systems, REST APIs, and database-driven applications.
        </p>
        <div className="hero-actions">
          <a href="#projects" className="btn-primary">View Projects</a>
          <a href="#contact" className="btn-outline">Get in Touch</a>
        </div>
        <div className="hero-stats">
          <div className="stat"><span className="stat-num">3+</span><span className="stat-label">Projects</span></div>
          <div className="stat"><span className="stat-num">7.43</span><span className="stat-label">CGPA</span></div>
          <div className="stat"><span className="stat-num">2+</span><span className="stat-label">Years Exp</span></div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="photo-wrapper">
          <div className="photo-ring ring1"></div>
          <div className="photo-ring ring2"></div>
          <div className="photo-ring ring3"></div>
          <div className="photo-glow"></div>
          <div className="photo-frame">
            <img src="data:image/jpeg;base64,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zzzzjBOmg7aot9+ugn5F6TzzzzzzzzzzzzzzzzzzyhC4AiTwn2PKNMid5npTzzzzzzzzzzzzzzzzzyybLzuLfnPmG+HILQvpTzzzzzzzzzzzzzzzzzzyjMD3me4TtztcpzxZtzzzzzzzzzzzzzzzzziAADchrFeKP59+Nlb6aJBDTzzzzzzzzzzzzzAAAAACpHhb8b2tnAOhUAAAABDzzzzzzzzzzyAAAAAACpXSJDshZyz72wAAAAABDzzzzzzzziAAAAAAQdEOtQ8MUlm6pgYAAAAAAADTzzzzzyAAAAAABCU18X8BUY+aw7XXQIAAAAAADTzzzyAAAAAAABAQlOOZ5iwMn+JdhIAAAAAAABDzzygAAAAAAAAAQyJIeaB+PIB0dUgAAAAAAAABDzgAAAAAAAAABPLJgZEdr/zhfxoEAAAAAAAAADCAAAAAAAAAAAADRBXDTa/6iLOEAAAAAAAAAAAAAAAAAAAAAAAAAOKeL72geO+gAAAAAAAAAAAAAAAAAAAAAAAAADci8woJpjIuEAAAAAAAAAAAAAAAAAAAAAAAAATdYoT/AOFAZzbAAAAAAAAAAAAAAAAAAAAAAAAalA+mjICDG+u2rAAAAAAAAAAAAAAAAAAAAIEF2gbFIrwxgPyA9rjIAAAAAAAAAAAAAAACXbxdlNlomRwYzGkbXIZVpNEAAAAAAAAAEQJjB0pHf5wgtA/pE/6ZhCKldJtRRnAAAAAAAdpFBJxVtF/YBOgtc+gx563UZdH9xBpvPOAAAUd/zBR1B3Z3McmWLTh+GE3yFZd5LF9phHPpIAAd7bJTfdJSbwiuJPhD1sIDfN9pePhB1NxRd7A//8QAAv/aAAwDAQACAAMAAAAQ88888888888880Mk8+o4Ec0w8888888888888888888888888kiyi4KrdIu2gY88888888888888888888884Ue0a9zlJhBRHs0Q888888888888888888888os7t9GK+SEkFNLYEQ8888888888888888888so1hgmGz8T2yjjYNmU08888888888888888888UEsoEMlX4K2lwoepOw8888888888888888884WU40IDiwgl6E6/snQA8888888888888888888Yd8dq8W3ASBqXUZet888888888888888884gAAX4oZ43vpit0qzcgiQQ088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" alt="Suprit Ambig" className="hero-photo" />
          </div>
          <div className="photo-badge badge-top"><span className="badge-dot"></span>Full Stack Dev</div>
          <div className="photo-badge badge-bottom"><span className="badge-dot"></span>Open to Work</div>
          <div className="floating-tag tag1">Java</div>
          <div className="floating-tag tag2">Spring Boot</div>
          <div className="floating-tag tag3">React</div>
          <div className="floating-tag tag4">Docker</div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const [ref, visible] = useIntersection();
  return (
    <section className="section skills-section" id="skills" ref={ref}>
      <div className="section-label">02 / Skills</div>
      <h2 className="section-title">Tech Stack</h2>
      <div className={`skills-grid ${visible ? 'animate' : ''}`}>
        {Object.entries(SKILLS).map(([cat, items], i) => (
          <div className="skill-card" key={cat} style={{ '--delay': `${i * 0.1}s` }}>
            <h3 className="skill-cat">{cat}</h3>
            <div className="skill-tags">
              {items.map(s => <span className="skill-tag" key={s}>{s}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  const [ref, visible] = useIntersection();
  const [active, setActive] = useState(0);
  return (
    <section className="section projects-section" id="projects" ref={ref}>
      <div className="section-label">03 / Projects</div>
      <h2 className="section-title">Featured Work</h2>
      <div className={`projects-layout ${visible ? 'animate' : ''}`}>
        <div className="project-tabs">
          {PROJECTS.map((p, i) => (
            <button
              key={p.title}
              className={`project-tab ${active === i ? 'active' : ''}`}
              style={{ '--accent': p.color }}
              onClick={() => setActive(i)}
            >
              <span className="tab-num">0{i + 1}</span>
              <span className="tab-title">{p.title}</span>
              <span className="tab-date">{p.date}</span>
            </button>
          ))}
        </div>
        <div className="project-detail">
          {PROJECTS.map((p, i) => (
            <div key={p.title} className={`project-pane ${active === i ? 'active' : ''}`} style={{ '--accent': p.color }}>
              <div className="project-header">
                <div>
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-subtitle">{p.subtitle}</p>
                </div>
                <span className="project-date">{p.date}</span>
              </div>
              <ul className="project-points">
                {p.points.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
              <div className="project-tech">
                {p.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [ref, visible] = useIntersection();
  return (
    <section className="section exp-section" id="experience" ref={ref}>
      <div className="section-label">04 / Experience</div>
      <h2 className="section-title">Journey</h2>
      <div className={`timeline ${visible ? 'animate' : ''}`}>
        <div className="timeline-item" style={{ '--delay': '0s' }}>
          <div className="tl-dot" />
          <div className="tl-content">
            <span className="tl-date">Jun 2025 – Dec 2025</span>
            <h3>Java Full Stack Training</h3>
            <p className="tl-org">JSpiders, Rajajinagar</p>
            <p>Mastering Core and Advanced Java, Spring Boot, REST API development, HTML, CSS, JavaScript, SQL, and Hibernate with hands-on projects.</p>
          </div>
        </div>
        <div className="timeline-item" style={{ '--delay': '0.15s' }}>
          <div className="tl-dot" />
          <div className="tl-content">
            <span className="tl-date">Feb 2025 – May 2025</span>
            <h3>Full Stack Developer Intern</h3>
            <p className="tl-org">Blend Vidya Edu Tech, Bangalore</p>
            <p>Worked with ReactJS, Spring Boot, REST APIs, and relational databases. Utilized Git, Jenkins, and Docker for CI/CD pipelines and production deployments.</p>
          </div>
        </div>
        <div className="timeline-item" style={{ '--delay': '0.3s' }}>
          <div className="tl-dot" />
          <div className="tl-content">
            <span className="tl-date">2022 – 2025</span>
            <h3>Bachelor of Engineering – CSE</h3>
            <p className="tl-org">Sahyadri College of Engineering, Adyar</p>
            <p>Computer Science and Engineering with CGPA 7.43/10. Built strong fundamentals in algorithms, OOP, databases, and software engineering.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, visible] = useIntersection();
  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <div className="section-label">05 / Contact</div>
      <div className={`contact-inner ${visible ? 'animate' : ''}`}>
        <h2 className="section-title">Let's Build<br /><span className="accent">Together</span></h2>
        <p className="contact-desc">Open to full-time roles, freelance projects, and collaborations. Feel free to reach out!</p>
        <div className="contact-links">
          <a href="mailto:supritambig@gmail.com" className="contact-card">
            <span className="contact-icon">✉</span>
            <div>
              <div className="contact-type">Email</div>
              <div className="contact-val">supritambig@gmail.com</div>
            </div>
          </a>
          <a href="tel:7760221613" className="contact-card">
            <span className="contact-icon">✆</span>
            <div>
              <div className="contact-type">Phone</div>
              <div className="contact-val">+91 7760221613</div>
            </div>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-icon">in</span>
            <div>
              <div className="contact-type">LinkedIn</div>
              <div className="contact-val">Connect with me</div>
            </div>
          </a>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="contact-card">
            <span className="contact-icon">&#60;/&#62;</span>
            <div>
              <div className="contact-type">GitHub</div>
              <div className="contact-val">View my code</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <span>Designed & Built by <strong>Suprit Ambig</strong></span>
      <span>© 2026</span>
    </footer>
  );
}

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}

import React from 'react';
import './About.css'; 

export default function About() { 
  const creatorData = [
    {
      name: "Vaibhav Aggarwal",
      role: "Innovator & Developer",
      linkedin: "https://linkedin.com/in/vaibhavagg2005/",
      github: "https://github.com/Vaibhav-2005/",
      profile: "/vaibhav_profile.jpg" // Image path
    },
    {
      name: "Aastha",
      role: "Designer & Developer",
      linkedin: "https://www.linkedin.com/in/aastha-nagpal/",
      github: "https://github.com/Aastha1Nagpal",
      profile: "/aastha_profile.jpg" // Image path
    }
  ];
  
  // Removed UserIcon SVG as we are using image files

  const LinkedInIcon = (props) => (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );

  const GitHubIcon = (props) => (
    <svg width={props.size} height={props.size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 3 5.07 5.07 0 0 0 18 1.5M14 6c-.5.5-1.5 0-2 0s-1 .5-2 0M6 18a.3.3 0 0 1-.3.3"></path>
    </svg>
  );

  return (
    <div className="about-page"> 
      <div className="about-container">
        <div className="contact-header">
          <h1>PindScript Creators</h1>
          <p>
            Meet the team behind the world's first Punjabi programming language, uniting technology with our heritage.
          </p>
        </div>

        <div className="creators-grid">
          {creatorData.map((creator) => (
            <div className="creator-card" key={creator.name}>
              {/* Replaced icon-bg with image container */}
              <div className="profile-img-container"> 
                <img 
                  src={creator.profile} 
                  alt={`${creator.name}'s Profile`} 
                  className="profile-img"
                  // Added onerror fallback just in case the image fails to load
                  onError={(e) => { e.target.onerror = null; e.target.src = '/favicon.png'; e.target.className = 'profile-img fallback'; }} 
                />
              </div>

              <h2>{creator.name}</h2>
              <p className="role">{creator.role}</p>

              <a 
                href={creator.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn linkedin"
              >
                <LinkedInIcon size={20} /> Connect on LinkedIn
              </a>
              
              <a 
                href={creator.github} 
                target="_blank" 
                rel="noreferrer" 
                className="social-btn github"
                style={{marginTop: '1rem'}}
              >
                <GitHubIcon size={20} /> View on GitHub
              </a>
            </div>
          ))}
        </div>

        <div className="general-contact">
          <h3>Got a feature idea or a bug report?</h3>
          <p>We're always looking to improve. Feel free to reach out directly.</p>
          <a href="mailto:vaibhav101agg@gmail.com" className="email-btn"> 
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            vaibhav101agg@gmail.com 
          </a>
        </div>
      </div>
    </div>
  );
}
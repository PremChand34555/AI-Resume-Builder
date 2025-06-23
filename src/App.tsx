import React, { useState, useRef } from 'react';
import './App.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  skills: string[];
  summary: string;
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: '',
  });
  
  const [resume, setResume] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateResume = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const skillsArray = formData.skills.split(',').map(skill => skill.trim());
      
      // Generate a professional summary based on skills
      const summary = `Dedicated professional with expertise in ${skillsArray.slice(0, 3).join(', ')} and other technical skills. Seeking to leverage my abilities to successfully fill the role at your company.`;
      
      setResume({
        ...formData,
        skills: skillsArray,
        summary
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const handlePrint = () => {
    window.print();
  };

  const takeScreenshot = () => {
    if (resumeRef.current) {
      html2canvas(resumeRef.current).then((canvas: HTMLCanvasElement) => {
        canvas.toBlob((blob: Blob | null) => {
          if (blob) {
            saveAs(blob, 'resume-screenshot.png');
          }
        });
      });
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>{FaIcons.FaFileAlt({})} AI Resume Builder</h1>
          {resume && (
            <div className="header-buttons">
              <button onClick={handlePrint} className="print-btn">
                {AiIcons.AiFillPrinter({})} Print Resume
              </button>
              <button onClick={takeScreenshot} className="screenshot-btn">
                {FaIcons.FaCamera({})} Screenshot
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="container">
        {!resume ? (
          <div className="form-container">
            <div className="form-header">
              <h2>Create Your Professional Resume</h2>
              <p>Fill in your details below and let AI do the rest</p>
              <div className="steps-container">
                <div className={`step ${activeStep >= 1 ? 'active' : ''}`}>
                  <div className="step-number">1</div>
                  <div className="step-text">Personal Info</div>
                </div>
                <div className="step-connector"></div>
                <div className={`step ${activeStep >= 2 ? 'active' : ''}`}>
                  <div className="step-number">2</div>
                  <div className="step-text">Education & Experience</div>
                </div>
                <div className="step-connector"></div>
                <div className={`step ${activeStep >= 3 ? 'active' : ''}`}>
                  <div className="step-number">3</div>
                  <div className="step-text">Skills</div>
                </div>
              </div>
            </div>
            
            <form onSubmit={generateResume}>
              {activeStep === 1 && (
                <div className="step-content">
                  <h3>Personal Information</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name">{FaIcons.FaUser({})} Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Prem"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">{FaIcons.FaEnvelope({})} Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="premthakurfact786@gmail.com"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">{FaIcons.FaPhone({})} Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+92 340 1202005"
                      required
                    />
                  </div>
                  
                  <div className="button-group">
                    <button 
                      type="button" 
                      className="next-btn"
                      onClick={() => setActiveStep(2)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {activeStep === 2 && (
                <div className="step-content">
                  <h3>Education & Experience</h3>
                  
                  <div className="form-group">
                    <label htmlFor="education">{FaIcons.FaGraduationCap({})} Education</label>
                    <textarea
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      placeholder="Bachelor of Science in Computer Science, University Name, 2015-2019"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="experience">{FaIcons.FaBriefcase({})} Work Experience</label>
                    <textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Software Developer at Company Name (2019-Present): Developed web applications using React and Node.js"
                      required
                    />
                  </div>
                  
                  <div className="button-group">
                    <button 
                      type="button" 
                      className="back-btn-small"
                      onClick={() => setActiveStep(1)}
                    >
                      {FaIcons.FaArrowLeft({})} Back
                    </button>
                    <button 
                      type="button" 
                      className="next-btn"
                      onClick={() => setActiveStep(3)}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              
              {activeStep === 3 && (
                <div className="step-content">
                  <h3>Skills</h3>
                  
                  <div className="form-group">
                    <label htmlFor="skills">{FaIcons.FaTools({})} Skills (comma separated)</label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      required
                      placeholder="React, JavaScript, CSS, Node.js, TypeScript..."
                    />
                  </div>
                  
                  <div className="button-group">
                    <button 
                      type="button" 
                      className="back-btn-small"
                      onClick={() => setActiveStep(2)}
                    >
                      {FaIcons.FaArrowLeft({})} Back
                    </button>
                    <button type="submit" className="generate-btn" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          {FaIcons.FaSpinner({ className: "spinner" })} Generating...
                        </>
                      ) : (
                        'Generate Resume'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        ) : (
          <div className="resume-container">
            <div className="resume" ref={resumeRef}>
              <div className="resume-header">
                <h2>{resume.name}</h2>
                <div className="contact-info">
                  <p>{FaIcons.FaEnvelope({})} {resume.email}</p>
                  <p>{FaIcons.FaPhone({})} {resume.phone}</p>
                </div>
              </div>
              
              <div className="resume-section">
                <h3>Professional Summary</h3>
                <p>{resume.summary}</p>
              </div>
              
              <div className="resume-section">
                <h3>{FaIcons.FaTools({})} Skills</h3>
                <ul className="skills-list">
                  {resume.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              
              <div className="resume-section">
                <h3>{FaIcons.FaGraduationCap({})} Education</h3>
                <p>{resume.education}</p>
              </div>
              
              <div className="resume-section">
                <h3>{FaIcons.FaBriefcase({})} Experience</h3>
                <p>{resume.experience}</p>
              </div>
            </div>
            
            <div className="resume-actions">
              <button 
                onClick={() => setResume(null)} 
                className="back-btn"
              >
                {FaIcons.FaArrowLeft({})} Create New Resume
              </button>
              <button 
                onClick={handlePrint} 
                className="print-btn"
              >
                {AiIcons.AiFillPrinter({})} Print Resume
              </button>
              <button 
                onClick={takeScreenshot} 
                className="screenshot-btn"
              >
                {FaIcons.FaCamera({})} Screenshot
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className="App-footer">
        <p>© {new Date().getFullYear()} AI Resume Builder</p>
        <p>
          Made with <span role="img" aria-label="love">❤️</span> by Prem Chand
        </p>
      
      </footer>
    </div>
  );
}

export default App;

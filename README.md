# Smart Resume Analyzer & Job Matcher

Smart Resume Analyzer & Job Matcher is a powerful, AI-driven full-stack web application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS) and find the best job matches. 

**Repository:** [https://github.com/pankaj9088/Smart-Resume-Analyzer.git](https://github.com/pankaj9088/Smart-Resume-Analyzer.git)
<br/>
**Live Demo:** [Smart Resume Analyzer on Vercel](https://smart-resume-analyzer-six.vercel.app/) *(Note: If you have your exact Vercel link, update this!)*

## 🚀 Features

- **AI-Powered Resume Analysis**: Uses advanced AI (OpenRouter) to extract text, identify skills, and generate actionable feedback.
- **ATS Compatibility Checking**: Simulates ATS parsing to give your resume a compatibility score.
- **Missing Skill Detection**: Compares your resume against industry standards and identifies crucial missing skills.
- **Job Role Matching**: Suggests the top job roles that match your existing skill set.
- **History Management**: Automatically saves your analysis history to a cloud database, allowing you to view or delete past reports.
- **Modern & Responsive UI**: Beautiful dark/light mode dashboard built with React and Tailwind CSS.

## 🛠️ Tech Stack

**Frontend (Hosted on Vercel):**
- React 19 + Vite
- Tailwind CSS
- Lucide React

**Backend (Hosted on Render):**
- Java 21 + Spring Boot 3
- Spring Web (REST APIs)
- Spring Data MongoDB
- Docker (for cloud containerization)

**Database & APIs:**
- MongoDB Atlas (Cloud Database)
- OpenRouter API (LLM Integration)

## ☁️ Cloud Deployment Setup

This project is fully configured for cloud deployment. 

**Render (Backend) Environment Variables:**
- `MONGODB_URI`: Your MongoDB Atlas Connection String
- `OPENAI_API_KEY`: Your OpenRouter / OpenAI API Key

**Vercel (Frontend) Environment Variables:**
- `VITE_API_BASE_URL`: URL of the deployed Render backend (e.g., `https://smart-resume-analyzer-backend.onrender.com`)

## ⚙️ Local Setup

### Prerequisites
- Node.js (v18+)
- Java 21 (JDK) & Maven
- Local MongoDB running on port 27017

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## 📜 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

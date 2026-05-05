# Smart Resume Analyzer & Job Matcher

Smart Resume Analyzer & Job Matcher is a powerful, AI-driven full-stack web application designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS) and find the best job matches. 

**Repository:** [https://github.com/pankaj9088/Smart-Resume-Analyzer.git](https://github.com/pankaj9088/Smart-Resume-Analyzer.git)

## 🚀 Features

- **AI-Powered Resume Analysis**: Uses advanced AI (OpenRouter) to extract text, identify skills, and generate actionable feedback.
- **ATS Compatibility Checking**: Simulates ATS parsing to give your resume a compatibility score.
- **Missing Skill Detection**: Compares your resume against industry standards and identifies crucial missing skills.
- **Job Role Matching**: Suggests the top job roles that match your existing skill set.
- **PDF & DOCX Support**: Seamlessly upload resumes in standard formats.
- **History Management**: Automatically saves your analysis history to a database, allowing you to view or delete past reports.
- **Real-time Report Generation**: Download detailed analysis reports and AI-generated improvement guides.
- **Modern & Responsive UI**: Beautiful dark/light mode dashboard built with React and Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- Tailwind CSS
- Lucide React
- React Router

**Backend:**
- Java 21 + Spring Boot 3
- Spring Web (REST APIs)
- Spring Data MongoDB
- Apache Tika (Document parsing)

**Database & APIs:**
- MongoDB (Local/Atlas)
- OpenRouter API (LLM Integration)

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18+)
- Java 21 (JDK)
- Maven
- MongoDB (running locally on port 27017)
- OpenRouter API Key

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Build and run the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   *The backend will run on `http://localhost:8080`.*

### Frontend Setup
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on `http://localhost:5173`.*

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

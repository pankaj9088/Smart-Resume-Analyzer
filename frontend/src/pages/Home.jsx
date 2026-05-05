import React from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [file, setFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const onDrop = React.useCallback(acceptedFiles => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    
    // Fallback Mock Data matching the new UI needs
    const mockAnalysis = {
      score: 97,
      jobMatches: [
        { 
          role: "Software Engineer", 
          company: "Google",
          companyIcon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
          location: "Mountain View, CA",
          type: "Full-time",
          level: "Mid Level",
          salary: "$120k/yr - $180k/yr",
          matchPercentage: 97,
          posted: "1 hour ago",
          applicants: 25,
          subScores: { experience: 100, skills: 93, industry: 91 },
          description: "Google is seeking a highly motivated Software Engineer to join their Consumer Innovation team..."
        },
        { 
          role: "Cloud Software Engineer", 
          company: "Intel",
          companyIcon: "https://upload.wikimedia.org/wikipedia/commons/8/85/Intel_logo_2023.svg",
          location: "Santa Clara, CA",
          type: "Full-time",
          level: "Mid Level",
          salary: "$110k/yr - $160k/yr",
          matchPercentage: 95,
          posted: "2 hours ago",
          applicants: 42,
          subScores: { experience: 95, skills: 90, industry: 88 },
          description: "Join Intel's Artificial Intelligence Group..."
        }
      ]
    };
    
    // Simulate network delay
    setTimeout(() => {
      navigate('/dashboard', { state: { analysis: mockAnalysis } });
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6 text-slate-900">
          Smart Resume Analyzer
        </h1>
        <p className="text-lg text-slate-500">
          Upload your resume and instantly see highly curated job matches.
        </p>
      </div>

      <div className="w-full max-w-xl">
        <div 
          {...getRootProps()} 
          className={`relative overflow-hidden group p-12 border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all duration-300 ease-out
            ${isDragActive ? 'border-emerald-400 bg-emerald-50' : 'border-slate-200 bg-slate-50 hover:border-emerald-400/50 hover:bg-emerald-50/50'}`}
        >
          <input {...getInputProps()} />
          
          {file ? (
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                <FileText className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <p className="text-lg font-medium text-slate-900">{file.name}</p>
                <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-all border border-slate-100">
                <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-emerald-500" />
              </div>
              <div>
                <p className="text-lg font-medium text-slate-900 mb-1">Drag & drop your resume here</p>
                <p className="text-sm text-slate-500">Supports PDF, DOCX up to 10MB</p>
              </div>
            </div>
          )}
        </div>

        {file && (
          <div className="mt-8 flex justify-center animate-in fade-in slide-in-from-bottom-4">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-500/30 disabled:opacity-70 group"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing with AI...
                </>
              ) : (
                <>
                  Find Job Matches
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, UploadCloud, Briefcase, FileCheck, 
  Lightbulb, History, Settings, Bell, ChevronDown,
  FileText, Upload, Info, Check, Sparkles, XCircle, 
  Rocket, Moon, CheckCircle2, ChevronRight, Activity, 
  Download, Clock, Target, Code, BarChart, Database, Server, Settings2, Trash2, Eye
} from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(location.state?.defaultTab || 'Dashboard');

  useEffect(() => {
    if (location.state?.defaultTab) {
      setActiveTab(location.state.defaultTab);
    }
  }, [location.state?.defaultTab]);
  const [darkMode, setDarkMode] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    if (activeTab === 'History') {
      fetchHistory();
    }
  }, [activeTab]);

  const fetchHistory = async () => {
    setLoadingHistory(true);
    try {
      const response = await fetch('http://localhost:8080/api/resumes');
      if (response.ok) {
        const data = await response.json();
        setHistoryList(data);
      }
    } catch (error) {
      console.error("Failed to fetch history:", error);
    }
    setLoadingHistory(false);
  };

  const deleteHistoryItem = async (id) => {
    if (!window.confirm("Are you sure you want to delete this resume analysis?")) return;
    try {
      const response = await fetch(`http://localhost:8080/api/resumes/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchHistory(); // Refresh list
      } else {
        alert("Failed to delete the record.");
      }
    } catch (error) {
      console.error("Failed to delete history:", error);
    }
  };
  
  // Use mock data if analysis is missing
  const analysis = location.state?.analysis || {
    score: 85,
    atsCompatibility: 88,
    skills: ["Java", "JavaScript", "React", "Spring Boot", "MySQL", "REST API", "HTML", "CSS", "Git", "AWS"],
    missingSkills: ["Docker", "Kubernetes", "CI/CD", "MongoDB", "GraphQL", "TypeScript"],
    suggestions: [
      "Add more quantifiable achievements in your experience section.",
      "Include keywords related to Docker, Kubernetes, CI/CD.",
      "Highlight more projects with technologies you used.",
      "Add certifications to increase your credibility."
    ],
    jobMatches: [
      { role: "Software Developer", matchPercentage: 92, icon: <Code />, color: "text-emerald-500", bg: "bg-emerald-100", bar: "bg-emerald-500" },
      { role: "Frontend Developer", matchPercentage: 87, icon: <BarChart />, color: "text-blue-500", bg: "bg-blue-100", bar: "bg-blue-500" },
      { role: "Data Analyst", matchPercentage: 78, icon: <Database />, color: "text-orange-500", bg: "bg-orange-100", bar: "bg-orange-500" },
      { role: "Backend Developer", matchPercentage: 72, icon: <Server />, color: "text-purple-500", bg: "bg-purple-100", bar: "bg-purple-500" },
      { role: "QA Engineer", matchPercentage: 65, icon: <Settings2 />, color: "text-teal-500", bg: "bg-teal-100", bar: "bg-teal-500" }
    ]
  };

  const { score, atsCompatibility, skills, missingSkills, suggestions, jobMatches } = analysis;

  const handleNav = (tab) => {
    setActiveTab(tab);
    if (tab === 'Upload Resume') {
      navigate('/');
    } else if (tab === 'Job Matches') {
      navigate('/results', { state: { defaultTab: 'Job Matches' } });
    } else if (tab === 'ATS Check') {
      navigate('/results', { state: { defaultTab: 'ATS' } });
    } else if (tab === 'Resume Tips') {
      navigate('/results', { state: { defaultTab: 'Suggestions' } });
    }
  };

  return (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-slate-900 text-white' : 'bg-[#f4f7fb] text-slate-800'} font-sans`}>
      
      {/* LEFT SIDEBAR */}
      <div className={`${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-[#0f172a]'} w-64 flex flex-col shrink-0 transition-colors`}>
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <div className="flex items-center gap-3 text-white">
            <FileCheck className="w-8 h-8 text-blue-500" />
            <div>
              <h2 className="font-bold text-lg leading-tight">Smart Resume</h2>
              <p className="text-[10px] text-slate-400">Analyzer & Job Matcher</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => handleNav('Dashboard')} />
          <NavItem icon={<UploadCloud />} label="Upload Resume" active={activeTab === 'Upload Resume'} onClick={() => handleNav('Upload Resume')} />
          <NavItem icon={<Briefcase />} label="Job Matches" active={activeTab === 'Job Matches'} onClick={() => handleNav('Job Matches')} />
          <NavItem icon={<Activity />} label="ATS Check" active={activeTab === 'ATS Check'} onClick={() => handleNav('ATS Check')} />
          <NavItem icon={<Lightbulb />} label="Resume Tips" active={activeTab === 'Resume Tips'} onClick={() => handleNav('Resume Tips')} />
          <NavItem icon={<History />} label="History" active={activeTab === 'History'} onClick={() => handleNav('History')} />
          <NavItem icon={<Settings />} label="Settings" active={activeTab === 'Settings'} onClick={() => handleNav('Settings')} />
        </div>

        <div className="p-4">
          {/* Removed Upgrade to Pro banner */}

          <div className="mt-4 flex items-center justify-between px-4 py-3 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
              <Moon className="w-4 h-4" /> Dark Mode
            </div>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className={`w-10 h-5 rounded-full relative transition-colors ${darkMode ? 'bg-blue-500' : 'bg-slate-600'}`}
            >
              <div className={`w-3.5 h-3.5 bg-white rounded-full absolute top-[3px] transition-all ${darkMode ? 'left-[22px]' : 'left-[3px]'}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className={`h-20 px-8 flex items-center justify-between shrink-0 transition-colors ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#f4f7fb]'}`}>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Welcome, Arjun! <span className="text-2xl">👋</span>
            </h1>
            <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Here's your resume analysis overview.</p>
          </div>
          <div className="flex items-center gap-6">
            <button className={`relative p-2 rounded-full transition-colors ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-white text-slate-600 shadow-sm'}`}>
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">3</span>
            </button>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">A</div>
              <div className="flex items-center gap-2 font-medium text-sm">
                Arjun Verma <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        {activeTab === 'Settings' ? (
          <div className="flex-1 overflow-y-auto p-8 pt-4">
            <div className="max-w-2xl mx-auto">
              <Card darkMode={darkMode}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings className="w-5 h-5 text-blue-500"/> Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Display Name</label>
                    <input type="text" id="nameInput" defaultValue={localStorage.getItem('user_name') || 'Arjun Verma'} className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Email Address</label>
                    <input type="email" id="emailInput" defaultValue={localStorage.getItem('user_email') || 'arjun@example.com'} className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${darkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-200'}`} />
                  </div>
                  <button onClick={() => {
                    localStorage.setItem('user_name', document.getElementById('nameInput').value);
                    localStorage.setItem('user_email', document.getElementById('emailInput').value);
                    alert('Settings saved successfully!');
                    window.location.reload();
                  }} className="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors">
                    Save Changes
                  </button>
                </div>
              </Card>
            </div>
          </div>
        ) : activeTab === 'History' ? (
          <div className="flex-1 overflow-y-auto p-8 pt-4">
            <div className="max-w-3xl mx-auto">
              <Card darkMode={darkMode}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><History className="w-5 h-5 text-purple-500"/> Analysis History</h2>
                <div className={`rounded-xl border ${darkMode ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-slate-50'}`}>
                  {loadingHistory ? (
                    <p className={`text-sm text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Loading history...</p>
                  ) : historyList.length === 0 ? (
                    <p className={`text-sm text-center py-8 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Your recent resume analysis history will appear here.</p>
                  ) : (
                    <div className="divide-y divide-slate-200 dark:divide-slate-700/50">
                      {historyList.map((item) => (
                        <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-blue-600">
                              <FileText className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-bold text-sm">{item.fileName || 'Unknown File'}</h4>
                              <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Score: <span className="font-bold text-emerald-500">{item.score}/100</span> • ATS: <span className="font-bold text-blue-500">{item.atsCompatibility}%</span></p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => navigate('/results', { state: { analysis: item, defaultTab: 'Overview' } })} className="p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-500/10 text-blue-600 transition-colors" title="View Full Report">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button onClick={() => deleteHistoryItem(item.id)} className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-red-500 transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        ) : (
        <div className="flex-1 overflow-y-auto p-8 pt-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
            
            {/* Left Column (Span 2) */}
            <div className="xl:col-span-2 flex flex-col gap-6">
              
              {/* Row 1: File & Score */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* File Details */}
                <Card darkMode={darkMode}>
                  <div className="flex items-start gap-4 mb-6">
                    <div className={`w-20 h-24 rounded-lg flex flex-col items-center justify-center gap-2 ${darkMode ? 'bg-slate-800' : 'bg-slate-50'}`}>
                      <FileText className="w-8 h-8 text-slate-400" />
                      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">PDF</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-base mb-2">My_Resume.pdf</h3>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block">Uploaded Successfully</span>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'} mb-1`}>Uploaded on: 20 May 2024</p>
                      <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Pages: 2</p>
                    </div>
                  </div>
                  <button onClick={() => navigate('/')} className={`w-full py-2.5 rounded-lg border text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${darkMode ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}>
                    <Upload className="w-4 h-4" /> Re-upload Resume
                  </button>
                </Card>

                {/* Resume Score */}
                <Card darkMode={darkMode}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2">Resume Score <Info className="w-4 h-4 text-slate-400" /></h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke={darkMode ? "#1e293b" : "#f1f5f9"} strokeWidth="10" />
                        <circle
                          cx="50" cy="50" r="45" fill="none" stroke="#3b82f6"
                          strokeWidth="10" strokeDasharray={`${score * 2.827} 282.7`} strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-4xl font-bold text-blue-600">{score}</span>
                        <span className={`text-xs font-bold ${darkMode ? 'text-slate-400' : 'text-slate-400'}`}>/100</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-emerald-500 font-bold flex items-center gap-2">Great Job! 🎉</h4>
                      <p className={`text-xs leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Your resume is strong. Keep improving by adding missing skills and keywords.</p>
                      <button className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors shadow-md shadow-blue-500/20 w-fit">
                        View Full Analysis
                      </button>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Row 2: Skills & ATS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Extracted Skills */}
                <Card darkMode={darkMode}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2 text-sm"><Lightbulb className="w-4 h-4 text-blue-500" /> Extracted Skills</h3>
                    <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {skills.slice(0, 10).map((skill, i) => (
                      <span key={i} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${darkMode ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-50 text-emerald-600'}`}>{skill}</span>
                    ))}
                  </div>
                  <p className={`text-xs mt-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Total Skills Found: {skills.length}</p>
                </Card>

                {/* Missing Skills */}
                <Card darkMode={darkMode}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold flex items-center gap-2 text-sm"><XCircle className="w-4 h-4 text-red-500" /> Missing Skills</h3>
                    <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {missingSkills.map((skill, i) => (
                      <span key={i} className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${darkMode ? 'bg-red-500/10 text-red-400' : 'bg-red-50 text-red-500'}`}>{skill}</span>
                    ))}
                  </div>
                  <p className={`text-xs mt-auto ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Add these skills to improve your match percentage.</p>
                </Card>

                {/* ATS Score */}
                <Card darkMode={darkMode} className="flex flex-col items-center justify-center text-center">
                  <div className="flex items-center justify-center w-full mb-2">
                    <h3 className="font-bold flex items-center gap-2 text-sm"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> ATS Score <Info className="w-3 h-3 text-slate-400" /></h3>
                  </div>
                  <div className="relative w-24 h-24 flex items-center justify-center my-4">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="45" fill="none" stroke={darkMode ? "#1e293b" : "#f1f5f9"} strokeWidth="10" />
                      <circle
                        cx="50" cy="50" r="45" fill="none" stroke="#10b981"
                        strokeWidth="10" strokeDasharray={`${atsCompatibility * 2.827} 282.7`} strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-2xl font-bold text-slate-800 dark:text-white">{atsCompatibility}%</span>
                  </div>
                  <h4 className="text-emerald-500 font-bold text-sm mb-1">Excellent</h4>
                  <p className={`text-xs ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Your resume is ATS-friendly 🎯</p>
                </Card>

              </div>

              {/* Row 3: AI Suggestions */}
              <Card darkMode={darkMode}>
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1 space-y-4">
                    <h3 className="font-bold flex items-center gap-2 text-lg"><Sparkles className="w-5 h-5 text-indigo-500" /> AI Suggestions to Improve Your Resume</h3>
                    <ul className="space-y-3">
                      {suggestions.map((s, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center"><Check className="w-3 h-3 text-emerald-600" /></div>
                          <span className={`text-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{s}</span>
                        </li>
                      ))}
                    </ul>
                    <button className={`mt-4 px-6 py-2.5 border rounded-lg text-sm font-semibold transition-colors ${darkMode ? 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10' : 'border-blue-200 text-blue-600 hover:bg-blue-50'}`}>
                      View Detailed Suggestions
                    </button>
                  </div>
                  <div className="w-48 shrink-0 hidden md:block opacity-80">
                     <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="50" y="20" width="100" height="140" rx="10" fill={darkMode ? "#334155" : "#e2e8f0"}/>
                        <rect x="60" y="30" width="80" height="120" rx="6" fill={darkMode ? "#1e293b" : "#ffffff"}/>
                        <circle cx="100" cy="70" r="20" fill="#3b82f6"/>
                        <circle cx="100" cy="65" r="8" fill="#ffffff"/>
                        <path d="M85 85 Q100 75 115 85 L115 90 L85 90 Z" fill="#ffffff"/>
                        <rect x="70" y="110" width="60" height="6" rx="3" fill="#cbd5e1"/>
                        <rect x="70" y="125" width="40" height="6" rx="3" fill="#cbd5e1"/>
                        <circle cx="140" cy="140" r="16" fill="#10b981"/>
                        <path d="M133 140 L138 145 L147 135" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                     </svg>
                  </div>
                </div>
              </Card>

            </div>

            {/* Right Column (Span 1) */}
            <div className="flex flex-col gap-6">
              
              {/* Job Matches */}
              <Card darkMode={darkMode} className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold flex items-center gap-2 text-lg"><Briefcase className="w-5 h-5 text-blue-500" /> Top Job Matches</h3>
                  <button className="text-sm font-bold text-blue-600 hover:underline">View All</button>
                </div>
                
                <div className="space-y-6 flex-1">
                  {jobMatches.map((job, i) => (
                    <div key={i} className="flex items-center gap-4 group cursor-pointer">
                      <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500 shrink-0">{i+1}</div>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${job.bg} ${job.color}`}>
                        {job.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className={`font-bold text-sm group-hover:text-blue-500 transition-colors ${darkMode ? 'text-white' : 'text-slate-800'}`}>{job.role}</h4>
                          <span className={`font-bold ${job.color}`}>{job.matchPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full mb-1">
                          <div className={`h-1.5 rounded-full ${job.bar}`} style={{ width: `${job.matchPercentage}%` }}></div>
                        </div>
                        <div className="flex justify-between items-center">
                           <span className={`text-[10px] font-semibold ${job.color}`}>{job.matchPercentage >= 80 ? 'Great Match' : job.matchPercentage >= 70 ? 'Good Match' : 'Fair Match'}</span>
                           <ChevronRight className="w-3 h-3 text-slate-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card darkMode={darkMode}>
                <h3 className="font-bold flex items-center gap-2 mb-4 text-lg"><Activity className="w-5 h-5 text-blue-500" /> Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <QuickAction darkMode={darkMode} onClick={() => handleNav('ATS Check')} icon={<Activity className="w-5 h-5 text-blue-500"/>} title="ATS Check" desc="Check ATS Compatibility" />
                  <QuickAction darkMode={darkMode} onClick={() => handleNav('Resume Tips')} icon={<Target className="w-5 h-5 text-indigo-500"/>} title="Keyword Optimization" desc="Optimize Keywords" />
                  <QuickAction darkMode={darkMode} onClick={() => navigate('/results', { state: { defaultTab: 'Improve' } })} icon={<Download className="w-5 h-5 text-blue-500"/>} title="Download Improved Resume" desc="Get AI Improved Resume" />
                  <QuickAction darkMode={darkMode} onClick={() => handleNav('History')} icon={<History className="w-5 h-5 text-purple-500"/>} title="View Analysis History" desc="See Previous Reports" />
                </div>
              </Card>

            </div>

          </div>
          
          <footer className={`mt-8 text-center text-xs pb-4 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            © 2026 Smart Resume Analyzer & Job Matcher. All rights reserved.
          </footer>
        </div>
        )}
      </div>
    </div>
  );
}

// Subcomponents
function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
        ${active ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
    >
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
      {label}
    </button>
  );
}

function Card({ children, className = '', darkMode }) {
  return (
    <div className={`rounded-2xl p-6 ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-100'} border shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function QuickAction({ icon, title, desc, darkMode, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-start gap-3 p-3 rounded-xl border text-left transition-colors hover:shadow-sm
      ${darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-slate-100 hover:border-blue-200 hover:bg-blue-50'}`}>
      <div className={`p-2 rounded-lg shrink-0 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        {icon}
      </div>
      <div>
        <h4 className={`text-xs font-bold leading-tight mb-0.5 ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{title}</h4>
        <p className={`text-[9px] ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
      </div>
    </button>
  );
}

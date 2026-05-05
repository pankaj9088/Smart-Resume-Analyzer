package com.resume.analyzer.service;

import com.resume.analyzer.model.ResumeAnalysis;
import com.resume.analyzer.repository.ResumeRepository;
import org.apache.tika.Tika;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ResumeAnalyzerService {

    @Autowired
    private OpenAIService openAIService;

    @Autowired
    private ResumeRepository resumeRepository;

    private final Tika tika = new Tika();

    public ResumeAnalysis processAndAnalyze(MultipartFile file) throws Exception {
        // Extract text from PDF/DOCX
        String extractedText = tika.parseToString(file.getInputStream());

        // Call OpenAI to analyze text
        Map<String, Object> analysisResult = openAIService.analyzeResume(extractedText);

        // Save to Database
        ResumeAnalysis resume = new ResumeAnalysis();
        resume.setFileName(file.getOriginalFilename());
        resume.setUploadDate(new Date());
        resume.setRawText(extractedText);
        
        resume.setScore((Integer) analysisResult.get("score"));
        resume.setSkills((List<String>) analysisResult.get("skills"));
        resume.setMissingSkills((List<String>) analysisResult.get("missingSkills"));
        resume.setSuggestions((List<String>) analysisResult.get("suggestions"));
        resume.setAtsCompatibility((Integer) analysisResult.get("atsCompatibility"));

        List<Map<String, Object>> jobsMap = (List<Map<String, Object>>) analysisResult.get("jobMatches");
        List<ResumeAnalysis.JobMatch> jobs = jobsMap.stream().map(jm -> {
            ResumeAnalysis.JobMatch match = new ResumeAnalysis.JobMatch();
            match.setRole((String) jm.get("role"));
            match.setMatchPercentage((Integer) jm.get("matchPercentage"));
            return match;
        }).collect(Collectors.toList());

        resume.setJobMatches(jobs);

        return resumeRepository.save(resume);
    }

    public List<ResumeAnalysis> getAllResumes() {
        return resumeRepository.findAll();
    }

    public void deleteResume(String id) {
        resumeRepository.deleteById(id);
    }
}

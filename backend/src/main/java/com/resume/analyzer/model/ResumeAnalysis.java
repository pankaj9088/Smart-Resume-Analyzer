package com.resume.analyzer.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Document(collection = "resumes")
public class ResumeAnalysis {
    @Id
    private String id;
    private String fileName;
    private Date uploadDate;
    private String rawText;
    
    // Extracted and Analyzed Data from AI
    private int score;
    private List<String> skills;
    private List<String> missingSkills;
    private List<String> suggestions;
    private int atsCompatibility;
    
    private List<JobMatch> jobMatches;
    
    @Data
    public static class JobMatch {
        private String role;
        private int matchPercentage;
    }
}

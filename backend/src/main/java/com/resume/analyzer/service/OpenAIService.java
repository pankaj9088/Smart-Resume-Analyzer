package com.resume.analyzer.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public Map<String, Object> analyzeResume(String text) {
        // Use mock if no real API key is set
        if (apiKey == null || apiKey.isBlank() || "YOUR_OPENAI_API_KEY".equals(apiKey)) {
            return getMockAnalysis();
        }

        String prompt = "You are an expert AI Resume Analyzer and HR Assistant. Analyze the following resume text and return ONLY a valid JSON object with this exact schema:\n" +
                "{\n" +
                "  \"skills\": [\"extracted skill 1\", \"extracted skill 2\"],\n" +
                "  \"score\": <integer between 0 and 100 based on resume quality>,\n" +
                "  \"missingSkills\": [\"important skill missing from the resume for their target role\"],\n" +
                "  \"suggestions\": [\"actionable improvement suggestion 1\"],\n" +
                "  \"atsCompatibility\": <integer between 0 and 100 based on formatting and keywords>,\n" +
                "  \"jobMatches\": [{ \"role\": \"Best Matching Job Role\", \"matchPercentage\": <integer> }]\n" +
                "}\n\n" +
                "IMPORTANT RULES:\n" +
                "1. DO NOT copy the placeholder values above.\n" +
                "2. Analyze the actual resume provided and generate REAListic scores, job matches, and suggestions based on its content.\n" +
                "3. If the resume belongs to a Data Scientist, return Data Science related roles in jobMatches.\n" +
                "4. Return ONLY valid JSON, without any markdown code blocks or additional text.\n\n" +
                "Resume Text:\n" + text;

        String model = "gpt-3.5-turbo";
        String apiUrl = "https://api.openai.com/v1/chat/completions";
        
        if (apiKey != null && apiKey.startsWith("sk-or-v1")) {
            apiUrl = "https://openrouter.ai/api/v1/chat/completions";
            model = "openai/gpt-3.5-turbo"; // or another valid OpenRouter model
        }

        Map<String, Object> request = new HashMap<>();
        request.put("model", model);
        request.put("messages", List.of(
            Map.of("role", "system", "content", "You are an expert AI Resume Analyzer. Always return strictly valid JSON without markdown or extra text."),
            Map.of("role", "user", "content", prompt)
        ));
        request.put("temperature", 0.3);

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);
            if (apiUrl.contains("openrouter")) {
                headers.set("HTTP-Referer", "http://localhost:5173");
                headers.set("X-Title", "Smart Resume Analyzer");
            }

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
            Map response = restTemplate.postForObject(apiUrl, entity, Map.class);

            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            String content = ((String) message.get("content")).trim();
            System.out.println("OPENAI RAW RESPONSE: " + content);

            return objectMapper.readValue(content, Map.class);
        } catch (Exception e) {
            System.err.println("OPENAI ERROR: " + e.getMessage());
            e.printStackTrace();
            return getMockAnalysis(); // Fallback to mock on any error
        }
    }

    private Map<String, Object> getMockAnalysis() {
        Map<String, Object> mock = new HashMap<>();
        mock.put("skills", List.of("Java", "Spring Boot", "React", "SQL", "REST API", "Git", "HTML", "CSS"));
        mock.put("score", 82);
        mock.put("missingSkills", List.of("Docker", "Kubernetes", "AWS", "CI/CD"));
        mock.put("suggestions", List.of(
                "Add more quantifiable achievements in your experience section.",
                "Highlight cloud technologies (AWS, Docker) to increase ATS match.",
                "Keep the resume format clean and ATS-friendly.",
                "Add relevant certifications to boost credibility.",
                "Include more role-specific keywords to pass automated screening."
        ));
        mock.put("atsCompatibility", 88);
        mock.put("jobMatches", List.of(
                Map.of("role", "Full Stack Developer", "matchPercentage", 85),
                Map.of("role", "Backend Java Developer", "matchPercentage", 92),
                Map.of("role", "Software Engineer", "matchPercentage", 78),
                Map.of("role", "Frontend Developer", "matchPercentage", 70),
                Map.of("role", "Data Engineer", "matchPercentage", 62)
        ));
        return mock;
    }
}

package com.resume.analyzer.repository;

import com.resume.analyzer.model.ResumeAnalysis;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeRepository extends MongoRepository<ResumeAnalysis, String> {
}

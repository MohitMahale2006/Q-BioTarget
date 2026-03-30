from typing import List

from pydantic import BaseModel, Field

class PatientData(BaseModel):
    patient_id: str = Field(..., example="P-0001")
    disease: str = Field(..., example="NSCLC")
    genetic_marker: str = Field(..., example="EGFR")

class DrugResult(BaseModel):
    name: str
    indication: str
    target: str
    efficacy: float
    toxicity: float
    genetic_match: bool
    ai_score: float
    energy_score: float
    binding_energy: float
    final_score: float
    confidence: float
    reason: str
    ranking_explanation: str

class AnalyzeResponse(BaseModel):
    patient_id: str
    disease: str
    genetic_marker: str
    recommended_drug: DrugResult
    all_results: List[DrugResult]
    confidence: float
    explanation: str
    disclaimer: str

from fastapi import APIRouter, HTTPException

from app.models.schemas import AnalyzeResponse, PatientData
from app.services.ai_engine import ClinicalAIError, ai_screening
from app.services.quantum_engine import simulate_quantum_energy

router = APIRouter()

DISCLAIMER = (
    "This system is a clinical decision-support prototype and should not replace professional medical judgment."
)

HYBRID_AI_WEIGHT = 0.70
HYBRID_QUANTUM_WEIGHT = 0.30


@router.post("/analyze", response_model=AnalyzeResponse)
def analyze(data: PatientData):
    try:
        ai_results = ai_screening(data.disease, data.genetic_marker)
    except ClinicalAIError as exc:
        raise HTTPException(status_code=400, detail=str(exc))

    final_results = []

    for item in ai_results:
        energy = simulate_quantum_energy(item["name"])
        combined_score = round(
            item["ai_score"] * HYBRID_AI_WEIGHT + energy["energy_score"] * HYBRID_QUANTUM_WEIGHT,
            3,
        )

        reason = (
            f"{item['name']} is selected for {item['indication']} with target {item['target']}. "
            f"AI score reflects high efficacy and {'direct' if item['genetic_match'] else 'no'} genetic match. "
            f"Quantum-inspired energy score is {energy['energy_score']:.3f}."
        )

        ranking_explanation = (
            f"Hybrid ranking uses {int(HYBRID_AI_WEIGHT * 100)}% clinical AI and "
            f"{int(HYBRID_QUANTUM_WEIGHT * 100)}% binding energy confidence. "
            f"Final score {combined_score:.3f} is stable and repeatable."
        )

        final_results.append(
            {
                "name": item["name"],
                "indication": item["indication"],
                "target": item["target"],
                "efficacy": item["efficacy"],
                "toxicity": item["toxicity"],
                "genetic_match": item["genetic_match"],
                "ai_score": item["ai_score"],
                "energy_score": energy["energy_score"],
                "binding_energy": energy["binding_energy"],
                "final_score": combined_score,
                "confidence": item["confidence"],
                "reason": reason,
                "ranking_explanation": ranking_explanation,
            }
        )

    ranked = sorted(final_results, key=lambda entry: entry["final_score"], reverse=True)
    best = ranked[0]

    explanation = (
        f"Why this drug is best: {best['name']} balances strong clinical efficacy, "
        f"the most compatible genetic marker, and robust quantum-inspired binding energy. "
        f"The prototype emphasizes explainability and stable decision support."
    )

    return {
        "patient_id": data.patient_id,
        "disease": data.disease,
        "genetic_marker": data.genetic_marker,
        "recommended_drug": best,
        "all_results": ranked,
        "confidence": best["confidence"],
        "explanation": explanation,
        "disclaimer": DISCLAIMER,
    }

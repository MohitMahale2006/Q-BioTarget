import json
import os

from app.utils.helpers import clamp, format_confidence

DATA_PATH = os.path.join(os.path.dirname(__file__), "../data/drugs.json")

class ClinicalAIError(ValueError):
    pass


def load_drug_catalog():
    with open(DATA_PATH, "r", encoding="utf-8") as handle:
        return json.load(handle)


def calculate_ai_score(drug, genetic_marker):
    efficacy_weight = 0.60
    toxicity_weight = 0.25
    genetic_weight = 0.30

    genetic_match = drug["target"].upper() == genetic_marker.upper()
    genetic_bonus = 1.0 if genetic_match else 0.0

    raw_score = (
        drug["efficacy"] * efficacy_weight
        + genetic_bonus * genetic_weight
        - drug["toxicity"] * toxicity_weight
    )

    score = clamp(raw_score, 0.0, 1.0)
    confidence = format_confidence(score)

    explanation = (
        f"Primary efficacy {drug['efficacy']:.2f}, toxicity {drug['toxicity']:.2f}, "
        f"genetic target {'matches' if genetic_match else 'does not match'} patient marker {genetic_marker}."
    )

    return {
        "name": drug["name"],
        "indication": drug["type"],
        "target": drug["target"],
        "efficacy": drug["efficacy"],
        "toxicity": drug["toxicity"],
        "genetic_match": genetic_match,
        "ai_score": round(score, 3),
        "confidence": confidence,
        "reason": explanation,
        "description": drug.get("description", ""),
    }


def ai_screening(disease, genetic_marker):
    catalog = load_drug_catalog()
    filtered = [drug for drug in catalog if drug["type"].lower() == disease.lower()]

    if not filtered:
        supported = sorted({drug["type"] for drug in catalog})
        raise ClinicalAIError(
            f"Unsupported disease type '{disease}'. Supported types: {', '.join(supported)}."
        )

    scored = [calculate_ai_score(drug, genetic_marker) for drug in filtered]
    return sorted(scored, key=lambda item: item["ai_score"], reverse=True)

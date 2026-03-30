import json
import os

from app.utils.helpers import clamp

DATA_PATH = os.path.join(os.path.dirname(__file__), "../data/drugs.json")


def load_binding_energies():
    with open(DATA_PATH, "r", encoding="utf-8") as handle:
        drugs = json.load(handle)
    return {drug["name"]: drug["base_energy"] for drug in drugs if "base_energy" in drug}


def normalize_binding_energy(binding_energy):
    min_binding = -11.0
    max_binding = -8.0
    normalized = (max_binding - binding_energy) / (max_binding - min_binding)
    return clamp(normalized, 0.0, 1.0)


def simulate_quantum_energy(drug_name):
    energy_map = load_binding_energies()
    binding_energy = energy_map.get(drug_name, -8.5)
    energy_score = round(normalize_binding_energy(binding_energy), 3)

    explanation = (
        "Quantum-inspired binding energy is derived from deterministic molecular affinity proxies. "
        "More negative binding energy indicates stronger expected target engagement. "
        "This method uses fixed reference values and does not rely on stochastic sampling."
    )

    return {
        "binding_energy": round(binding_energy, 3),
        "energy_score": energy_score,
        "explanation": explanation,
    }

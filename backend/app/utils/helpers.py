"""Common helper functions for the backend."""


def clamp(value: float, minimum: float = 0.0, maximum: float = 1.0) -> float:
    return max(minimum, min(value, maximum))


def format_confidence(score: float) -> float:
    return round(clamp(score, 0.0, 1.0) * 100.0, 2)

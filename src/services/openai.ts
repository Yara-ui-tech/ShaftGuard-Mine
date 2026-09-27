// OpenAI service for real AI suggestions and predictions
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

interface SensorSnapshot {
  waterLevel: number;
  methane: number;
  carbonMonoxide: number;
  oxygen: number;
  hydrogenSulfide: number;
  vibration: string;
  tilt: number;
  temperature: number;
  humidity: number;
  riskScore: number;
  state: 'NORMAL' | 'WARNING' | 'DANGER';
}

async function callOpenAI(systemPrompt: string, userPrompt: string): Promise<string> {
  if (!OPENAI_API_KEY) {
    return 'AI service unavailable — API key not configured.';
  }

  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      max_tokens: 400,
      temperature: 0.4,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI API error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content?.trim() ?? 'No response from AI.';
}

export async function getAiWarningActions(sensors: SensorSnapshot): Promise<string[]> {
  const systemPrompt = `You are ShaftGuard AI, an expert mine safety management system. 
You monitor real-time sensor data and provide precise, actionable safety instructions.
When given sensor readings, respond ONLY with a JSON array of 5–7 concise action strings.
Each action must be direct, specific, and professionally worded. No intro text, no markdown — only the JSON array.`;

  const userPrompt = `Mine sensor alert — State: ${sensors.state}
Water Level: ${sensors.waterLevel}%
Methane (CH4): ${sensors.methane}% LEL
Carbon Monoxide: ${sensors.carbonMonoxide} ppm
Oxygen: ${sensors.oxygen}%
Hydrogen Sulfide: ${sensors.hydrogenSulfide} ppm
Vibration: ${sensors.vibration}
Shaft Tilt: ${sensors.tilt}°
Temperature: ${sensors.temperature}°C
Humidity: ${sensors.humidity}%
Risk Score: ${sensors.riskScore}/100

Return a JSON array of recommended actions for the control room operator.`;

  const raw = await callOpenAI(systemPrompt, userPrompt);
  try {
    const jsonStr = raw.match(/\[[\s\S]*\]/)?.[0] ?? '[]';
    return JSON.parse(jsonStr);
  } catch {
    return [raw];
  }
}

export async function getAiPredictions(sensors: SensorSnapshot): Promise<string> {
  const systemPrompt = `You are ShaftGuard AI, an expert predictive analytics engine for underground mines. 
Based on current sensor readings, predict hazards likely to develop in the next 2–8 hours.
Be specific about which underground zones are at risk and what could go wrong.
Keep your response under 120 words and written in professional mine-safety language.`;

  const userPrompt = `Current readings — State: ${sensors.state}
Water Level: ${sensors.waterLevel}%, Methane: ${sensors.methane}% LEL, CO: ${sensors.carbonMonoxide} ppm
O2: ${sensors.oxygen}%, H2S: ${sensors.hydrogenSulfide} ppm, Vibration: ${sensors.vibration}
Tilt: ${sensors.tilt}°, Temperature: ${sensors.temperature}°C, Humidity: ${sensors.humidity}%
Risk Score: ${sensors.riskScore}/100

What hazards are likely to develop in the next 2–8 hours?`;

  return callOpenAI(systemPrompt, userPrompt);
}

export async function getMineralParameterRecommendations(minerals: string[]): Promise<string[]> {
  const systemPrompt = `You are ShaftGuard AI, a mine safety expert. 
Given a list of target minerals, recommend the most critical sensor parameters to monitor underground.
Return ONLY a JSON array of parameter name strings. No markdown, no intro text.`;

  const userPrompt = `Minerals being mined: ${minerals.join(', ')}
What are the most important safety parameters to monitor? Include gas types, structural, water quality, and atmospheric parameters specific to these minerals.`;

  const raw = await callOpenAI(systemPrompt, userPrompt);
  try {
    const jsonStr = raw.match(/\[[\s\S]*\]/)?.[0] ?? '[]';
    return JSON.parse(jsonStr);
  } catch {
    return [raw];
  }
}

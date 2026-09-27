# SHAFTGUARD AI

**"Detect the danger before the shaft fails."**

SHAFTGUARD AI is a modular intelligent mining monitoring platform, initially developed as a student-led engineering innovation for the Zimbabwean mining sector with a focus on artisanal and small-scale mining safety. 

> **Important Disclaimer:** This platform is an early-warning, monitoring, and decision-support tool (Prototype Phase). It does not replace certified mine-safety procedures, professional laboratory testing, or structural engineering assessments.

---

## 🚀 The Solution

The platform operates through a modular approach, gathering environmental, structural, and personnel data at the edge, and providing clear, actionable insights through a centralized dashboard.

### Core Modules
*   **SHAFTGUARD-S (Shaft Safety):** Monitors underground structural integrity using vibration, tilt, and water level sensors.
*   **SHAFTGUARD-W (Water Monitoring):** Conducts continuous baseline water quality screening (pH, turbidity, conductivity, flow rate).
*   **SHAFTGUARD-A (Air Guard):** Tracks atmospheric hazards including O2, CO, CH4 (Methane), and H2S.
*   **SHAFTGUARD-H (Personnel Tracking):** Tracks worker locations and monitors real-time safety status via smart helmet integrations.

### Key Features
*   **Pre-Entry AI Predictions:** Runs analytical scans *before* personnel enter a shaft to predict hazards up to 8 hours in advance based on sensor trends.
*   **Real-time Alerting:** Simulates immediate notifications for hazard events (DANGER, HIGH RISK, WARNING).
*   **Demo Mode:** Built-in presentation engine designed for seamless switching between Normal, Warning, and Danger states for live MVP demonstrations and pitching.
*   **Responsive Industrial UI:** A premium, dark-mode focused interface optimized for both desktop command centers and mobile field units.

## 💻 Tech Stack
- **Framework:** React 18 / Vite
- **Styling:** Tailwind CSS (Custom Dark Industrial Theme)
- **Icons:** Lucide React
- **Data Visualization:** Recharts
- **Routing:** React Router DOM

## 🛠️ Running Locally

To run the SHAFTGUARD AI platform locally for development or presentations:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Yara-ui-tech/ShaftGuard-Mine.git
   cd ShaftGuard-Mine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📋 Pitch & Demo Mode

The application includes a specialized `Pitch Mode` and interactive `Demo Controls`. 
- Access the **Engineering Demo** button in the top right header to simplify the UI during rapid pitches.
- Use the **Demo Controls** toggle (available on Dashboard and Module pages) to dynamically simulate Normal, Warning, and Danger conditions across the entire application state.

---
*Developed for the MineTech Innovation Challenge.*

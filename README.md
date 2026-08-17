# 🎭 eRecog – Emotion Recognition for Online Meetings.

**eRecog** is a real-time emotion recognition web application designed to assist virtual meeting hosts by analyzing participant emotions via facial expressions, vocal tone, and post-meeting ratings. It helps improve meeting quality and engagement by providing live emotional insights using AI.

---

## 📌 Hosted Link

🌐 [https://erecog.vercel.app/](https://erecog.vercel.app/)

> *Best viewed in Google Chrome*

---

## ✨ Features

* 🎥 **Facial Emotion Detection**
  Analyze live webcam feeds from shared screens and detect emotional states like happy, sad, angry, etc.

* 🎙️ **Voice Emotion Recognition**
  Analyze speaker audio through microphone input to classify emotions in real time.

* 🌟 **Participant Feedback**
  Collect 1–5 star post-meeting ratings through a unique feedback link.

---

## 📸 Product Walkthrough

The screens below show the complete workflow, from live multimodal analysis to the completed-session summary. Emotion labels are model inferences rather than definitive assessments of a person's internal state.

### Post-meeting analytics

![Post-meeting E-Recog emotion analytics dashboard](docs/screenshots/post-meeting-analytics.jpg)

*A completed-session dashboard combines an audience emotion radar, speaker voice trends, an emotion timeline, and actions for feedback collection and data export.*

<table>
  <tr>
    <td width="50%">
      <strong>Multi-participant face analysis</strong><br><br>
      <img src="docs/screenshots/face-analysis-grid.jpg" alt="E-Recog multi-participant facial expression analysis" width="100%"><br>
      <sub>Face-detection confidence and inferred emotion labels are overlaid on a shared meeting view.</sub>
    </td>
    <td width="50%">
      <strong>Live emotion statistics</strong><br><br>
      <img src="docs/screenshots/live-emotion-statistics.jpg" alt="E-Recog live audience and speaker emotion trends" width="100%"><br>
      <sub>Audience facial-expression and speaker voice-emotion signals are visualized over time.</sub>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <strong>Voice emotion analysis</strong><br><br>
      <img src="docs/screenshots/voice-emotion-analysis.jpg" alt="E-Recog aggregated voice emotion predictions" width="100%"><br>
      <sub>Voice predictions are aggregated at short intervals; the interface states that raw audio is not recorded.</sub>
    </td>
    <td width="50%">
      <strong>Single-subject expression demo</strong><br><br>
      <img src="docs/screenshots/facial-expression-demo.jpg" alt="E-Recog single-subject facial expression analysis" width="100%"><br>
      <sub>Per-frame face detection displays inferred emotion confidence scores during a shared video.</sub>
    </td>
  </tr>
</table>

---

## 🚀 How to Use

1. **Create & Start a Meeting**
   Register and start a meeting. Grant screen-sharing permissions and choose your video conferencing app window.

2. **Track Emotions in Real-Time**

   * View detected facial emotions in the **Faces** tab.
   * Enable microphone tracking to activate **Voice** analysis.

3. **Collect Feedback**
   Stop the meeting and generate a feedback link for participants. View results in the **Ratings** tab.

---

## 🔐 Privacy First

* All emotion recognition happens locally in the browser.
* No voice or video data is stored.
* Only anonymized and aggregated results are sent to the cloud (via AWS).

---

## 🧰 Tech Stack

* **Frontend**: React.js (CRA)
* **Emotion Analysis**: TensorFlow\.js / WebRTC / Audio Analysis APIs
* **Backend**: AWS (for analytics & feedback storage)
* **Hosting**: Vercel
* **Browser**: Chrome recommended (other browsers may lack full support)

---

## 💻 Development Setup

Clone the repo and install dependencies:

```bash
git clone https://github.com/yourusername/erecog.git
cd erecog
npm install
```

**Important:** For OpenSSL compatibility during development, run:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

Start the dev server:

```bash
npm start
```

Build the production app:

```bash
npm run build
```

Eject configuration (optional):

```bash
npm run eject
```

> *Warning: Ejecting is irreversible. Only do this if you need complete control over the build process.*

---

---

### 🚀 Maintained by [Sanjay A R](https://github.com/sanjay-ar)

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-blue?style=flat-square&logo=vercel)](https://portfolio-ar.vercel.app/)  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Sanjay%20A%20R-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/sanjay-ar/)  
[![GitHub](https://img.shields.io/badge/GitHub-sanjay--ar-black?style=flat-square&logo=github)](https://github.com/sanjay-ar)

> 💡 *Like this project? Leave a ⭐ and connect with me!*



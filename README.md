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




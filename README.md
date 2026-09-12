# 🚗 AutoTracky

> **Smart passenger detection and Lost & Found for transportation using BLE.**

AutoTracky is a hackathon prototype that combines **ESP32, Bluetooth Low Energy (BLE), Android, React, and Firebase** to detect a passenger/device during a journey.

When the expected BLE device is detected, the passenger dashboard updates in real time and can trigger a local notification. Passengers can also select a previous journey and report a lost item through an integrated **Lost & Found** workflow.

---

## 🚀 What Problem Does It Solve?

In transportation, it can be difficult to:

* Automatically detect whether a passenger/device has been detected.
* Give passengers immediate feedback about their ride detection.
* Keep a digital record of previous detections.
* Report belongings forgotten during a journey.
* Connect a lost-item report with the journey where it was lost.

**AutoTracky connects physical BLE detection with a digital passenger experience.**

---

## 💡 How It Works

```text
ESP32
  │
  │ BLE Advertisement
  ▼
BLE Detection
  │
  ▼
Android / AutoTracky App
  │
  ├── Ride Detection
  ├── Real-time Status
  ├── Local Notification
  └── Journey History
          │
          ▼
      Lost & Found
          │
          ▼
       Firebase
```

### 🔄 Detection Flow

1. ESP32 advertises BLE information.
2. The Android application scans for the expected BLE device.
3. The system detects the configured device.
4. The ride/detection state is updated.
5. The AutoTracky dashboard reflects the change in real time.
6. A local notification can be triggered.
7. The detection becomes part of the passenger's journey history.

### 🧳 Lost & Found Flow

```text
Select Journey
      ↓
Report Lost Item
      ↓
Enter Item + Description
      ↓
Submit Request
      ↓
Firebase
```

---

## ✨ Key Features

| Feature                    | Description                                          |
| -------------------------- | ---------------------------------------------------- |
| 📡 **BLE Detection**       | Detects the configured BLE device/passenger          |
| 🔌 **ESP32 Integration**   | Uses ESP32 as the BLE hardware component             |
| ⚡ **Real-time Status**     | Dashboard responds to detection state changes        |
| 🔔 **Local Notifications** | Android notification when ride detection occurs      |
| 📱 **Passenger Dashboard** | View BLE, ride, and account information              |
| 🧭 **Journey History**     | View previous vehicle/passenger detections           |
| 🧳 **Lost & Found**        | Report an item against a previous journey            |
| 🔥 **Firebase**            | Authentication and real-time data storage            |
| 🤖 **Android APK**         | React application packaged as an Android application |

---

## 🎥 Demo

### ▶️ Working Demo


https://github.com/user-attachments/assets/1457d4c5-318a-4a4b-9e04-7e01d8473a90


The demo showcases the actual working AutoTracky prototype, including:

* ESP32 BLE advertising
* BLE device detection
* Real-time dashboard status
* Android local notification
* Journey history
* Lost & Found workflow

> **GitHub tip:** Drag and drop your `AutoTracky Demo Video.mp4` directly into this section while editing the README on GitHub. GitHub will automatically generate the video attachment.

---

## 🏗️ Architecture

```text
                ┌──────────────────┐
                │      ESP32       │
                │  BLE Advertising │
                └────────┬─────────┘
                         │
                        BLE
                         │
                         ▼
              ┌─────────────────────┐
              │  Android / React    │
              │     Application     │
              ├─────────────────────┤
              │  BLE Detection      │
              │  Ride Status        │
              │  Notifications      │
              │  Journey History    │
              │  Lost & Found       │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │      Firebase       │
              ├─────────────────────┤
              │  Authentication     │
              │  Realtime Database  │
              └─────────────────────┘
```

### Main Components

1. **ESP32** — BLE hardware component.
2. **Bluetooth Low Energy** — Wireless detection mechanism.
3. **React + TypeScript** — Application interface.
4. **Capacitor + Android** — Mobile application layer.
5. **Firebase Authentication** — User authentication.
6. **Firebase Realtime Database** — Real-time application data.
7. **Local Notifications** — Android ride-detection notifications.

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Lucide React

### Mobile

* Capacitor
* Android
* Capacitor Local Notifications

### Hardware

* ESP32
* Bluetooth Low Energy (BLE)

### Backend / Cloud

* Firebase Authentication
* Firebase Realtime Database

---

## 📁 Project Structure

```text
AutoTracky/
│
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   └── RideDetector.tsx
│   │
│   ├── firebase/
│   │   ├── config.ts
│   │   ├── database.ts
│   │   ├── rideService.ts
│   │   └── lostAndFoundService.ts
│   │
│   ├── pages/
│   │   └── Dashboard.tsx
│   │
│   ├── services/
│   │   ├── detectionService.ts
│   │   ├── notificationService.ts
│   │   └── userService.ts
│   │
│   └── types/
│       └── index.ts
│
├── android/
├── package.json
├── vite.config.*
└── tsconfig.*
```

---

## ⚙️ Setup

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Android Studio
* Android SDK
* ESP32 development environment
* Firebase project
* Physical Android device for BLE testing

### 1. Clone the Repository

```bash
git clone YOUR_REPOSITORY_URL
cd AutoTracky
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Firebase

Configure the Firebase project and provide the required Firebase configuration using the project's existing configuration/environment setup.

> ⚠️ **Do not commit private credentials, API keys, or secrets to the repository.**

### 4. Run the Web Application

Start the development server:

```bash
npm run dev
```

Build the production version:

```bash
npm run build
```

### 5. Run on Android

Sync the web application with the Android project:

```bash
npx cap sync android
```

Open the Android project in Android Studio:

```bash
npx cap open android
```

---

## 🔥 Firebase

AutoTracky uses Firebase for authentication and real-time application data.

### Firebase Authentication

Used for:

* Passenger authentication
* User account management
* Secure access to the application

### Firebase Realtime Database

Used for:

* Ride/detection information
* Journey history
* Lost & Found requests
* Real-time application updates

---

## 🧳 Lost & Found

Passengers can report an item from their journey history.

```text
Journey History
      ↓
⋮ Report Lost Item
      ↓
Lost Item Form
      ↓
Item + Description
      ↓
Submit
      ↓
Firebase
```

The lost-item request is associated with the selected journey and can contain information such as:

* Passenger ID
* Journey/detection reference
* BLE ID
* Device name
* Vehicle/Auto ID
* Item name
* Description
* Priority
* Status
* Timestamps

This allows a lost-item report to remain connected to the journey during which the item was potentially lost.

---

## 🎯 Potential Use Cases

AutoTracky can potentially be adapted for:

* 🎓 College buses
* 🚌 School transportation
* 🚍 Public transportation
* 🏢 Employee transportation
* 🏫 Campus transportation
* 🧳 Transportation Lost & Found

> These are potential applications of the prototype, not current production deployments.

---

## 🏆 Why AutoTracky?

AutoTracky brings together:

```text
Physical BLE Detection
          +
Mobile Application
          +
Real-time Data
          +
Lost & Found
```

Instead of treating passenger detection and Lost & Found as separate systems, the prototype connects them through the passenger's **journey**.

This creates a more connected transportation experience where a detected ride can become the foundation for journey history and future lost-item reporting.

---

## ⚠️ Limitations

As a hackathon prototype, AutoTracky currently has some limitations:

* BLE range and signal interference can affect detection.
* Android background restrictions can affect application behavior.
* Device compatibility may vary.
* Local notifications are not a replacement for guaranteed push notifications when the app is completely terminated.
* Firebase rules and infrastructure require additional hardening for production.
* A complete transportation operator workflow would require additional development.

---

## 🔮 Future Scope

Future versions could include:

* 🚍 Multi-vehicle / fleet support
* 🖥️ Admin / operator dashboard
* 📊 Passenger and journey analytics
* 🧳 Automated lost-item matching
* 🤖 AI-assisted lost-item classification
* 🗺️ Richer route and journey history
* 🔔 More reliable background / push notifications
* ☁️ Scalable transportation infrastructure

---

## 🏆 Hackathon Details

**Hackathon:** MUJ HACKX 4.0 PS — #6 WILDCARD INNOVATION CHALLENGE (OPEN INNOVATION)

**Team Name:** TRIO TITANS

---

# 🚗 AutoTracky

> **BLE-powered passenger detection and a smarter Lost & Found experience for transportation.**

---

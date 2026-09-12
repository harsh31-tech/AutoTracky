# 🚗 AutoTracky

> **Smart passenger detection and lost-and-found for transportation using BLE.**

AutoTracky is a hackathon prototype that combines **ESP32, Bluetooth Low Energy (BLE), Android, React, and Firebase** to detect a passenger/device during a journey.

When the expected BLE device is detected, the passenger dashboard updates in real time and can trigger a local notification. Passengers can also select a previous journey and report a lost item through an integrated Lost & Found workflow.

---

## 🚀 What Problem Does It Solve?

In transportation, it can be difficult to:

- Automatically detect whether a passenger/device has been detected.
- Give passengers immediate feedback about their ride detection.
- Keep a digital record of previous detections.
- Report belongings forgotten during a journey.
- Connect a lost-item report with the journey where it was lost.

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
Detection Flow
ESP32 advertises BLE information.
The system detects the expected BLE device.
Ride/detection state is updated.
The AutoTracky dashboard reflects the change.
A local notification can be triggered.
The detection becomes part of the passenger's journey history.

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
✨ Key Features
Feature	Description
📡 BLE Detection	Detects the configured BLE device/passenger
🔌 ESP32 Integration	Uses ESP32 as the BLE hardware component
⚡ Realtime Status	Dashboard responds to detection state changes
🔔 Notifications	Android local notification for ride detection
📱 Passenger Dashboard	View BLE, ride and account information
🧭 Journey History	View previous vehicle detections
🧳 Lost & Found	Report an item against a previous journey
🔥 Firebase	Authentication and realtime data storage
🤖 Android APK	React application packaged for Android

🎥 Demo
▶️ Working Demo

Watch the AutoTracky Demo


https://github.com/user-attachments/assets/a7881c8e-772d-461e-b7ff-02ee6373aa0f


The demo shows the actual working prototype, including the BLE detection flow, application status/notification behavior, and Lost & Found workflow.

🏗️ Architecture

```
                ┌───────────────┐
                │     ESP32     │
                │ BLE Advertising│
                └───────┬───────┘
                        │
                       BLE
                        │
                        ▼
              ┌──────────────────┐
              │ Android / React  │
              │    Application   │
              ├──────────────────┤
              │ BLE Detection    │
              │ Ride Status      │
              │ Notifications    │
              │ Journey History  │
              │ Lost & Found     │
              └────────┬─────────┘
                       │
                       ▼
              ┌──────────────────┐
              │     Firebase     │
              ├──────────────────┤
              │ Authentication   │
              │ Realtime Database│
              └──────────────────┘
```
Main Components
1.ESP32 — BLE hardware component.
2.BLE — Wireless detection mechanism.
3.React + TypeScript — Application interface.
4.Capacitor + Android — Mobile application layer.
5.Firebase Authentication — User authentication.
6.Firebase Realtime Database — Realtime application data.
7.Local Notifications — Android ride-detection notifications.

🛠️ Tech Stack
1.Frontend
2.React
3.TypeScript
Vite
Tailwind CSS
Lucide React
Mobile
Capacitor
Android
Capacitor Local Notifications
Hardware
ESP32
Bluetooth Low Energy (BLE)
Backend / Cloud
Firebase Authentication
Firebase Realtime Database

📁 Project Structure

```
src/
├── components/
│   ├── dashboard/
│   ├── layout/
│   └── RideDetector.tsx
│
├── firebase/
│   ├── config.ts
│   ├── database.ts
│   ├── rideService.ts
│   └── lostAndFoundService.ts
│
├── pages/
│   └── Dashboard.tsx
│
├── services/
│   ├── detectionService.ts
│   ├── notificationService.ts
│   └── userService.ts
│
└── types/
    └── index.ts

android/
package.json
vite.config.*
tsconfig.*

```
⚙️ Setup

Prerequisites
Node.js
npm
Android Studio
Android SDK
ESP32 development environment
Firebase project
Physical Android device for BLE testing

1. Clone
```
git clone YOUR_REPOSITORY_URL
cd AutoTracky
```
2. Install

```
npm install
```
3. Configure Firebase

Configure the Firebase project and provide the required Firebase configuration using the project's existing configuration/environment setup.

Do not commit private credentials or secrets.

4. Run Web App

```
npm run dev
npm run build

```
5. Android
```
npx cap sync android
npx cap open android
```

🔥 Firebase

AutoTracky uses:

Firebase Authentication for user authentication.
Firebase Realtime Database for realtime ride/detection data and Lost & Found requests.

🧳 Lost & Found

Passengers can report an item from their journey history.
```
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
The request is associated with the selected journey and contains information such as:

Passenger ID
Journey/detection reference
BLE ID
Device name
Vehicle/Auto ID
Item name
Description
Priority
Status
Timestamps

🎯 Potential Use Cases

AutoTracky can potentially be adapted for:

🎓 College buses
🚌 School transportation
🚍 Public transportation
🏢 Employee transportation
🏫 Campus transportation
🧳 Transportation Lost & Found

These are potential applications of the prototype, not current production deployments.

🏆 Why AutoTracky?

AutoTracky brings together:

Physical BLE Detection + Mobile Application + Realtime Data + Lost & Found

Instead of treating passenger detection and lost-and-found as separate systems, the prototype connects them through the passenger's journey.

⚠️ Limitations

As a hackathon prototype, AutoTracky currently has limitations:

BLE range and signal interference can affect detection.
Android background restrictions can affect application behavior.
Device compatibility may vary.
Local notifications are not a replacement for guaranteed push notifications when the app is completely terminated.
Firebase rules and infrastructure require additional hardening for production.
A complete transportation operator workflow would require additional development.

🔮 Future Scope

Future versions could include:

🚍 Multi-vehicle/fleet support
🖥️ Admin/operator dashboard
📊 Passenger and journey analytics
🧳 Automated lost-item matching
🤖 AI-assisted lost-item classification
🗺️ Richer route/journey history
🔔 More reliable background/push notifications
☁️ Scalable transportation infrastructure

🏆 Hackathon Details
	
Hackathon - MUJ HACKX 4.0
PS - #6 WILDCARD INNOVATION CHALLENGE (OPEN INOVATION)
Team Name - TRIO TITANS

🚗 AutoTracky

BLE-powered passenger detection and a smarter Lost & Found experience for transportation.

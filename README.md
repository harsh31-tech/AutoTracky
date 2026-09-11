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

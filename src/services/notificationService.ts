import { LocalNotifications } from "@capacitor/local-notifications";

const CHANNEL_ID = "ride-detection";

export async function initializeNotifications() {
  try {
    const permission = await LocalNotifications.checkPermissions();

    if (permission.display !== "granted") {
      const result = await LocalNotifications.requestPermissions();

      if (result.display !== "granted") {
        console.warn("Notification permission was not granted.");
        return false;
      }
    }

    await LocalNotifications.createChannel({
      id: CHANNEL_ID,
      name: "Ride Detection",
      description: "Notifications when your ride is detected.",
      importance: 5,
      visibility: 1,
      sound: "default",
    });

    return true;
  } catch (error) {
    console.error("Failed to initialize notifications:", error);
    return false;
  }
}

export async function notifyRideDetected(deviceName: string) {
  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: Date.now() % 2147483647,
          title: "🚗 Ride Detected",
          body: `${deviceName} is nearby. Your are traveling with UP78 JU XX45.`,
          channelId: CHANNEL_ID,
          smallIcon: "ic_stat_icon_config_sample",
          schedule: {
            at: new Date(Date.now() + 100),
          },
        },
      ],
    });
  } catch (error) {
    console.error("Failed to send ride notification:", error);
  }
}

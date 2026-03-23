import * as Notifications from "expo-notifications"

export async function scheduleReturnNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Hora do seu corte 💈",
      body: "Já se passaram 4 meses, agende seu horário!"
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60 * 60 * 24 * 120 
    }
  })
}
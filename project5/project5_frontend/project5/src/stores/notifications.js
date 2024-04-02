import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const Notification = create(
    persist(
        (set) => ({
            notifications: [], // state variable to keep all notifications 
            updateNotifications: (notifications) => set=({notifications}), // a function to update the list of notifications 
            ddNotification: (newNotification) => set((state) => ({notifications: 
            [...state.notifications, newNotification]})) // a function to add a new notification to the list of notifications 

        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
//define the store
export const mediaStore = create(
  persist(
    (set) => ({
      mediatype: {},
      updateMediatype: (mediatype) => set({ mediatype }),
    }),

    {
      name: "mystore", // the name to use for the persisted data
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

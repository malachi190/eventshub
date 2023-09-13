import { create } from "zustand";

const store = (set) => ({
  events: {
    name: "",
    type: "",
    location: "",
    date: "",
    // img: "",
    price: "",
    venue: "",
  },
  addEvent: (name, type, location, date, price, venue) =>
    set(() => ({
      events: { name, type, location, date, price, venue },
    })),
});

export const useStore = create(store);

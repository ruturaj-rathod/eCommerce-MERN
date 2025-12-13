import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface ShippingInfo {
  address: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  phoneNo: string;
}

interface ShippingState {
  shippingInfo: ShippingInfo;
  saveShippingInfo: (info: ShippingInfo) => void;
}

const useShippingStore = create<ShippingState>()(
  persist(
    (set) => ({
      shippingInfo: {
        address: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        phoneNo: "",
      },
      saveShippingInfo: (info) => set({ shippingInfo: info }),
    }),
    {
      name: "shipping-storage",
    }
  )
);

export default useShippingStore;

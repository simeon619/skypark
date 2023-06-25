import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { icons } from "./../Utilis/data";

type StateSchema = {
  primaryColourLight: string;
  primaryColour: string;
  name: string;
};

export const stateApp: { [key: string]: StateSchema } = {
  B: {
    primaryColourLight: "#E6D6F8",
    primaryColour: "#A85DFD",
    name: "Building",
  },
  N: {
    primaryColour: "#EA9093",
    primaryColourLight: "#E8BBBE",
    name: "Neighbor",
  },
};

type ToggleState = {
  primaryColourLight: string;
  primaryColour: string;
  name: string;
  toggleState: () => void;
};

export const useToggleStore = create<ToggleState, any>(
  persist<ToggleState>(
    (set, get) => ({
      primaryColourLight: stateApp["B"].primaryColourLight,
      primaryColour: stateApp["B"].primaryColour,
      name: stateApp["B"].name,
      toggleState: () => {
        set((state) => {
          const nextStateKey =
            get().primaryColour === stateApp["B"].primaryColour ? "N" : "B";
          const nextState = stateApp[nextStateKey];
          return {
            primaryColourLight: nextState.primaryColourLight,
            primaryColour: nextState.primaryColour,
            name: nextState.name,
          };
        });
      },
    }),
    {
      name: "toggleApp",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useToggleStore;

/****************************************TYPEFORM********************************************* */
interface Icon {
  url: string;
  name: string;
}

type IconName = (typeof icons)[number]["name"];

export const typeform: IconName = "Client";

type stateForm = {
  IconName: IconName;
  switchForm: (value: IconName) => void;
};

export const useTypeForm = create<stateForm, any>(
  persist(
    (set, get) => ({
      IconName: "Annonce",
      switchForm: (value: IconName) => {
        set({ IconName: value });
      },
    }),
    { name: "formType", storage: createJSONStorage(() => AsyncStorage) }
  )
);

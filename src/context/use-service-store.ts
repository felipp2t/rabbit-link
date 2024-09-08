import { Service } from "@/types/service";
import { create } from "zustand";

interface ServiceState {
  service: Service;

  categoriesSelected: string[];
  addCategory: (category: string) => void;

  step: number;

  createService: () => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  editService: (id: string, service: Omit<Service, "id">) => Promise<void>;
  selectAllServices: () => Promise<void>;
  selectServiceById: (id: string) => Service;

  handleDayToggle: (day: string) => void;
  handleTimeChange: (day: string, type: "start" | "end", value: string) => void;
  handleNext: () => void;
  handlePrevious: () => void;

  setTitle: (title: string) => void;
  setPrice: (price: string) => void;
  setDescription: (description: string) => void;
  setLocation: (location: string) => void;
  setWorkType: (workType: "remoto" | "presencial" | "híbrido") => void;

  handleValidationToNextStep: () => boolean;
}

export const useServiceStore = create<ServiceState>()((set, get) => ({
  step: 1,

  service: {
    id: "",
    title: "",
    description: "",
    price: "",
    location: "",
    workType: "remoto",
    availability: {},
    categories: [],
  },

  categoriesSelected: [],

  createService: async () => {},

  deleteService: async (id: string) => {},

  editService: async (id: string, service: Omit<Service, "id">) => {},

  selectAllServices: async () => {},

  addCategory: (category: string) =>
    set((state) => {
      const categoryAlreadyExists = state.categoriesSelected.includes(category);

      if (categoryAlreadyExists) {
        return {
          ...state,
          categoriesSelected: state.categoriesSelected.filter(
            (c) => c !== category,
          ),
        };
      }

      if (!categoryAlreadyExists && state.categoriesSelected.length < 3) {
        return {
          ...state,
          categoriesSelected: [...state.categoriesSelected, category],
        };
      }

      return state;
    }),

  selectServiceById: (id: string) => {
    const state = get();

    return state.service;
  },

  handleNext: () => {
    set((state) => ({
      step: state.step + 1,
    }));
  },

  handlePrevious: () => {
    set((state) => ({
      step: state.step - 1,
    }));
  },

  handleDayToggle: (day) =>
    set((state) => {
      const isAvailable = state.service.availability[day] !== undefined;

      const updatedAvailability = { ...state.service.availability };
      if (isAvailable) {
        delete updatedAvailability[day];
      } else {
        updatedAvailability[day] = { start: "09:00", end: "17:00" };
      }

      return {
        service: {
          ...state.service,
          availability: updatedAvailability,
        },
      };
    }),

  handleTimeChange: (day: string, type: "start" | "end", value: string) =>
    set((state) => ({
      service: {
        ...state.service,
        availability: {
          ...state.service.availability,
          [day]: {
            ...(state.service.availability[day] || { start: "", end: "" }),
            [type]: value,
          },
        },
      },
    })),

  setTitle: (title) =>
    set((state) => ({
      service: {
        ...state.service,
        title,
      },
    })),

  setPrice: (price) =>
    set((state) => ({
      service: {
        ...state.service,
        price,
      },
    })),

  setDescription: (description) =>
    set((state) => ({
      service: {
        ...state.service,
        description,
      },
    })),

  setLocation: (location) =>
    set((state) => ({
      service: {
        ...state.service,
        location,
      },
    })),

  setWorkType: (workType) =>
    set((state) => ({
      service: {
        ...state.service,
        workType,
      },
    })),

  handleValidationToNextStep: () => {
    const state = get();

    if (state.categoriesSelected.length === 0) return true;

    const isAnyFieldEmpty =
      !state.service.title ||
      !state.service.description ||
      !state.service.price ||
      !state.service.location ||
      (state.service.availability &&
        Object.keys(state.service.availability).length === 0);

    const isValid = state.step === 2 && isAnyFieldEmpty;

    return isValid;
  },
}));

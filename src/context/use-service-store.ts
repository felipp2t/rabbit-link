import { Service, Location } from "@/types/service";
import { create } from "zustand";

interface ServiceState {
  service: Service;
  categoriesSelected: string[];
  addCategory: (categoryId: string) => void;

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
  setLocation: (location: Location) => void;
  setWorkType: (workType: "REMOTO" | "PRESENCIAL" | "HÍBRIDO") => void;

  handleValidationToNextStep: () => boolean;

  error: string | null;
}

export const useServiceStore = create<ServiceState>()((set, get) => ({
  step: 1,
  error: null,

  service: {
    id: "",
    title: "",
    description: "",
    price: "",
    location: {
      id: "",
      city: "",
      state: ""
    },
    workType: "REMOTO",
    availability: {},
    categories: [],
  },

  categoriesSelected: [],

  createService: async () => {},

  deleteService: async (id: string) => {},

  editService: async (id: string, service: Omit<Service, "id">) => {},

  selectAllServices: async () => {},

  addCategory: (categoryId: string) =>
    set((state) => {
      const categoryIdAlreadyExists =
        state.categoriesSelected.includes(categoryId);

      if (categoryIdAlreadyExists) {
        return {
          ...state,
          categoriesSelected: state.categoriesSelected.filter(
            (c) => c !== categoryId,
          ),
        };
      }

      if (!categoryIdAlreadyExists && state.categoriesSelected.length < 3) {
        return {
          ...state,
          categoriesSelected: [...state.categoriesSelected, categoryId],
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
    set((state) => {
      const priceWithoutSpace = price.trim();
      const number = parseFloat(priceWithoutSpace);

      if (isNaN(number)) {
        return {
          ...state,
          error: "Erro: Entrada inválida",
        };
      }

      return {
        service: {
          ...state.service,
          price,
        },
        error: null,
      };
    }),

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

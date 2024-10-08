import { Category } from "@/types/category";
import { Location, ServiceRequest } from "@/types/service/service-request";
import { create } from "zustand";

interface ServiceState {
  service: ServiceRequest;

  addCategory: (categories: Category) => void;

  step: number;
  setStep: (step: number) => void;

  createService: () => Promise<void>;
  deleteService: (id: string) => Promise<void>;
  editService: (
    id: string,
    service: Omit<ServiceRequest, "id">,
  ) => Promise<void>;
  selectAllServices: () => Promise<void>;
  selectServiceById: (id: string) => ServiceRequest;

  handleNext: () => void;
  handlePrevious: () => void;

  setTitle: (title: string) => void;
  setMinimumPrice: (minimum: string) => void;
  setMaximunPrice: (maximum: string) => void;
  setDescription: (description: string) => void;
  setLocation: (location: Location) => void;
  setWorkType: (workType: "REMOTE" | "ONSITE" | "HYBRID") => void;
  setDeadline: (deadline: string) => void;

  handleValidationToNextStep: () => boolean;

  formatBrazilNumber: (price: string) => number;

  error: string | null;
}

export const useServiceStore = create<ServiceState>()((set, get) => ({
  step: 1,
  error: null,

  service: {
    id: "",
    title: "",
    description: "",
    price: {
      minimum: "",
      maximum: "",
    },
    location: {
      id: "",
      city: "",
      state: "",
    },
    workType: "REMOTE",
    categories: [],
    deadline: "",
  },

  categoriesSelected: [],

  createService: async () => {},

  deleteService: async (id: string) => {},

  editService: async (id: string, service: Omit<ServiceRequest, "id">) => {},

  selectAllServices: async () => {},

  addCategory: (category) =>
    set((state) => {
      const categoryIdAlreadyExists = state.service.categories.find(
        (c) => c.id === category.id,
      );

      if (categoryIdAlreadyExists) {
        return {
          service: {
            ...state.service,
            categories: state.service.categories.filter(
              (c) => c.id !== category.id,
            ),
          },
        };
      }

      if (!categoryIdAlreadyExists && state.service.categories.length < 3) {
        return {
          service: {
            ...state.service,
            categories: [...state.service.categories, category],
          },
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

  setTitle: (title) =>
    set((state) => ({
      service: {
        ...state.service,
        title,
      },
    })),

  setMaximunPrice: (maximum) =>
    set((state) => ({
      service: {
        ...state.service,
        price: {
          ...state.service.price,
          maximum,
        },
      },
    })),

  setMinimumPrice: (minimum) =>
    set((state) => ({
      service: {
        ...state.service,
        price: {
          ...state.service.price,
          minimum,
        },
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

  setDeadline: (deadline) =>
    set((state) => ({
      service: {
        ...state.service,
        deadline,
      },
    })),

  handleValidationToNextStep: () => {
    const state = get();

    if (state.service.categories.length === 0) return true;

    const isAnyFieldEmpty =
      !state.service.title ||
      !state.service.description ||
      !state.service.price ||
      !state.service.location ||
      !state.service.workType;

    const isValid = state.step === 2 && isAnyFieldEmpty;

    return isValid;
  },

  formatBrazilNumber: (price: string) => {
    let formattedPrice = price.replace(/\./g, "");

    formattedPrice = formattedPrice.replace(",", ".");

    console.log(parseFloat(formattedPrice));

    return parseFloat(formattedPrice);
  },

  setStep: (step) => set({ step }),
}));

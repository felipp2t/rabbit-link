import { create } from "zustand";

export type Availability = {
  [key: string]: { start: string; end: string } | null;
};

interface CreateService {
  step: number;
  categoriesSelected: string[];
  title: string;
  description: string;
  price: string;
  location: string;
  workType: "remoto" | "presencial" | "híbrido" | undefined;
  availability: Availability;

  addCategory: (category: string) => void;
  handleDayToggle: (day: string) => void;
  handleTimeChange: (day: string, type: "start" | "end", value: string) => void;

  handleNext: () => void;
  handlePrevious: () => void;
  handleValidationToNextStep: () => boolean;
  setTitle: (title: string) => void;
  setPrice: (price: string) => void;
  setDescription: (description: string) => void;
  setLocation: (location: string) => void;
  setWorkType: (workType: "remoto" | "presencial" | "híbrido") => void;
}

export const useCreateService = create<CreateService>()((set, get) => ({
  step: 1,
  categoriesSelected: [],
  title: "",
  description: "",
  price: "",
  location: "",
  workType: undefined,
  availability: {},
  isValid: false,

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

  handleValidationToNextStep: () => {
    const state = get();

    if (state.categoriesSelected.length === 0) return true;

    const isAnyFieldEmpty =
      !state.title ||
      !state.description ||
      !state.price ||
      !state.location ||
      (state.availability && Object.keys(state.availability).length === 0);

    console.log(isAnyFieldEmpty);

    const isValid = state.step === 2 && isAnyFieldEmpty;

    return isValid;
  },

  handleDayToggle: (day) =>
    set((state) => ({
      ...state,
      availability: {
        ...state.availability,
        [day]: state.availability[day]
          ? null
          : { start: "09:00", end: "17:00" },
      },
    })),
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

  handleTimeChange: (day, type, value) =>
    set((state) => ({
      ...state,
      availability: {
        ...state.availability,
        [day]: {
          ...state.availability[day],
          [type]: value,
        } as { start: string; end: string },
      },
    })),

  setTitle: (title) => set((state) => ({ ...state, title })),
  setPrice: (price) => set((state) => ({ ...state, price })),
  setDescription: (description) => set((state) => ({ ...state, description })),
  setLocation: (location) => set((state) => ({ ...state, location })),
  setWorkType: (workType) => set((state) => ({ ...state, workType })),
}));

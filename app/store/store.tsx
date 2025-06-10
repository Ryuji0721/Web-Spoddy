import { create } from 'zustand';

type StoreState = {
    selectedImage: string | null;
    setSelectedImage: (url: string) => void;
};

const useStore = create<StoreState>((set) => ({
    selectedImage: null,
    setSelectedImage: (url:string) => set({ selectedImage: url }),
}));

export default useStore;
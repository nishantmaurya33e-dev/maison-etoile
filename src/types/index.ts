export interface DishItem {
  id: string;
  name: string;
  frenchCategory: 'Entrée' | 'Plat' | 'Dessert' | 'Création';
  categoryKey: 'all' | 'entree' | 'plat' | 'dessert';
  description: string;
  price: string;
  demoNote: string;
  image: string;
  dietary?: string[];
  pairing?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export interface ReservationFormData {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'main-dining' | 'window-view' | 'candlelight-alcove' | 'private-salon';
  dietaryNotes: string;
  accessibilityRequests: string;
  acceptedTerms: boolean;
}

export interface ReservationConfirmation {
  referenceNumber: string;
  guestName: string;
  date: string;
  time: string;
  guests: number;
  seatingAreaName: string;
  timestamp: string;
}

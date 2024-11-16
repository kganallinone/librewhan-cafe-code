export interface Franchising {
  id: string; // Unique identifier for the franchise
  franchiseName: string; // Name of the franchise
  ownerName: string; // Name of the franchise owner
  location: {
    address: string; // Street address of the franchise
    city: string; // City where the franchise is located
    state: string; // State where the franchise is located
    postalCode: string; // Postal/ZIP code
    country: string; // Country where the franchise is located
  };
  establishedYear: number; // The year the franchise was established
  numberOfEmployees: number; // Number of employees working in the franchise
  annualRevenue: number; // Annual revenue of the franchise
  isActive: boolean; // Whether the franchise is currently active or not
  contactDetails: {
    phone: string; // Contact phone number
    email: string; // Contact email address
  };
}

export interface FranchiseRequest {
  requesterName: string; // Name of the person making the request
  requesterEmail: string; // Email address of the requester
  requesterPhone?: string; // Phone number of the requester (optional)
  franchiseName: string; // Name of the franchise being requested
  location: {
    city: string; // City where the requester wants to establish the franchise
    state: string; // State where the requester wants to establish the franchise
    country: string; // Country where the requester wants to establish the franchise
  };
  requestedDate: Date; // Date when the request was made
  message?: string; // Additional message or notes from the requester (optional)
}

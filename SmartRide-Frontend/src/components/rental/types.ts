export interface StatItemData {
  id: string;
  value: string;
  label: string;
}

export interface ReviewCardData {
  id: string;
  rating: number;
  quote: string;
  userName: string;
  userRole: string;
  avatarUrl?: string;
}

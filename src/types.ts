export interface BFHLRequest {
  data: string[];
}

export interface BFHLResponse {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  numbers: string[];
  alphabets: string[];
  highest_alphabet: string[];
}

export type FilterOption = 'numbers' | 'alphabets' | 'highest_alphabet';

export const API_URL = 'https://bajajfinserv-08kk.onrender.com';
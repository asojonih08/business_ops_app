import { Material } from "./app/proposals/materials-columns";

export interface UserDetails {
  id?: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
  is_admin_user: boolean;
}

export interface Client {
  id?: string;
  created_by: string | undefined;
  client_type: string;
  company_name?: string;
  primary_contact_name?: string;
  primary_contact_postion?: string;
  phone_number: string;
  email_address?: string;
  referral_source?: string;
}

export interface Project {
  id?: number;
  created_at: string;
  created_by: string | undefined;
  name: string;
  additional_contacts?: JSON;
  status: string;
  proposals: number[];
  invoices: number[];
  total_cost: number;
  amount_paid: number;
  paid_in_full: boolean;
  overhead_costs: string;
  date_closed: string;
  date_completed: string;
  client: string | undefined;
  street_address: string;
  apartment_or_suite_number: number;
  state: string;
  zip_or_postal_code: number;
}

export interface OverheadCost {
  id?: string;
  created_at: string;
  created_by: string;
  payee: string;
  payment_date: string;
  payment_method: string;
  reference_number: string;
  is_recurring: boolean;
  interval: string;
  daily_interval: number;
  weekly_interval: number;
  day_of_week: string;
  monthly_on: string;
  monthly_day_of_month: number;
  monthly_day_of_week: string;
  monthly_interval: number;
  start_date: string;
  end_date: string;
  attachments: string[];
  memo: string;
}

export interface Proposal {
  id?: number;
  created_at: string;
  created_by: string;
  project: number;
  is_subdivided: boolean;
  status: string;
  total_cost: number;
  date_sent: string[];
  sent_to: JSON[];
  estimates: number[];
  proposal_doc_path: string;
}

export interface Estimate {
  id?: number;
  created_at: string;
  created_by: string;
  item_name: string;
  room: string;
  project: number;
  client: string;
  proposal: number;
  materials: JSON;
  materials_cost: number;
  labor_employees: string[];
  fabrication_hours: number;
  installation_hours: number;
  labor_cost: number;
  subcontractor_cost: number;
  independent_contractor_cost: number;
  delivery_cost: number;
  gas_cost: number;
  equipment_rental_cost: number;
  miscellaneous_cost: number;
  is_fixture: boolean;
  overhead_cost: number;
  overhead_rate: number;
  type: string;
  total_cost: number;
  profit: number;
  profit_rate: number;
  sales_tax: number;
  sales_tax_rate: number;
  breakeven: number;
  status: string;
}

export interface EstimateCalculations {
  materialsCost: number;
  materialMarkupRate: number;
  fabricationHours: number;
  installationHours: number;
  subcontractorCost: number;
  independentContractorCost: number;
  deliveryCost: number;
  gasCost: number;
  equipmentRentalCost: number;
  miscellaneousCost: number;
}

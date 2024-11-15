export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          client_type: string | null
          company_name: string | null
          created_at: string
          created_by: string | null
          email_address: string | null
          id: string
          phone_number: string | null
          primary_contact_name: string | null
          primary_contact_position: string | null
          referral_source: string | null
        }
        Insert: {
          client_type?: string | null
          company_name?: string | null
          created_at?: string
          created_by?: string | null
          email_address?: string | null
          id?: string
          phone_number?: string | null
          primary_contact_name?: string | null
          primary_contact_position?: string | null
          referral_source?: string | null
        }
        Update: {
          client_type?: string | null
          company_name?: string | null
          created_at?: string
          created_by?: string | null
          email_address?: string | null
          id?: string
          phone_number?: string | null
          primary_contact_name?: string | null
          primary_contact_position?: string | null
          referral_source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          created_at: string
          created_by: string | null
          currently_employed: boolean | null
          employment_status: string | null
          full_name: string | null
          hire_date: string | null
          id: string
          position: string | null
          position_category: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          currently_employed?: boolean | null
          employment_status?: string | null
          full_name?: string | null
          hire_date?: string | null
          id?: string
          position?: string | null
          position_category?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          currently_employed?: boolean | null
          employment_status?: string | null
          full_name?: string | null
          hire_date?: string | null
          id?: string
          position?: string | null
          position_category?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      estimates: {
        Row: {
          breakeven_no_tax_profit: number | null
          breakeven_tax_no_profit: number | null
          client: string | null
          created_at: string
          created_by: string | null
          delivery_cost: number | null
          equipment_rental_cost: number | null
          fabrication_employees: string[] | null
          fabrication_employees_and_wages: Json | null
          fabrication_employees_payroll_tax: number | null
          fabrication_employees_workers_comp: number | null
          fabrication_hours: number | null
          fixture_ratio: number | null
          gas_cost: number | null
          id: number
          independent_contractor_cost: number | null
          installation_employees: string[] | null
          installation_employees_and_wages: Json | null
          installation_employees_payroll_tax: number | null
          installation_employees_workers_comp: number | null
          installation_hours: number | null
          is_fixture: boolean | null
          item_name: string | null
          materials: Json[] | null
          materials_cost: number | null
          materials_cost_no_markup: number | null
          materials_markup_rate: number | null
          miscellaneous_cost: number | null
          overhead_cost: number | null
          overhead_rate: number | null
          payroll_tax_rate: number | null
          profit: number | null
          profit_margin_rate: number | null
          project: number | null
          proposal: number | null
          room: string | null
          sales_tax: number | null
          sales_tax_rate: number | null
          status: string | null
          subcontractor_cost: number | null
          total_cost: number | null
          total_cost_no_tax: number | null
          total_fabrication_cost: number | null
          total_fabrication_employees_wage: number | null
          total_installation_cost: number | null
          total_installation_employees_wage: number | null
          total_labor_cost: number | null
          type: string | null
          workers_comp_rate: number | null
          yearly_expected_working_hours: number | null
        }
        Insert: {
          breakeven_no_tax_profit?: number | null
          breakeven_tax_no_profit?: number | null
          client?: string | null
          created_at?: string
          created_by?: string | null
          delivery_cost?: number | null
          equipment_rental_cost?: number | null
          fabrication_employees?: string[] | null
          fabrication_employees_and_wages?: Json | null
          fabrication_employees_payroll_tax?: number | null
          fabrication_employees_workers_comp?: number | null
          fabrication_hours?: number | null
          fixture_ratio?: number | null
          gas_cost?: number | null
          id?: number
          independent_contractor_cost?: number | null
          installation_employees?: string[] | null
          installation_employees_and_wages?: Json | null
          installation_employees_payroll_tax?: number | null
          installation_employees_workers_comp?: number | null
          installation_hours?: number | null
          is_fixture?: boolean | null
          item_name?: string | null
          materials?: Json[] | null
          materials_cost?: number | null
          materials_cost_no_markup?: number | null
          materials_markup_rate?: number | null
          miscellaneous_cost?: number | null
          overhead_cost?: number | null
          overhead_rate?: number | null
          payroll_tax_rate?: number | null
          profit?: number | null
          profit_margin_rate?: number | null
          project?: number | null
          proposal?: number | null
          room?: string | null
          sales_tax?: number | null
          sales_tax_rate?: number | null
          status?: string | null
          subcontractor_cost?: number | null
          total_cost?: number | null
          total_cost_no_tax?: number | null
          total_fabrication_cost?: number | null
          total_fabrication_employees_wage?: number | null
          total_installation_cost?: number | null
          total_installation_employees_wage?: number | null
          total_labor_cost?: number | null
          type?: string | null
          workers_comp_rate?: number | null
          yearly_expected_working_hours?: number | null
        }
        Update: {
          breakeven_no_tax_profit?: number | null
          breakeven_tax_no_profit?: number | null
          client?: string | null
          created_at?: string
          created_by?: string | null
          delivery_cost?: number | null
          equipment_rental_cost?: number | null
          fabrication_employees?: string[] | null
          fabrication_employees_and_wages?: Json | null
          fabrication_employees_payroll_tax?: number | null
          fabrication_employees_workers_comp?: number | null
          fabrication_hours?: number | null
          fixture_ratio?: number | null
          gas_cost?: number | null
          id?: number
          independent_contractor_cost?: number | null
          installation_employees?: string[] | null
          installation_employees_and_wages?: Json | null
          installation_employees_payroll_tax?: number | null
          installation_employees_workers_comp?: number | null
          installation_hours?: number | null
          is_fixture?: boolean | null
          item_name?: string | null
          materials?: Json[] | null
          materials_cost?: number | null
          materials_cost_no_markup?: number | null
          materials_markup_rate?: number | null
          miscellaneous_cost?: number | null
          overhead_cost?: number | null
          overhead_rate?: number | null
          payroll_tax_rate?: number | null
          profit?: number | null
          profit_margin_rate?: number | null
          project?: number | null
          proposal?: number | null
          room?: string | null
          sales_tax?: number | null
          sales_tax_rate?: number | null
          status?: string | null
          subcontractor_cost?: number | null
          total_cost?: number | null
          total_cost_no_tax?: number | null
          total_fabrication_cost?: number | null
          total_fabrication_employees_wage?: number | null
          total_installation_cost?: number | null
          total_installation_employees_wage?: number | null
          total_labor_cost?: number | null
          type?: string | null
          workers_comp_rate?: number | null
          yearly_expected_working_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "estimates_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_project_fkey"
            columns: ["project"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimates_proposal_fkey"
            columns: ["proposal"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      fixedcosts: {
        Row: {
          amount: number | null
          category: string | null
          description: string | null
          id: number
          inserted_at: string
          start_date: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          category?: string | null
          description?: string | null
          id?: number
          inserted_at?: string
          start_date?: string | null
          user_id: string
        }
        Update: {
          amount?: number | null
          category?: string | null
          description?: string | null
          id?: number
          inserted_at?: string
          start_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number | null
          created_at: string
          created_by: string | null
          date_sent: string[] | null
          id: number
          project: number | null
          sent_to: string[] | null
          status: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string
          created_by?: string | null
          date_sent?: string[] | null
          id?: number
          project?: number | null
          sent_to?: string[] | null
          status?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string
          created_by?: string | null
          date_sent?: string[] | null
          id?: number
          project?: number | null
          sent_to?: string[] | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_project_fkey"
            columns: ["project"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      overhead_costs: {
        Row: {
          amount: number | null
          attachments: string | null
          created_at: string
          created_by: string | null
          daily_interval: number | null
          day_of_week: string | null
          end_date: string | null
          id: number
          interval: string | null
          is_recurring: boolean | null
          memo: string | null
          monthly_day_of_month: number | null
          monthly_day_of_week: string | null
          monthly_interval: number | null
          monthly_on: string | null
          payee: string | null
          payment_date: string | null
          payment_method: string | null
          reference_number: string | null
          start_date: string | null
          weekly_interval: number | null
        }
        Insert: {
          amount?: number | null
          attachments?: string | null
          created_at?: string
          created_by?: string | null
          daily_interval?: number | null
          day_of_week?: string | null
          end_date?: string | null
          id?: number
          interval?: string | null
          is_recurring?: boolean | null
          memo?: string | null
          monthly_day_of_month?: number | null
          monthly_day_of_week?: string | null
          monthly_interval?: number | null
          monthly_on?: string | null
          payee?: string | null
          payment_date?: string | null
          payment_method?: string | null
          reference_number?: string | null
          start_date?: string | null
          weekly_interval?: number | null
        }
        Update: {
          amount?: number | null
          attachments?: string | null
          created_at?: string
          created_by?: string | null
          daily_interval?: number | null
          day_of_week?: string | null
          end_date?: string | null
          id?: number
          interval?: string | null
          is_recurring?: boolean | null
          memo?: string | null
          monthly_day_of_month?: number | null
          monthly_day_of_week?: string | null
          monthly_interval?: number | null
          monthly_on?: string | null
          payee?: string | null
          payment_date?: string | null
          payment_method?: string | null
          reference_number?: string | null
          start_date?: string | null
          weekly_interval?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "overhead_costs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          additional_contacts: Json | null
          amount_paid: number | null
          apartment_or_suite_number: number | null
          client: string | null
          created_at: string
          created_by: string | null
          date_closed: string | null
          date_completed: string | null
          id: number
          invoices: number[] | null
          name: string | null
          overhead_costs: string | null
          paid_in_full: boolean | null
          proposals: number[] | null
          state: string | null
          status: string | null
          street_address: string | null
          total_cost: number | null
          zip_or_postal_code: number | null
        }
        Insert: {
          additional_contacts?: Json | null
          amount_paid?: number | null
          apartment_or_suite_number?: number | null
          client?: string | null
          created_at?: string
          created_by?: string | null
          date_closed?: string | null
          date_completed?: string | null
          id?: number
          invoices?: number[] | null
          name?: string | null
          overhead_costs?: string | null
          paid_in_full?: boolean | null
          proposals?: number[] | null
          state?: string | null
          status?: string | null
          street_address?: string | null
          total_cost?: number | null
          zip_or_postal_code?: number | null
        }
        Update: {
          additional_contacts?: Json | null
          amount_paid?: number | null
          apartment_or_suite_number?: number | null
          client?: string | null
          created_at?: string
          created_by?: string | null
          date_closed?: string | null
          date_completed?: string | null
          id?: number
          invoices?: number[] | null
          name?: string | null
          overhead_costs?: string | null
          paid_in_full?: boolean | null
          proposals?: number[] | null
          state?: string | null
          status?: string | null
          street_address?: string | null
          total_cost?: number | null
          zip_or_postal_code?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          client: string | null
          client_name: string | null
          created_at: string
          created_by: string | null
          date_sent: string[] | null
          estimates: number[] | null
          id: number
          is_subdivided: boolean | null
          project: number | null
          project_name: string | null
          proposal_doc_path: string | null
          sent_to: Json[] | null
          status: string | null
          total_cost: number | null
        }
        Insert: {
          client?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string | null
          date_sent?: string[] | null
          estimates?: number[] | null
          id?: number
          is_subdivided?: boolean | null
          project?: number | null
          project_name?: string | null
          proposal_doc_path?: string | null
          sent_to?: Json[] | null
          status?: string | null
          total_cost?: number | null
        }
        Update: {
          client?: string | null
          client_name?: string | null
          created_at?: string
          created_by?: string | null
          date_sent?: string[] | null
          estimates?: number[] | null
          id?: number
          is_subdivided?: boolean | null
          project?: number | null
          project_name?: string | null
          proposal_doc_path?: string | null
          sent_to?: Json[] | null
          status?: string | null
          total_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_client_fkey"
            columns: ["client"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_project_fkey"
            columns: ["project"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      scheduled_emails: {
        Row: {
          created_at: string
          email_details: Json | null
          id: number
          proposal: number | null
          scheduled_date: string | null
        }
        Insert: {
          created_at?: string
          email_details?: Json | null
          id?: number
          proposal?: number | null
          scheduled_date?: string | null
        }
        Update: {
          created_at?: string
          email_details?: Json | null
          id?: number
          proposal?: number | null
          scheduled_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_emails_proposal_fkey"
            columns: ["proposal"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          full_name: string | null
          id: string
          is_admin_user: boolean | null
          last_name: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          is_admin_user?: boolean | null
          last_name?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          is_admin_user?: boolean | null
          last_name?: string | null
        }
        Relationships: []
      }
      variablecosts: {
        Row: {
          amount: number | null
          category: string | null
          description: string | null
          end_date: string | null
          id: number
          inserted_at: string
          start_date: string | null
          user_id: string
        }
        Insert: {
          amount?: number | null
          category?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          inserted_at?: string
          start_date?: string | null
          user_id: string
        }
        Update: {
          amount?: number | null
          category?: string | null
          description?: string | null
          end_date?: string | null
          id?: number
          inserted_at?: string
          start_date?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

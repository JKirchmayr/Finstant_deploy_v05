export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  development: {
    Tables: {
      companies: {
        Row: {
          companies_EBITDA_estimate_mEUR: number | null
          companies_linkedin_about: string | null
          companies_linkedin_city: string | null
          companies_linkedin_company_size: number | null
          companies_linkedin_company_type: string | null
          companies_linkedin_employee_range_MAX: number | null
          companies_linkedin_employee_range_MIN: number | null
          companies_linkedin_founded: number | null
          companies_linkedin_industries: string | null
          companies_linkedin_last_scraped_at: string | null
          companies_linkedin_logo_url: string | null
          companies_linkedin_specialties: string | null
          companies_LLM_country: string | null
          companies_LLM_description: string | null
          companies_revenue_estimate_mEUR: number | null
          company_description_embedding_new: string | null
          company_description_vector_embedding: string | null
          company_id: number
          company_name: string
          company_name_vector_embedding: string | null
          company_website: string | null
          linkedin_page: string | null
        }
        Insert: {
          companies_EBITDA_estimate_mEUR?: number | null
          companies_linkedin_about?: string | null
          companies_linkedin_city?: string | null
          companies_linkedin_company_size?: number | null
          companies_linkedin_company_type?: string | null
          companies_linkedin_employee_range_MAX?: number | null
          companies_linkedin_employee_range_MIN?: number | null
          companies_linkedin_founded?: number | null
          companies_linkedin_industries?: string | null
          companies_linkedin_last_scraped_at?: string | null
          companies_linkedin_logo_url?: string | null
          companies_linkedin_specialties?: string | null
          companies_LLM_country?: string | null
          companies_LLM_description?: string | null
          companies_revenue_estimate_mEUR?: number | null
          company_description_embedding_new?: string | null
          company_description_vector_embedding?: string | null
          company_id: number
          company_name: string
          company_name_vector_embedding?: string | null
          company_website?: string | null
          linkedin_page?: string | null
        }
        Update: {
          companies_EBITDA_estimate_mEUR?: number | null
          companies_linkedin_about?: string | null
          companies_linkedin_city?: string | null
          companies_linkedin_company_size?: number | null
          companies_linkedin_company_type?: string | null
          companies_linkedin_employee_range_MAX?: number | null
          companies_linkedin_employee_range_MIN?: number | null
          companies_linkedin_founded?: number | null
          companies_linkedin_industries?: string | null
          companies_linkedin_last_scraped_at?: string | null
          companies_linkedin_logo_url?: string | null
          companies_linkedin_specialties?: string | null
          companies_LLM_country?: string | null
          companies_LLM_description?: string | null
          companies_revenue_estimate_mEUR?: number | null
          company_description_embedding_new?: string | null
          company_description_vector_embedding?: string | null
          company_id?: number
          company_name?: string
          company_name_vector_embedding?: string | null
          company_website?: string | null
          linkedin_page?: string | null
        }
        Relationships: []
      }
      investments: {
        Row: {
          company_id: number | null
          company_investor_entry_year: string | null
          company_investor_status: string | null
          company_name: string | null
          investment_id: number
          investor_id: number | null
          investor_name: string | null
        }
        Insert: {
          company_id?: number | null
          company_investor_entry_year?: string | null
          company_investor_status?: string | null
          company_name?: string | null
          investment_id?: number
          investor_id?: number | null
          investor_name?: string | null
        }
        Update: {
          company_id?: number | null
          company_investor_entry_year?: string | null
          company_investor_status?: string | null
          company_name?: string | null
          investment_id?: number
          investor_id?: number | null
          investor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investments_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "investments_company_name_fkey"
            columns: ["company_name"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_name"]
          },
          {
            foreignKeyName: "investments_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["investor_id"]
          },
          {
            foreignKeyName: "investments_investor_name_fkey"
            columns: ["investor_name"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["investor_name"]
          },
        ]
      }
      investors: {
        Row: {
          investor_asset_classes: string | null
          investor_id: number
          investor_investment_criteria_description: string | null
          investor_linekdin_url: string | null
          investor_linkedin_city: string | null
          investor_linkedin_description: string | null
          investor_linkedin_employees: number | null
          investor_linkedin_founded: number | null
          investor_linkedin_industry: string | null
          investor_linkedin_logo: string | null
          investor_LLM_country: string | null
          investor_name: string
          investor_strategy: string | null
          investor_type: string | null
          investor_website: string | null
          investors_LLM_description: string | null
        }
        Insert: {
          investor_asset_classes?: string | null
          investor_id: number
          investor_investment_criteria_description?: string | null
          investor_linekdin_url?: string | null
          investor_linkedin_city?: string | null
          investor_linkedin_description?: string | null
          investor_linkedin_employees?: number | null
          investor_linkedin_founded?: number | null
          investor_linkedin_industry?: string | null
          investor_linkedin_logo?: string | null
          investor_LLM_country?: string | null
          investor_name: string
          investor_strategy?: string | null
          investor_type?: string | null
          investor_website?: string | null
          investors_LLM_description?: string | null
        }
        Update: {
          investor_asset_classes?: string | null
          investor_id?: number
          investor_investment_criteria_description?: string | null
          investor_linekdin_url?: string | null
          investor_linkedin_city?: string | null
          investor_linkedin_description?: string | null
          investor_linkedin_employees?: number | null
          investor_linkedin_founded?: number | null
          investor_linkedin_industry?: string | null
          investor_linkedin_logo?: string | null
          investor_LLM_country?: string | null
          investor_name?: string
          investor_strategy?: string | null
          investor_type?: string | null
          investor_website?: string | null
          investors_LLM_description?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          transaction_add_on: string | null
          transaction_buyer: string | null
          transaction_buyer_description: string | null
          transaction_buyer_type: string | null
          transaction_buyer_website: string | null
          transaction_Deal_size_eurM: number | null
          transaction_description: string | null
          transaction_EV_to_EBITDA: number | null
          transaction_EV_to_Sales: number | null
          transaction_id: string
          transaction_seller: string | null
          transaction_seller_description: string | null
          transaction_seller_type: string | null
          transaction_target: string | null
          transaction_target_description: string | null
          transaction_target_EBITDA_eurM: number | null
          transaction_target_sales_eurM: number | null
          transaction_target_website: string | null
          transaction_year: number | null
        }
        Insert: {
          transaction_add_on?: string | null
          transaction_buyer?: string | null
          transaction_buyer_description?: string | null
          transaction_buyer_type?: string | null
          transaction_buyer_website?: string | null
          transaction_Deal_size_eurM?: number | null
          transaction_description?: string | null
          transaction_EV_to_EBITDA?: number | null
          transaction_EV_to_Sales?: number | null
          transaction_id: string
          transaction_seller?: string | null
          transaction_seller_description?: string | null
          transaction_seller_type?: string | null
          transaction_target?: string | null
          transaction_target_description?: string | null
          transaction_target_EBITDA_eurM?: number | null
          transaction_target_sales_eurM?: number | null
          transaction_target_website?: string | null
          transaction_year?: number | null
        }
        Update: {
          transaction_add_on?: string | null
          transaction_buyer?: string | null
          transaction_buyer_description?: string | null
          transaction_buyer_type?: string | null
          transaction_buyer_website?: string | null
          transaction_Deal_size_eurM?: number | null
          transaction_description?: string | null
          transaction_EV_to_EBITDA?: number | null
          transaction_EV_to_Sales?: number | null
          transaction_id?: string
          transaction_seller?: string | null
          transaction_seller_description?: string | null
          transaction_seller_type?: string | null
          transaction_target?: string | null
          transaction_target_description?: string | null
          transaction_target_EBITDA_eurM?: number | null
          transaction_target_sales_eurM?: number | null
          transaction_target_website?: string | null
          transaction_year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "transaction_transaction_buyer_fkey"
            columns: ["transaction_buyer"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["investor_name"]
          },
          {
            foreignKeyName: "transaction_transaction_target_fkey"
            columns: ["transaction_target"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["company_name"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cosine_similarity: {
        Args: { a: string; b: string }
        Returns: number
      }
      semantic_match_companies: {
        Args: {
          query_embedding: string
          match_threshold: number
          match_count: number
        }
        Returns: {
          company_id: number
          company_name: string
          company_website: string
          companies_LLM_description: string
          linkedin_page: string
          companies_linkedin_last_scraped_at: string
          companies_linkedin_city: string
          companies_LLM_country: string
          companies_linkedin_about: string
          companies_linkedin_company_size: number
          companies_linkedin_founded: number
          companies_linkedin_specialties: string
          companies_linkedin_logo_url: string
          companies_linkedin_company_type: string
          companies_linkedin_employee_range_MIN: number
          companies_linkedin_employee_range_MAX: number
          companies_linkedin_industries: string
          companies_revenue_estimate_mEUR: number
          companies_EBITDA_estimate_mEUR: number
          company_name_vector_embedding: string
          company_description_vector_embedding: string
          similarity: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  development: {
    Enums: {},
  },
} as const

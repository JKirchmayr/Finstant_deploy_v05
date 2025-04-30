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
      companies: {
        Row: {
          company_description: string | null
          company_description_embedding: string | null
          company_id: string
          company_name: string | null
          company_name_embedding: string | null
          company_website: string | null
          investor_id: string
        }
        Insert: {
          company_description?: string | null
          company_description_embedding?: string | null
          company_id?: string
          company_name?: string | null
          company_name_embedding?: string | null
          company_website?: string | null
          investor_id: string
        }
        Update: {
          company_description?: string | null
          company_description_embedding?: string | null
          company_id?: string
          company_name?: string | null
          company_name_embedding?: string | null
          company_website?: string | null
          investor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "Companies_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["investor_id"]
          },
        ]
      }
      companies_llm: {
        Row: {
          company_name: string
          company_website: string
          created_at: string | null
          description: string | null
          id: number
          investor_id: string | null
          last_scraped_at: string | null
          linkedin_about: string | null
          linkedin_company_name: string | null
          linkedin_company_size: string | null
          linkedin_employees: string | null
          linkedin_founded: string | null
          linkedin_industry: string | null
          linkedin_location: string | null
          linkedin_logo_url: string | null
          linkedin_page: string | null
          linkedin_specialties: string | null
          linkedin_website: string | null
        }
        Insert: {
          company_name: string
          company_website: string
          created_at?: string | null
          description?: string | null
          id?: number
          investor_id?: string | null
          last_scraped_at?: string | null
          linkedin_about?: string | null
          linkedin_company_name?: string | null
          linkedin_company_size?: string | null
          linkedin_employees?: string | null
          linkedin_founded?: string | null
          linkedin_industry?: string | null
          linkedin_location?: string | null
          linkedin_logo_url?: string | null
          linkedin_page?: string | null
          linkedin_specialties?: string | null
          linkedin_website?: string | null
        }
        Update: {
          company_name?: string
          company_website?: string
          created_at?: string | null
          description?: string | null
          id?: number
          investor_id?: string | null
          last_scraped_at?: string | null
          linkedin_about?: string | null
          linkedin_company_name?: string | null
          linkedin_company_size?: string | null
          linkedin_employees?: string | null
          linkedin_founded?: string | null
          linkedin_industry?: string | null
          linkedin_location?: string | null
          linkedin_logo_url?: string | null
          linkedin_page?: string | null
          linkedin_specialties?: string | null
          linkedin_website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_llm_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["investor_id"]
          },
        ]
      }
      crawled_companies: {
        Row: {
          company_name: string
          company_website: string
          crawled_at: string | null
          holding_status: string | null
          id: number
          transaction_date: string | null
        }
        Insert: {
          company_name: string
          company_website: string
          crawled_at?: string | null
          holding_status?: string | null
          id?: number
          transaction_date?: string | null
        }
        Update: {
          company_name?: string
          company_website?: string
          crawled_at?: string | null
          holding_status?: string | null
          id?: number
          transaction_date?: string | null
        }
        Relationships: []
      }
      crawled_investors: {
        Row: {
          crawled_at: string | null
          id: number
          investor_description: string | null
          investor_name: string
          investor_website: string
          target_ev: string | null
          target_industry: string | null
          ticket_size: string | null
        }
        Insert: {
          crawled_at?: string | null
          id?: number
          investor_description?: string | null
          investor_name: string
          investor_website: string
          target_ev?: string | null
          target_industry?: string | null
          ticket_size?: string | null
        }
        Update: {
          crawled_at?: string | null
          id?: number
          investor_description?: string | null
          investor_name?: string
          investor_website?: string
          target_ev?: string | null
          target_industry?: string | null
          ticket_size?: string | null
        }
        Relationships: []
      }
      in_companies: {
        Row: {
          company_page_url: string | null
          company_type: string | null
          company_type_code: string | null
          description: string | null
          follower_count: number | null
          founded_year: number | null
          id: number
          investor_id: string | null
          linkedin_url: string | null
          logo_url: string | null
          name: string
          processed_at: string | null
          staff_count: number | null
          staff_count_range_end: number | null
          staff_count_range_start: number | null
          tagline: string | null
          universal_name: string | null
        }
        Insert: {
          company_page_url?: string | null
          company_type?: string | null
          company_type_code?: string | null
          description?: string | null
          follower_count?: number | null
          founded_year?: number | null
          id?: number
          investor_id?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          name: string
          processed_at?: string | null
          staff_count?: number | null
          staff_count_range_end?: number | null
          staff_count_range_start?: number | null
          tagline?: string | null
          universal_name?: string | null
        }
        Update: {
          company_page_url?: string | null
          company_type?: string | null
          company_type_code?: string | null
          description?: string | null
          follower_count?: number | null
          founded_year?: number | null
          id?: number
          investor_id?: string | null
          linkedin_url?: string | null
          logo_url?: string | null
          name?: string
          processed_at?: string | null
          staff_count?: number | null
          staff_count_range_end?: number | null
          staff_count_range_start?: number | null
          tagline?: string | null
          universal_name?: string | null
        }
        Relationships: []
      }
      in_funding: {
        Row: {
          company_id: number | null
          crunchbase_url: string | null
          id: number
          last_round_amount: string | null
          last_round_currency: string | null
          last_round_date: string | null
          last_round_type: string | null
          last_round_url: string | null
          num_funding_rounds: number | null
        }
        Insert: {
          company_id?: number | null
          crunchbase_url?: string | null
          id?: number
          last_round_amount?: string | null
          last_round_currency?: string | null
          last_round_date?: string | null
          last_round_type?: string | null
          last_round_url?: string | null
          num_funding_rounds?: number | null
        }
        Update: {
          company_id?: number | null
          crunchbase_url?: string | null
          id?: number
          last_round_amount?: string | null
          last_round_currency?: string | null
          last_round_date?: string | null
          last_round_type?: string | null
          last_round_url?: string | null
          num_funding_rounds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "in_funding_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "in_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      in_industries: {
        Row: {
          company_id: number | null
          id: number
          industry_name: string | null
        }
        Insert: {
          company_id?: number | null
          id?: number
          industry_name?: string | null
        }
        Update: {
          company_id?: number | null
          id?: number
          industry_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "in_industries_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "in_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      in_industry_classifications: {
        Row: {
          company_id: number | null
          group_code: string | null
          group_name: string | null
          id: number
          industry_code: string | null
          industry_name: string | null
          industry_name_mapped: string | null
          sector_code: string | null
          sector_name: string | null
          sub_industry_code: string | null
          sub_industry_name: string | null
        }
        Insert: {
          company_id?: number | null
          group_code?: string | null
          group_name?: string | null
          id?: number
          industry_code?: string | null
          industry_name?: string | null
          industry_name_mapped?: string | null
          sector_code?: string | null
          sector_name?: string | null
          sub_industry_code?: string | null
          sub_industry_name?: string | null
        }
        Update: {
          company_id?: number | null
          group_code?: string | null
          group_name?: string | null
          id?: number
          industry_code?: string | null
          industry_name?: string | null
          industry_name_mapped?: string | null
          sector_code?: string | null
          sector_name?: string | null
          sub_industry_code?: string | null
          sub_industry_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "in_industry_classifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "in_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      in_lead_investors: {
        Row: {
          funding_id: number | null
          id: number
          investor_name: string | null
        }
        Insert: {
          funding_id?: number | null
          id?: number
          investor_name?: string | null
        }
        Update: {
          funding_id?: number | null
          id?: number
          investor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "in_lead_investors_funding_id_fkey"
            columns: ["funding_id"]
            isOneToOne: false
            referencedRelation: "in_funding"
            referencedColumns: ["id"]
          },
        ]
      }
      in_locations: {
        Row: {
          address: string | null
          address_line2: string | null
          city: string | null
          company_id: number | null
          country: string | null
          geographic_area: string | null
          id: number
          is_headquarters: boolean | null
          postal_code: string | null
        }
        Insert: {
          address?: string | null
          address_line2?: string | null
          city?: string | null
          company_id?: number | null
          country?: string | null
          geographic_area?: string | null
          id?: number
          is_headquarters?: boolean | null
          postal_code?: string | null
        }
        Update: {
          address?: string | null
          address_line2?: string | null
          city?: string | null
          company_id?: number | null
          country?: string | null
          geographic_area?: string | null
          id?: number
          is_headquarters?: boolean | null
          postal_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "in_locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "in_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      in_specialities: {
        Row: {
          company_id: number | null
          id: number
          speciality: string | null
        }
        Insert: {
          company_id?: number | null
          id?: number
          speciality?: string | null
        }
        Update: {
          company_id?: number | null
          id?: number
          speciality?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "in_specialities_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "in_companies"
            referencedColumns: ["id"]
          },
        ]
      }
      investors: {
        Row: {
          investor_id: string
          investor_name: string | null
          investor_website: string | null
        }
        Insert: {
          investor_id: string
          investor_name?: string | null
          investor_website?: string | null
        }
        Update: {
          investor_id?: string
          investor_name?: string | null
          investor_website?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          role: string
          session_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          role: string
          session_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          role?: string
          session_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          author: string | null
          company_id: number | null
          created_at: string | null
          date_published: string | null
          headline: string | null
          id: number
          text: string | null
          type: string | null
          updated_at: string | null
          url: string | null
        }
        Insert: {
          author?: string | null
          company_id?: number | null
          created_at?: string | null
          date_published?: string | null
          headline?: string | null
          id?: number
          text?: string | null
          type?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Update: {
          author?: string | null
          company_id?: number | null
          created_at?: string | null
          date_published?: string | null
          headline?: string | null
          id?: number
          text?: string | null
          type?: string | null
          updated_at?: string | null
          url?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean
          last_active: string
          session_title: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active: boolean
          last_active: string
          session_title?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean
          last_active?: string
          session_title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          auth_user_id: string | null
          created_at: string
          email: string | null
          fname: string | null
          id: string
          is_active: boolean
          lname: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          fname?: string | null
          id?: string
          is_active?: boolean
          lname?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          fname?: string | null
          id?: string
          is_active?: boolean
          lname?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      execute_sql: {
        Args: { sql: string }
        Returns: Record<string, unknown>[]
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      match_companies: {
        Args:
          | { query_embedding: string; match_count?: number }
          | {
              query_embedding: string
              match_threshold: number
              match_count: number
            }
        Returns: {
          company_id: string
          company_name: string
          company_website: string
          description: string
          similarity: number
        }[]
      }
      match_companies_by_description: {
        Args: {
          query_embedding: string
          similarity_threshold: number
          match_count: number
        }
        Returns: {
          company_id: string
          company_name: string
          company_description: string
          similarity: number
        }[]
      }
      match_company_by_name: {
        Args: { query_embedding: string; match_count?: number }
        Returns: {
          company_id: string
          company_name: string
          company_description: string
          similarity: number
        }[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
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
  public: {
    Enums: {},
  },
} as const

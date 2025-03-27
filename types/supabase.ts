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
          created_at: string | null
          current_investor: string | null
          description: string | null
          ebitda_in_eurm: number | null
          embedding: string | null
          entry_year: string | null
          id: string
          logo: string | null
          marge: number | null
          name: string
          sales_in_eurm: number | null
          sector: string | null
          status: string | null
          website: string | null
          year_finacials: string | null
        }
        Insert: {
          created_at?: string | null
          current_investor?: string | null
          description?: string | null
          ebitda_in_eurm?: number | null
          embedding?: string | null
          entry_year?: string | null
          id?: string
          logo?: string | null
          marge?: number | null
          name: string
          sales_in_eurm?: number | null
          sector?: string | null
          status?: string | null
          website?: string | null
          year_finacials?: string | null
        }
        Update: {
          created_at?: string | null
          current_investor?: string | null
          description?: string | null
          ebitda_in_eurm?: number | null
          embedding?: string | null
          entry_year?: string | null
          id?: string
          logo?: string | null
          marge?: number | null
          name?: string
          sales_in_eurm?: number | null
          sector?: string | null
          status?: string | null
          website?: string | null
          year_finacials?: string | null
        }
        Relationships: []
      }
      investor_companies: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          investor_id: string | null
          status: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          investor_id?: string | null
          status?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          investor_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "investor_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "investor_companies_investor_id_fkey"
            columns: ["investor_id"]
            isOneToOne: false
            referencedRelation: "investors"
            referencedColumns: ["id"]
          },
        ]
      }
      investors: {
        Row: {
          address: string | null
          created_at: string | null
          description: string | null
          email: string | null
          hq_address: string | null
          hq_city: string | null
          hq_country: string | null
          hq_zip: string | null
          id: string
          investment_countries: string[] | null
          investment_focus: string[] | null
          investment_regions: string[] | null
          investor_type: string | null
          logo: string | null
          max_deal_size_meur: number | null
          max_ebitda_meur: number | null
          max_ticket_meur: number | null
          min_deal_size_meur: number | null
          min_ebitda_meur: number | null
          min_ticket_meur: number | null
          name: string
          pe_industry_focus: string[] | null
          pe_investment_strategy: string[] | null
          re_sub_focus: string[] | null
          telephone: string | null
          vc_technology_themes: string[] | null
          website: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          hq_address?: string | null
          hq_city?: string | null
          hq_country?: string | null
          hq_zip?: string | null
          id?: string
          investment_countries?: string[] | null
          investment_focus?: string[] | null
          investment_regions?: string[] | null
          investor_type?: string | null
          logo?: string | null
          max_deal_size_meur?: number | null
          max_ebitda_meur?: number | null
          max_ticket_meur?: number | null
          min_deal_size_meur?: number | null
          min_ebitda_meur?: number | null
          min_ticket_meur?: number | null
          name: string
          pe_industry_focus?: string[] | null
          pe_investment_strategy?: string[] | null
          re_sub_focus?: string[] | null
          telephone?: string | null
          vc_technology_themes?: string[] | null
          website?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          hq_address?: string | null
          hq_city?: string | null
          hq_country?: string | null
          hq_zip?: string | null
          id?: string
          investment_countries?: string[] | null
          investment_focus?: string[] | null
          investment_regions?: string[] | null
          investor_type?: string | null
          logo?: string | null
          max_deal_size_meur?: number | null
          max_ebitda_meur?: number | null
          max_ticket_meur?: number | null
          min_deal_size_meur?: number | null
          min_ebitda_meur?: number | null
          min_ticket_meur?: number | null
          name?: string
          pe_industry_focus?: string[] | null
          pe_investment_strategy?: string[] | null
          re_sub_focus?: string[] | null
          telephone?: string | null
          vc_technology_themes?: string[] | null
          website?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          auth_user_id: string | null
          created_at: string
          email: string | null
          fname: string | null
          id: string
          lname: string | null
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          fname?: string | null
          id?: string
          lname?: string | null
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          email?: string | null
          fname?: string | null
          id?: string
          lname?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize:
        | {
            Args: {
              "": string
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      generate_embedding: {
        Args: {
          input_text: string
        }
        Returns: string
      }
      halfvec_avg: {
        Args: {
          "": number[]
        }
        Returns: unknown
      }
      halfvec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      halfvec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      hnsw_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      hnswhandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      ivfflathandler: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      l2_norm:
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      l2_normalize:
        | {
            Args: {
              "": string
            }
            Returns: string
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
        | {
            Args: {
              "": unknown
            }
            Returns: unknown
          }
      match_companies: {
        Args: {
          query_embedding: string
          match_threshold?: number
          match_count?: number
        }
        Returns: {
          id: string
          name: string
          description: string
          current_investor: string
          status: string
          sector: string
          created_at: string
          website: string
          sales_in_eurm: number
          ebitda_in_eurm: number
          marge: number
          year_finacials: string
          entry_year: string
          logo: string
          similarity: number
        }[]
      }
      search_companies:
        | {
            Args: {
              search_embedding: string
              match_count: number
            }
            Returns: {
              id: string
              name: string
              description: string
              industry: string
              country: string
              similarity: number
            }[]
          }
        | {
            Args: {
              search_embedding: string
              match_count: number
              min_similarity: number
            }
            Returns: {
              id: string
              name: string
              description: string
              industry: string
              country: string
              similarity: number
            }[]
          }
      sparsevec_out: {
        Args: {
          "": unknown
        }
        Returns: unknown
      }
      sparsevec_send: {
        Args: {
          "": unknown
        }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: {
          "": unknown[]
        }
        Returns: number
      }
      vector_avg: {
        Args: {
          "": number[]
        }
        Returns: string
      }
      vector_dims:
        | {
            Args: {
              "": string
            }
            Returns: number
          }
        | {
            Args: {
              "": unknown
            }
            Returns: number
          }
      vector_norm: {
        Args: {
          "": string
        }
        Returns: number
      }
      vector_out: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      vector_send: {
        Args: {
          "": string
        }
        Returns: string
      }
      vector_typmod_in: {
        Args: {
          "": unknown[]
        }
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

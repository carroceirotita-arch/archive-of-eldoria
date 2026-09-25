export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          id: string
          summary: string | null
          target_id: string | null
          target_type: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          id?: string
          summary?: string | null
          target_id?: string | null
          target_type: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          id?: string
          summary?: string | null
          target_id?: string | null
          target_type?: string
        }
        Relationships: []
      }
      character_fields: {
        Row: {
          allowed_branch: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id: string | null
          allowed_user_id: string | null
          body: string
          character_id: string
          created_at: string
          field_order: number
          id: string
          label: string
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
          visibility: Database["public"]["Enums"]["visibility_level"]
        }
        Insert: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          allowed_user_id?: string | null
          body: string
          character_id: string
          created_at?: string
          field_order?: number
          id?: string
          label: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Update: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          allowed_user_id?: string | null
          body?: string
          character_id?: string
          created_at?: string
          field_order?: number
          id?: string
          label?: string
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Relationships: [
          {
            foreignKeyName: "character_fields_allowed_group_id_fkey"
            columns: ["allowed_group_id"]
            isOneToOne: false
            referencedRelation: "secret_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_fields_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          age: number | null
          branch: Database["public"]["Enums"]["playable_branch"]
          created_at: string
          facecard_path: string | null
          id: string
          name: string
          owner_id: string | null
          status: Database["public"]["Enums"]["content_status"]
          updated_at: string
        }
        Insert: {
          age?: number | null
          branch: Database["public"]["Enums"]["playable_branch"]
          created_at?: string
          facecard_path?: string | null
          id?: string
          name: string
          owner_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Update: {
          age?: number | null
          branch?: Database["public"]["Enums"]["playable_branch"]
          created_at?: string
          facecard_path?: string | null
          id?: string
          name?: string
          owner_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          updated_at?: string
        }
        Relationships: []
      }
      classified_records: {
        Row: {
          allowed_branch: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id: string | null
          allowed_user_id: string | null
          body: string
          created_at: string
          id: string
          owner_id: string | null
          status: Database["public"]["Enums"]["content_status"]
          title: string
          visibility: Database["public"]["Enums"]["visibility_level"]
        }
        Insert: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          allowed_user_id?: string | null
          body: string
          created_at?: string
          id?: string
          owner_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Update: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          allowed_user_id?: string | null
          body?: string
          created_at?: string
          id?: string
          owner_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Relationships: [
          {
            foreignKeyName: "classified_records_allowed_group_id_fkey"
            columns: ["allowed_group_id"]
            isOneToOne: false
            referencedRelation: "secret_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_boards: {
        Row: {
          allowed_branch: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id: string | null
          area: Database["public"]["Enums"]["forum_area"]
          description: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["content_status"]
        }
        Insert: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          area: Database["public"]["Enums"]["forum_area"]
          description?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["content_status"]
        }
        Update: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          area?: Database["public"]["Enums"]["forum_area"]
          description?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["content_status"]
        }
        Relationships: [
          {
            foreignKeyName: "forum_boards_allowed_group_id_fkey"
            columns: ["allowed_group_id"]
            isOneToOne: false
            referencedRelation: "secret_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_post_revisions: {
        Row: {
          created_at: string
          editor_id: string
          id: string
          post_id: string
          previous_body: string
        }
        Insert: {
          created_at?: string
          editor_id: string
          id?: string
          post_id: string
          previous_body: string
        }
        Update: {
          created_at?: string
          editor_id?: string
          id?: string
          post_id?: string
          previous_body?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_post_revisions_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "forum_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_posts: {
        Row: {
          author_id: string
          body: string
          created_at: string
          id: string
          status: Database["public"]["Enums"]["content_status"]
          thread_id: string
          updated_at: string
        }
        Insert: {
          author_id: string
          body: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["content_status"]
          thread_id: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          body?: string
          created_at?: string
          id?: string
          status?: Database["public"]["Enums"]["content_status"]
          thread_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_posts_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "forum_threads"
            referencedColumns: ["id"]
          },
        ]
      }
      forum_threads: {
        Row: {
          author_id: string
          board_id: string
          created_at: string
          id: string
          locked: boolean
          pinned: boolean
          status: Database["public"]["Enums"]["content_status"]
          title: string
        }
        Insert: {
          author_id: string
          board_id: string
          created_at?: string
          id?: string
          locked?: boolean
          pinned?: boolean
          status?: Database["public"]["Enums"]["content_status"]
          title: string
        }
        Update: {
          author_id?: string
          board_id?: string
          created_at?: string
          id?: string
          locked?: boolean
          pinned?: boolean
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_threads_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "forum_boards"
            referencedColumns: ["id"]
          },
        ]
      }
      lore_entries: {
        Row: {
          allowed_branch: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id: string | null
          allowed_user_id: string | null
          body: string
          created_at: string
          id: string
          parent_id: string | null
          status: Database["public"]["Enums"]["content_status"]
          title: string
          visibility: Database["public"]["Enums"]["visibility_level"]
        }
        Insert: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          allowed_user_id?: string | null
          body: string
          created_at?: string
          id?: string
          parent_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          title: string
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Update: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          allowed_user_id?: string | null
          body?: string
          created_at?: string
          id?: string
          parent_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          title?: string
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Relationships: [
          {
            foreignKeyName: "lore_entries_allowed_group_id_fkey"
            columns: ["allowed_group_id"]
            isOneToOne: false
            referencedRelation: "secret_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lore_entries_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "lore_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      npcs: {
        Row: {
          allowed_branch: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id: string | null
          allowed_user_id: string | null
          branch_label: string | null
          created_at: string
          figure_type: string
          id: string
          name: string
          portrait_path: string | null
          status: Database["public"]["Enums"]["content_status"]
          summary: string | null
          visibility: Database["public"]["Enums"]["visibility_level"]
        }
        Insert: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          allowed_user_id?: string | null
          branch_label?: string | null
          created_at?: string
          figure_type: string
          id?: string
          name: string
          portrait_path?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Update: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          allowed_user_id?: string | null
          branch_label?: string | null
          created_at?: string
          figure_type?: string
          id?: string
          name?: string
          portrait_path?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          summary?: string | null
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Relationships: [
          {
            foreignKeyName: "npcs_allowed_group_id_fkey"
            columns: ["allowed_group_id"]
            isOneToOne: false
            referencedRelation: "secret_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"]
          created_at: string
          display_name: string
          id: string
          updated_at: string
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"]
          created_at?: string
          display_name: string
          id: string
          updated_at?: string
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"]
          created_at?: string
          display_name?: string
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      secret_group_members: {
        Row: {
          created_at: string
          group_id: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "secret_group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "secret_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      secret_groups: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["content_status"]
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["content_status"]
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["content_status"]
        }
        Relationships: []
      }
      skill_tree_edges: {
        Row: {
          id: string
          source_node_id: string
          target_node_id: string
          tree_id: string
        }
        Insert: {
          id?: string
          source_node_id: string
          target_node_id: string
          tree_id: string
        }
        Update: {
          id?: string
          source_node_id?: string
          target_node_id?: string
          tree_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "skill_tree_edges_source_node_id_fkey"
            columns: ["source_node_id"]
            isOneToOne: false
            referencedRelation: "skill_tree_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_tree_edges_target_node_id_fkey"
            columns: ["target_node_id"]
            isOneToOne: false
            referencedRelation: "skill_tree_nodes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_tree_edges_tree_id_fkey"
            columns: ["tree_id"]
            isOneToOne: false
            referencedRelation: "skill_trees"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_tree_nodes: {
        Row: {
          availability: string
          description: string
          id: string
          name: string
          narrative_effects: string | null
          position_x: number
          position_y: number
          requirements: string | null
          restrictions: string | null
          skill_id: string | null
          status: Database["public"]["Enums"]["content_status"]
          tree_id: string
          visibility: Database["public"]["Enums"]["visibility_level"]
        }
        Insert: {
          availability?: string
          description?: string
          id?: string
          name: string
          narrative_effects?: string | null
          position_x?: number
          position_y?: number
          requirements?: string | null
          restrictions?: string | null
          skill_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          tree_id: string
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Update: {
          availability?: string
          description?: string
          id?: string
          name?: string
          narrative_effects?: string | null
          position_x?: number
          position_y?: number
          requirements?: string | null
          restrictions?: string | null
          skill_id?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          tree_id?: string
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Relationships: [
          {
            foreignKeyName: "skill_tree_nodes_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "skill_tree_nodes_tree_id_fkey"
            columns: ["tree_id"]
            isOneToOne: false
            referencedRelation: "skill_trees"
            referencedColumns: ["id"]
          },
        ]
      }
      skill_trees: {
        Row: {
          description: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["content_status"]
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["content_status"]
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["content_status"]
        }
        Relationships: []
      }
      skills: {
        Row: {
          allowed_branch: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id: string | null
          allowed_user_id: string | null
          created_at: string
          description: string
          id: string
          name: string
          narrative_effects: string | null
          requirements: string | null
          restrictions: string | null
          status: Database["public"]["Enums"]["content_status"]
          visibility: Database["public"]["Enums"]["visibility_level"]
        }
        Insert: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          allowed_user_id?: string | null
          created_at?: string
          description: string
          id?: string
          name: string
          narrative_effects?: string | null
          requirements?: string | null
          restrictions?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Update: {
          allowed_branch?: Database["public"]["Enums"]["playable_branch"] | null
          allowed_group_id?: string | null
          allowed_user_id?: string | null
          created_at?: string
          description?: string
          id?: string
          name?: string
          narrative_effects?: string | null
          requirements?: string | null
          restrictions?: string | null
          status?: Database["public"]["Enums"]["content_status"]
          visibility?: Database["public"]["Enums"]["visibility_level"]
        }
        Relationships: [
          {
            foreignKeyName: "skills_allowed_group_id_fkey"
            columns: ["allowed_group_id"]
            isOneToOne: false
            referencedRelation: "secret_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_view_character_field: {
        Args: { _field_id: string; _user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_active_account: { Args: { _user_id: string }; Returns: boolean }
      is_secret_group_member: {
        Args: { _group_id: string; _user_id: string }
        Returns: boolean
      }
      user_branch: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["playable_branch"]
      }
    }
    Enums: {
      account_status: "convidado" | "ativo" | "suspenso"
      app_role: "jogador" | "administrador"
      content_status: "ativo" | "arquivado"
      forum_area: "ic" | "ooc"
      playable_branch: "reconhecimento" | "policia_militar"
      visibility_level:
        | "publico"
        | "proprio_jogador"
        | "ramo"
        | "grupo_secreto"
        | "usuario_especifico"
        | "administrador"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status: ["convidado", "ativo", "suspenso"],
      app_role: ["jogador", "administrador"],
      content_status: ["ativo", "arquivado"],
      forum_area: ["ic", "ooc"],
      playable_branch: ["reconhecimento", "policia_militar"],
      visibility_level: [
        "publico",
        "proprio_jogador",
        "ramo",
        "grupo_secreto",
        "usuario_especifico",
        "administrador",
      ],
    },
  },
} as const

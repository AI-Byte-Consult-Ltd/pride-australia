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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      businesses: {
        Row: {
          address: string | null
          category: string
          city: string
          contact_email: string | null
          created_at: string
          description: string | null
          id: string
          instagram: string | null
          is_approved: boolean
          latitude: number | null
          longitude: number | null
          name: string
          state: string
          updated_at: string
          user_id: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          category: string
          city: string
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          instagram?: string | null
          is_approved?: boolean
          latitude?: number | null
          longitude?: number | null
          name: string
          state: string
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          category?: string
          city?: string
          contact_email?: string | null
          created_at?: string
          description?: string | null
          id?: string
          instagram?: string | null
          is_approved?: boolean
          latitude?: number | null
          longitude?: number | null
          name?: string
          state?: string
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "businesses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      follows: {
        Row: {
          created_at: string
          follower_id: string
          following_id: string
          id: string
        }
        Insert: {
          created_at?: string
          follower_id: string
          following_id: string
          id?: string
        }
        Update: {
          created_at?: string
          follower_id?: string
          following_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_follower_id_fkey"
            columns: ["follower_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "follows_following_id_fkey"
            columns: ["following_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      hashtag_subscriptions: {
        Row: {
          created_at: string
          hashtag: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          hashtag: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          hashtag?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          content: string | null
          created_at: string
          id: string
          is_read: boolean
          post_id: string | null
          recipient_id: string
          reply_id: string | null
          sender_id: string
          type: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          post_id?: string | null
          recipient_id: string
          reply_id?: string | null
          sender_id: string
          type: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          is_read?: boolean
          post_id?: string | null
          recipient_id?: string
          reply_id?: string | null
          sender_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "post_replies"
            referencedColumns: ["id"]
          },
        ]
      }
      post_echoes: {
        Row: {
          created_at: string
          id: string
          message: string | null
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_echoes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: string
          post_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          post_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          post_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      post_replies: {
        Row: {
          content: string
          created_at: string
          id: string
          post_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          post_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          post_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_replies_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          content: string
          created_at: string
          id: string
          image_url: string | null
          sticker: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          image_url?: string | null
          sticker?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          image_url?: string | null
          sticker?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_changes: number
          avatar_url: string | null
          banner_changes: number
          banner_url: string | null
          bio: string | null
          created_at: string
          date_of_birth: string | null
          display_name: string | null
          display_name_changes: number
          id: string
          pride_coins: number
          referral_code: string | null
          updated_at: string
          user_id: string
          username: string | null
          username_changes: number
        }
        Insert: {
          avatar_changes?: number
          avatar_url?: string | null
          banner_changes?: number
          banner_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          display_name?: string | null
          display_name_changes?: number
          id?: string
          pride_coins?: number
          referral_code?: string | null
          updated_at?: string
          user_id: string
          username?: string | null
          username_changes?: number
        }
        Update: {
          avatar_changes?: number
          avatar_url?: string | null
          banner_changes?: number
          banner_url?: string | null
          bio?: string | null
          created_at?: string
          date_of_birth?: string | null
          display_name?: string | null
          display_name_changes?: number
          id?: string
          pride_coins?: number
          referral_code?: string | null
          updated_at?: string
          user_id?: string
          username?: string | null
          username_changes?: number
        }
        Relationships: []
      }
      referrals: {
        Row: {
          coins_awarded: number
          created_at: string
          id: string
          referred_id: string
          referrer_id: string
        }
        Insert: {
          coins_awarded?: number
          created_at?: string
          id?: string
          referred_id: string
          referrer_id: string
        }
        Update: {
          coins_awarded?: number
          created_at?: string
          id?: string
          referred_id?: string
          referrer_id?: string
        }
        Relationships: []
      }
      coin_ledger: {
        Row: {
          amount: number
          created_at: string
          id: number
          reason: string
          ref_key: string | null
          user_id: string
        }
        Insert: never
        Update: never
        Relationships: []
      }
      user_blocks: {
        Row: {
          blocked_id: string
          blocker_id: string
          created_at: string
          id: string
        }
        Insert: {
          blocked_id: string
          blocker_id: string
          created_at?: string
          id?: string
        }
        Update: never
        Relationships: []
      }
      content_reports: {
        Row: {
          created_at: string
          id: string
          reason: string
          reporter_id: string
          resolved_at: string | null
          resolved_by: string | null
          status: string
          target_id: string
          target_type: string
        }
        Insert: {
          reason: string
          reporter_id: string
          target_id: string
          target_type: string
        }
        Update: {
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      admin_add_pride_coins: {
        Args: { _amount: number; _target_user_id: string }
        Returns: undefined
      }
      arcade_finish: {
        Args: { _score: number; _session_id: string }
        Returns: number
      }
      arcade_start: {
        Args: Record<PropertyKey, never>
        Returns: string | null
      }
      delete_my_account: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      ensure_username: {
        Args: { _candidate: string }
        Returns: string
      }
      get_feed: {
        Args: {
          _author?: string
          _before?: string
          _hashtag?: string
          _limit?: number
          _mode?: string
        }
        Returns: {
          author_avatar: string | null
          author_id: string
          author_name: string
          author_username: string | null
          created_at: string
          content: string
          echo_count: number
          echo_message: string | null
          echoed_by_me: boolean
          echoer_id: string | null
          echoer_name: string | null
          echoer_username: string | null
          image_url: string | null
          item_time: string
          item_type: string
          like_count: number
          liked_by_me: boolean
          post_id: string
          reply_count: number
          sticker: string | null
        }[]
      }
      get_my_private_profile: {
        Args: Record<PropertyKey, never>
        Returns: {
          avatar_changes: number
          banner_changes: number
          date_of_birth: string | null
          display_name_changes: number
          referral_code: string | null
          username_changes: number
        }[]
      }
      get_open_reports: {
        Args: { _limit?: number }
        Returns: {
          created_at: string
          id: string
          reason: string
          reporter_username: string | null
          target_id: string
          target_preview: string | null
          target_type: string
          target_user_id: string | null
          target_username: string | null
        }[]
      }
      get_trending_hashtags: {
        Args: { _limit?: number }
        Returns: {
          hashtag: string
          post_count: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_blocked_between: {
        Args: { _a: string; _b: string }
        Returns: boolean
      }
      update_profile_field: {
        Args: { _field: string; _value: string }
        Returns: number
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const

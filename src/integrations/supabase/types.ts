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
      cakto_transactions: {
        Row: {
          amount_cents: number
          created_at: string | null
          currency: string | null
          customer_email: string
          customer_name: string | null
          customer_phone: string | null
          id: string
          metadata: Json | null
          paid_at: string | null
          payment_method: string | null
          payment_status: string
          plan_type: string | null
          product_id: string | null
          product_name: string | null
          refunded_at: string | null
          subscription_id: string | null
          table_target: string | null
          transaction_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount_cents?: number
          created_at?: string | null
          currency?: string | null
          customer_email: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          payment_status?: string
          plan_type?: string | null
          product_id?: string | null
          product_name?: string | null
          refunded_at?: string | null
          subscription_id?: string | null
          table_target?: string | null
          transaction_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          currency?: string | null
          customer_email?: string
          customer_name?: string | null
          customer_phone?: string | null
          id?: string
          metadata?: Json | null
          paid_at?: string | null
          payment_method?: string | null
          payment_status?: string
          plan_type?: string | null
          product_id?: string | null
          product_name?: string | null
          refunded_at?: string | null
          subscription_id?: string | null
          table_target?: string | null
          transaction_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      cakto_webhook_logs: {
        Row: {
          created_at: string | null
          customer_email: string | null
          error_message: string | null
          event_type: string
          id: string
          payload: Json
          processed_at: string | null
          status: string | null
          transaction_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          customer_email?: string | null
          error_message?: string | null
          event_type: string
          id?: string
          payload: Json
          processed_at?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          customer_email?: string | null
          error_message?: string | null
          event_type?: string
          id?: string
          payload?: Json
          processed_at?: string | null
          status?: string | null
          transaction_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      comments: {
        Row: {
          created_at: string | null
          id: string
          model_id: string
          text: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          model_id: string
          text: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          model_id?: string
          text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comments_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_messages: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_read: boolean | null
          message: string
          name: string
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_read?: boolean | null
          message: string
          name: string
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_read?: boolean | null
          message?: string
          name?: string
          subject?: string | null
        }
        Relationships: []
      }
      direct_messages: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          receiver_id: string
          sender_id: string
          story_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          receiver_id: string
          sender_id: string
          story_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          receiver_id?: string
          sender_id?: string
          story_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "direct_messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "direct_messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "direct_messages_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
        ]
      }
      likes: {
        Row: {
          created_at: string | null
          id: string
          model_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          model_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          model_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "likes_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "models"
            referencedColumns: ["id"]
          },
        ]
      }
      manual_payment_requests: {
        Row: {
          admin_notes: string | null
          amount_cents: number
          created_at: string
          id: string
          model_id: string
          paid_to_model_at: string | null
          payment_method: string
          payment_type: string
          payout_amount_cents: number | null
          payout_status: string
          plan_id: string | null
          platform_fee_cents: number | null
          receipt_url: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          transaction_code: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          admin_notes?: string | null
          amount_cents?: number
          created_at?: string
          id?: string
          model_id: string
          paid_to_model_at?: string | null
          payment_method?: string
          payment_type?: string
          payout_amount_cents?: number | null
          payout_status?: string
          plan_id?: string | null
          platform_fee_cents?: number | null
          receipt_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          transaction_code?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          admin_notes?: string | null
          amount_cents?: number
          created_at?: string
          id?: string
          model_id?: string
          paid_to_model_at?: string | null
          payment_method?: string
          payment_type?: string
          payout_amount_cents?: number | null
          payout_status?: string
          plan_id?: string | null
          platform_fee_cents?: number | null
          receipt_url?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          transaction_code?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "manual_payment_requests_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "premium_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      model_comments: {
        Row: {
          approved_at: string | null
          author_id: string
          content: string
          created_at: string | null
          id: string
          model_id: string
          rating: number | null
          status: string
          updated_at: string | null
        }
        Insert: {
          approved_at?: string | null
          author_id: string
          content: string
          created_at?: string | null
          id?: string
          model_id: string
          rating?: number | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          approved_at?: string | null
          author_id?: string
          content?: string
          created_at?: string | null
          id?: string
          model_id?: string
          rating?: number | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      model_details: {
        Row: {
          age: number | null
          attendance_online: boolean | null
          attendance_presencial: boolean | null
          biotype: string | null
          city: string | null
          created_at: string
          does_overnight: boolean | null
          ethnicity: string | null
          eye_color: string | null
          hair_color: string | null
          height: number | null
          id: string
          languages: string[] | null
          my_services: string[] | null
          neighborhood: string | null
          pix_key: string | null
          pix_key_type: string | null
          premium_enabled: boolean | null
          premium_price: number | null
          price_1h: string | null
          price_2h: string | null
          price_overnight: string | null
          price_rapidinha: string | null
          services: string[] | null
          services_description: string | null
          target_audience: string[] | null
          updated_at: string
          user_id: string
          weight: number | null
          when_description: string | null
          where_description: string | null
          who_description: string | null
        }
        Insert: {
          age?: number | null
          attendance_online?: boolean | null
          attendance_presencial?: boolean | null
          biotype?: string | null
          city?: string | null
          created_at?: string
          does_overnight?: boolean | null
          ethnicity?: string | null
          eye_color?: string | null
          hair_color?: string | null
          height?: number | null
          id?: string
          languages?: string[] | null
          my_services?: string[] | null
          neighborhood?: string | null
          pix_key?: string | null
          pix_key_type?: string | null
          premium_enabled?: boolean | null
          premium_price?: number | null
          price_1h?: string | null
          price_2h?: string | null
          price_overnight?: string | null
          price_rapidinha?: string | null
          services?: string[] | null
          services_description?: string | null
          target_audience?: string[] | null
          updated_at?: string
          user_id: string
          weight?: number | null
          when_description?: string | null
          where_description?: string | null
          who_description?: string | null
        }
        Update: {
          age?: number | null
          attendance_online?: boolean | null
          attendance_presencial?: boolean | null
          biotype?: string | null
          city?: string | null
          created_at?: string
          does_overnight?: boolean | null
          ethnicity?: string | null
          eye_color?: string | null
          hair_color?: string | null
          height?: number | null
          id?: string
          languages?: string[] | null
          my_services?: string[] | null
          neighborhood?: string | null
          pix_key?: string | null
          pix_key_type?: string | null
          premium_enabled?: boolean | null
          premium_price?: number | null
          price_1h?: string | null
          price_2h?: string | null
          price_overnight?: string | null
          price_rapidinha?: string | null
          services?: string[] | null
          services_description?: string | null
          target_audience?: string[] | null
          updated_at?: string
          user_id?: string
          weight?: number | null
          when_description?: string | null
          where_description?: string | null
          who_description?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "model_details_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      model_follows: {
        Row: {
          created_at: string | null
          id: string
          model_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          model_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          model_id?: string
          user_id?: string
        }
        Relationships: []
      }
      model_likes: {
        Row: {
          created_at: string | null
          id: string
          model_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          model_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          model_id?: string
          user_id?: string
        }
        Relationships: []
      }
      model_posts: {
        Row: {
          caption: string | null
          created_at: string
          id: string
          is_premium: boolean | null
          model_id: string
          updated_at: string
        }
        Insert: {
          caption?: string | null
          created_at?: string
          id?: string
          is_premium?: boolean | null
          model_id: string
          updated_at?: string
        }
        Update: {
          caption?: string | null
          created_at?: string
          id?: string
          is_premium?: boolean | null
          model_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      model_subscriptions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          created_at: string
          expires_at: string | null
          id: string
          plan_type: Database["public"]["Enums"]["subscription_plan_type"]
          price_paid: number | null
          rejected_reason: string | null
          requested_at: string
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_type: Database["public"]["Enums"]["subscription_plan_type"]
          price_paid?: number | null
          rejected_reason?: string | null
          requested_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_type?: Database["public"]["Enums"]["subscription_plan_type"]
          price_paid?: number | null
          rejected_reason?: string | null
          requested_at?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      model_unlocks: {
        Row: {
          id: string
          model_id: string
          unlocked_at: string | null
          user_id: string
        }
        Insert: {
          id?: string
          model_id: string
          unlocked_at?: string | null
          user_id: string
        }
        Update: {
          id?: string
          model_id?: string
          unlocked_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      models: {
        Row: {
          age: number
          availability: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          is_verified: boolean | null
          languages: string[] | null
          location: string | null
          name: string
          specialties: string[] | null
        }
        Insert: {
          age: number
          availability?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_verified?: boolean | null
          languages?: string[] | null
          location?: string | null
          name: string
          specialties?: string[] | null
        }
        Update: {
          age?: number
          availability?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          is_verified?: boolean | null
          languages?: string[] | null
          location?: string | null
          name?: string
          specialties?: string[] | null
        }
        Relationships: []
      }
      page_views: {
        Row: {
          created_at: string
          id: string
          path: string
          referrer: string | null
          session_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          path: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          path?: string
          referrer?: string | null
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      plan_pricing: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          plan_type: string
          price_cents: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          plan_type: string
          price_cents?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          plan_type?: string
          price_cents?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      post_media: {
        Row: {
          created_at: string
          duration: number | null
          id: string
          media_type: Database["public"]["Enums"]["post_media_type"]
          media_url: string
          position: number | null
          post_id: string
          thumbnail_url: string | null
        }
        Insert: {
          created_at?: string
          duration?: number | null
          id?: string
          media_type: Database["public"]["Enums"]["post_media_type"]
          media_url: string
          position?: number | null
          post_id: string
          thumbnail_url?: string | null
        }
        Update: {
          created_at?: string
          duration?: number | null
          id?: string
          media_type?: Database["public"]["Enums"]["post_media_type"]
          media_url?: string
          position?: number | null
          post_id?: string
          thumbnail_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "post_media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "model_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_payments: {
        Row: {
          amount_cents: number
          created_at: string | null
          due_date: string | null
          id: string
          notes: string | null
          payment_date: string | null
          payment_method: string | null
          processed_at: string | null
          processed_by: string | null
          status: string
          subscription_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount_cents?: number
          created_at?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          subscription_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string | null
          due_date?: string | null
          id?: string
          notes?: string | null
          payment_date?: string | null
          payment_method?: string | null
          processed_at?: string | null
          processed_by?: string | null
          status?: string
          subscription_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "premium_payments_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "premium_subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_plans: {
        Row: {
          checkout_url: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          duration_days: number
          id: string
          is_active: boolean | null
          name: string
          price_cents: number
          slug: string
          updated_at: string | null
        }
        Insert: {
          checkout_url?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          duration_days?: number
          id?: string
          is_active?: boolean | null
          name: string
          price_cents?: number
          slug: string
          updated_at?: string | null
        }
        Update: {
          checkout_url?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          duration_days?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price_cents?: number
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      premium_subscriptions: {
        Row: {
          approved_at: string | null
          approved_by: string | null
          cancelled_at: string | null
          created_at: string | null
          expires_at: string | null
          id: string
          notes: string | null
          payment_status: string
          plan_id: string | null
          plan_name: string
          price_paid: number
          starts_at: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          approved_at?: string | null
          approved_by?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          notes?: string | null
          payment_status?: string
          plan_id?: string | null
          plan_name: string
          price_paid?: number
          starts_at?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          approved_at?: string | null
          approved_by?: string | null
          cancelled_at?: string | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          notes?: string | null
          payment_status?: string
          plan_id?: string | null
          plan_name?: string
          price_paid?: number
          starts_at?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "premium_subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "premium_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_plans: {
        Row: {
          checkout_url: string | null
          created_at: string | null
          description: string | null
          display_order: number | null
          duration_days: number
          id: string
          is_active: boolean | null
          name: string
          price_cents: number
          slug: string
          updated_at: string | null
        }
        Insert: {
          checkout_url?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          duration_days?: number
          id?: string
          is_active?: boolean | null
          name: string
          price_cents?: number
          slug: string
          updated_at?: string | null
        }
        Update: {
          checkout_url?: string | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          duration_days?: number
          id?: string
          is_active?: boolean | null
          name?: string
          price_cents?: number
          slug?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          appearance_type: string | null
          avatar_url: string | null
          background_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          gallery_enabled: boolean | null
          gender: string | null
          id: string
          id_document_url: string | null
          location: string | null
          phone: string | null
          updated_at: string | null
          user_type: string | null
          username: string | null
          visibility_status: string
        }
        Insert: {
          age?: number | null
          appearance_type?: string | null
          avatar_url?: string | null
          background_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          gallery_enabled?: boolean | null
          gender?: string | null
          id: string
          id_document_url?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string | null
          user_type?: string | null
          username?: string | null
          visibility_status?: string
        }
        Update: {
          age?: number | null
          appearance_type?: string | null
          avatar_url?: string | null
          background_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          gallery_enabled?: boolean | null
          gender?: string | null
          id?: string
          id_document_url?: string | null
          location?: string | null
          phone?: string | null
          updated_at?: string | null
          user_type?: string | null
          username?: string | null
          visibility_status?: string
        }
        Relationships: []
      }
      service_categories: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          label: string
          sort_order: number | null
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label: string
          sort_order?: number | null
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          label?: string
          sort_order?: number | null
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      stories: {
        Row: {
          created_at: string
          duration: number | null
          expires_at: string
          id: string
          media_type: string
          media_url: string
          model_id: string
          thumbnail_url: string | null
        }
        Insert: {
          created_at?: string
          duration?: number | null
          expires_at?: string
          id?: string
          media_type: string
          media_url: string
          model_id: string
          thumbnail_url?: string | null
        }
        Update: {
          created_at?: string
          duration?: number | null
          expires_at?: string
          id?: string
          media_type?: string
          media_url?: string
          model_id?: string
          thumbnail_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stories_model_id_fkey"
            columns: ["model_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      story_reactions: {
        Row: {
          created_at: string | null
          id: string
          reaction_type: string | null
          story_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          reaction_type?: string | null
          story_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          reaction_type?: string | null
          story_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "story_reactions_story_id_fkey"
            columns: ["story_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "story_reactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      verified_models: {
        Row: {
          can_request_again_at: string | null
          created_at: string
          id: string
          notes: string | null
          rejection_reason: string | null
          user_id: string
          verification_media_type: string | null
          verification_media_url: string | null
          verification_requested_at: string | null
          verification_reviewed_at: string | null
          verification_status: string | null
          verification_type: string
          verified_at: string
          verified_by: string | null
        }
        Insert: {
          can_request_again_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          rejection_reason?: string | null
          user_id: string
          verification_media_type?: string | null
          verification_media_url?: string | null
          verification_requested_at?: string | null
          verification_reviewed_at?: string | null
          verification_status?: string | null
          verification_type?: string
          verified_at?: string
          verified_by?: string | null
        }
        Update: {
          can_request_again_at?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          rejection_reason?: string | null
          user_id?: string
          verification_media_type?: string | null
          verification_media_url?: string | null
          verification_requested_at?: string | null
          verification_reviewed_at?: string | null
          verification_status?: string | null
          verification_type?: string
          verified_at?: string
          verified_by?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      cakto_payments_dashboard: {
        Row: {
          amount_cents: number | null
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          id: string | null
          paid_at: string | null
          payment_status: string | null
          plan_type: string | null
          table_target: string | null
          transaction_id: string | null
          user_avatar: string | null
          user_display_name: string | null
          user_username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      find_user_by_email: { Args: { _email: string }; Returns: string }
      get_cakto_financial_summary: {
        Args: { _end_date: string; _start_date: string }
        Returns: {
          total_approved: number
          total_refunded: number
          total_refunded_cents: number
          total_revenue_cents: number
          total_transactions: number
        }[]
      }
      get_financial_summary: {
        Args: { _end_date: string; _start_date: string }
        Returns: {
          total_billed: number
          total_overdue: number
          total_pending: number
          total_received: number
        }[]
      }
      has_active_premium: { Args: { _user_id: string }; Returns: boolean }
      has_active_subscription: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_model: { Args: { user_id: string }; Returns: boolean }
      process_cakto_payment_approved: {
        Args: {
          _amount_cents: number
          _customer_email: string
          _duration_days?: number
          _plan_type: string
          _table_target: string
          _transaction_id: string
          _user_id: string
        }
        Returns: Json
      }
      process_cakto_payment_cancelled: {
        Args: {
          _reason?: string
          _table_target: string
          _transaction_id: string
          _user_id: string
        }
        Returns: Json
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      post_media_type: "image" | "video"
      subscription_plan_type: "daily" | "monthly"
      subscription_status: "pending" | "approved" | "rejected" | "expired"
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
      post_media_type: ["image", "video"],
      subscription_plan_type: ["daily", "monthly"],
      subscription_status: ["pending", "approved", "rejected", "expired"],
    },
  },
} as const

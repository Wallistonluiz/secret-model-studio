import { useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AvatarUploadProps {
  userId: string;
  currentAvatarUrl: string;
  displayName: string;
  username: string;
  onAvatarChange: (url: string) => void;
}

const AvatarUpload = ({
  userId,
  currentAvatarUrl,
  displayName,
  username,
  onAvatarChange,
}: AvatarUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Tipo de arquivo inválido",
        description: "Use imagens JPG, PNG, WebP ou GIF.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Arquivo muito grande",
        description: "O tamanho máximo é 5MB.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Create unique file path
      const fileExt = file.name.split(".").pop();
      const fileName = `${userId}/${Date.now()}.${fileExt}`;

      // Delete old avatar if exists
      if (currentAvatarUrl) {
        const oldPath = currentAvatarUrl.split("/avatars/")[1];
        if (oldPath) {
          await supabase.storage.from("avatars").remove([oldPath]);
        }
      }

      // Upload new avatar
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const newAvatarUrl = urlData.publicUrl;

      // Update profile in database
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: newAvatarUrl })
        .eq("id", userId);

      if (updateError) throw updateError;

      onAvatarChange(newAvatarUrl);

      toast({
        title: "Foto atualizada!",
        description: "Sua foto de perfil foi alterada com sucesso.",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Erro ao enviar foto",
        description: "Não foi possível atualizar sua foto. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative mb-3">
        <div className="w-24 h-24 rounded-full gradient-border p-[3px]">
          <Avatar className="w-full h-full">
            <AvatarImage src={currentAvatarUrl} alt={displayName} />
            <AvatarFallback className="bg-muted text-3xl">
              {(displayName || username || "U").charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
        <button
          onClick={handleFileSelect}
          disabled={uploading}
          className="absolute bottom-0 right-0 w-8 h-8 rounded-full gradient-bg flex items-center justify-center disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          ) : (
            <Camera className="w-4 h-4 text-white" />
          )}
        </button>
      </div>
      <button
        onClick={handleFileSelect}
        disabled={uploading}
        className="text-primary text-sm font-medium disabled:opacity-50"
      >
        {uploading ? "Enviando..." : "Alterar foto"}
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default AvatarUpload;

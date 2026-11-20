"use client";

import Button from "@/components/ui/Button";
import { useToast } from "@/context/ToastContext";

export default function PersonalizeButton() {
  const toast = useToast();

  return (
    <Button
      arrow={false}
      fullWidth
      onClick={() => toast.info("Book personalization is coming soon.")}
    >
      Personalize my book
    </Button>
  );
}

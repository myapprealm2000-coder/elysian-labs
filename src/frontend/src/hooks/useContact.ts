import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation } from "@tanstack/react-query";

interface SubmitContactParams {
  name: string;
  email: string;
  message: string;
}

export function useSubmitContact() {
  const { actor } = useActor(createActor);
  return useMutation<boolean, Error, SubmitContactParams>({
    mutationFn: async ({ name, email, message }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.submitContact(name, email, message);
    },
  });
}

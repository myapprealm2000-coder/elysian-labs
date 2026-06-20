import { u as useActor, a as useQuery, b as useMutation, c as createActor } from "./backend-CD8jDaiY.js";
import { a as useQueryClient } from "./index-De5ctwPQ.js";
const PROJECTS_KEY = ["projects"];
function useProjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: PROJECTS_KEY,
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProjects();
    },
    enabled: !!actor && !isFetching
  });
}
function useProject(id) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getProject(id);
    },
    enabled: !!actor && !isFetching && !!id
  });
}
function useCreateProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, templateType }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createProject(name, templateType);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
    }
  });
}
function useDeleteProject() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteProject(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_KEY });
    }
  });
}
export {
  useProjects as a,
  useDeleteProject as b,
  useProject as c,
  useCreateProject as u
};

import Map "mo:core/Map";
import Time "mo:core/Time";
import ProjectTypes "../types/projects";
import Common "../types/common";
import ProjectsLib "../lib/projects";
import Storage "mo:caffeineai-object-storage/Storage";

mixin (projects : Map.Map<Common.ProjectId, ProjectTypes.Project>) {

  public shared func createProject(
    name : Text,
    templateType : ProjectTypes.TemplateType,
  ) : async ProjectTypes.Project {
    let now = Time.now();
    let id = now.toText();
    ProjectsLib.createProject(projects, id, name, templateType, now);
  };

  public query func listProjects() : async [ProjectTypes.Project] {
    ProjectsLib.listProjects(projects);
  };

  public query func getProject(id : Common.ProjectId) : async ?ProjectTypes.Project {
    ProjectsLib.getProject(projects, id);
  };

  public shared func deleteProject(id : Common.ProjectId) : async Bool {
    ProjectsLib.deleteProject(projects, id);
  };

  public shared func attachVideoFile(
    id : Common.ProjectId,
    videoFile : Storage.ExternalBlob,
  ) : async Bool {
    let now = Time.now();
    ProjectsLib.attachVideoFile(projects, id, videoFile, now);
  };
};

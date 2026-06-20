import Map "mo:core/Map";
import Int "mo:core/Int";
import ProjectTypes "../types/projects";
import Common "../types/common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type ProjectMap = Map.Map<Common.ProjectId, ProjectTypes.Project>;

  public func createProject(
    projects : ProjectMap,
    id : Common.ProjectId,
    name : Text,
    templateType : ProjectTypes.TemplateType,
    now : Common.Timestamp,
  ) : ProjectTypes.Project {
    let project : ProjectTypes.Project = {
      id;
      name;
      templateType;
      createdAt = now;
      updatedAt = now;
      videoFile = null;
    };
    projects.add(id, project);
    project;
  };

  public func listProjects(projects : ProjectMap) : [ProjectTypes.Project] {
    let all = projects.values().toArray();
    all.sort(func(a, b) = Int.compare(b.createdAt, a.createdAt));
  };

  public func getProject(
    projects : ProjectMap,
    id : Common.ProjectId,
  ) : ?ProjectTypes.Project {
    projects.get(id);
  };

  public func deleteProject(
    projects : ProjectMap,
    id : Common.ProjectId,
  ) : Bool {
    switch (projects.get(id)) {
      case (?_) {
        projects.remove(id);
        true;
      };
      case null { false };
    };
  };

  public func attachVideoFile(
    projects : ProjectMap,
    id : Common.ProjectId,
    videoFile : Storage.ExternalBlob,
    now : Common.Timestamp,
  ) : Bool {
    switch (projects.get(id)) {
      case (?project) {
        let updated = { project with videoFile = ?videoFile; updatedAt = now };
        projects.add(id, updated);
        true;
      };
      case null { false };
    };
  };
};

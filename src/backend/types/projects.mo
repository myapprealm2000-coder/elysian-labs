import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  public type TemplateType = {
    #blank;
    #thumbnail;
    #ad;
  };

  public type Project = {
    id : Common.ProjectId;
    name : Text;
    templateType : TemplateType;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
    videoFile : ?Storage.ExternalBlob;
  };
};

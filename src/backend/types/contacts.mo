import Common "common";

module {
  public type ContactMessage = {
    id : Common.ContactMessageId;
    name : Text;
    email : Text;
    message : Text;
    createdAt : Common.Timestamp;
    isRead : Bool;
  };
};

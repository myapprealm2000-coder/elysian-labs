import Map "mo:core/Map";
import ContactTypes "../types/contacts";
import Common "../types/common";

module {
  public type ContactMap = Map.Map<Common.ContactMessageId, ContactTypes.ContactMessage>;

  public func submitContact(
    contacts : ContactMap,
    id : Common.ContactMessageId,
    name : Text,
    email : Text,
    message : Text,
    now : Common.Timestamp,
  ) : Bool {
    let msg : ContactTypes.ContactMessage = {
      id;
      name;
      email;
      message;
      createdAt = now;
      isRead = false;
    };
    contacts.add(id, msg);
    true;
  };

  public func listContactMessages(contacts : ContactMap) : [ContactTypes.ContactMessage] {
    contacts.values().toArray();
  };
};

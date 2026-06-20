import Map "mo:core/Map";
import Time "mo:core/Time";
import ContactTypes "../types/contacts";
import Common "../types/common";
import ContactsLib "../lib/contacts";

mixin (contacts : Map.Map<Common.ContactMessageId, ContactTypes.ContactMessage>) {

  public shared func submitContact(
    name : Text,
    email : Text,
    message : Text,
  ) : async Bool {
    let now = Time.now();
    let id = now.toText();
    ContactsLib.submitContact(contacts, id, name, email, message, now);
  };

  public query func listContactMessages() : async [ContactTypes.ContactMessage] {
    ContactsLib.listContactMessages(contacts);
  };
};

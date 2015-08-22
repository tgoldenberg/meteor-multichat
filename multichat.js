Messages = new Mongo.Collection("messages");
if (Meteor.isServer) {
  Meteor.publish("messages", function() {
    return Messages.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("messages");

  Template.body.helpers({
    messages: function() {
      return Messages.find({}, {sort: {createdAt: -1}});
    }
  });

  Template.chat.events({
    'submit .new_chat_message': function(event) {
      event.preventDefault();
      var text = event.target.chat_message.value;
      console.log(text);
      Meteor.call("addMessage", text);
      document.getElementById("chat_message_field").value = "";
    }
  });

  Template.message.helpers({
    createdAtFormatted: function () {
      console.log(this.createdAt);
      return this.createdAt.format('MM/DD/YYYY, HH:MM');
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}


Meteor.methods({
  addMessage: function(text) {
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    var username = Meteor.user().username == null ? Meteor.user().profile.name : Meteor.user().username

    Messages.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: username
    })
  }
})

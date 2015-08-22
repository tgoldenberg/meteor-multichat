if (Meteor.isClient) {
  Template.chat.events({
    'submit .new_chat_message': function(event) {
      event.preventDefault();
      var text = event.target.chat_message.value;
      console.log(text);
      document.getElementById("chat_message_field").value = "";
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

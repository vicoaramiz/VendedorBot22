//libraries
const express = require("express");
const router = express.Router();
const request = require("request");
const uuid = require("uuid");
const axios = require("axios");
//files
const config = require("../config");
const dialogflow = require("../dialogflow");
const { structProtoToJson } = require("./helpers/structFunctions");
const { forever } = require("request");

// Messenger API parameters
if (!config.FB_PAGE_TOKEN) {
  throw new Error("missing FB_PAGE_TOKEN");
}
if (!config.FB_VERIFY_TOKEN) {
  throw new Error("missing FB_VERIFY_TOKEN");
}
if (!config.GOOGLE_PROJECT_ID) {
  throw new Error("missing GOOGLE_PROJECT_ID");
}
if (!config.DF_LANGUAGE_CODE) {
  throw new Error("missing DF_LANGUAGE_CODE");
}
if (!config.GOOGLE_CLIENT_EMAIL) {
  throw new Error("missing GOOGLE_CLIENT_EMAIL");
}
if (!config.GOOGLE_PRIVATE_KEY) {
  throw new Error("missing GOOGLE_PRIVATE_KEY");
}
if (!config.FB_APP_SECRET) {
  throw new Error("missing FB_APP_SECRET");
}

const sessionIds = new Map();

// for Facebook verification
router.get("/webhook/", function (req, res) {
  if (
    req.query["hub.mode"] === "subscribe" &&
    req.query["hub.verify_token"] === config.FB_VERIFY_TOKEN
  ) {
    res.status(200).send(req.query["hub.challenge"]);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);
  }
});

//for webhook facebook
router.post("/webhook/", function (req, res) {
  var data = req.body;
  // Make sure this is a page subscription
  if (data.object == "page") {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function (pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function (messagingEvent) {
        if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else {
          console.log(
            "Webhook received unknown messagingEvent: ",
            messagingEvent
          );
        }
      });
    });

    // Assume all went well.
    // You must send back a 200, within 20 seconds
    res.sendStatus(200);
  }
});

async function receivedMessage(event) {
  var senderId = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;
  console.log(
    "Received message for user %d and page %d at %d with message:",
    senderId,
    recipientID,
    timeOfMessage
  );

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho) {
    handleEcho(messageId, appId, metadata);
    return;
  } else if (quickReply) {
    handleQuickReply(senderId, quickReply, messageId);
    return;
  }
  if (messageText) {
    //send message to dialogflow
    console.log("MENSAJE DEL USUARIO: ", messageText);
    await sendToDialogFlow(senderId, messageText);
  } else if (messageAttachments) {
    handleMessageAttachments(messageAttachments, senderId);
  }
}

function handleMessageAttachments(messageAttachments, senderId) {
  //for now just reply
  sendTextMessage(senderId, "Archivo adjunto recibido... gracias! .");
}

async function setSessionAndUser(senderId) {
  try {
    if (!sessionIds.has(senderId)) {
      sessionIds.set(senderId, uuid.v1());
    }
  } catch (error) {
    throw error;
  }
}

async function handleQuickReply(senderId, quickReply, messageId) {
  let quickReplyPayload = quickReply.payload;
  console.log(
    "Quick reply for message %s with payload %s",
    messageId,
    quickReplyPayload
  );
  this.elements = a;
  // send payload to api.ai
  sendToDialogFlow(senderId, quickReplyPayload);
}

function handleDialogFlowAction(
  sender,
  action,
  messages,
  contexts,
  parameters
) {
  switch (action) {
    case "Code.DemasElementos.action":
      sendTextMessage(sender, "Estoy mandando una imagen y un boton"),
        sendImageMessage(sender, "data:image/jpeg;base64,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");
      sendButtonMessage(sender, "Ejemplo de boton", [{
        type: "web_url",
        url: "https://www.messenger.com",
        title: "Visit Messenger",
      }]);
      break;
    case "Code.menuCarrusel.action":
      let helados = [
        {
          id: 1,
          nombre: "Helado de fresa",
          img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Ice_Cream_dessert_02.jpg/245px-Ice_Cream_dessert_02.jpg",
          descripcion: "Los helados de fresa son muy ricos",
          precio: 7
        },
        {
          id: 2,
          nombre: "Helado de piña",
          img: "https://okdiario.com/img/2019/07/07/receta-de-helado-casero-de-pina-1-655x368.jpg",
          descripcion: "Los helados de piña son muy ricos",
          precio: 6
        },
        {
          id: 3,
          nombre: "Helado de chocolate",
          img: "https://www.recetasderechupete.com/wp-content/uploads/2019/07/shutterstock_1010248351-768x527.jpg",
          descripcion: "Los helados de chocolate son muy ricos",
          precio: 10
        }
      ];
      let tarjetas = [];
      helados.forEach(helado => {
        tarjetas.push({
          title: helado.nombre + " $" + helado.precio,
          image_url: helado.img,
          subtitle: helado.descripcion,

          buttons: [
            {
              type: "postback",
              title: "Hacer compra",
              payload: "hacer_compra",
            }, {
              type: "postback",
              title: "Ver mas helados",
              payload: "ver_mas_helados",
            }
          ],
        });
      });
      sendGenericMessage(sender,)


      break;
    case "Codigo.quickReply.action":
      let replies = [];
      for (let i = 1; i <= 5; i++) {
        replies.push({
          image_url: "https://www.hackingchinese.com/wp-content/uploads/2015/09/check-37583_1280.png",
          content_type: "text",
          title: i,
          payload: "si_acepto",

        });

      }
      sendQuickReply(sender, "ejemplo de quick reply", replies);
      break;
    default:
      //unhandled action, just send back the text
      handleMessages(messages, sender);
  }
}

async function handleMessage(message, sender) {
  switch (message.message) {
    case "text": // text
      for (const text of message.text.text) {
        if (text !== "") {
          await sendTextMessage(sender, text);
        }
      }
      break;
    case "quickReplies": // quick replies
      let replies = [];
      message.quickReplies.quickReplies.forEach((text) => {
        let reply = {
          content_type: "text",
          title: text,
          payload: text,
        };
        replies.push(reply);
      });
      await sendQuickReply(sender, message.quickReplies.title, replies);
      break;
    case "image": // image
      await sendImageMessage(sender, message.image.imageUri);
      break;
    case "payload":
      let desestructPayload = structProtoToJson(message.payload);
      var messageData = {
        recipient: {
          id: sender,
        },
        message: desestructPayload.facebook,
      };
      await callSendAPI(messageData);
      break;
    default:
      break;
  }
}

async function handleCardMessages(messages, sender) {
  let elements = [];
  for (let m = 0; m < messages.length; m++) {
    let message = messages[m];
    let buttons = [];
    for (let b = 0; b < message.card.buttons.length; b++) {
      let isLink = message.card.buttons[b].postback.substring(0, 4) === "http";
      let button;
      if (isLink) {
        button = {
          type: "web_url",
          title: message.card.buttons[b].text,
          url: message.card.buttons[b].postback,
        };
      } else {
        button = {
          type: "postback",
          title: message.card.buttons[b].text,
          payload:
            message.card.buttons[b].postback === ""
              ? message.card.buttons[b].text
              : message.card.buttons[b].postback,
        };
      }
      buttons.push(button);
    }

    let element = {
      title: message.card.title,
      image_url: message.card.imageUri,
      subtitle: message.card.subtitle,
      buttons,
    };
    elements.push(element);
  }
  await sendGenericMessage(sender, elements);
}

async function handleMessages(messages, sender) {
  try {
    let i = 0;
    let cards = [];
    while (i < messages.length) {
      switch (messages[i].message) {
        case "card":
          for (let j = i; j < messages.length; j++) {
            if (messages[j].message === "card") {
              cards.push(messages[j]);
              i += 1;
            } else j = 9999;
          }
          await handleCardMessages(cards, sender);
          cards = [];
          break;
        case "text":
          await handleMessage(messages[i], sender);
          break;
        case "image":
          await handleMessage(messages[i], sender);
          break;
        case "quickReplies":
          await handleMessage(messages[i], sender);
          break;
        case "payload":
          await handleMessage(messages[i], sender);
          break;
        default:
          break;
      }
      i += 1;
    }
  } catch (error) {
    console.log(error);
  }
}

async function sendToDialogFlow(senderId, messageText) {
  sendTypingOn(senderId);
  try {
    let result;
    setSessionAndUser(senderId);
    let session = sessionIds.get(senderId);
    result = await dialogflow.sendToDialogFlow(
      messageText,
      session,
      "FACEBOOK"
    );
    handleDialogFlowResponse(senderId, result);
  } catch (error) {
    console.log("salio mal en sendToDialogflow...", error);
  }
}

function handleDialogFlowResponse(sender, response) {
  let responseText = response.fulfillmentMessages.fulfillmentText;
  let messages = response.fulfillmentMessages;
  let action = response.action;
  let contexts = response.outputContexts;
  let parameters = response.parameters;

  sendTypingOff(sender);

  if (isDefined(action)) {
    handleDialogFlowAction(sender, action, messages, contexts, parameters);
  } else if (isDefined(messages)) {
    handleMessages(messages, sender);
  } else if (responseText == "" && !isDefined(action)) {
    //dialogflow could not evaluate input.
    sendTextMessage(sender, "No entiendo lo que trataste de decir ...");
  } else if (isDefined(responseText)) {
    sendTextMessage(sender, responseText);
  }
}
async function getUserData(senderId) {
  console.log("consiguiendo datos del usuario...");
  let access_token = config.FB_PAGE_TOKEN;
  try {
    let userData = await axios.get(
      "https://graph.facebook.com/v6.0/" + senderId,
      {
        params: {
          access_token,
        },
      }
    );
    return userData.data;
  } catch (err) {
    console.log("algo salio mal en axios getUserData: ", err);
    return {
      first_name: "",
      last_name: "",
      profile_pic: "",
    };
  }
}

async function sendTextMessage(recipientId, text) {
  if (text.includes("{first_name}") || text.includes("{last_name}")) {
    let userData = await getUserData(recipientId);
    text = text
      .replace("{first_name}", userData.first_name)
      .replace("{last_name}", userData.last_name);
  }
  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: text,
    },
  };
  await callSendAPI(messageData);
}

/*
 * Send an image using the Send API.
 *
 */
async function sendImageMessage(recipientId, imageUrl) {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: imageUrl,
        },
      },
    },
  };
  await callSendAPI(messageData);
}

/*
 * Send a button message using the Send API.
 *
 */
async function sendButtonMessage(recipientId, text, buttons) {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: text,
          buttons: buttons,
        },
      },
    },
  };
  await callSendAPI(messageData);
}

async function sendGenericMessage(recipientId, elements) {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: elements,
        },
      },
    },
  };

  await callSendAPI(messageData);
}

/*
 * Send a message with Quick Reply buttons.
 *
 */
async function sendQuickReply(recipientId, text, replies, metadata) {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: text,
      metadata: isDefined(metadata) ? metadata : "",
      quick_replies: replies,
    },
  };

  await callSendAPI(messageData);
}

/*
 * Turn typing indicator on
 *
 */
function sendTypingOn(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    sender_action: "typing_on",
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator off
 *
 */
function sendTypingOff(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    sender_action: "typing_off",
  };

  callSendAPI(messageData);
}

/*
 * Call the Send API. The message data goes in the body. If successful, we'll
 * get the message id in a response
 *
 */
function callSendAPI(messageData) {
  return new Promise((resolve, reject) => {
    request(
      {
        uri: "https://graph.facebook.com/v6.0/me/messages",
        qs: {
          access_token: config.FB_PAGE_TOKEN,
        },
        method: "POST",
        json: messageData,
      },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          var recipientId = body.recipient_id;
          var messageId = body.message_id;

          if (messageId) {
            console.log(
              "Successfully sent message with id %s to recipient %s",
              messageId,
              recipientId
            );
          } else {
            console.log(
              "Successfully called Send API for recipient %s",
              recipientId
            );
          }
          resolve();
        } else {
          reject();
          console.error(
            "Failed calling Send API",
            response.statusCode,
            response.statusMessage,
            body.error
          );
        }
      }
    );
  });
}

async function receivedPostback(event) {
  var senderId = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  var payload = event.postback.payload;
  switch (payload) {
    default:
      //unindentified payload
      sendToDialogFlow(senderId, payload);
      break;
  }

  console.log(
    "Received postback for user %d and page %d with payload '%s' " + "at %d",
    senderId,
    recipientID,
    payload,
    timeOfPostback
  );
}

function isDefined(obj) {
  if (typeof obj == "undefined") {
    return false;
  }

  if (!obj) {
    return false;
  }

  return obj != null;
}

module.exports = router;

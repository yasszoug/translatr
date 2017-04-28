var plannedResponse;

function MessageHandler(context, event) {
    // context.console.log("test");
    var wholeMessage = event.message.toLowerCase();
    var subject = "";
    var hiAnswers = "";
    var response = "";
    
    var hiArray = ["hi", "hello", "hey"];
    var byeArray = ["bye", "see you later", "goodbye", "talk to you later"];
    var howAreYou = ["how are you", "how is it going", "how has your day been"];
    var activitiesArray = ["i played", "i swam", "i sang", "i danced", "i studied", "i ran","i play", "i swim", "i sing", "i dance", "i study", "i run"];
    var foodArray = ["i ate", "i cooked"];
    var placesArray = ["i went", "i walked", "i drove", "i took a bus", "i took the bus", "i took the train", "i was at"];
    var yesArray = ["yes", "sure", "maybe", "of course", "yep", "yeah"];
    var noArray = ["no", "nope", "nah"];
    var likeArray = ["i like to", "i love to", "i want to","i like", "i love", "i want"];
    var dislikeArray = ["i hate to", "i do not like to", "i do not want to","i hate", "i do not like", "i do not want", "i dislike"];
    
    // context.sendResponse(inArray(wholeMessage, activitiesArray));
    
    if(inArray(wholeMessage, hiArray)) {
        hiAnswers = ["Hello!", "Hi! Nice to see you!", "Hello, what did you do today?", "Hi, what did you do today?", "Hey, where have you gone today?", "Hello again!", "Hey there! Did you have a nice day?"];
        response = getResponse(hiAnswers);
        plannedResponse = response;
    } else if(inArray(wholeMessage, byeArray)){
        byeAnswers = ["Bye!", "See you tomorrow!", "bye-bye"];
        response = getResponse(byeAnswers);
        plannedResponse = response;
    } else if(inArray(wholeMessage, howAreYou)){
        howAreYouAnswers = ["I am good.", "Great, thanks for asking!", "I am doing well", "I am happy", "good", "great!","I am doing fine"];
        response = getResponse(howAreYouAnswers);
        plannedResponse = response;
    } else if(inArray(wholeMessage, activitiesArray)){
        subject = findSubject(activitiesArray, wholeMessage);
        activitiesAnswers = ["Do you like "+subject+ "?", "I love " +subject, "Wow! Tell me more!", "I like "+subject+"!", subject + " is cool."];
        response = getResponse(activitiesAnswers);
        plannedResponse = response;
    } else if(inArray(wholeMessage, foodArray)){
        subject = findSubject(foodArray, wholeMessage);
        foodAnswers = ["Do you like "+subject+ "?", "I love " +subject+"s!", "I like eating"+subject+"!", subject + " is delicious.", "I love to eat " + subject, "I have never had " + subject + " before"];
        response = getResponse(foodAnswers);
        plannedResponse = response;
    } else if(inArray(wholeMessage, placesArray)){
        subject = findSubject(placesArray, wholeMessage);
        placesAnswers = ["Did you like "+subject+ "?", "I love going to " +subject+"!", "I love to go to " + subject, "I have never been to " + subject + " before. :(", "Tell me more!"];
        response = getResponse(placesAnswers);
        plannedResponse = response;
    } else if(inArray(wholeMessage, yesArray)){
        subject = findSubject(yesArray, wholeMessage);
        yesAnswers = ["Awesome!", "Why?", "Tell me more~", "That’s good!"];
        response = getResponse(yesAnswers);
        plannedResponse = response;
    } else if(inArray(wholeMessage, noArray)){
        subject = findSubject(noArray, wholeMessage);
        noAnswers = ["Why not?", "Why?", "That’s too bad..."];
        response = getResponse(noAnswers);
        plannedResponse = response;
    } else if(inArray(wholeMessage, likeArray)){
        subject = findSubject(likeArray, wholeMessage);
        likeAnswers = ["I like " + subject + ", too", "I love " + subject, "That’s great!", "I want " +subject];
        response = getResponse(likeAnswers);
        plannedResponse = response;
    } else if(inArray(wholeMessage, dislikeArray)){
        subject = findSubject(dislikeArray, wholeMessage);
        dislikeAnswers = ["I do not like " + subject + ", either", "I hate " + subject, "That’s too bad", "I do not want " +subject];
        response = getResponse(dislikeAnswers);
        plannedResponse = response;
    }
    else {
        // plannedResponse = "Sorry, I do not understand.";
        plannedResponse = "Anything interesting happen today?";
    }
    
    var key="AIzaSyCv4csEATeUE9t3WP7E6DR7jJIl5qSdH0Q";
    var source="en";
    var dest="zh";
    
    // Need to adapt this to Gupshup
    var url = 'https://www.googleapis.com/language/translate/v2?';
    url += 'key='+key+'&target='+dest+'&q='+plannedResponse;
    context.simplehttp.makeGet(url);

    
}

function inArray(message, array)
{
    for(var i = 0; i< array.length; i++)
    {
        if(message.includes(""+array[i]) ) //&& isWord(array[i], message))
            return true;
    }
    return false;
}

function getResponse(array)
{
    return array[Math.floor(Math.random()*array.length)];
}

function findSubject(array, message)
{
    for(var i = 0; i< array.length; i++)
    {
        if(message.includes(""+array[i]) ) // && isWord(array[i], message))
        {
            // return "here";
            var subject = message.substring(array[i].length+1)
            return subject;
        }
    }
    return "epic fail here... ";
    
}

function isWord(substring, message){
    var init = message.indexOf(substring);
    return ((init === 0 || notLetter(message.charAt(init-1))) && 
        (init + substring.length+1==message.length || notLetter(message.charAt(init+substring.length+1))))

}

function notLetter(char) {
    if((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z'))
    {
        return false
    }
    return true;
}

/** Functions declared below are required **/
function EventHandler(context, event) {
    if(! context.simpledb.botleveldata.numinstance)
        context.simpledb.botleveldata.numinstance = 0;
    numinstances = parseInt(context.simpledb.botleveldata.numinstance) + 1;
    context.simpledb.botleveldata.numinstance = numinstances;

    var question = {
            "type": "survey",
             "question": "Please select your foreign language level:",
             "msgid": "3er45",
             "options": ["Novice","Experienced"]
    }; 
    context.sendResponse(JSON.stringify(question));
}

function HttpResponseHandler(context, event) {
    if (event.messageobj.refmsgid=='3er45'){
      var response = "Great! Hi, I am Saluton. I look forward to chatting with you! :)";
      if (event.message == "Novice") {
          response += " Talk to me in English, and I will reply to you in Chinese.";
      } else {
          response += "Make sure to talk to me in Chinese!";
      }
      context.sendResponse(response);
      return;
    }
    var response = JSON.parse(event.getresp);
    var translation = response.data.translations[0].translatedText;
    context.console.log(translation);
    context.sendResponse(translation+" ("+plannedResponse+")");
}

function DbGetHandler(context, event) {
    context.sendResponse("testdbput keyword was last get by:" + event.dbval);
}

function DbPutHandler(context, event) {
    context.sendResponse("testdbput keyword was last put by:" + event.dbval);
}

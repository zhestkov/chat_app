var sentences = ["Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", "Phasellus risus est, cursus ut velit at, gravida tincidunt libero.", "Phasellus laoreet mi sit amet elit iaculis rhoncus", "Why do we use it?", "using Lorem Ipsum is that it has a more-or-less normal distribution of letters", "arious versions have evolved over the years", "OK", "Why?", "Should we?", "Let's try", "Go!", "I'm going to do it", "Really?", "Great!", "What do you think?", "I don't know", "Interesting..", "Let's do this!", "Hey!", "Bye", "Me too", "Greetings!", "Great idea", "Do you have any questions?", "I have some", "and you?"];

var i = 0; // counter for bot messages
var msgId = 0; // message id
var Messages = [];


var botAnswer = function (index, lr) {
    var answer = '<div class="' + lr + ' ' + lr + 'Message" data-msgId=' +
        index + '>' + sentences[i] + "</div>";
    return answer;
    //$("#dialogLeft").append(answer);
}

//var botDialog = function (message) {
//    message = '<div class="left leftMessage" data-msgId=' +
//        msgId + '>' + message + '</div>';
//    $("#dialogLeft").append(message);
//    appearing(msgId);
//    var answer = botAnswer(i, "right");
//    $("#dialogLeft").append(answer);
//
//}
var appearMyMessage = function (message) {
    var msgLeft = '<div class="left leftMessage" data-msgId=' +
        msgId + '>' + message + '</div>';
    $("#dialogLeft").append(msgLeft);
    var msgRight = '<div class="right rightMessage" data-msgId=' + msgId + '>' + message + '</div>';
    $("#dialogRight").append(msgRight);
    appearing(msgId, true);
    msgId++;
}
var appearBotMessage = function () {
    var botMsg = botAnswer(msgId % sentences.length, "left");
    $("#dialogRight").append(botMsg);
    botMsg = botAnswer(msgId % sentences.length, "right");
    $("#dialogLeft").append(botMsg);
    appearing(msgId, true);
    scrollDown();
    msgId++;
}

//var myDialog = function (message) {
//    message = '<div class="right rightMessage" data-msgId=' +
//        msgId + '>' + message + '</div>';
//    $("#dialogRight").append(message);
//    appearing(msgId, true);
//    var answer = botAnswer(i, "left");
//    $("#dialogRight").append(answer);
//
//}

var appearing = function (messageId, my) {
    if (my === true) {
        $('#myContainer').find('[data-msgId=' + messageId + ']').css('display', 'none');
        //$(".leftMessage").css('display', 'none');
        $('#myContainer').find('[data-msgId=' + messageId + ']').fadeIn('slow');
    }
    //    else {
    //        //alert(1);
    //        $('#myContainer').find('[data-botMsgId=' + i + ']').css('display', 'none');
    //        //$(".leftMessage").css('display', 'none');
    //        $('#myContainer').find('[data-botMsgId=' + i + ']').fadeIn('slow');
    //    }

    //$(".rightMessage").fadeIn('slow');
    //$(".leftMessage").fadeIn('slow');
}

var scrollDown = function () {
    if (msgId > 7) {
        $('html,body').animate({
            scrollTop: document.body.scrollHeight
        }, "slow");
    }
}

var initialize = function () {
    if (typeof localStorage === 'undefined') {
        console.log("Your browser doesn't support localStorage.");
        return;
    }
    if (localStorage.getItem("messageList") !== null) {
        Messages = JSON.parse(localStorage.getItem("messageList"));
        for (var j = 0; j < Messages.length; j++) {
            appearMyMessage(Messages[j]);
            appearBotMessage();
            //if (j >= sentences.length)
            
        }
    }
    else console.log("There are no messages in localStorage");



}

//initialize();

$("#sendButton").click(function () {

    var msg = $("#message").val();
    if (msg != "") {
        if (i == sentences.length)
            i = 0;
    } else return; // empty message from user

    Messages.push(msg);
    //localStorage.setItem('messageList', JSON.stringify(Messages));
    
    //localStorage.setItem("messageList", JSON.stringify(myMessages));

    // // BOT DIALOG (LEFT)
    //botDialog(msg);
    // MY DIALOG (RIGHT)
    //myDialog(msg);
    appearMyMessage(msg);
    //appearBotMessage();
    //msgId++;
    setTimeout(appearBotMessage, 1200);
    //msgId++;
    scrollDown();
    i++;


});

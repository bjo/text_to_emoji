    var myDataRef = new Firebase('https://popping-heat-9713.firebaseio.com/');
    var textDict = {}

    //$('#annotation').keypress(function (e) {
    //    if (e.keyCode == 13) {
    //      var name = $('#annotation').val();
    //      var text = $('#emojicode').val();
     //     myDataRef.push({name: name, text: text});
     //     $('#annotation').val('');
     //   }
      //});
    myDataRef.on("value", function(snapshot) {
      console.log(snapshot.val());
      textDict = snapshot.val()
      });
    function printCaps()
          {
             var textstr = document.myform.text.value;
             var res = textstr.split(" ");
             var translate = []
             var translate_alt = []
             var tempList = []
             var intList = []
             for (var word in res) 
             {
                console.log(res[word])
                found = false
                for (var key in textDict) {
                  tempList = textDict[key]['anno']
                  //console.log(tempList)
                  for (var value in tempList) {
                    //console.log(tempList[value])
                    if (res[word].toLowerCase() === tempList[value] && !found)
                    { 
                      console.log(res[word] === tempList[value])
                      translate.push('<img class="emoji" draggable="false" src="images/' + key + '_apple.png">') //append key
                      unicode_emoji = String.fromCharCode(key)
                      translate_alt.push(unicode_emoji) //append key
                      found = true
                      break
                    }
                  }
                  intList = textDict[key]['dec']
                }
                if (!found)
                  {
                    translate.push(res[word])
                    translate_alt.push(res[word])
                  }
           }
          console.log(translate)
          var toSend = String(translate.join(" "));
          document.getElementById('result').innerHTML = toSend;
          return intList
        }

  function myFacebookLogin() {
FB.login(function(){
 // Note: The call will only work if you accept the permission request
 intList = printCaps();
 if intList.length === 1 {
    FB.api('/me/feed', 'post', {message: String.fromCharCode(parseInt(intList[0]))});
 } else {
    FB.api('/me/feed', 'post', {message: String.fromCharCode(parseInt(intList[0]),parseInt(intList[1]))});
  }
}, {scope: 'publish_actions'});} 



function temp_function() {
  intList = printCaps();
 if intList.length === 1 {
    alert(String.fromCharCode(parseInt(intList[0])));
 } else {
    alert(String.fromCharCode(parseInt(intList[0]),parseInt(intList[1])));
  }
}


    var myDataRef = new Firebase('https://fiery-torch-7339.firebaseio.com/');
    var textDict = {}

    // $('#annotation').keypress(function (e) {
    //    if (e.keyCode == 13) {
    //      var name = $('#annotation').val();
    //      var text = $('#emojicode').val();
    //      myDataRef.push({name: name, text: text});
    //      $('#annotation').val('');
    //    }
    //   });
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
             for (var word in res) 
             {
                found = false
                for (var key in textDict) {
                  tempList = textDict[key]
                  for (var value in tempList) {
                    //console.log(tempList[value])
                    if (res[word].toLowerCase() === tempList[value] && !found)
                    { 
                      console.log(res[word] === tempList[value])
                      translate.push('<img class="emoji" draggable="false" src="images/' + key + '_apple.png">') //append key
                      
                      intList = tempList[0]
                      integer_List = intList.split('_')
                          if (integer_List.length === 1) {
                            translate_alt.push(String.fromCharCode(parseInt(integer_List[0])));
                         } else {
                            translate_alt.push(String.fromCharCode(parseInt(integer_List[0]),parseInt(integer_List[1])));
                          }
                      
                      found = true
                      console.log(intList)
                      break
                    }
                  }
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
          console.log(translate_alt)
          return translate_alt
        }

  function myFacebookLogin() {
FB.login(function(){
 // Note: The call will only work if you accept the permission request
 intList = printCaps();
  FB.api('/me/feed', 'post', {message: String(intList.join(" "))});
}, {scope: 'publish_actions'});} 


function temp_function() {
  intList = printCaps();
  alert(String(intList.join(" ")));
}

// function getRandomImage() {
//    num = Math.random() * (1281 - 1) + 1;
//    keys = Object.keys(textDict)
//    return "images/' + keys[num] + '_apple.png"
// }


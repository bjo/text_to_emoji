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
             var tempList = []
             for (var word in res) 
             {
                console.log(res[word])
                found = false
                for (var key in textDict) {
                  tempList = textDict[key]
                  //console.log(tempList)
                  for (var value in tempList) {
                    //console.log(tempList[value])
                    if (res[word].toLowerCase(); === tempList[value] && !found)
                    { 
                      console.log(res[word] === tempList[value])
                      translate.push('<img class="emoji" draggable="false" src="images/' + key + '_apple.png">') //append key
                      found = true
                      break
                    }
                  }
                }
                if (!found)
                  {
                    translate.push(res[word])
                  }
           }
          console.log(translate)
          var toSend = String(translate.join(" "));
          document.getElementById('result').innerHTML = toSend;
        }


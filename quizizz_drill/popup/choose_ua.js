var getJSON = function(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'json';
  xhr.onload = function() {
    var status = xhr.status;
    if (status === 200) {
      callback(null, xhr.response);
    } else {
      callback(status, xhr.response);
    }
  };
  xhr.send();
};

function data_callback(stst, data)
{

  var output = "<table>";
  for(var i = 0; i < data["data"]["quiz"]["info"]["questions"].length; i++)
  {
    console.log("TYPE:" + data["data"]["quiz"]["info"]["questions"][i]["structure"]["kind"]);
    console.log("QUESTION:" + data["data"]["quiz"]["info"]["questions"][i]["structure"]["query"]["text"]);
    output += "<tr> <td>" + data["data"]["quiz"]["info"]["questions"][i]["structure"]["query"]["text"] + "</td>";//OUT
    if(data["data"]["quiz"]["info"]["questions"][i]["structure"]["kind"] == "BLANK")
    {
      for(var j = 0; j < data["data"]["quiz"]["info"]["questions"][i]["structure"]["options"].length; j++)
      {
         console.log("CORRECT ANSWERS " + (parseInt(j) + 1) + ":" + data["data"]["quiz"]["info"]["questions"][i]["structure"]["options"][j]["text"]);   
         output += "<td>" +  data["data"]["quiz"]["info"]["questions"][i]["structure"]["options"][j]["text"] + "</td>";
      }
    } 
    
    
    
    if(data["data"]["quiz"]["info"]["questions"][i]["structure"]["kind"] == "MCQ" || data["data"]["quiz"]["info"]["questions"][i]["structure"]["kind"] == "MSQ")
    {
      for(var j = 0; j < data["data"]["quiz"]["info"]["questions"][i]["structure"]["options"].length; j++)
      {
        console.log("ANSWERS " + (parseInt(j) + 1) + ":" + data["data"]["quiz"]["info"]["questions"][i]["structure"]["options"][j]["text"]);  
      } 
    }
    if(data["data"]["quiz"]["info"]["questions"][i]["structure"]["kind"] == "MCQ") // MCQ QUESTION
    {
       console.log("CORRECT ANSWER IS: " + (parseInt(data["data"]["quiz"]["info"]["questions"][i]["structure"]["answer"])+1));
       output += "<td>" +  data["data"]["quiz"]["info"]["questions"][i]["structure"]["options"][(parseInt(data["data"]["quiz"]["info"]["questions"][i]["structure"]["answer"]))]["text"] + "</td>";
    }





    if(data["data"]["quiz"]["info"]["questions"][i]["structure"]["kind"] == "MSQ") // MSQ QUESTION
    {
       var ans = "";

       // NR POPRAWNEJ ODP == data["data"]["quiz"]["info"]["questions"][i]["structure"]["answer"][k]
       for(var k = 0; k < data["data"]["quiz"]["info"]["questions"][i]["structure"]["answer"].length; k++)
       {
            
         ans += parseInt(data["data"]["quiz"]["info"]["questions"][i]["structure"]["answer"][k]) + 1;
         
         ans += " and ";



         output += "<td>" +  data["data"]["quiz"]["info"]["questions"][i]["structure"]["options"][(parseInt(data["data"]["quiz"]["info"]["questions"][i]["structure"]["answer"][k]))]["text"] + "</td>";
   
       }
       console.log("CORRECT ANSWER IS: " + ans);
    }

    output += "</tr>";
  }
  output += "</table>";
  document.getElementById("answers").innerHTML = output;
  
  
}


function answ()
{
  let quiz_id = document.getElementById("quiz_id").value;
  let url = "https://quizizz.com/quiz/"+quiz_id;

  localStorage.setItem("idq",quiz_id);
  console.log(localStorage.getItem("idq"));
  getJSON(url, data_callback);
}



console.log(localStorage.getItem("idq"));
if(localStorage.getItem("idq") != null)//IF LAST ID EXIST THAEN FILL IT IN
{
    document.getElementById("quiz_id").value = localStorage.getItem("idq");
}

document.getElementById("ok_button").addEventListener("click", answ);

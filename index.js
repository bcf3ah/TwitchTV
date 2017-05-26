const endpoint = "https://api.twitch.tv/kraken/streams/"; //instead of https://api.twitch.tv/kraken/streams
const key = "?client_id=5nraqtt4crgaksfwb744my1d4tlnvb";


$(document).ready(()=>{
  $.ajax({
    dataType: "json",
    url: endpoint+"freecodecamp"+key,
    success: (data) => {
      if(!data.stream){
        $("<li class='collection-item avatar'><a href='https://www.twitch.tv/freecodecamp' target='_blank'><img src='https://avatars0.githubusercontent.com/u/9892522?v=3&s=200'alt='' class='circle'><span class='title'>Free Code Camp</span><p>Currently offline</p><a class='secondary-content'><i class='material-icons'>error</i></a></a></li>").appendTo("#all, #offline");
      } else {
        var game = data.stream.game;
        $("<li class='collection-item avatar'><a href='https://www.twitch.tv/freecodecamp' target='_blank'><img src='https://avatars0.githubusercontent.com/u/9892522?v=3&s=200'alt='' class='circle'><span class='title'>Free Code Camp</span><p>"+game+"</p><a class='secondary-content'><i class='material-icons'>check</i></a></a></li>").appendTo("#all, #online");
      }
    }
  });

  $.ajax({
    dataType: "json",
    url: endpoint+key+"&limit=10",
    success: (data) => {
      data.streams.forEach((stream) => {
        var image = stream.channel.logo;
        var game = stream.channel.game;
        var user = stream.channel.display_name;
        var url = stream.channel.url;

        $("<li class='collection-item avatar'><a href="+url+" target='_blank'><img src='"+image+"' alt='' class='circle'><span class='title'>"+user+"</span><p>"+game+"</p><a class='secondary-content'><i class='material-icons'>check</i></a></a></li>").appendTo("#all, #online");
      });
    }
  });
});

$("input").keyup(function(e){
  let input = e.target.value.toLowerCase();
  let list = $(".collection-item.avatar");

  for (var i = 0; i<list.length; i++){
    let text = list[i].querySelector("span").textContent.toLowerCase();
    if(text.indexOf(input) === -1){
      list[i].style.display = "none";
    } else {
      list[i].style.display = "";
    }
  }

})

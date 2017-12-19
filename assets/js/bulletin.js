$(document).ready(function(){
	
	var content_list;

  var new_author;
	var new_content;
  var new_time;
  var new_tag;
  var new_likes;

  var past_time;
  //var new_comments
	
  console.log("bulletin.js is online");
  
	$.ajax({
				url: "/blogg",
				type: "post",
        data:{
          name:"hello"
        },
				success: (res) => {
					content_list = res;
          console.log("hello world");
         console.log(content_list);
					for(i=0; i<content_list.length;i++)
					{
            //get all needed data from web server
            new_author = content_list[i].author;
						new_content = content_list[i].body;
            for(j=0; j<content_list[i].time_of_update.length;j++)
            {
              new_time[j] = content_list[i].time_of_update[j];
            }
            for(j=0; j<content_list[i].tag.length;j++)
            {
              new_tag[j] = content[i].tag[j];
            }
            //new_likes = content[i].likes;
          
			      console.log(new_content);
			      console.log(content_list[i].time_of_update.length);
						//$("#post_1").clone().appendTo("#middle_info");
		   
						// get the last DIV which ID starts with ^= "klon"
						var $ori = $("#middle_info div[id^='post']:first");

						// Read the Number from that DIV's ID (i.e: 3 from "klon3")
						// And increment that number by 1
						var num = parseInt( $ori.prop("id").match(/\d+/g), 10 ) +1;

						// Clone it and assign the new ID (i.e: from num 4 to ID "klon4")
						var $klon = $ori.clone().prop('id', 'post'+num );

						// Finally insert $klon wherever you want
						$ori.before( $klon );

            //update all data in the front-end
						//$klon.$(.content).html(new_content);
						$(".content", $klon).html(new_content);
            $(".post_author", $klon).html(new_author);
						$(".past_time", $klon).html(new_time[4]);
					}
          
				}
	});
  

});


$('#insert').click(() => {
  d = new_Date();  
  console.log($("#inseted_content").text());
	$.ajax({
		url: "/insert",
		type: "post",
		data: {
			name: "zaccaz",
			new_post: $("#inserted_content").text(),
      time:[
        d.getFullYear(),
        d.getmonth(),
        d.getDate(),
        d.getHours(),
        d.getMinutes(),
      ]
		},
		success: (res) => {
			console.log("inserted");
		}
	});
});


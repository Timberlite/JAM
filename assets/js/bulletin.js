console.log("bulletin.js is online");

$(document).ready(function(){
	//retrive data from cookie
  var username = getCookie("username");
  var groupname = getCookie("groupname");
  groupname = "JAM";
  console.log("groupname: "+groupname);

	var content_list;
  var new_author;
	var new_content;
  var new_time;
  var new_tag;
  var new_likes;
  var past_time;
  
  //use as label_select_patternfunc
  var color= {sel:0};//color selection of new label
  var tag_array = [];
  
  insert_comment(groupname,username);//handler insert comment event
  color_sel(color);//handler for color selection of new label
  new_label(color,tag_array);//handler for creating new label, return color for initialising
  insert_post(username,tag_array);//handler for creating new post
  
  //label_select_pattern(selected_pattern);//handler for label selection
	$.ajax({
				url: "/bulletin/load",
				type: "post",
        data:{
          username:username,//retrive data from database by using id and groupname
          groupname:"JAM"
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
						new_post_id = content_list[i]._id;

            /*
						for(j=0; j<content_list[i].time_of_update.length;j++)
						{
							new_time[j] = content_list[i].time_of_update[j];
						}
            */
            /*
						for(j=0; j<content_list[i].tag.length;j++)
						{
						  //new_tag[j] = content[i].tag[j];
						}
            */
						//new_likes = content[i].likes;
          
						console.log(new_content);
						//console.log(content_list[i].time_of_update.length);
						
						//$("#post_1").clone().appendTo("#middle_info");
		   
						// get the last DIV which ID starts with ^= "klon"
						var $pre = $("#middle_info div[id^='post']:first");
						var $ori = $("#middle_info #post0");//prototype 

						// Read the Number from that DIV's ID (i.e: 3 from "klon3")
						// And increment that number by 1
						var num_post = parseInt( $pre.prop("id").match(/\d+/g), 10 ) +1;

						// Clone it and assign the new ID (i.e: from num 4 to ID "klon4")
						var $klon = $ori.clone().prop('id', 'post'+num_post );
            
            //change the id of comment block prototype whenever the post is cloned
						$("#com0-0", $klon).prop('id', 'com'+num_post+'-0');

            
						// Finally insert $klon wherever you want
						$pre.before( $klon );
						
						for(j=0; j<content_list[i].comments.length ; j++)
						{
             // console.log(j);
              
					    //console.log("check comments"+content_list[i].comments[j].content);
							// Read the Number from that DIV's ID (i.e: 3 from "klon3")
							// And increment that number by 1
							var $cori = $(".comments:first", $klon);
							var code = $cori.prop("id").match(/\d+/g);
						  var num_com = parseInt( code[1], 10 ) +1;

							// Clone it and assign the new ID (i.e: from num 4 to ID "klon4")
							var $cklon = $cori.clone().prop('id', 'com'+num_post+'-'+num_com );
              
					  	//$(".content p", $cklon).html(content_list[i].comments[j].content);

							// Finally insert $klon wherever you want
							$cori.before( $cklon );
					  	$(".right-content p", $cklon).html(content_list[i].comments[j].content);
					    $cklon.removeClass('comment-prototype');//display the real comment
						}
						
						//update all data in the front-end
						//$klon.$(.content).html(new_content);
            $klon.data('post_id',new_post_id); 
						$(".content", $klon).html(new_content);
						$(".post_author", $klon).html(new_author);
						//$(".past_time", $klon).html(new_time[4]);
            
					}
          
				}
	});
  

});


$('#insert').click(() => {
  var d = new Date();  
  console.log($("#inseted_content").text());
	$.ajax({
		url: "/insert",
		type: "post",
		data: {
			name: "zaccaz",
			new_post: $("#inserted_content").text(),
      time:[
        d.getFullYear(),
        d.getMonth(),
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

function color_sel(color){
  $(".color-selection button[class^=color-option]").click(function(){
    var num = $(this).prop("class").match(/\d+/g);
    console.log(num[0]);
    color.sel = num[0];//save 
  });
}

function new_label(color,tag_array){
  //create new label block in the insert panel
  $("#create-button").click(function(){
    console.log("click= "+color.sel);
    
    //(A)add new tag on insert tab******
    var $ori = $(".label-select-div span:last");
    var num = $ori.prop("id").match(/\d+/g);
		var num_label = parseInt( num, 10 ) +1;
	  var $klone = $ori.clone().prop('id', 'insert-tab-tag'+num_label);

    //remove class start with post-theme-d  !!!not understand
    $klone.removeClass("tag-prototype");
    $klone.removeClass(function(index, className){
      return (className.match(/(^|\s)post-theme-d\S+/g)|| []).join(' ');
    });
    $klone.addClass("post-theme-d"+color.sel);
    $klone.css("display","inline-block");
    //console.log($("#create-label-input").val());
    var tag_title = $("#create-label-input").val();
    //console.log(tag_title = $("#create-label-input").val());
    $klone.html($("#create-label-input").val());
    $ori.after($klone);
    
    //(B)add new tag on exist tag******
    $ori = $(".exist-label-list li:last");
    num = $ori.prop("id").match(/\d+/g);
		num_label = parseInt( num, 10 ) +1;
	  $klone = $ori.clone().prop('id', 'label-'+num_label);
   
    $klone.removeClass("label-prototype");
    $("div", $klone).removeClass(function(index, className){
      return (className.match(/(^|\s)color-option\S+/g)|| []).join(' ');
    });
		$("div", $klone).addClass("color-option"+color.sel);
    $klone.css("display","block");
    $(".label-description", $klone).html($("#create-label-input").val());
    $ori.after($klone);
   

    //(C) store tag related info into a structure array
    tag_array.push({
      title: tag_title,
      color: color.sel
    });

  });
  
}

function insert_post(username, tag){
    
  $(".zac-insert-button").click(() => {
    var d = new Date(); 
    console.log("testdata"+tag[0].title);
    console.log($(".zac-insert-tab-content").text());
	  $.ajax({
		  url: "/bulletin/insertPost",
		  type: "post",
		  data: {
			  name: username,
			  new_post: $(".zac-insert-tab-content").text(),
        tags: tag,
        time:[
          d.getFullYear(),
          d.getMonth(),
          d.getDate(),
          d.getHours(),
          d.getMinutes(),
        ]
		  },
		  success: (res) => {
			  console.log("inserted");
        tag = [];
		  }
	  });
  });
}

function color_sel(color){
  $(".color-selection button[class^=color-option]").click(function(){
    var num = $(this).prop("class").match(/\d+/g);
    console.log(num[0]);
    color.sel = num[0];//save 
  });
}



function insert_comment(groupname,username){
  
  $("#middle_info").on("keypress",".comment-entry p",function(e){
    console.log("keypress");
    //handle enter event to submit comments
    if( (e.which == 10 || e.which == 13)&&( $(this).text().trim()) )
    {
      console.log("enter");
      console.log($(this).text());
      
      console.log( $(this).parents("[id^='post']").data('post_id'));

      //create a new comment immediately**********************************************
      var $post = $(this).parents("[id^='post']");//select the appropriatepost
			var $cori = $(".comments:first", $post);//sellect the appropriate element
			var code = $cori.prop("id").match(/\d+/g);//get number from id
      var num_post = code[0];
			var num_com = parseInt( code[1], 10 ) +1;
      
			// Clone it and assign the new ID (i.e: from num 4 to ID "klon4")
			var $cklon = $cori.clone().prop('id', 'com'+num_post+'-'+num_com );

			//Insert $klon wherever you want
			$cori.before( $cklon );

      //assign the content into the elements
			$(".right-content p", $cklon).html( $(this).text() );
			$cklon.removeClass('comment-prototype');//display the real commenti
      
      //*******************************************************************************

      $.ajax({
        url:"/bulletin/comment-insert",
        type:"post",
        data:{
          groupname: groupname,
          user: username,
          post_id: $(this).parents("[id^='post']").data('post_id'),
          content: $(this).text()
        },
        success:(res)=>{
          console.log("comment inserted");
        }
      });

      //empty the insert entry element
      $(this).empty();
      //$(this).html().replace(/\n/g,"");
		  $(":last", $(this)).remove();//sellect the appropriate element

    }
  });
  
}
//bulletin add-label .js**************************************************
$(".zac-add-label").click(function(){
	$(".exist-label").css("display", "block");
});


$(".exist-label-footer").click(function(){
	$(".exist-label").css("display", "none");
	$(".new-label").css("display", "block");
});

$("#left-arrow").click(function(){
	$(".exist-label").css("display", "block");
	$(".new-label").css("display", "none");
});

$("#exist-label-close").click(function(){
	$(".exist-label").css("display", "none");
});

$("#right-cancel").click(function(){
	$(".new-label").css("display", "none");
	
});
//***************************************************************************

//check cookies*********************
checkCookie();

function checkCookie(){
  var username = getCookie("username");
  var groupname = getCookie("groupname");
 
 
	$.ajax({
	  url: "/bulletin/check_cookie",
		type: "post",
		data: {
			name: username,
      groupname: groupname 
		},
		success: (res) => {
			console.log("checked");
      if (username != "")
      {
        $('#username').html(username);
      }
      else
      {
      alert("PleaseLogin First");
      window.location.href='login.html';
      }
		}
	});
  
}

function getCookie(cname){
  var name = cname +"=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i =0; i<ca.length ; i++)
  {
    var c=ca[i];
    while (c.charAt(0) == ' ')
    {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0)
    {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

$('#logout').on('click',function(){
  document.cooie = "username=;expires=Thu, 01Jan 1970 00:00:00 UTC; path=/;";
  window.location.href='login.html';
});

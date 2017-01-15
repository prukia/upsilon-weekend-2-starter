var currentStudent = 0;
var previewStudent = 0;

$(document).ready(function(){

  $('#prev').on('click', prev);
  $('#next').on('click', next);
  $('.upsilionStudent').on('click', carousel);


  // $('.upsilionStudent').on('click', function (){
  //   var index = $(this).attr('id');
  //   currentStudent = (index-1);
  //   console.log(currentStudent);

  uStudent(currentStudent);

});

function uStudent(currentStudent){
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      console.log('GET / data turns' , data);
      $('#ajax-data').empty();
      previewStudent = data[currentStudent];
      console.log(previewStudent);
      appendDom(previewStudent);

    }
  })
};

function prev(){
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      console.log('GET / data turns' , data);
      //using animate instead of fadeIn/fadeOut because it shows appended data
      $('#ajax-data').animate({opacity:0},500);
      setTimeout (function(){
      $('#ajax-data').empty();
      currentStudent = currentStudent - 1;
      if (currentStudent >= 0){
        previewStudent = data[currentStudent];
        console.log(previewStudent);
        appendDom(previewStudent);
        $('#ajax-data').animate({opacity:1},500);
      } else {
        //if currentStudent = 16 it should go back to Tyler
        currentStudent = 16;
        previewStudent = data[currentStudent];
        console.log(previewStudent);
        appendDom(previewStudent);
        $('#ajax-data').animate({opacity:1},500);
      }
      //setTimeout is waiting for this to finish.
    },500);




    }
  })
};
function next(){
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      console.log('GET / data turns' , data);
      $('#ajax-data').animate({opacity:0},500);
      setTimeout (function(){
      $('#ajax-data').empty();
      currentStudent = currentStudent + 1;
      if (currentStudent <= 16){
        previewStudent = data[currentStudent];
        console.log(previewStudent);
        appendDom(previewStudent);
        $('#ajax-data').animate({opacity:1},500)
      } else {
        //if currentStudent = 0 it should go back to AH-KILL-AH
        currentStudent = 0;
        previewStudent = data[currentStudent];
        console.log(previewStudent);
        appendDom(previewStudent);
        $('#ajax-data').animate({opacity:1},500)
      }
      },500);
    }
  })
};

function carousel(){
  currentStudent = $(this).attr('id');
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      console.log('GET / data turns' , data);
      $('#ajax-data').empty();
      //sets previewStudent to append to the DOM
      previewStudent = data[currentStudent];
      console.log(previewStudent);
      appendDom(previewStudent);

    }
  })
};

    function appendDom(student){
      //jQuery object for div
      var $studentDiv = $('<div class="student"</div>');
      $studentDiv.append('<p>Student Name: ' + student.name + '</p>');
      $studentDiv.append('<p> Github Handle: ' + student.githubUserName + '</p>');
      $studentDiv.append('<p>Special Shoutout: "' + student.shoutout + '"</p>');


      //appending it to the div on my document
      $('#ajax-data').append($studentDiv);

    }

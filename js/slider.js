/*   СЛАЙДЕР 1  */

/*

$(document).ready(function() {
 $(".slider").each(function() {

 var repeats = 100, // кількість повторювань автоматичного прокручування
 interval = 3, // інтервал в секундах
 repeat = true, // чи треба автоматично прокручувати (true/false)
 slider = $(this),
 repeatCount = 0,
 elements = $(slider).find(".li-sl").length;

 $(slider)
 .append("<div class='nav'></div>")
 .find(".li-sl").each(function() {
 $(slider).find(".nav").append("<span data-slide='"+$(this).index()+"'></span>");
 $(this).attr("data-slide", $(this).index());
 })
 .end()
 .find("span").first().addClass("on");

 // add timeout

 if (repeat) {
 repeat = setInterval(function() {
 if (repeatCount >= repeats - 1) {
 window.clearInterval(repeat);
 }

 var index = $(slider).find('.on').data("slide"),
 nextIndex = index + 1 < elements ? index + 1 : 0;

 sliderJS(nextIndex, slider);

 repeatCount += 1;
 }, interval * 1000);
 }

 });
 });

function sliderJS(index, slider) { // slide
 var ul = $(slider).find(".ul-sl"),
 bl = $(slider).find(".li-sl[data-slide=" + index + "]"),
 step = $(bl).width();

 $(slider)
 .find("span").removeClass("on")
 .end()
 .find("span[data-slide=" + index + "]").addClass("on");

 $(ul).animate({
 marginLeft: "-" + step * index
 }, 500);
}

$(document).on("click", ".slider .nav span", function(e) { // slider click navigate
 e.preventDefault();
 var slider = $(this).closest(".slider"),
 index = $(this).data("slide");

 sliderJS(index, slider);
});

*/

///////////////////////////////////////////////////////////////////////////////////////////////////


/*   Прокрутка плавная по меню   */

$(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор бока с атрибута href
        var id  = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
});




///////////////////////////////////////////////////////////////////////////////////////////////////


$(document).ready(function() {
  $('#menu a').on('click', function() {
      var scrollAnchor = $(this).attr('data-scroll'),
          scrollPoint = $('div[data-anchor="' + scrollAnchor + '"]').offset().top;
      $('body,html').animate({
          scrollTop: scrollPoint
      }, 500);
      return false;
  });

  $(window).scroll(function() {
  var windscroll = $(window).scrollTop();
    $('ul').each(function(i){
      if($(this).position().top <= windscroll + 10) {
        $('.nav a.active').removeClass('active');
        $('.nav a').eq(i).addClass('active');
      }
    });
  }).scroll();
});



///////////////////////////////////////////////////////////////////////////////////////////////////




/*   СЛАЙДЕР 2   */

var slideNow = 1;
var slideCount = $('#slidewrapper').children().length;
var slideInterval = 3000;
var navBtnId = 0;
var translateWidth = 0;

$(document).ready(function() {
    var switchInterval = setInterval(nextSlide, slideInterval);

    $('#viewport').hover(function() {
        clearInterval(switchInterval);
    }, function() {
        switchInterval = setInterval(nextSlide, slideInterval);
    });

    $('#next-btn').click(function() {
        nextSlide();
    });

    $('#prev-btn').click(function() {
        prevSlide();
    });

    $('.slide-nav-btn').click(function() {
        navBtnId = $(this).index();

        if (navBtnId + 1 != slideNow) {
            translateWidth = -$('#viewport').width() * (navBtnId);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow = navBtnId + 1;
        }
    });
});


function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('#slidewrapper').css('transform', 'translate(0, 0)');
        slideNow = 1;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow++;
    }
}

function prevSlide() {
    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('#viewport').width() * (slideCount - 1);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow = slideCount;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow - 2);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow--;
    }
}
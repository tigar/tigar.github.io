$(document).ready(function() {
    open_span();
    console.log("hi, feel free to browse the code (there's not that much). Let me know if you have questions!")
    minHeight = 600;
    minWidth = 600;
    if ($(document).height() > minHeight && $(document).width() > minWidth) {
        life();
    }
    else {
        displayError();
    }
});

function open_span() {
  $('a[opener]').click(function(e) {
    e.preventDefault();
    var opener = $(this).attr('opener');
    $('[to-display="' + opener +'"]').removeClass('off').addClass('on');
    $(this).contents().unwrap();

  });
}

function displayError() {
    $("#toosmall").show();
}

function life() {
    console.log("life runs")
}

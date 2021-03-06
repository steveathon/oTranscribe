oT.input = {};
oT.input.reactToFile = function(input){
    var file = input.files[0];
    if ( checkTypeSupport( file ) === true ){
        oT.media.create( file );
        oT.media.initProgressor();
        inputToEditor();
        adjustPlayerWidth();
        oT.input.saveFileDetails(file.name);
    } else {
        var msg = document.webL10n.get('format-warn');
        msg = msg.replace('[file-format]',file.type.split("/")[1]);
        $('#formats').html(msg).addClass('warning');
    }
}

oT.input.askForYoutube = function(){
    $('.input').addClass('ext-input');
    
    var $form = $('.ext-input input');
    $form.focus();
    $form.keypress(function (e) {
      if (e.which == 13) {
        oT.input.reactToYoutube( $(this).val() );
        return false;
      }
    });
    
}

oT.input.reactToYoutube = function(url){
    console.log(url);
    if ( url.indexOf('youtube') > -1 ){
        oT.input.processYoutube( url );
    } else {
        var msg = 'Please enter a valid YouTube URL. For example: https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        $('.ext-input-warning').text(msg).show();
    }
}

oT.input.returnToNormal = function(){
    $('.input').removeClass('ext-input');
}

oT.input.processYoutube = function(url){
    inputToEditor();
    $('#player-time').hide();
    oT.media.create( url );
}

oT.input.loadPreviousFileDetails = function(){
    if ( localStorage.getItem("oT-lastfile") ) {
        var lastFile = JSON.parse( localStorage.getItem("oT-lastfile") );
        var lastfileText = document.webL10n.get('last-file');
        console.log(lastFile.source);
        if (lastFile.name === undefined) {
            document.getElementById("lastfile").innerHTML = lastfileText+' '+lastFile;
        } else if (lastFile.source === '') {
            document.getElementById("lastfile").innerHTML = lastfileText+' '+lastFile.name;
        } else {
            var el = document.getElementById("lastfile");
            el.innerHTML = lastfileText+' <span class="media-reload">'+lastFile.name+'</span>';
            el.addEventListener('click',function(){ 
                oT.input.processYoutube( lastFile.source );
            });
        }
    }    
}

oT.input.saveFileDetails = function(fileDetails){
    var obj = fileDetails;
    if (typeof file === 'string') {
        obj = {
            name: fileDetails,
            source: ''
        }
    }
    localStorage.setItem("oT-lastfile", JSON.stringify( obj ));
}

oT.input.dragListener = function(){
    var button = $('.file-input-wrapper')[0];
    button.addEventListener('dragover', function(){
        $('.file-input-wrapper').addClass('hover');
    }, false);
    button.addEventListener('dragleave', function(){
        $('.file-input-wrapper').removeClass('hover');
    }, false);
    
}


function inputToEditor(){
    $('.topbar').removeClass('inputting');
    $('.input').removeClass('active');
    $('.sbutton.time').addClass('active');
    $('.text-panel').addClass('editing');
};

/*
 *   In-Link Badge Widget Code version 1.0
 *   
 *   Copyright (c) 2011, Gayspirit - http://tech.gayspirit.me/in-link
 *   Originally Based on the Work by Eduardo Miranda - http://code.google.com/p/relposts/
 *
 *   Changelog:
 *   1.0 - Initial Release
 * 
 *   All rights reserved.
 *
 *   In-Link Badge is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   In-Link is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *   GNU General Public License for more details.
 *
 *   You should have received a copy of the GNU General Public License
 *   along with Tumblr In-Link.  If not, see <http://www.gnu.org/licenses/>.
 *
*/

(function() {
    var config = new Object();
    var titles = [];
    var links = [];
    var images = [];
    var items = [];
    var types = [];
    var totals = [];
    var $j = jQuery.noConflict()

    var scripts = document.getElementsByTagName('script');
    var this_script = scripts[scripts.length - 1];
    var params = this_script.src.replace(/^[^\?]+\??/,'').split('&');   
 


	    for(var i=0; i<params.length; i++) {
        var tmp = params[i].split("=");
        config[tmp[0]] = unescape(tmp[1]);
    }
    
    if(typeof(config.url) == 'undefined'){ error(0); return; }
    if(typeof(config.num)=='undefined'){ config.num=8; }
    if(typeof(config.len)=='undefined'){ config.len=60; }
    if(typeof(config.title)=='undefined'){ config.title='Latest Posts:'; }
    if(typeof(config.type)=='undefined'){ config.type=''; }
    if(typeof(config.total)=='undefined'){ config.total=10; }
    
    var url = config.url.slice(0).split(',');
    var totals = config.total;
        
    //var url_base = ('http://' + config.url + '/');
    
    switch(config.css) {
    case ('simple'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/trunk/css/simple.css" media="screen" />');
    break;
    case ('complete'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/trunk/css/complete.css" media="screen" />');
    break;
    case ('light'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/trunk/css/light.css" media="screen" />');
    break;
    case ('dark'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/trunk/css/dark.css" media="screen" />');
    break;
  }
  
      document.write(
        '<div id="tumblrinlink">' +
            '<div id="inlink-loading">Loading Tumblr In Link Badge...</div>' +
            '<div id="inlink-title"></div>'+
            '<ul id="inlink-list"></ul>' +
            '<div id="inlink-logo"><a href="http://tech.gayspirit.me/in-link" title="In-Link Widget"><img src="http://tumblr-in-link.googlecode.com/svn/trunk/img/in-link-sm.png" alt="Tumblr In-Link"></a></div>' +
        '</div>'
    );
        

    $j(document).ready(function() {
        function getBadge() {
            var req;
            for(var i=0; i<url.length; i++){
                req=$j.getJSON('http://'+escape(url[i])+'/api/read/json?callback=?&num='+config.num+'&filter=text', function(data) {
                    $j(data.posts).each(function(i, post) {
                        var text='';
                        if(post.type=='regular') text+=post['regular-title'];
                        else if(post.type=='link') text+=post['link-text'];
                        else if(post.type=='quote') text+=post['quote-text'];
                        else if(post.type=='photo') text+=post['photo-caption'];
                        else if(post.type=='conversation') text+=post['conversation-title'];
                        else if(post.type=='video') text+=post['video-caption'];
                        else if(post.type=='audio') text+=post['audio-caption'];
                        else if(post.type=='answer') text+=post['question'];
                        if(text.length>config.len){ text=text.slice(0,config.len); text+='...';}
                        var image ='';
                        if(post.type=='photo') image+=post['photo-url-100'];
                        else if(post.type=='link') image+=['link-text'];
                        else if(post.type=='quote') image+=['quote-text'];
                        else if(post.type=='photo') image+=['photo-caption'];
                        else if(post.type=='conversation') image+=['conversation-title'];
                        else if(post.type=='video') image+=['video-caption'];
                        else if(post.type=='audio') image+=['audio-caption'];
                        else if(post.type=='answer') image+=['question'];
                        titles.push(text);
                        links.push(post['url-with-slug']); 
                        images.push(image);
                        types.push(post['type'])
                    });
                    
                }).complete(getList);
            }
            
        }
        function getList(){
            for(var i=0; i<titles.length; i++){
                var regex = new RegExp('('+links[i]+')');
                var html = $j("#inlink-list").html();

				{
                    if(config.num--<=0) return;
                
                    var item='<li class="inlink-item" id="'+types[i]+'"><a class="inlink-link" href="'+links[i]+'" title="'+titles[i]+'"><img src="'+images[i]+'" alt="'+titles[i]+'"><p>'+titles[i]+'</p></a></li>';
                    $j("#inlink-list").append(item);
                }
            }
            $j("#inlink-title").html('<h2>'+config.title+'</h2>');
            $j("#inlink-loading").html('');
        }
        getBadge();
        
    });

    function getError(e){
        var msg="error: ";
        switch(e){
            case 0: msg+='no url defined'; break;
            case 1: msg+='tumblr API problem'; break;
        }
        $j("#inlink-loading").html(msg);
    }
})();
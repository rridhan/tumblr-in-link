/*
 *   In-Link Category Widget Code version 1.0
 *   
 *   Copyright (c) 2011, Gayspirit - http://tech.gayspirit.me/in-link
 *   Based on the Work by Eduardo Miranda - http://code.google.com/p/relposts/
 *
 *   Changelog:
 *   1.0 - Initial Release
 * 
 *   All rights reserved.
 *
 *   In-Link is free software: you can redistribute it and/or modify
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
	var tags =[];
    var types = [];
    var $j = jQuery.noConflict()

    var scripts = document.getElementsByTagName('script');
    var this_script = scripts[scripts.length - 1];
    var params = this_script.src.replace(/^[^\?]+\??/,'').split('&');   
 
    var url_base = ((typeof(config.url) == 'undefined') ? ('http://' + document.domain + '/') : ('http://' + config.url + '/'));

    for(var i=0; i<params.length; i++) {
        var tmp = params[i].split("=");
        config[tmp[0]] = unescape(tmp[1]);
    }

    if(typeof(config.tags)=='undefined'){ error(0); return; }
    if(typeof(config.num)=='undefined'){ config.num=8; }
    if(typeof(config.start)=='undefined'){ config.start=0; }
    if(typeof(config.len)=='undefined'){ config.len=60; }
    if(typeof(config.title)=='undefined'){ config.title='Tags Gallery:'; }
    if(typeof(config.type)=='undefined'){ config.type=''; }
    
    switch(config.css) {
    case ('simple'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/trunk/css-cat/simple.css" media="screen" />');
    break;
    case ('complete'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/trunk/css-cat/complete.css" media="screen" />');
    break;
    case ('light'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/trunk/css-cat/light.css" media="screen" />');
    break;
    case ('dark'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/trunk/css-cat/dark.css" media="screen" />');
    break;
  }
  
      document.write(
        '<div id="tumblrinlinkcat" style="display:none">' +
            '<div id="inlinkcat-loading">Loading Tumblr In Links...</div>' +
            '<div id="inlinkcat-title"></div>'+
            '<ul id="inlinkcat-list"></ul>' +
            '<div id="inlinkcat-logo"><a href="http://tech.gayspirit.me/in-link" title="In-Link Category Widget"><img src="http://tumblr-in-link.googlecode.com/svn/trunk/img/in-link-sm.png" alt="Tumblr In-Link"></a></div>' +
        	'<p><small>Here are featured a maximum of 50 images for this gallery. Explore further to see more!</small></p>' +
        '</div>'
    );
        

    $j(document).ready(function() {
        function getRelated() {
            var req;
            for(var i=0; i<tags.length; i++){
                req=$j.getJSON(url_base+'api/read/json?callback=?&filter=text&num='+config.num+'&start='+config.start+'&type='+config.type+'&tagged='+config.tags, function(data) {
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
                var html = $j("#inlinkcat-list").html();
                           
                var item='<li class="inlinkcat-item" id="'+types[i]+'"><a class="inlinkcat-link" href="'+links[i]+'" title="'+titles[i]+'"><img src="'+images[i]+'" alt="'+titles[i]+'"><p>'+titles[i]+'</p></a></li>';
                 $j("#inlinkcat-list").append(item);
	        }
            $j("#inlinkcat-title").html('<h2>'+config.title+'</h2>');
            $j("#inlinkcat-loading").html('');
            $j("#tumblrinlinkcat").show('slow');
        }
        getRelated();
        
    });

    function getError(e){
        var msg="error: ";
        switch(e){
            case 0: msg+='no tags defined'; break;
            case 1: msg+='tumblr API problem'; break;
        }
        $j("#inlinkcat-loading").html(msg);
    }
})();
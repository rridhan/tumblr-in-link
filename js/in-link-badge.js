/*
 *   In-Link Badge Widget Code version 2.0
 *   
 *   Copyright (c) 2011, Gayspirit - http://tech.gayspirit.me/in-link
 *
 *   Changelog:
 *   1.0 - Initial Release (alfa)
 *   2.0 - Release to exploit the Api v.2. release.
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
    var notes = [];
    var items = [];
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

    if(typeof(config.url)=='undefined'){ error(0); return; }
    if(typeof(config.num)=='undefined'){ config.num=4; }
    if(typeof(config.len)=='undefined'){ config.len=60; }
    if(typeof(config.size)=='undefined'){ config.size=75; }
    if(typeof(config.title)=='undefined'){ config.title='InLink Badge'; }
    if(typeof(config.imageurl)=='undefined'){ config.imageurl='http://tumblr-in-link.googlecode.com/svn/branches/Version 2.0/img/placeholder.jpg'; }
    if(typeof(config.type)=='undefined'){ config.type=''; }
    
    switch(config.css) {
    case ('simple'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/branches/Version 2.0/css-badge/simple.css" media="screen" />');
    break;
    case ('complete'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/branches/Version 2.0/css-badge/complete.css" media="screen" />');
    break;
    case ('light'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/branches/Version 2.0/css-badge/light.css" media="screen" />');
    break;
    case ('dark'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/branches/Version 2.0/css-badge/dark.css" media="screen" />');
    break;
    case ('shadow'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://tumblr-in-link.googlecode.com/svn/branches/Version 2.0/css-badge/shadow.css" media="screen" />');
    break;
  }
  
      document.write(
        '<div class="inlinkbadge" id="badge-'+urls+'">' +
            '<div id="inlinkbadge-loading">Loading Tumblr In Link Badge...</div>' +
            '<div id="inlinkbadge-title"></div>'+
            '<ul class="" id="inlinkbadge-list"></ul>' +
            '<div id="inlinkbadge-logo"><a href="http://tech.gayspirit.me/in-link" title="In-Link Badge Widget"><img src="http://tumblr-in-link.googlecode.com/svn/trunk/img/in-link-sm.png" alt="Tumblr In-Link"></a></div>' +
        '</div>'
    );
        
        
    var urls = config.url.slice(0,0).split(',');

    $j(document).ready(function() {
        function getBadge() {
            var req;
            for(var i=0; i<urls.length; i++){
                req=$j.getJSON('http://api.tumblr.com/v2/blog/'+escape(urls[i])+'/posts?api_key=VspHunyBAE3ZhmnivmJ7F8AMZX84Ptz96XCHGCdCRyg0DLNKif&limit='+config.num+'&offset=0&type='+config.type+'&tag='+escape(tags[i])+'&jsonp=?', 
                function(pippo) {
                    $j(pippo.response.posts).each(function(i, post) {
                   		/*Set Text*/
						var text='';
                        if(post.type=='text') text+=post['title'];
                        else if(post.type=='link') text+=post['title'];
                        else if(post.type=='chat') text+=post['body'];
                        else if(post.type=='quote') text+=post['text'];
                        else if(post.type=='photo') text+=post['caption'];
                        else if(post.type=='video') text+=post['caption'];
                        else if(post.type=='audio') text+=post['caption'];
                        else if(post.type=='answer') text+=post['question'];
                        /*Strip HTML from text*/
                        var StrippedText = text.replace(/(<([^>]+)>)/ig,"");
                        /*slice text to the desired length*/
                        if(StrippedText.length>config.len){ StrippedText=StrippedText.slice(0,config.len); StrippedText+='...';} 
                        /*get images*/
                        var image ='';
                        /*If article, try to get the first image out of the body*/
                        if(post.type=='text'){
                        	var fullbody = post.body;
                        	var fullbodyset = $j(fullbody);
                         	image += fullbodyset.find('img').attr('src');
                         	}
                        /*If audio, get the album cover if available*/
                        else if(post.type=='audio'){
                        	image+=this.album_art;
                        	}
                        else if(post.type=='photo'){ 
                        	/*Loop to the various photos data, and make sure to select only the first in case of a slideshow*/
                        	$j(this.photos[0]).each(function(i, photo) {
                        		/*Loop through the various photo size to get the thumbnail information*/
                        			$j(this.alt_sizes).each(function(i, alt_size) {
                        			if(config.size=='75') {
                        				if(alt_size.width=='75') {image+=alt_size['url'];}
                        				}
                        			if(config.size=='100') {
                        				if(alt_size.width=='100') {image+=alt_size['url'];}
                        				}
                        			if(config.size=='250') {
                        				if(alt_size.width=='250') {image+=alt_size['url'];}
                        				}
        							});
        						});
							}
        				/*For other types, use the standard image*/
        				else if(post.type=='link') image += 0
                        else if(post.type=='chat')  image += 0
                        else if(post.type=='quote')  image += 0
                        else if(post.type=='photo')  image += 0
                        else if(post.type=='answer')  image += 0;
        				
        				/*Manage Exceptions*/
        				if(image==0){image=config.imageurl; }
        				else if(image=='undefined'){image=config.imageurl; };
        				
        				/*Set Notes*/
        				var note ='';
        				note+=post['note_count'];
        				if(note=='undefined'){note='0'; };
        				
        				/*Transfer pieces*/
        				images.push(image);
	                    titles.push(StrippedText);
                        links.push(post['post_url']); 
                        types.push(post['type']);
                        notes.push(note);
                    });
                    
                }).complete(getLista);
                            
            }
            
        }
        function getLista(){
            for(var i=0; i<titles.length; i++){
                var regex = new RegExp('('+links[i]+')');
                var html = $j('"#inlinkbadge-list-'+config.url+'"').html();

				{ if(config.num--<=0) return;
                
                    var item='<li class="inlinkbadge-item" id="'+types[i]+'"><a class="inlinkbadge-link" href="'+links[i]+'" title="'+titles[i]+'"><img src="'+images[i]+'" alt="'+titles[i]+'"><p>'+titles[i]+'</p></a></li>';
                    $j("#inlinkbadge-list").append(item);
                }
            }
            if(links.length==0) hideall();
            console.log(links.length);
            $j("#inlinkbadge-title").html('<h2>'+config.title+'</h2>');
            $j("#inlinkbadge-loading").html('');
        }
        getBadge();
        
    });

    function getError(e){
        var msg="error: ";
        switch(e){
            case 0: msg+='no tags defined'; break;
            case 1: msg+='tumblr API problem'; break;
            case 2: msg+='tumblr problem'; break;
        }
        $j("#inlinkbadge-loading").html(msg);
    
        function hideall(){
        $j('#badge').hide();

    }
}();
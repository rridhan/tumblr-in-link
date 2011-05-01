/*
 *   Tumblr In-Link Widget Code version 1.0
 *   
 *   Copyright (c) 2011, Gayspirit - http://tech.gayspirit.me
 *   Based on the Work by Eduardo Miranda - http://code.google.com/p/relposts/
 *
 *   Changelog:
 *   1.0 - Initial Release
 * 
 *   All rights reserved.
 *
 *   Tumblr In-Link is free software: you can redistribute it and/or modify
 *   it under the terms of the GNU General Public License as published by
 *   the Free Software Foundation, either version 3 of the License, or
 *   (at your option) any later version.
 *
 *   Tumblr In-Link is distributed in the hope that it will be useful,
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
    if(typeof(config.len)=='undefined'){ config.len=60; }
    if(typeof(config.title)=='undefined'){ config.title='Related Posts:'; }
    if(typeof(config.type)=='undefined'){ config.type=''; }
    
    switch(config.css) {
    case ('simple'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://rive.rs/stylesheets/tumblr_tag_clouds/default.css" />');
    break;
    case ('light'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://rive.rs/stylesheets/tumblr_tag_clouds/flickr.css" />');
    break;
    case ('dark'):
      document.write('<link rel="stylesheet" type="text/css" ' +
      'href="http://rive.rs/stylesheets/tumblr_tag_clouds/flickr.css" />');
    break;
  }
  
      document.write(
        '<div id="tumblrinlink">' +
            '<div id="inlink-loading">Loading Tumblr In Links...</div>' +
            '<div id="inlink-title"></div>'+
            '<ul id="inlink-list"></ul>' +
            '<div id="inlink-logo"><a href="http://tumblr-in-link.googlecode.com" title="Tumblr In-Link Widget"><img src="http://tumblr-in-link.googlecode.com/svn/trunk/img/in-link-sm.png" alt="Tumblr In-Link"></a></div>' +
        '</div>'
    );
        
    var tags = config.tags.slice(0,-1).split(',');

    $j(document).ready(function() {
        function getRelated() {
            var req;
            for(var i=0; i<tags.length; i++){
                req=$j.getJSON(url_base+'api/read/json?callback=?&num='+config.num+'&start=0&type='+config.type+'&tagged='+escape(tags[i]), function(data) {
                    $j(data.posts).each(function(i, post) {
                        titles.push(post['photo-caption']);
                        links.push(post['url-with-slug']);
				images.push(post['photo-url-100']);                        
                    });
                    
                }).complete(getList);
            }
            
        }
        function getList(){
            for(var i=0; i<titles.length; i++){
                var regex = new RegExp('('+links[i]+')');
                var html = $j("#inlink-list").html();

                /*if(links[i]!=document.location&&!html.match(regex)){
                    if(config.num--<=0) return;*/
                
                    var item='<li class="inlink-item"><a class="inlink-link" href="'+links[i]+'"><img src="'+images[i]+'">'+titles[i]+'</a></li>';
                    $j("#inlink-list").append(item);
                /*}*/
            }
            $j("#inlink-title").html('<h2>'+config.title+'</h2>');
            $j("#inlink-loading").html('');
        }
        getRelated();
        
    });

    function getError(e){
        var msg="error: ";
        switch(e){
            case 0: msg+='no tags defined'; break;
            case 1: msg+='tumblr API problem'; break;
        }
        $j("#inlink-loading").html(msg);
    }
})();
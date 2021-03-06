var ejs = require('ejs');
var pathFn = require('path');
var fs = require('fs');

var sitemapSrc = pathFn.join(__dirname, '../sitemap.ejs');
var sitemapTmpl = ejs.compile(fs.readFileSync(sitemapSrc, 'utf8'));

module.exports = function(locals){
  var config = this.config;

  var posts = [].concat(locals.posts.toArray(), locals.pages.toArray())
    .filter(function(post){
      return post.sitemap !== false;
    })
    .sort(function(a, b){
      return b.updated - a.updated;
    });

  var xml = sitemapTmpl({
    config: config,
    posts: posts
  });

  return {
    path: config.sitemap.path,
    data: xml
  };
};
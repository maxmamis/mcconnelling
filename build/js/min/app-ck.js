$(function(){App.init(),$("#get-started").click(function(){$("#intro").fadeOut(),$("#video").fadeIn()})});var App=function(){var n={name:"McConnelling",url:"mcconnelling.org",version:"0.1.0"},i=function(){console.log("Ready and Listening")},o=function(){i(),console.log(n.name+"(v"+n.version+") Started")};return{init:o}}();
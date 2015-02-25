"use strict";angular.module("visApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch","ngLodash","angular-jqcloud","ui.select"]).config(["$routeProvider","$locationProvider",function(a,b){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/"}),b.html5Mode(!0)}]),angular.module("visApp").controller("MainCtrl",["$scope",function(a){a.test="asdf"}]),angular.module("visApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("visApp").directive("formList",["lodash",function(a){return{templateUrl:"scripts/directives/formlist.html",restrict:"E",link:function(b){function c(b){var c=[];return angular.forEach(b,function(a){c=c.concat(a.interests)}),a.sortBy(c,function(a){return a.toLowerCase()})}function d(c){b.wordCloud=[],angular.forEach(a.countBy(c),function(a,c){b.wordCloud.push({text:c,weight:a})})}b.wordCloud=[{text:"Word Cloud",weigth:1}],b.avaliableInterests=["computer","tv","hello world"],b.selectedInterests=[],b.list=[],b.list.push({name:"Beni",interests:["Computers","Chocolate","Ski"]}),b.list.push({name:"Seppi",interests:["Computers","Hand ball","Snowboard"]}),b.$watch("list",function(a,b){var e=c(a),f=c(b);angular.equals(e,f)||d(e)},!0),b.selected=function(b){b.interests=a.sortBy(b.interests,function(a){return a.toLowerCase()})},b.addPerson=function(){b.list.push({name:"",interests:[]})},b.deletePerson=function(c){b.list=a.reject(b.list,function(a){return c===a})},b.allInterestsDistinct=function(){var c=[];return angular.forEach(b.list,function(b){c=a.union(c,b.interests)}),a.sortBy(c,function(a){return a.toLowerCase()})},d(c(b.list))}}}]),angular.module("visApp").factory("d3Service",["$document","$q","$rootScope",function(a,b,c){function d(){c.$apply(function(){e.resolve(window.d3)})}var e=b.defer(),f=a[0].createElement("script");f.type="text/javascript",f.async=!0,f.src="http://d3js.org/d3.v3.min.js",f.onreadystatechange=function(){"complete"==this.readyState&&d()},f.onload=d;var g=a[0].getElementsByTagName("body")[0];return g.appendChild(f),{d3:function(){return e.promise}}}]),angular.module("visApp").directive("bigraph",["d3Service","$window",function(a,b){return{restrict:"E",scope:{data:"="},link:function(c,d){function e(a){function b(b){function c(b,c,d,e,f){var g=a.sum(b),h=0,i=0,j=d-c-2*e*b.length,k=[];b.forEach(function(a){var h={};h.percent=0==g?0:a/g,h.value=a,h.height=Math.max(h.percent*(d-c-2*e*b.length),f),h.height==f?j-=f:i+=h.height,k.push(h)});var l=j/Math.max(i,1);return k.forEach(function(a){a.percent=l*a.percent,a.height=a.height==f?f:a.height*l,a.middle=h+e+a.height/2,a.y=c+a.middle-a.percent*(d-c-2*e*b.length)/2,a.h=a.percent*(d-c-2*e*b.length),a.percent=0==g?0:a.value/g,h+=2*e+a.height}),k}var d={};return d.mainBars=[c(b.data[0].map(function(b){return a.sum(b)}),0,n,o,p),c(b.data[1].map(function(b){return a.sum(b)}),0,n,o,p)],d.subBars=[[],[]],d.mainBars.forEach(function(a,e){a.forEach(function(a,f){c(b.data[e][f],a.y,a.y+a.h,0,0).forEach(function(a,b){a.key1=0==e?f:b,a.key2=0==e?b:f,d.subBars[e].push(a)})})}),d.subBars.forEach(function(a){a.sort(function(a,b){return a.key1<b.key1?-1:a.key1>b.key1?1:a.key2<b.key2?-1:a.key2>b.key2?1:0})}),d.edges=d.subBars[0].map(function(a,b){return{key1:a.key1,key2:a.key2,y1:a.y,y2:d.subBars[1][b].y,h1:a.h,h2:d.subBars[1][b].h}}),d.keys=b.keys,d}function c(b){var c=a.interpolate(this._current,b);return this._current=c(0),function(a){return g(c(a))}}function d(b,c,d){a.select("#"+c).append("g").attr("class","part"+d).attr("transform","translate("+d*(m+l)+",0)"),a.select("#"+c).select(".part"+d).append("g").attr("class","subbars"),a.select("#"+c).select(".part"+d).append("g").attr("class","mainbars");var e=a.select("#"+c).select(".part"+d).select(".mainbars").selectAll(".mainbar").data(b.mainBars[d]).enter().append("g").attr("class","mainbar");e.append("rect").attr("class","mainrect").attr("x",0).attr("y",function(a){return a.middle-a.height/2}).attr("width",l).attr("height",function(a){return a.height}).style("shape-rendering","auto").style("fill-opacity",0).style("stroke-width","0.5").style("stroke","black").style("stroke-opacity",0),e.append("text").attr("class","barlabel").attr("x",q[d]).attr("y",function(a){return a.middle+5}).text(function(a,c){return b.keys[d][c]}).attr("text-anchor","start"),e.append("text").attr("class","barvalue").attr("x",r[d]).attr("y",function(a){return a.middle+5}).text(function(a){return a.value}).attr("text-anchor","end"),e.append("text").attr("class","barpercent").attr("x",s[d]).attr("y",function(a){return a.middle+5}).text(function(a){return"( "+Math.round(100*a.percent)+"%)"}).attr("text-anchor","end").style("fill","grey"),a.select("#"+c).select(".part"+d).select(".subbars").selectAll(".subbar").data(b.subBars[d]).enter().append("rect").attr("class","subbar").attr("x",0).attr("y",function(a){return a.y}).attr("width",l).attr("height",function(a){return a.h}).style("fill",function(a){return t[a.key1]})}function e(b,c){a.select("#"+c).append("g").attr("class","edges").attr("transform","translate("+l+",0)"),a.select("#"+c).select(".edges").selectAll(".edge").data(b.edges).enter().append("polygon").attr("class","edge").attr("points",g).style("fill",function(a){return t[a.key1]}).style("opacity",.5).each(function(a){this._current=a})}function f(b,c){a.select("#"+c).append("g").attr("class","header").append("text").text(b[2]).style("font-size","20").attr("x",108).attr("y",-20).style("text-anchor","middle").style("font-weight","bold"),[0,1].forEach(function(d){var e=a.select("#"+c).select(".part"+d).append("g").attr("class","header");e.append("text").text(b[d]).attr("x",q[d]-5).attr("y",-5).style("fill","grey"),e.append("text").text("Count").attr("x",r[d]-10).attr("y",-5).style("fill","grey"),e.append("line").attr("x1",q[d]-10).attr("y1",-2).attr("x2",s[d]+10).attr("y2",-2).style("stroke","black").style("stroke-width","1").style("shape-rendering","crispEdges")})}function g(a){return[0,a.y1,m,a.y2,m,a.y2+a.h2,0,a.y1+a.h1].join(" ")}function h(b,c,d){var e=a.select("#"+c).select(".part"+d).select(".mainbars").selectAll(".mainbar").data(b.mainBars[d]);e.select(".mainrect").transition().duration(500).attr("y",function(a){return a.middle-a.height/2}).attr("height",function(a){return a.height}),e.select(".barlabel").transition().duration(500).attr("y",function(a){return a.middle+5}),e.select(".barvalue").transition().duration(500).attr("y",function(a){return a.middle+5}).text(function(a){return a.value}),e.select(".barpercent").transition().duration(500).attr("y",function(a){return a.middle+5}).text(function(a){return"( "+Math.round(100*a.percent)+"%)"}),a.select("#"+c).select(".part"+d).select(".subbars").selectAll(".subbar").data(b.subBars[d]).transition().duration(500).attr("y",function(a){return a.y}).attr("height",function(a){return a.h})}function i(b,d){a.select("#"+d).append("g").attr("class","edges").attr("transform","translate("+l+",0)"),a.select("#"+d).select(".edges").selectAll(".edge").data(b.edges).transition().duration(500).attrTween("points",c).style("opacity",function(a){return 0==a.h1||0==a.h2?0:.5})}function j(a,b){h(a,b,0),h(a,b,1),i(a,b)}var k={},l=30,m=300,n=600,o=1,p=14,q=[-300,40],r=[-60,250],s=[-10,300],t=["#3366CC","#DC3912","#FF9900","#109618","#990099","#0099C6","#AA0000","#00AA00","#0000AA","#00AAAA","#AA00AA","#AAAA00","#880000","#008800","#000088","#008888","#880088","#888800"];return k.partData=function(b,c){var d={};return d.keys=[a.set(b.map(function(a){return a[0]})).values().sort(function(a,b){return b>a?-1:a>b?1:0}),a.set(b.map(function(a){return a[1]})).values().sort(function(a,b){return b>a?-1:a>b?1:0})],d.data=[d.keys[0].map(function(){return d.keys[1].map(function(){return 0})}),d.keys[1].map(function(){return d.keys[0].map(function(){return 0})})],b.forEach(function(a){d.data[0][d.keys[0].indexOf(a[0])][d.keys[1].indexOf(a[1])]=a[c],d.data[1][d.keys[1].indexOf(a[1])][d.keys[0].indexOf(a[0])]=a[c]}),d},k.draw=function(c,g){c.forEach(function(h,i){g.append("g").attr("id",h.id).attr("transform","translate("+550*i+",0)");var j=b(h.data);d(j,h.id,0),d(j,h.id,1),e(j,h.id),f(h.header,h.id),[0,1].forEach(function(b){a.select("#"+h.id).select(".part"+b).select(".mainbars").selectAll(".mainbar").on("mouseover",function(a,d){return k.selectSegment(c,b,d)}).on("mouseout",function(a,d){return k.deSelectSegment(c,b,d)})})})},k.selectSegment=function(c,d,e){c.forEach(function(c){var f={keys:[],data:[]};f.keys=c.data.keys.map(function(a){return a}),f.data[d]=c.data.data[d].map(function(a){return a}),f.data[1-d]=c.data.data[1-d].map(function(a){return a.map(function(a,b){return e==b?a:0})}),j(b(f),c.id);var g=a.select("#"+c.id).select(".part"+d).select(".mainbars").selectAll(".mainbar").filter(function(a,b){return b==e});g.select(".mainrect").style("stroke-opacity",1),g.select(".barlabel").style("font-weight","bold"),g.select(".barvalue").style("font-weight","bold"),g.select(".barpercent").style("font-weight","bold")})},k.deSelectSegment=function(c,d,e){c.forEach(function(c){j(b(c.data),c.id);var f=a.select("#"+c.id).select(".part"+d).select(".mainbars").selectAll(".mainbar").filter(function(a,b){return b==e});f.select(".mainrect").style("stroke-opacity",0),f.select(".barlabel").style("font-weight","normal"),f.select(".barvalue").style("font-weight","normal"),f.select(".barpercent").style("font-weight","normal")})},k}a.d3().then(function(a){c.$watch("data",function(){c.render()},!0);var f=e(a);window.onresize=function(){c.$apply()},c.$watch(function(){return angular.element(b)[0].innerWidth},function(){c.render()}),c.render=function(){var b=[["Person","Interest",1]];c.data&&(b=[],angular.forEach(c.data,function(a){angular.forEach(a.interests,function(c){b.push([a.name,c,1])})}));var e=[{data:f.partData(b,2),id:"interests",header:["Person","Interest","Person to Interest Bigraph"]}],g=610,h={b:0,t:40,l:320,r:50};a.select("svg").remove();var i=a.select(d[0]).append("svg").attr("width","100%").attr("height",g+h.b+h.t).append("g").attr("transform","translate("+h.l+","+h.t+")");f.draw(e,i)}})}}}]);
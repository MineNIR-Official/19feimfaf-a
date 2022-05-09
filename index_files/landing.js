var mcpetradeLanding={};(function(self){self.shopid=null;self.serverid=null;self.settings=null;self.category=null;self.productid=null;self.product__style='card';self.static__items={};self.hide_category_all=false;self.data={};self.load=function(shopid,settings){self.shopid=shopid;self.settings=settings;self.product__style=settings.product;if(settings.hide_category_all!=undefined){self.hide_category_all=true;}
$("body").on("click",".toggle-header",function(){$(this).toggleClass('active');$("header nav").toggleClass('active');});$("body").on("click",".modal-close",function(){self.hideModal();});$("body").on("input","input",function(){$(this).attr("value",$(this).val())});$("body").on("click","[data-static]",function(){sid=$(this).data('static');html='<div class="modal--section">';html+='<h3>'+self.static__items[sid].header+'</h3>';html+='<div>'+self.static__items[sid].content+'</div>';html+='</div>';self.openModal(html);});self.loadServers();}
self.setStatic=function(data){self.static__items=data;}
self.loadServers=function(){getJSON('getServers',{},function(data){switch(data.status){case "error":$('#servers').html(data.response);break;case "success":if(data.response.length==1){self.serverid=data.response[0].id;self.loadCategories();}else{$('#servers').html('<ul class="servers"></ul>');$.each(data.response,function(index,item){$('#servers ul').append('<li data-serverid="'+item.id+'"><span class="label"><i class="fas fa-server"></i></span><span class="title">'+item.name+'</span></li>');});$('#servers ul li').off('click').on('click',function(){$('#servers ul li').removeClass('active');$(this).addClass('active');self.serverid=$(this).data('serverid');self.loadCategories();});$('#servers ul li')[0].click();}
break;}});}
self.loadCategories=function(){$('#products').html('');$('#categories').html('');getJSON('getCategories',{},function(data){switch(data.status){case "error":$('#categories').html(data.response);break;case "success":if(data.response.length==0){self.category='';self.loadProducts();}else{$('#categories').html('<ul class="categories"></ul>');if(!self.hide_category_all){/*$('#categories ul').append('<li data-category=""><span class="label"><i class="fas fa-tags"></i></span><span class="title">Все товары</span></li>');*/}
$.each(data.response,function(index,item){$('#categories ul').append('<li data-category="'+item.id+'"><span class="label"><i class="fas fa-tags"></i></span><span class="title">'+item.name+'</span></li>');});$('#categories ul li').off('click').on('click',function(){$('#categories ul li').removeClass('active');$(this).addClass('active');self.category=$(this).data('category');self.loadProducts();});$('#categories ul li')[0].click();}
break;}});}
self.loadProducts=function(){getJSON('getProducts',{'category':self.category},function(data){switch(data.status){case "error":$('#products').html(data.response);break;case "success":$('#products').html('');$.each(data.response,function(index,item){$('#products').append('<div data-product="'+item.id+'" class="product-'+self.product__style+'"><div class="image" style="background-image: url(\''+item.img+'\')"></div><div class="description"><span class="name">'+item.name+'</span><span class="price">'+item.price+' \u20bd</span><center><span class="buy-button">Купить</span></center></div></div>');});$("#products .product-"+self.product__style).off('click').on('click',function(){self.showProduct(data.response.find(x=>x.id==$(this).data('product')));});}});}
self.hideModal=function(){$(".modal").find(".content").addClass("zoomOut");setTimeout(function(){$(".modal").hide().find(".content").removeClass("zoomOut").html("");},200);}
self.openModal=function(html){$(".modal").show().find(".content").addClass("zoomIn").html(html);setTimeout(function(){$(".modal").find(".content").removeClass("zoomIn");},500);}
self.showError=function(message){if($(".mcpetrade-error").is(":visible")){$(".mcpetrade-error").html(message);}else{$(".mcpetrade-error").html(message).show();}}
self.showProduct=function(product){self.productid=product.id;html='<div class="modal--section">';html+='<h3>'+product.name+'</h3>';html+='<p>'+product.desc+'</p>';if(self.settings.custom!=undefined){html+='<div class="mcpetrade-input mcpetrada-input-username"><input type="text" name="username"><span class="mcpetrade-label">'+self.settings.custom+'</span></div>';}else{html+='<div class="mcpetrade-input mcpetrada-input-username"><input type="text" name="username"><span class="mcpetrade-label">Игровой никнейм</span></div>';html+='<div class="mcpetrade-input mcpetrada-input-coupon"><input type="text" name="coupon"><span class="mcpetrade-label">Введите купон, если есть</span></div>';}
html+='<div class="mcpetrade-invoice"><span>К оплате:</span><span class="price">'+product.price+' \u20bd</span></div>';html+='<button class="mcpetrade-button" type="button">Продолжить</button>';html+='<div class="mcpetrade-error" style="display: none;"></div>';html+='</div>';self.openModal(html);$(".mcpetrade-input").off('input').on('input',function(){self.checkSurcharge();});$('.mcpetrade-button').off('click').on('click',function(){getJSON('createPayment',{'category':$('#categories ul .active').data('category'), 'product':self.productid,'username':$("input[name=username]").val(),'coupon':$("input[name=coupon]").val()},function(data){switch(data.status){case "error":self.showError(data.response);break;case "success":window.location.href=data.response;break;}});});}
self.checkSurcharge=function(){getJSON('checkSurcharge',{'category':$('#categories ul .active').data('category'),'product':self.productid,'username':$("input[name=username]").val(),'coupon':$("input[name=coupon]").val()},function(data){switch(data.status){case "error":self.showError(data.response);break;case "success":$(".mcpetrade-error").html('');$('.mcpetrade-invoice .price').html(data.response.price+' \u20bd');break;}});}
self.monitoring=function(config){}
self.lastpurchases=function(hideusername){getJSON('getLastPurchases',{},function(data){switch(data.status){case "error":$(".lastpurchases section").html(data.response);break;case "success":if(data.response.length>0){html='';$.each(data.response,function(index,item){html+='<div class="item" data-pid="'+item.id+'">';html+='<div class="image" style="background-image: url(\''+item.img+'\')"></div>';html+='<div class="description">';if(hideusername==false){html+='<span class="username">'+item.username+'</span>';}
html+='<span class="product">'+item.product+'</span>';html+='</div>';html+='</div>';});$(".lastpurchases section ul").html(html);$(".lastpurchases .item").off('click').on('click',function(){pid=$(this).data('pid');$('[data-product="'+pid+'"]').click();});}else{$(".lastpurchases").hide();}
break;}});}
function md5(d){return rstr2hex(binl2rstr(binl_md5(rstr2binl(d),8*d.length)))}function rstr2hex(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function rstr2binl(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function binl2rstr(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function binl_md5(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
self.notice=function(hash){$("body").on("click",".notice button",function(){document.cookie="notice="+hash+"; path=/";$(".notice").remove();});}
self.vk=function(){}
self.vk.group=function(vkid,config){}
self.vk.messages=function(vkid){}
function getJSON(method,params,callback){$.ajax({'url':'/shop/'+method+'/','type':'GET','data':params,'success':function(data){callback(JSON.parse(data));}});}})(mcpetradeLanding);
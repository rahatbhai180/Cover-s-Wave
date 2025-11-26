// Product Data
const products = {
    "iPhoneCaseGlitter":{
        name:"iPhone Case Glitter",
        price:"850 Tk",
        models:"iPhone 13pro Max, 14pro Max, 15pro, 15pro Max, 16pro, 16pro Max, 17pro, 17pro Max",
        images:["images/product1-1.jpg","images/product1-2.jpg","images/product1-3.jpg","images/product1-4.jpg"]
    },
    "17ProMaxCase":{
        name:"17 pro max protective transparent case",
        price:"899 Tk",
        models:"Only 17 pro Max & 17 pro",
        images:["images/product2-1.jpg","images/product2-2.jpg","images/product2-3.jpg","images/product2-4.jpg"]
    },
    "iPhoneClearCase":{
        name:"iPhone Clear Case",
        price:"750 Tk",
        models:"iPhone 12pro Max, 13pro Max, 14, 14pro Max, 15pro, 15, 15+, 15pro Max, 16pro, 16pro Max, 17pro, 17, 17pro Max",
        images:["images/product3-1.jpg","images/product3-2.jpg","images/product3-3.jpg","images/product3-4.jpg"]
    },
    "PremiumLuxuryCase":{
        name:"Premium Luxury Brush Case For IPhone",
        price:"890 Tk",
        models:"iPhone 11-12 Pro Max 13-13 Pro -13 Pro Max 14-14 Pro -14 Pro Max 15-15 Pro -15 Pro Max 16-16 Pro -16 Pro Max Also 15 Plus /14 Plus",
        images:["images/product4-1.jpg","images/product4-2.jpg","images/product4-3.jpg","images/product4-4.jpg"]
    }
};

// Product Page Load
$(document).ready(function(){
    let urlParams = new URLSearchParams(window.location.search);
    let productKey = urlParams.get('product');
    let product = products[productKey];

    if(product){
        $(".product-name").text(product.name);
        $(".product-price-discount span").text(product.price);
        $(".product-models").text(product.models);

        product.images.forEach(img=>{
            $("#slider").append(`<div class="item"><img src="${img}" /></div>`);
            $("#thumb").append(`<div class="item"><img src="${img}" /></div>`);
        });

        var slider = $("#slider");
        var thumb = $("#thumb");
        var slidesPerPage = 4;

        slider.owlCarousel({
            items:1, dots:false, nav:false, loop:true
        }).on('changed.owl.carousel', syncPosition);

        thumb.owlCarousel({
            items:slidesPerPage,dots:false,nav:true,slideBy:slidesPerPage,smartSpeed:200
        }).on('changed.owl.carousel', syncPosition2);

        function syncPosition(el){
            let count = el.item.count-1;
            let current = Math.round(el.item.index-(el.item.count/2)-.5);
            if(current<0) current=count;
            if(current>count) current=0;
            thumb.find(".owl-item").removeClass("current").eq(current).addClass("current");
        }

        function syncPosition2(el){
            let number=el.item.index;
            slider.data('owl.carousel').to(number,100,true);
        }

        thumb.on("click",".owl-item",function(e){
            e.preventDefault();
            var number=$(this).index();
            slider.data('owl.carousel').to(number,300,true);
        });

        // Quantity buttons
        $(".qtyminus").click(function(){
            var now=$(".qty").val();
            if($.isNumeric(now)&&parseInt(now)-1>0) $(".qty").val(parseInt(now)-1);
        });
        $(".qtyplus").click(function(){
            var now=$(".qty").val();
            if($.isNumeric(now)) $(".qty").val(parseInt(now)+1);
        });
    }
});

// Order Button
function orderProduct(){
    let qty=$(".qty").val();
    let productName=$(".product-name").text();
    let price=$(".product-price-discount span").text();
    let whatsappMsg=`আমি অর্ডার করতে চাই: ${productName}, Quantity: ${qty}, Price: ${price}`;
    window.open(`https://wa.me/01960559745?text=${encodeURIComponent(whatsappMsg)}`,'_blank');
}
$(document).ready(function() {
    // Slider
    var slider = $("#slider");
    var thumb = $("#thumb");
    var slidesPerPage = 4;

    slider.owlCarousel({
        items:1,
        dots:false,
        nav:false,
        loop:true,
        autoplay:false
    }).on('changed.owl.carousel', syncPosition);

    thumb.owlCarousel({
        items:slidesPerPage,
        dots:false,
        nav:true,
        smartSpeed:200,
        slideBy:slidesPerPage
    }).on('changed.owl.carousel', syncPosition2);

    function syncPosition(el){
        var count = el.item.count -1;
        var current = Math.round(el.item.index - (el.item.count/2) - .5);
        if(current<0) current=count;
        if(current>count) current=0;
        thumb.find(".owl-item").removeClass("current").eq(current).addClass("current");
    }

    function syncPosition2(el){
        var number = el.item.index;
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
        if($.isNumeric(now) && parseInt(now)-1>0) $(".qty").val(parseInt(now)-1);
    });
    $(".qtyplus").click(function(){
        var now=$(".qty").val();
        if($.isNumeric(now)) $(".qty").val(parseInt(now)+1);
    });
});

// Order button
function orderProduct(){
    var qty = $(".qty").val();
    var productName = $(".product-name").text();
    var price = $(".product-price-discount span").text();
    
    // WhatsApp order
    var whatsappMsg = `আমি অর্ডার করতে চাই: ${productName}, Quantity: ${qty}, Price: ${price}`;
    window.open(`https://wa.me/01960559745?text=${encodeURIComponent(whatsappMsg)}`, '_blank');

    // Backend log
    $.ajax({
        url:'log_order.php',
        type:'POST',
        data:{ product: productName, quantity: qty, price: price },
        success:function(){ console.log('Order logged'); },
        error:function(){ console.log('Logging failed'); }
    });
}
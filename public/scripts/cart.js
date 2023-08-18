$(document).ready(function() {

    var ca = document.cookie.split(';');
    var finalPrice = 0.0;
    
    setCart();
    
    
    function setCart() {
        ca = document.cookie.split(';');
        finalPrice = 0.0;
        
        
        var mayProduct = false;
        
        if(ca[0])
            for(var i=0;i < ca.length && !mayProduct; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ')
                    c = c.substring(1,c.length);
                
                cSplit = c.split('=');
                val = cSplit[1].split('`');
                

                productURL = val[2];
                if(productURL)
                    mayProduct = true;
            }
        
        if(mayProduct)
        {
            $("#bodyContainer").append("SHOPPING CART");
            for(var i=0;i < ca.length;i++) {
                var c = ca[i];
                while (c.charAt(0)==' ')
                    c = c.substring(1,c.length);
                
                cSplit = c.split('=');
                key = cSplit[0].split('`');
                val = cSplit[1].split('`');
                
                productName = key[0];
                productSize = key[1];
                
                productPrice = val[0];
                productQTY = val[1];
                productURL = val[2];
                
                var productTotal = parseFloat(productPrice) * parseInt(productQTY);
                
                
                if(productURL)
                {
                    var product = "";
                    if(productSize == "N/A")
                        product = "<div class='cartProduct'><img src='/images/products/" + productURL + "'><input class='productURL', type='hidden', value='"+ productURL +"'><input class='singlePrice', type='hidden', value='"+ productPrice +"'><div class='productInfo'><p style='margin-top:30px;' class='productName'>" + productName + "</p></div><span class='removeBtn'>x</span><div class='price'>Php " + productTotal + "</div> <div class='productQTY'><h3>QUANTITY</h3><input type='button' class='decreaseQty' value='-'><input type='button' class='qtyDisplay' value='" + productQTY + "'><input type='button' class='increaseQty' value='+'></div></div>";
                    else
                        product = "<div class='cartProduct'><img src='/images/products/" + productURL + "'><input class='productURL', type='hidden', value='"+ productURL +"'><input class='singlePrice', type='hidden', value='"+ productPrice +"'><div class='productInfo'><p class='productName'>" + productName + "</p><p class='productSize'>"+ productSize +"</p></div><span class='removeBtn'>x</span><div class='price'>Php " + productTotal + "</div> <div class='productQTY'><h3>QUANTITY</h3><input type='button' class='decreaseQty' value='-'><input type='button' class='qtyDisplay' value='" + productQTY + "'><input type='button' class='increaseQty' value='+'></div></div>";
                    $("#bodyContainer").append(product);
                    finalPrice += productTotal;
                }
                
            }
            
            $("#bodyContainer").append(" <div class='finalPrice'>Php " + finalPrice.toString() + "</div><div class='checkoutBtn'> <form method='post', action='/payment'><input type='hidden', class='cookies', name='cookies', value=''><input class='checkout', type='submit' value='PROCEED TO PAYMENT'></div></form>");

        }
        
        else
        {
            var empty = "<div class='noCart'><h3>SHOPPING CART</h3><p>Your cart is currently empty</p><a href='/products'><input type='submit' value='VIEW PRODUCTS'></a></div>";
            $("#bodyContainer").append(empty);
            //alert("EMPTY");
        }
    }
    
    
    
    
    $(".decreaseQty").click(function() {

        var sibling = $(this).siblings('.qtyDisplay');
        var qty = parseInt(sibling.attr("value"));

        if(qty > 1)
        {
            qty--;
            sibling.prop('value', qty.toString());
            var parent = $(this).closest('.cartProduct');
            var productName = parent.children('.productInfo').children('.productName').text();
            var productSize = parent.children('.productInfo').children('.productSize').text();
            var productURL = parent.children('.productURL').attr("value");
            var productPrice = parent.children('.price').text().split(' ')[1];
            var singlePrice = parent.children('.singlePrice').attr("value");
                
            var val = singlePrice + "`" + qty + "`" + productURL;
            
            finalPrice -= parseFloat(productPrice);
            
            var newPrice = parseFloat(singlePrice) * qty;
            
            finalPrice += newPrice;
            
            createCookie((productName + "`" + productSize), val);
            
            
            parent.children('.price').text("Php "+ newPrice.toString());
            
            $(".finalPrice").text("Php " + finalPrice.toString());
        }
        
    });
    
    
    function createCookie(name,value,days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            var expires = "; expires="+date.toGMTString();
        }
        else var expires = "";
        document.cookie = name+"="+value+expires+"; path=/";
    }
    
    $(".increaseQty").click(function() {
        var sibling = $(this).siblings('.qtyDisplay');
        var qty = parseInt(sibling.attr("value"));
        
        qty++;
        sibling.prop('value', qty.toString());
        
        var parent = $(this).closest('.cartProduct');
        var productName = parent.children('.productInfo').children('.productName').text();
        var productSize = parent.children('.productInfo').children('.productSize').text();
        var productURL = parent.children('.productURL').attr("value");
        var productPrice = parent.children('.price').text().split(' ')[1];
        var singlePrice = parent.children('.singlePrice').attr("value");
            
        var val = singlePrice + "`" + qty + "`" + productURL;
        
        finalPrice -= parseFloat(productPrice);
        
        var newPrice = parseFloat(singlePrice) * qty;
        
        finalPrice += newPrice;
        
        createCookie((productName + "`" + productSize), val);
        
        
        parent.children('.price').text("Php "+ newPrice.toString());
        
        $(".finalPrice").text("Php " + finalPrice.toString());
        
    });
    
    $(".removeBtn").click(function() {
        var parent = $(this).closest('div');

        
        var productName = parent.children('.productInfo').children('.productName').text();
        var productSize = parent.children('.productInfo').children('.productSize').text();
        console.log(productName);
        console.log(productSize);
        
        createCookie((productName + "`" + productSize),"",-1);
        //$("#bodyContainer").empty();
        
        var lostPrice = parseFloat(parent.children('.price').text().split(' ')[1]);
        finalPrice -= lostPrice;
        
        if(finalPrice > 0)
        {
            $(".finalPrice").text("Php " + finalPrice.toString());
            parent.remove();
        }
        
        else{
            $("#bodyContainer").empty();
            var empty = "<div class='noCart'><h3>SHOPPING CART</h3><p>Your cart is currently empty</p><a href='/products'><input type='submit' value='VIEW PRODUCTS'></a></div>";
            $("#bodyContainer").append(empty);
        }
        

    });
    
    $(".checkout").click(function() {
        ca = document.cookie.split(';');
        $(".cookies").prop('value', ca);
    });
    
    
    

})
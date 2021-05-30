

//mobile menu contacts placement
document.getElementsByClassName("contacts")[0].style.top = window.innerHeight-95 + "px";


//function to hide or show top navbar

window.onscroll = function(){   
    var banner = document.getElementById("fixed_section");
    
        if(window.pageYOffset > 10 && (banner.style.height == "0px" || banner.style.height == 0)){
            
            banner.style.display = "block";
            //animation
            var timeInterval = setInterval(upperNavAnimation,15);
            var pos = 0;

            function upperNavAnimation(){
                if(pos < 15){
                pos = pos + 1;
                banner.style.height = pos +"px";
                
                }
                else{
                    console.log(window.pageYOffset < 10 && banner.style.height == 15);
                    clearInterval(timeInterval);
                }
               
            }
        }
        else if(window.pageYOffset < 10 && banner.style.height == "15px"){
            console.log((banner.style.height + pos) +"px");
            
            var timeInterval = setInterval(upperNavAnimationReverse,15);
            var height = 15;
            function upperNavAnimationReverse(){
                if(height > 0){
                    height = height - 1;
                    banner.style.height =  height + "px";
                }
                else{
                    document.getElementById("fixed_section").style.display = "none";
                    clearInterval(timeInterval);
                }
            }
        }
    };




//animate for mobile menu elements when pressed
function mobNavigationClick(index){
    var target_ele = document.querySelectorAll(".menu_drop")[index];
    var target_ele_i = document.querySelectorAll(".menu_drop i")[index];
    var all_ele = document.querySelectorAll(".menu_drop");
    var all_drp_menu = document.querySelectorAll(".drp_menu");
    var flag = false;
    var active_ele = 0;//!!!!

    for(var i = 2; i < all_ele.length; i++){
        if(all_ele[i].getAttribute("data_active") == "true" && i != index){
            flag = true;
            active_ele = i;
        }
    }
    // add diffrent animation for links
    if(target_ele.getAttribute("data_active") == "true"){
        closeMenuElementAnimate(target_ele_i);
        target_ele.setAttribute("data_active", "false");
        if(index >=2){
            close_menu(all_drp_menu[index-2],"null");
        }
    }   

    else if(flag && target_ele.getAttribute("data_active") == "false"){
        // case was toggled and another element was active
        
        openMenuElementAnimate(target_ele_i);
        if(index < 2){
            close_menu(all_drp_menu[active_ele - 2], "null") //case a menu was active and the clicked doesnt have a menu
            all_ele[active_ele].setAttribute("data_active", "false");
        }

        else if(index >= 2){
            close_menu(all_drp_menu[active_ele - 2], all_drp_menu[index - 2]);
            all_ele[active_ele].setAttribute("data_active", "false");
            closeMenuElementAnimate(document.querySelectorAll(".menu_drop i")[active_ele]);
            target_ele.setAttribute("data_active", "true");
        }
    }

    else if(target_ele.getAttribute("data_active") == "false"){
        // case wasnt toggled
        openMenuElementAnimate(target_ele_i);
        target_ele.setAttribute("data_active", "true");
        if(index >=2){
            drop_menu(all_drp_menu[index-2]);
        }
    }
}




    //animate for mobile menu elements
function mobNavigationHover(index){
    var target_ele = document.querySelectorAll(".menu_drop")[index];
    var target_ele_i = document.querySelectorAll(".menu_drop i")[index];
    
    if(target_ele.getAttribute("data_active") == "false"){

        if(target_ele.getAttribute("data_hover") == "true"){
            closeMenuElementAnimate(target_ele_i);
            target_ele.setAttribute("data_hover", "false");
        }

        else if(target_ele.getAttribute("data_hover") == "false"){
            // case wasnt toggled
              
              console.log("hey");
              openMenuElementAnimate(target_ele_i);
              target_ele.setAttribute("data_hover", "true");
        }
    }
}

function openMenuElementAnimate(target){
    var marginprogress = 3;
    var rotatedeg = 0;
    var marginInterval = setInterval(marginAnimate,28);
    var rotateInterval = setInterval(rotateAnimate,19);
    function marginAnimate(){
        if(marginprogress < 10){
            marginprogress = marginprogress + 1;
            target.style.marginRight = marginprogress + "px";
        }
        else{
            clearInterval(marginInterval);
        }
    }
    function rotateAnimate(){
        if(rotatedeg < 90){
            rotatedeg = rotatedeg + 10;
            target.style.transform = "rotate("+rotatedeg+"deg)";
            target.style.webkitTransform = "rotate("+rotatedeg+"deg)";
            target.style.mozTransform = "rotate("+rotatedeg+"deg)";
        }
        else{
            clearInterval(rotateInterval);
        }
    }
}


function closeMenuElementAnimate(target){
    var marginprogress = 10;
    var rotatedeg = 90;
    var marginInterval = setInterval(marginAnimate,28);
    var rotateInterval = setInterval(rotateAnimate,13);
    function marginAnimate(){
        if(marginprogress > 3){
            marginprogress = marginprogress - 1;
            target.style.marginRight = marginprogress + "px";
        }
        else{
            clearInterval(marginInterval);
        }
    }
    function rotateAnimate(){
        if(rotatedeg > 0){
            rotatedeg = rotatedeg - 10;
            target.style.transform = "rotate("+rotatedeg+"deg)";
            target.style.webkitTransform = "rotate("+rotatedeg+"deg)";
            target.style.mozTransform = "rotate("+rotatedeg+"deg)";
        }
        else{
            clearInterval(rotateInterval);
        }
    }
}

function drop_menu(target){
    var accel = 0;
    target.style.display = "block";
    var intialHeight = 0;
    var finalHeight = target.scrollHeight;
    
    target.style.height = "0px";

    var heightInterval = setInterval(dropAnimate, 35);
    function dropAnimate(){
        if(intialHeight < finalHeight - accel){
            accel = accel + 1.5;
            intialHeight = intialHeight + (10 + accel);
            target.style.height = intialHeight + "px";
            
        }
        else{
            clearInterval(heightInterval);
            
        }
    }
}

function close_menu(close, open){
    var accel = 0;
    var tempHeight = close.scrollHeight;
    var intialHeight = close.scrollHeight;
    var finalHeight = 0;

    var heightInterval = setInterval(closeAnimate, 35);
    function closeAnimate(){
        if(intialHeight > finalHeight){
            accel = accel + 1.5;
            intialHeight = intialHeight - (10 + accel);
            close.style.height = intialHeight + "px";
        }
        else{
            close.style.display = "none";
            close.style.height = tempHeight +"px";
            console.log(tempHeight);
            if(open != "null"){ //for openning a menu while another menu is active
                drop_menu(open);
            }
            clearInterval(heightInterval);
        }
    }
}


//menu slide animation
var menuButton = document.getElementById("mobile_menu_button");
menuButton.setAttribute("data_toggled","false");

menuButton.onclick = menuMainFunc;
document.getElementsByClassName("menu_background")[0].onclick = menuMainFunc;

function menuMainFunc(){
    var container = document.getElementsByClassName("Main_page_container")[0];
    var mobileMenu = document.getElementsByClassName("mobile_menu")[0];

    if(menuButton.getAttribute("data_toggled") == "false"){
        console.log("hey");
        slideOpenAnimate(container,mobileMenu);
    }
    else if(menuButton.getAttribute("data_toggled") == "true"){
        slideCloseAnimate(container,mobileMenu);
    }
}

function slideOpenAnimate(container, mobileMenu){
    var position = 0;
    var degree = 0;
    var opacity = 0;
    var background = document.getElementsByClassName("menu_background")[0];
    background.style.display = "block";
    mobileMenu.style.display = "block";
    var slideInterval = setInterval(openAnimate,7);

    function openAnimate(){
        if(position < 250){
            position = position + 5;
            degree = degree + 4;
            container.style.marginLeft = position + "px";
            mobileMenu.style.left = (position-250) + "px";
            menuButton.style.left = (position-22) + "px";
            if(opacity < 0.3){
                opacity = opacity + 0.006;
                background.style.opacity = opacity;
            }
            if(degree < 180){
                 menuButton.style.transform = "rotateX("+degree+"deg) rotateY("+degree+"deg)rotateZ(45deg)"
            }
           
        }
        else{
            menuButton.setAttribute("data_toggled","true");
            clearInterval(slideInterval);
        }
    }
}

function slideCloseAnimate(container, mobileMenu){
    var position = 250;
    var degree = 180;
    var opacity = 0.3;
    var background = document.getElementsByClassName("menu_background")[0];

    var slideInterval = setInterval(closeAnimate,7);

    function closeAnimate(){
        if(position > 0){
            position = position - 5;
            degree = degree - 4;
            
            container.style.marginLeft = position + "px";
            mobileMenu.style.left = (position-250) + "px";
            menuButton.style.left = (position-22) + "px";
            if(opacity > 0){
                opacity = opacity - 0.006;
                background.style.opacity = opacity;
            }
            if(degree < 180){
            menuButton.style.transform = "rotateX("+degree+"deg) rotateY("+degree+"deg)rotateZ(45deg)"
            }
        }
        else{
            background.style.display = "none";
            mobileMenu.style.display = "none";
            menuButton.setAttribute("data_toggled","false");
            clearInterval(slideInterval);
        }
    }
}

//image slider
var gallery = document.getElementsByClassName("gallery")[0];
var imagepath = document.getElementsByClassName("slider_path");
var bulit = document.getElementsByClassName("bulet");
var slider_index = 1;
console.log(imagepath[slider_index].innerHTML);
imageslider();
function imageslider(){
    bulit[slider_index].style.backgroundColor = "transparent";
    slider_index = slider_index + 1;
    if(slider_index >= imagepath.length){slider_index = 0;}
    gallery.style.backgroundImage = "url("+imagepath[slider_index].innerHTML+")";
    bulit[slider_index].style.backgroundColor = "#5a0592";
    console.log(imagepath[slider_index].innerHTML);
    setTimeout(imageslider,5000);
}

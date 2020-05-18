//unit 
let box = 35;
let score = 0;
let width_grid = 13 ;
let off = 0;
let time_interval_calling_function = 100;// in ms

var canvas = document.createElement('canvas');

canvas.id = "snake";
canvas.width = width_grid * box;
canvas.height = width_grid * box;

let food_pos = {
    x: 4 * box ,
    y:4 * box
}

let snake = [];
snake[0] = {
    x : box + off,
    y : box
}

let d = "right" ;
let dir_set = false;
let count = 0;
let speed = (box * 1000)/time_interval_calling_function;
var calling_btn;
const food = new Image();
food.src = "img/food.jpg" ; 

let food_audio = new Audio();
let hitting_wall = new Audio();
let crawling = new Audio();
let game_over = new Audio();
let click_sound = new Audio();

let background = document.getElementsByClassName("background")[0];
let score_card = document.getElementById("score");
let score_box = document.getElementById("score_box");
let speed_card = document.getElementById("speed");
let speed_box = document.getElementById("speed_box");
let game_over_card = document.getElementById("game_over");
let fin_score = document.getElementById("game_over_score");
let main_page = document.getElementsByClassName("home_page");
let main_page_list = document.getElementsByClassName("list_options");
let main_page_game_btn = document.getElementsByClassName("options--1");
let main_page_demo_btn = document.getElementsByClassName("options--2")[0];
let back_btn = document.getElementsByClassName("btn_back")[0];
let reset_btn = document.getElementsByClassName("btn_reset")[0];
let count_box = document.getElementById("count");
let submit_level = document.getElementById("submit_level");
let div_choose_level = document.getElementsByClassName("choose_level")[0];

var key;//level
let no_of_blocks = (width_grid * width_grid)/10;
let sites_of_blocks = new Array(width_grid);
for(let x = 0 ; x < width_grid; x ++)
{
    sites_of_blocks[x] = new Array(width_grid);
    for(let y = 0; y < width_grid ; y ++)
    {
        sites_of_blocks[x][y] = 0;
    }
}
score_box.insertAdjacentElement('afterend',canvas);

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

let game = setInterval(draw,time_interval_calling_function);

const style_reset_btn = {
    visibility : "visible",
    opacity : "1",
    top : "50%",
    transform: "translate(-50%,0%)"
}
const style_reset_btn_st = {
    visibility : "hidden",
    opacity : "0",
    top : "90%"
}

const canvas_game_over = {
    filter : "blur(3px) brightness(50%)"
}

const style_game_over = {
    top: "40%",
    visibility: "visible",
    opacity : "1",
    transform: "translate(-50%,-50%)"
}
const style_game_over_st = {
    top: "0%",
    visibility: "hidden",
    opacity : "0"
}

const style_turning_page = {
    transform: "translate(-50%,-50%) rotateY(-180deg)",
    opacity: "0"
}

const reset_turning = {
    transform: "translate(-50%,-50%) rotateY(0deg)",
    opacity: "1"
}
clearInterval(game);

food_audio.src = "audio/eating_food.wav";
hitting_wall.src = "audio/hitting_wall.wav";
game_over.src = "audio/game_over.wav";
crawling.src = "audio/crawling.wav";
click_sound.src = "audio/click.wav";

back_btn.addEventListener("click",reload);
main_page_game_btn[0].addEventListener("click",init);
main_page_demo_btn.addEventListener("click",init);
reset_btn.addEventListener("click",init);
window.addEventListener("orientationchange",reload);


clicked();
function init(event) {
    console.log(event.currentTarget);
    if(event.currentTarget != reset_btn)
        calling_btn = event.currentTarget;
    background.style.filter = "none";
    Object.assign(main_page[0].style,style_turning_page);
    Object.assign(reset_btn.style,style_reset_btn_st);
    Object.assign(game_over_card.style,style_game_over_st);
    //sites_of_blocks initialiasation
    for(let x = 0 ; x < width_grid; x ++)
    {
        for(let y = 0; y < width_grid ; y ++)
        {
            sites_of_blocks[x][y] = 0;
        }
    }
    //selecting blocks randomly
    random_blocks();

    draw_canvas();
    let x = Math.floor(Math.random() * (width_grid - 3) + 2);
    let y = Math.floor(Math.random() * (width_grid - 3) + 2);
    console.log(x,y);
    while(sites_of_blocks[x][y] == 1)
    {
        x = Math.floor(Math.random() * (width_grid - 3) + 2);
        y = Math.floor(Math.random() * (width_grid - 3) + 2);
    } 
    food_pos.x = x * box;
    food_pos.y = y * box;
    div_choose_level.style.display = "block";
    submit_level.addEventListener("click",start);
    window.removeEventListener("keydown",control);
}

function media() {
    
}
function start() {

    let form = document.getElementById("list_levels");
    for(i = 0; i < form.length ; i ++)
    {
        if(form.elements[i].checked == true)
            key = form.elements[i].value ;
    }
    console.log(key);
    switch (key) {
        case "Easy": time_interval_calling_function = 250;
                        break;
        case "Medium": time_interval_calling_function = 100;
                        break;
        case "Hard": time_interval_calling_function = 50;
                        break;
        default:
            break;
    }
    speed = (box * 1000)/time_interval_calling_function;
    speed.toPrecision(2);
    div_choose_level.style.display = "none";
    count = 0;
    count_i = setInterval(counting,1000);
    setTimeout(auxilary,5000);
}

function clicked() {

    let buttons = document.getElementsByTagName("button");

    for(i = 0; i < buttons.length; i ++){
        buttons[i].addEventListener("mousedown",f=>{
            click_sound.play();
        })
    }
}

function auxilary() {
    score_box.style.transform = "translate(0%,-100%)";
    speed_box.style.transform = "translate(0%,-100%)";
    back_btn.style.transform = "translate(-50%,-100%)";
    background.style.filter = "blur(3px) brightness(70%)";
    d = "right";
    let ori_len = snake.length;
    for(i = 1 ;i < ori_len; i ++)
        snake.pop();
    snake[0].x = 0;
    snake[0].y = 0 ;
    cvs.style.filter = "none";
    score = 0;
    score_card.innerHTML = score;
    speed_card.innerHTML = speed.toString() + " px/s";
    game = setInterval(draw,time_interval_calling_function);
}

function counting() {
    count ++;
    if(count <= 3)
        count_box.innerHTML = count;
    else if(count == 4)
    {
        count_box.innerHTML = "Go";
    }    
    else{
        count_box.innerHTML = "";
        clearInterval(count_i);
    }
}

//control the snake
function control(event)
{
    if((event.keyCode == 37) && (d != "right"))
    {
        d = "left";
    }
    else if((event.keyCode == 38)&& (d != "down"))
    {
        d = "up" ;
    }
    else if((event.keyCode == 39)&& (d != "left"))
    {
        d = "right" ;
    }
    else if((event.keyCode == 40)&& (d != "up"))
    {
        d = "down" ;
    }
    window.removeEventListener("keydown",control);
}

function random_blocks(){
    let mid = Math.floor(width_grid/2),m_mid = Math.floor(mid/2);
    console.log(mid);
    // for(let x = 0; x <=mid; x+=2)
    // {
    //     sites_of_blocks[mid - x][2*x] = sites_of_blocks[mid + x][2*x] = 1;
    // }
    // if(key == "Hard")
    // {
    //     sites_of_blocks[mid][3 * Math.floor(width_grid/4)] = 1;
    //     sites_of_blocks[mid][0] = 0;
    // }    
    sites_of_blocks[mid - m_mid][mid - m_mid] = sites_of_blocks[[mid - m_mid]][mid + m_mid] = sites_of_blocks[mid + m_mid][mid - m_mid] = sites_of_blocks[[mid + m_mid]][mid + m_mid] = sites_of_blocks[mid][mid] = 1; 
}

function draw_canvas() {
    //grid
    for(let x = 0; x < width_grid  ; x ++)
    {
        for(let y = 0; y < width_grid ; y ++)
        {
            if(sites_of_blocks[x][y] == 1)
            {
                ctx.fillStyle = "rgb(255,0,255)";
            }
            else if(x % 2)
            {
                if(y % 2 )
                    ctx.fillStyle = "#00FF00";
                else
                    ctx.fillStyle = "#1b572b";
            }
            else
            {
                if(y % 2 )
                    ctx.fillStyle = "#1b572b";
                else
                    ctx.fillStyle = "#00FF00";
            }        
            ctx.fillRect(x * box + off,y * box,box,box);
        }
    }
}

function draw(){
    //grid
    draw_canvas();
    ctx.drawImage(food,food_pos.x,food_pos.y,box,box);
    //snake
    for(i = 0 ; i < snake.length; i++){
        ctx.fillStyle = ( i == 0) ? "red":"black" ;
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "white";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    if(calling_btn != main_page_demo_btn)
    {
        window.addEventListener("keydown",control) ;
    }
    else
    {
        req_dir();
    }

    let new_head = make_new_head();

    if(check_game_over(new_head) == true)
    {
        f_game_over();
        clearInterval(game);
    }
    //directions
    snake.unshift(new_head);
    crawling.play();

    if((snake[0].x == food_pos.x) && (snake[0].y == food_pos.y))
    {
        score ++;
        score_card.innerHTML = score;
        food_pos.x = (Math.floor(Math.random() * (width_grid - 2)) + 1 )* box ;
        food_pos.y = (Math.floor(Math.random() * (width_grid - 2)) + 1 )* box ;
        while(((food_pos.x == new_head.x) && (food_pos.y == new_head.y))||(sites_of_blocks[food_pos.x/box][food_pos.y/box] == 1))
        {
            food_pos.x = (Math.floor(Math.random() * (width_grid - 2)) + 1 )* box ;
            food_pos.y = (Math.floor(Math.random() * (width_grid - 2)) + 1 )* box ;       
        }
        food_audio.play();
    }
    else
    {
        snake.pop();
    }
}
function make_new_head() {
    let new_x = snake[0].x;
    let new_y = snake[0].y;
    if(d == "left") {new_x -= box;} ;
    if(d == "right") {new_x += box} ;
    if(d == "up") {new_y -= box} ;
    if(d == "down") {new_y += box} ;

    let new_head = {
        x : new_x ,
        y : new_y 
    }
    return new_head;
}

function check_game_over(head) {
    //game over or pause
    if((head.x < off) || (head.x >= (width_grid * box)))
    {
        return true;
    }    
    
    if((head.y < 0) || (head.y >= width_grid * box))
    {
        return true;
    }    
    if(sites_of_blocks[head.x/box][head.y/box] == 1)
        return true;
    for(i = 1; i < snake.length - 1;i ++ )
    {
        if((head.x == snake[i].x) && (head.y == snake[i].y))
        {
            return true;
        }    
    }
    return false;
}

function req_dir() {
    let changed = false;
    let old_d = d;
    if(snake[0].x != food_pos.x)
    {
        if(snake[0].x < food_pos.x)
        {
            if(old_d != "left")
            {
                d = "right";
            }    
            if(d == "right")
                changed = true;
        }    
        else
        {
            if(old_d != "right")
            {
                d = "left";
            }   
            if(d == "left")
                changed = true;
        }   
    }
    //console.log(snake[0],food_pos,d,changed);
    let prob_head = make_new_head();
    if(changed == true)
        changed = !check_game_over(prob_head) ;
    if(changed == false)
    {
        if(snake[0].y != food_pos.y)
        {
            if(snake[0].y < food_pos.y)
            {
                if(old_d != "up")
                {
                     d = "down";
                }   
                if(d == "down")
                    changed = true;
            }   
            else
            {
                if(old_d != "down")
                {
                    d = "up";
                }     
                if(d == "up")
                    changed = true;
            }
        }
    }
    prob_head = make_new_head();
    if(changed == true)
        changed = !check_game_over(prob_head) ;
    if(changed == false)
    {
        if((old_d == "right") || (old_d == "left"))
        {
            d = "down" ;
            prob_head = make_new_head();
            if(check_game_over(prob_head) == true)
                d = "up";
        }
        else
        {
            d = "right";
            prob_head = make_new_head();
            if(check_game_over(prob_head) == true)
                d = "left";
        }
        prob_head = make_new_head();
        if(check_game_over(prob_head) == true)   
            d = old_d ; 
    }
}

function f_game_over() {
    console.log(snake[0].x,snake[0].y);
    Object.assign(game_over_card.style,style_game_over);
    back_btn.style.transform = "translate(-50%,0%)";
    game_over.play();
    fin_score.innerHTML = score;
    score_box.style.transform = "translate(0%,0%)"
    speed_box.style.transform = "translate(0%,0%)"
    Object.assign(reset_btn.style,style_reset_btn);
    //reset_btn.style.transform = "translate(-50%,-50%)";
    Object.assign(cvs.style,canvas_game_over);
    clearInterval(game);
}

function reload() {
    if(div_choose_level.style.display == "block")
        fin_score.innerHTML = 0; 
    if(game_over_card.style.visibility != "visible")
    {
        f_game_over();
    }   
    else
        Object.assign(main_page[0].style,reset_turning);
    div_choose_level.style.display = "none";
    setTimeout(function(){
        Object.assign(main_page[0].style,reset_turning);
    },1500);
}


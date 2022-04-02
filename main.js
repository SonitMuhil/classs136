objects = [];
status = "";
video = "";

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
}

function draw(){
    image(video, 0, 0, 420, 420);
    if(status != "")
    {
        objectDetector.detect(video, gotResult);
        for(1 = 0; 1 < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detcted";
            document.getElementById("number_of_objects").innerHTML = "Number of detected object(s) are : "+objects.lenght;
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y +15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}


function gotResult(error, results){
    if (error) {
    console.log(error);
    }
    console.log(results);
    objects = results;
}

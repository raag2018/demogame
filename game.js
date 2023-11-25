const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const particle = {
    position : {x: 0, y: 0},
    velocity: {x: 1, y: 1},
    color: "#fa08066",
    size: 5
}
const circleShape = canvas => particle => {
    const context = canvas.getContext("2d");
    return {
        run: () => {
            context.fillStyle = particle.color;
            context.beginPath();
            context.arc(particle.position.x, particle.position.y, particle.size, 0,2 * Math.PI, false);
            context.fill();
        }
    }
}

const cleanup = (canvas) => {
    canvas.getContext('2d').clearRect(0,0,canvas.width, canvas.height);
}
const randomNum = (num) => Math.round(Math.random() * num);
const randomParticle = () => {
    return {
        position: {x: randomNum(500), y: randomNum(500)},
        velocity: {x: randomNum(10) - 5, y: randomNum(10) - 5},
        color: `rgba(${randomNum(255)},${randomNum(255)},${randomNum(255)},${Math.random()})`,
        size: randomNum(10)
    }
}
const particleList = [];

const moveParticle = (particle) => {
    particle.position.x = particle.position.x + particle.velocity.x;
    particle.position.y = particle.position.y + particle.velocity.y;
    return particle;
}
const changeParticleSize = particle => {
    particle.size = particle.size === 50 ? 50:particle.size+0.5;
    return particle;
}
const addGravity = (particle) => {
    particle.velocity.y = particle.velocity.y+1;
    return particle;
}
const addRebound = canvas => particle => {
    if(particle.position.y > canvas.height || particle.position.y < 0){
        particle.velocity.y = particle.velocity.x * -0.9;
    }
    if(particle.position.x > canvas.width || particle.position.x < 0){
        particle.velocity.x = particle.velocity.x * -0.9;
    }
    return particle;
}
const compose = (...fn) => x => fn.reduceRight((acc, cur) => cur(acc), x);
const processParticles = compose(
    circleShape(canvas),
    //addRebound(canvas),
    //addGravity,
    changeParticleSize, 
    moveParticle)
const loop = (idx, canvas, particleList) => {
    requestAnimationFrame(() => {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;
        particleList.push(randomParticle());
        particleList.forEach(
            //changeParticleSize(moveParticle(particle))
            //compose(changeParticleSize, moveParticle)(particle))
            //circleShape(canvas, )
            (particle) => {
                processParticles(particle).run();
            }
        )
        idx && loop(--idx, canvas, particleList);
    })
}
loop(1000, canvas, particleList);


/*
const circulo = (idc) => {
    ctx.fillStyle = "rgb(44,234,209)";
    ctx.arc(100 - idc,200,50,0,2*Math.PI,false);
    ctx.fill();
}
const loop = () => {
    console.log('👌');
    circulo();
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
*/
/*
const loop = (idx) => {
    requestAnimationFrame(
        () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            circulo(idx);
            idx--;
            idx && loop(idx);
        }
    )
}
loop(100);
*/
/*
//rectangulo rojo
ctx.strokeStyle = "#ff0000";
ctx.beginPath();
ctx.moveTo(50,140);
ctx.lineTo(150,60);
ctx.lineTo(250,140);
ctx.closePath();
ctx.stroke();
//rectangulo verde
ctx.strokeStyle = "#80ff00";
ctx.beginPath();
ctx.moveTo(150,40);
ctx.lineTo(10,60);
ctx.lineTo(25,140);
ctx.closePath();
ctx.stroke();
//crear un arco
ctx.fillStyle = "rgba(160,182,217,0.66)";
ctx.beginPath();
ctx.arc(100,200,50,0, 2 * Math.PI , true);
ctx.closePath();
ctx.stroke();
ctx.fill();
*/
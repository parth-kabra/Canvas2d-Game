/*
                                                     __  __                        _                     
                                                    |  \/  |   ___   _ __   _ __  (_)   __ _   _ __ ___  
                                                    | |\/| |  / _ \ | '__| | '__| | |  / _` | | '_ ` _ \ 
                                                    | |  | | |  __/ | |    | |    | | | (_| | | | | | | |
                                                    |_|  |_|  \___| |_|    |_|    |_|  \__,_| |_| |_| |_|
                                                    __        __         _             _                 
                                                    \ \      / /   ___  | |__    ___  | |_    ___   _ __ 
                                                     \ \ /\ / /   / _ \ | '_ \  / __| | __|  / _ \ | '__|
                                                      \ V  V /   |  __/ | |_) | \__ \ | |_  |  __/ | |   
                                                       \_/\_/     \___| |_.__/  |___/  \__|  \___| |_|   
*/

const canvas=document.querySelector('canvas')
canvas.width=innerWidth
canvas.height=innerHeight
const c=canvas.getContext('2d')
class Enemy{
	constructor(x,y,radius,color,velocity){
		this.x=x;
		this.y=y;
		this.radius=radius
		this.color=color
		this.velocity=velocity
	}
	draw(){
		c.beginPath()
		c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false)
		c.fillStyle=this.color
		c.fill()
	}
	update(){
		this.draw()
		this.x=this.x+this.velocity.x
		this.y=this.y+this.velocity.y
	}
}
const x=canvas.width/2
const y=canvas.height/2

let enemies=[]
function spawnEnemies(){
	setInterval(()=>{
		const radius=Math.random() * (30-4)+4
		let x;
		let y;
		if(Math.random() < 0.5){
			x=Math.random() < 0.5 ? 0-radius : canvas.width + radius
			y=Math.random() * canvas.height
			//y=Math.random() < 0.5 ? 0-radius : canvas.height + radius
		}else{
			x=Math.random() * canvas.width
			//y=Math.random() * canvas.height
			y=Math.random() < 0.5 ? 0-radius : canvas.height + radius

		}
		const color=`hsl(${Math.random() * 360},50%,50%`
		const angle=Math.atan2(canvas.height,canvas.width)
		const velocity={
			x:Math.cos(angle),
			y:Math.sin(angle)
		}
		enemies.push(new Enemy(x,y,radius,color,velocity))
	},100)
}
let animationId;
let score=0;
function animate(){
	animationId=requestAnimationFrame(animate)
	c.fillStyle='rgba(0,0,0,0.1)'
	c.fillRect(0,0,canvas.width,canvas.height)
	enemies.forEach((enemy,index)=>{
		enemy.update()
	})
}
addEventListener('click',(event)=>{
	const angle=Math.atan2(event.clientY-canvas.height/2,event.clientX-canvas.width/2)
	const velocity={
		x:Math.cos(angle)*5,
		y:Math.sin(angle) *5
	}
})
animate()
spawnEnemies()

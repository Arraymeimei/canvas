function shape(canvas,copy,cobj){
	if(canvas===undefined||cobj===undefined){
        console.error("参数传入有误");
        return false;
    }
			this.canvas=canvas;
			this.copy=copy;
			this.cobj=cobj;
			this.style="fill";
			this.type="line";
			this.strokeStyle="palevioletred";
			this.fillStyle="palevioletred";
			this.lineWidth=1;
			this.history=[];
			this.bianNum=5;
			this.jiaoNum=5;
			this.xpw=10;
    		this.xph=10;
    		this.firstBack=true;
		}
		
		shape.prototype={
			
			init:function(){
				this.cobj.strokeStyle=this.strokeStyle;
				this.cobj.fillStyle=this.fillStyle;
				this.cobj.lineWidth=this.lineWidth;
			},
			draw:function(){
				var that=this;
				that.copy.onmousedown=function(e){
//					this firstBack=true;
					that.init();
					var startx=e.offsetX;
					var starty=e.offsetY;
					that.copy.onmousemove=function(e){
					var endx=e.offsetX;
					var endy=e.offsetY;
					that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height);
//						
			if(that.history.length>0){
				that.cobj.putImageData(that.history[that.history.length-1],0,0);
			}

			that[that.type](startx,starty,endx,endy);
		}
		
		that.copy.onmouseup=function(){
			that.history.push(that.cobj.getImageData(0,0.,that.canvas.width,that.canvas.height));
			that.copy.onmousemove=null;
			that.copy.onmouseup=null;
				}
			}
		},
			line:function(x1,y1,x2,y2){
				this.cobj.beginPath();
				this.cobj.moveTo(x1,y1);
				this.cobj.lineTo(x2,y2);//画直线
				this.cobj.stroke();
			},
			rect:function(x1,y1,x2,y2){
				this.cobj.beginPath();
				this.cobj.rect(x1,y1,x2-x1,y2-y1);//正方形
				this.cobj[this.style]();
			},
			arc:function(x1,y1,x2,y2){
				this.cobj.beginPath();
				var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
				this.cobj.arc(x1,y1,r,0,2*Math.PI);
				this.cobj[this.style]();
			},
			bian:function(x1,y1,x2,y2){
				var angle=360/this.bianNum*Math.PI/180;//每一个角度所占的弧度
				var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
				this.cobj.beginPath();
				for(var i=0;i<this.bianNum;i++){
        this.cobj.lineTo(Math.cos(angle*i)*r+x1,Math.sin(angle*i)*r+y1);
        }
				this.cobj.closePath();
				this.cobj[this.style]();
				
			},
			jiao:function(x1,y1,x2,y2){
				var angle=360/(this.jiaoNum*2)*Math.PI/180;
				var r=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
				var r1=r/3;
				this.cobj.beginPath();
				for(var i=0;i<this.jiaoNum*2;i++){
					if(i%2==0){
						this.cobj.lineTo(Math.cos(angle*i)*r+x1,Math.sin(angle*i)*r+y1);
					}else{
						this.cobj.lineTo(Math.cos(angle*i)*r1+x1,Math.sin(angle*i)*r1+y1);
					}
				}
				this.cobj.closePath();
				this.cobj[this.style]();
			},
     pen:function(){
            var that=this;
            that.copy.onmousedown=function(e){
                var startx=e.offsetX;
                var starty=e.offsetY;
                that.cobj.beginPath();
                that.cobj.moveTo(startx,starty);
                that.copy.onmousemove=function(e){
                    var endx=e.offsetX;
                    var endy=e.offsetY;
                    that.cobj.lineTo(endx,endy);
                    that.cobj.stroke();
                }

                that.copy.onmouseup=function(){
                    that.historyArr.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height));
                    that.copy.onmousemove=null;
                    that.copy.onmouseup=null;
                }
            }
    },
    xp:function(ele){

            var that=this;
            that.copy.onmousemove=function(e){
                var ox=e.offsetX;
                var oy=e.offsetY;
                var x=ox-that.xpw/2;
                var y=oy-that.xph/2;

                if(x<0){
                    x=0;
                }
                if(x>$(that.copy).width()-that.xpw){
                    x=$(that.copy).width()-that.xpw
                }

                if(y<0){
                    y=0;
                }
                if(y>$(that.copy).height()-that.xph){
                    y=$(that.copy).height()-that.xph
                }


                ele.css("display","block").css("left",x).css("top",y).css({
                    width:that.xpw,
                    height:that.xph,
                });

            }
            that.copy.onmousedown=function(){

                that.copy.onmousemove=function(e){
                    var ox=e.offsetX;
                    var oy=e.offsetY;
                    var x=ox-that.xpw/2;
                    var y=oy-that.xph/2;

                    if(x<0){
                        x=0;
                    }
                    if(x>$(that.copy).width()-that.xpw){
                        x=$(that.copy).width()-that.xpw
                    }

                    if(y<0){
                        y=0;
                    }
                    if(y>$(that.copy).height()-that.xph){
                        y=$(that.copy).height()-that.xph
                    }

                    ele.css("left",x).css("top",y);

                    that.cobj.clearRect(x,y,that.xpw,that.xph);
                }
                that.copy.onmouseup=function(){

                  that.history.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height))

                    that.copy.onmousemove=null;
                    that.copy.onmouseup=null;
                    that.xp(ele);
                }
            }
        }

	}
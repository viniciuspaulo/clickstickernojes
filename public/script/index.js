var divCanvas = document.getElementById('canvas');
var canvas =  divCanvas.getContext('2d');
var img = new Image();
var positionX=0, positionY=0;
var socket = io.connect('http://172.20.21.47:3000');
var cor = "#000000";
var opc =0,chavePaleta = 0, chaveOpcMenu = 0, chaveFormasPaint=0;
var lapis = 0, lapisX =0, lapisY =0;


//Menu
$("#menuOpc").click(function(){
	if(chaveOpcMenu == 0){
		$("#btnOpc").css("display","block");
		$("#btnOpc").removeClass("animated bounceOutRight").addClass("animated bounceInRight");
		chaveOpcMenu = 1;
	}else if(chaveOpcMenu == 1){
		$("#btnOpc").removeClass("animated bounceInRight").addClass("animated bounceOutRight");
		chaveOpcMenu = 0;
	}
});

//Formas
$("#btnFormas").click(function(){
	if(chaveFormasPaint == 0){
		$("#formasPaint").css("display","block");
		$("#formasPaint").removeClass("animated bounceOutRight").addClass("animated bounceInRight");
		chaveFormasPaint =1;
	}else if(chaveFormasPaint == 1){
		$("#formasPaint").removeClass("animated bounceInRight").addClass("animated bounceOutRight");
		chaveFormasPaint = 0;
	}
});

$("#limparTela").click(function(){
	location.reload();
});

//Botoes
$("#circulo").click(function(){
	opc =1;
});
$("#preenche").click(function(){
	opc =2;
});
$("#lapis").click(function(){
	opc =3;
});
$("#btnCores").click(function(){
	if(chavePaleta == 0){
	$("#paletaCores").css("display","block");
	$("#paletaCores").removeClass("animated bounceOutRight").addClass("animated bounceInRight");
	chavePaleta =1;
	}else if(chavePaleta == 1){
	$("#paletaCores").removeClass("animated bounceInRight").addClass("animated bounceOutRight");
	chavePaleta =0;
	}
});

$("#carregarImg").click(function(e){
	urlImg = $("#urlImg").val();
	socket.emit("posicionar",e.pageX, e.pageY,cor,circulo,urlImg,false);
});
$("#canvas").click(function(e){
	if(lapis == 0){
		lapis = 1;
	}else if(lapis == 1){
		lapis = 0;
	}
});

$("#canvas").mousemove(function(e){
	if((opc == 3) && (lapis == 1)){
		socket.emit("posicionar",e.pageX, e.pageY,cor,opc,urlImg,true);
	}
});

socket.on("posicionar",function(x,y,cor,opc,imagem,desenhar){
	$("#canvas").css('background-image','url('+imagem+')');
	if(desenhar == true){
		if(opc == 1 ){
			canvas.beginPath();
			canvas.arc((x+50),(y+50),10,0,2*Math.PI);
			canvas.strokeStyle = cor;
			canvas.stroke();
		}else if( opc == 2){
			canvas.beginPath();
			canvas.arc((x+50),(y+50),10,0,2*Math.PI);
			canvas.fillStyle = cor;
			canvas.fill();
		}else if(opc == 3){
			//canvas.beginPath();
			lapisX = (x+50);
			lapisY = (y+50);
			canvas.lineTo((x+50),(y+50));
			canvas.strokeStyle = cor;
			canvas.stroke();
		}else if(opc == 0){
			canvas.arc((x+50),(y+50),1,0,2*Math.PI);
			canvas.strokeStyle = cor;
			canvas.stroke();
		}
	}
});

$("#canvas").click(function(e){
	socket.emit("posicionar",e.pageX, e.pageY,cor,opc,urlImg,true);
});
//cenario();


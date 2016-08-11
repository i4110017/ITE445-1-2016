var game = {
	create: function() {
		var row1 = document.getElementById("row1");
		var columns = "";
		for(var i = 1 ;i<= 12 ; i ++) {
			columns += "<div class='col-md-1'> ";
			columns += "<span class='box'>";
			columns += Math.floor(Math.random() * 50);
			columns += "</span>";
			columns += "</div> ";
		}
		row1.innerHTML = columns;
		var rows = document.getElementsByClassName("box");
		for(var i = 0 ;i < rows.length ; i++) {
			rows[i].addEventListener("click", this.update);	
		}
		

	},
	update: function(e) {
		var selectedValue = e.target.textContent;
		alert(selectedValue);
	}
};

window.onload = function () {
	game.create();
}








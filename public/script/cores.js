function drawColorPalette(stageID, callback) {
    var listColor = ["00", "33", "66", "99", "CC", "FF"];
    var table = document.createElement("table");
    table.border = 1;
    table.cellPadding = 0;
    table.cellSpacing = 0;
    table.style.borderColor = "#666666";
    table.style.borderCollapse = "collapse";
    var tr, td;
    var color = "";
    var tbody = document.createElement("tbody");
    for (var i = 0; i < listColor.length; i++){
        tr = document.createElement("tr");
        for (var x = 0; x < listColor.length; x++) {
            for (var y = 0; y < listColor.length; y++) {
                color = "#"+listColor[i]+listColor[x]+listColor[y];
                td = document.createElement("td");
                td.style.width = "11px";
                td.style.height = "11px";
                td.style.background = color;
                td.color = color;
              //  td.style.display = "none";
                td.style.borderColor = "#000";
                td.style.cursor = "pointer";
               
                if (typeof(callback) == "function") {
                    td.onclick = function() {
                        callback.apply(this, [this.color]);
                    }
                }
                tr.appendChild(td); 
            }
        }
        tbody.appendChild(tr);
    }  
    table.appendChild(tbody);
    var element = document.getElementById(stageID);
    if (element) element.appendChild(table);
    return table;
}
 
window.onload = function() {
    drawColorPalette("mydiv", function(color) {
        document.getElementById("textcolor").innerHTML = color;
        cor = color;
    }); 
}
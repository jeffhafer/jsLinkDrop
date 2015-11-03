function jsLinkDrop(elem, dropAction){
	document.getElementById(elem).addEventListener('dragover', dragOver, false);
	document.getElementById(elem).addEventListener('drop', drop, false);
	var da = dropAction

	function dragOver(event){
		event.stopPropagation();
		event.preventDefault();
		event.dataTransfer.dropEffect = 'link'; // Explicitly show this is a link
	}
	function drop(event, dropAction){
		event.stopPropagation();
		event.preventDefault();

		var files = event.dataTransfer.files;
		var targetID = event.target.id;
		if (files.length > 0){
			for (var i = 0, f; f = files[i]; i++) {
				var reader = new FileReader();
				reader.onload = (function(theFile) {
					return function(e) {
						var contents = e.target.result.split(/\r/);
						if (contents[0] == "[InternetShortcut]"){
							var url = contents[1].replace("URL=","");
							da(url, targetID)
						}
					};
				})(f);
				reader.readAsText(f);
			}
		} else {
			var url = event.dataTransfer.getData("URL");
			da(url, targetID)
		}
	}
}

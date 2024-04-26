/**
 * Show Drag & Drop multiple files preview
 * 

/** Variables */
let files = [],
  dragArea = document.querySelector(".drag-area"),
  input = document.querySelector(".drag-area input"),
  button = document.querySelector(".card button"),
  select = document.querySelector(".drag-area .select"),
  previewHead = document.querySelector(".preview-head"),
  container = document.querySelector(".upload-container");
 

const init = () => {
	previewHead.style.display = "none";
};

document.addEventListener("DOMContentLoaded", init)

const isHeadDisplay = () => {
	if(files.length) {
		previewHead.style.display = "grid";
	} else {
		previewHead.style.display = "none";
	}
}

// For extract the file extension from the file name
let re = /(?:\.([^.]+))?$/;
 
/** CLICK LISTENER */
select.addEventListener('click', () => input.click());

/* INPUT CHANGE EVENT */
input.addEventListener('change', () => {
	let file = input.files;
        
    // if user select no image
    if (file.length == 0) return;
         
	for(let i = 0; i < file.length; i++) {
        // if (file[i].type.split("/")[0] != 'image') continue;
        if (!files.some(e => e.name == file[i].name)) files.push(file[i])
    }
	showImages();
});

// Extract filename
fileNameHandle = (name) => {
	return name.split(".").slice(0, -1).join(".");
}

const uploadPreviewHandle = (curr, index) => {
  
 let fileExtension = re.exec(curr.name)[1];
  
  if (
    curr.type === "image/png" ||
    curr.type === "image/jpeg" ||
    curr.type === "image/svg+xml"
  ) {
    return `<div class="preview-item preview-item--image" data-itemid="${index}">
					<span class="preview-item__thumbnail"><img src="${URL.createObjectURL(
            curr
          )}" /></span>
					<span class='preview-item__name'>${fileNameHandle(curr.name)}</span>
					<a class="preview-item__open" href="${URL.createObjectURL(
            curr
          )}" target="_blank" title="">Open</a>
					<span class="preview-item__size">${curr.size}</span>
					<span class="preview-item__extension">${fileExtension}</span>
					<span class="preview-item__close" onclick="delImage(this)">&times;</span>
			</div>`;
  } else if (curr.type === "video/mp4") {
    return `<div class="preview-item preview-item--video" data-itemid="${index}">
					<span class="preview-item__thumbnail"></span>
					<span class='preview-item__name'>${fileNameHandle(curr.name)}</span>
					<a class="preview-item__open" href="${URL.createObjectURL(
            curr
          )}" target="_blank" title="">Open</a>
					<span class="preview-item__size">${curr.size}</span>
					<span class="preview-item__extension">${fileExtension}</span>
					<span class="preview-item__close" onclick="delImage(this)">&times;</span>
			</div>`;
  } else if (curr.type === "application/pdf") {
    return `<div class="preview-item preview-item--pdf" data-itemid="${index}">
					<span class="preview-item__thumbnail"></span>
					<span class='preview-item__name'>${fileNameHandle(curr.name)}</span>
					<a class="preview-item__open" href="${URL.createObjectURL(
            curr
          )}" target="_blank" title="">Open</a>
					<span class="preview-item__size">${curr.size}</span>
					<span class="preview-item__extension">${fileExtension}</span>
					<span class="preview-item__close" onclick="delImage(this)">&times;</span>
			</div>`;
  } else if (
    fileExtension === "zip" ||
    fileExtension === "7z" ||
    fileExtension === "rar"
  ) {
    return `<div class="preview-item preview-item--compressed" data-itemid="${index}">
				<span class="preview-item__thumbnail"></span>
				<span class='preview-item__name'>${fileNameHandle(curr.name)}</span>
				<a class="preview-item__open" href="${URL.createObjectURL(
          curr
        )}" target="_blank" title="" download></a>
				<span class="preview-item__size">${curr.size}</span>
				<span class="preview-item__extension">${fileExtension}</span>
				<span class="preview-item__close" onclick="delImage(this)">&times;</span>
			</div>`;
  } else {
    return "";
  }
};

/** SHOW IMAGES */
function showImages() { 
  isHeadDisplay()
  container.innerHTML = files.reduce((prev, curr, index) => {
  	return `${prev}
		${uploadPreviewHandle(curr, index)}
		`
  }, '');
}



/* DELETE IMAGE */
function delImage(e) {
   let parent = e.closest(".preview-item");
   files.splice(parent.dataset.itemid, 1);
   parent.remove()
   showImages();
}

/* DRAG & DROP */
dragArea.addEventListener('dragover', e => {
	e.preventDefault()
	dragArea.classList.add('dragover')
})

/* DRAG LEAVE */
dragArea.addEventListener('dragleave', e => {
	e.preventDefault()
	dragArea.classList.remove('dragover')
});

/* DROP EVENT */
dragArea.addEventListener('drop', e => {
	e.preventDefault()
    dragArea.classList.remove('dragover');

	let file = e.dataTransfer.files;
	for (let i = 0; i < file.length; i++) {
		/** Check selected file is image */
		// if (file[i].type.split("/")[0] != 'image') continue;
		if (!files.some(e => e.name == file[i].name)) files.push(file[i])
	}
	showImages();
});

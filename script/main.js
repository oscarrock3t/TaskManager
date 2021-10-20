console.log('script load!');

let inputText = document.getElementById("input-text");
let posts = document.getElementById("posts");
let defaultPost = document.getElementById("defaultPost");
let formTask = document.getElementById("form-task");

let post = {
	text: "Empty",
	time: "Some time",
	status: "Запланировано",
	patternPost:"<div class=\"post-content\">"
				+"<div class=\"post-text\" id=\"post-text\">$text</div>"
				+"<div class=\"post-time\" id=\"post-time\">$time</div>"
				+"<div class=\"post-status\" id=\"post-status\">$status</div>"
			+"</div>"
			+"<div class=\"post-btns\">"
				+"<button class=\"btn-post btn-post_status\"><img src=\"img/icon_status.png\"/></button>"
				+"<button class=\"btn-post btn-post_edit\"><img src=\"img/icon_edit.png\"/></button>"
				+"<button class=\"btn-post btn-post_del\" onclick=delPost()><img src=\"img/icon_del.png\"/></button>"
			+"</div>",

	createTask() {
		this.updateTime();
		this.getText();

		let newPost = document.createElement("div");

		newPost.classList.add("post", "task-planned");
		newPost.innerHTML = this.patternPost.replace("$time", this.time)
								            .replace("$text", this.text)
								            .replace("$status", this.status);
        newPost.querySelector('.btn-post_del').onclick = function() {
        	this.parentElement.parentElement.remove();
        }

        newPost.querySelector('.btn-post_edit').onclick = function() {

        	let y = prompt("Редактирование", this.parentElement.parentElement.children[0].children[0].innerText);
        	if(y != null) this.parentElement.parentElement.children[0].children[0].innerText = y;
        	
        }

        newPost.querySelector('.btn-post_status').onclick = function() {
        	let parElCL = this.parentElement.parentElement.classList;
        	if (parElCL.contains("task-planned")) {
        		parElCL.toggle("task-planned");
        		parElCL.toggle("task-inProgress");
        		this.parentElement.parentElement.querySelector('.post-status').innerText = "В процессе";
        		return;
        	}
        	if (parElCL.contains("task-inProgress")) {
        		parElCL.toggle("task-inProgress");
        		parElCL.toggle("task-done");
        		this.parentElement.parentElement.querySelector('.post-status').innerText = "Выполненно";
        	}
        }

        this.addNewPost(newPost);
	},

	updateTime() {
		this.time = new Date().toLocaleString().slice(0, 17);
	},

	getText() {
		this.text = inputText.value;
	},

	addNewPost(task) {
		posts.childElementCount == 0 ? posts.appendChild(task) : posts.insertBefore(task, posts.children[0]);	
	}
};

formTask.onsubmit = (e) => {
	e.preventDefault();
		if (inputText.value.length > 0 ) 
			post.createTask();
			showMeTruth(inputText.value);
		inputText.value = "";		
}

inputText.onkeydown = (e) => {
	if (e.key == "Enter" && e.ctrlKey == true) {
		formTask.onsubmit(e);
	}
}


function showMeTruth(value) {
	let arr = value.split("");
	arr.forEach((e,i,a)=>{
		console.log(e.charCodeAt(0));
	})
}

console.log('end of script');




// my own template for citations (js)
    // -------------------------------
    // !!!!! code tutorial source:
    // this code is used to... 

    // !!!!! end of source code
    // -------------------------------

// expanding the layout button
    // -------------------------------------
    // !!!!! code tutorial source: https://www.w3schools.com/howto/howto_js_toggle_hide_show.asp
    // this code is used to hide and show the div/expanded layout image when the button is pressed
        function expandlayoutFunction(){
            var expandedlayout = document.getElementById("expandedlayout");
            // without "||..." i'd need to double click to reveal div b/c i set it to "none" in css as its default (to hide it at first load)
            // i know that || means "or" so i set it to nothing to fix this issue
            if (expandedlayout.style.display === "none" || expandedlayout.style.display === "") {
                expandedlayout.style.display = "block";
            } else {
                expandedlayout.style.display = "none";
            }
        }
    // !!!!! end of source code
    // -------------------------------------





// specifically for the living room
    // expanding about us
        // i couldn't have it as one whole function like i had for the button above (the layout map button))^^^ because unlike the map, the exit button is a separate button
        function expandaboutusFunction() {
            document.getElementById("openaboutus").style.display = "block";
        }
        function closeaboutusFunction() {
            document.getElementById("openaboutus").style.display = "none";
        }

    // expanding contact us
        function expandcontactusFunction() {
            document.getElementById("opencontactus").style.display = "block";
        }
        function closecontactusFunction() {
            document.getElementById("opencontactus").style.display = "none";
        }

    // expanding music
        function expandmusicFunction() {
            document.getElementById("openmusic").style.display = "block";
        }
        function closemusicFunction() {
            document.getElementById("openmusic").style.display = "none";
        }





// check lists
    // -------------------------------------------------------------------------------------------------------------
    // !!!!! code tutorial source: https://www.youtube.com/watch?v=p6F5TBxs88A
    // this code is used to save and load the list items

    // to do list
        const addbutton = document.getElementById("addtask");
        const taskinput = document.getElementById("taskinput");
        const tasklist = document.getElementById("tasklist");
        loadtasks();

        function addtask(){
            const task = taskinput.value.trim();
            if (task){
                createTaskElement(task);
                taskinput.value = "";

                savetasks();
            }else{
                alert("Please add something to the list");
            } 
        }

        addbutton.addEventListener("click", addtask);

        function createTaskElement(task){
            const listitem = document.createElement("li");

            listitem.textContent = task;
            const deletebutton = document.createElement("button");
            deletebutton.textContent = "Delete";
            deletebutton.className = "deletetask"; 

            listitem.appendChild(deletebutton);

            deletebutton.addEventListener("click", function(){
                tasklist.removeChild(listitem);
                savetasks();
            });
            tasklist.appendChild(listitem);
        } 

        function savetasks(){
            let tasks = [];
            tasklist.querySelectorAll("li").forEach(function(item){
                tasks.push(item.textContent.replace("Delete", "").trim());
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }

        function loadtasks(){
            const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
            tasks.forEach(createTaskElement);
        }

    // fashion idea list
        const addbutton2 = document.getElementById("addtask2");
        const taskinput2 = document.getElementById("taskinput2");
        const tasklist2 = document.getElementById("tasklist2");
        loadtasks2();

        function addtask2(){
            const task2 = taskinput2.value.trim();
            if (task2){
                createTaskElement2(task2);
                taskinput2.value = "";

                savetasks2();
            }else{
                alert("Please add something to the list");
            } 
        }

        addbutton2.addEventListener("click", addtask2);

        function createTaskElement2(task2){
            const listitem2 = document.createElement("li");

            listitem2.textContent = task2;
            const deletebutton2 = document.createElement("button");
            deletebutton2.textContent = "Delete";
            deletebutton2.className = "deletetask2"; 

            listitem2.appendChild(deletebutton2);

            deletebutton2.addEventListener("click", function(){
                tasklist2.removeChild(listitem2);
                savetasks2();
            });
            tasklist2.appendChild(listitem2);
        } 

        function savetasks2(){
            let tasks2 = [];
            tasklist2.querySelectorAll("li").forEach(function(item2){
                tasks2.push(item2.textContent.replace("Delete", "").trim());
            });
            localStorage.setItem("tasks2", JSON.stringify(tasks2));
        }

        function loadtasks2(){
            const tasks2 = JSON.parse(localStorage.getItem("tasks2")) || [];
            tasks2.forEach(createTaskElement2);
        }

    // !!!!! end of source code
    // -------------------------------------------------------------------------------------------------------------


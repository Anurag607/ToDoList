document.addEventListener("DOMContentLoaded", () => {

    var submit = document.querySelector("#submit");
    var task = document.querySelector("#task");
    var tasks = document.querySelector("#tasks");
    var input = document.querySelectorAll("input");
    var input_value = [];
    var und = document.querySelector('#down');
    var arrow = document.querySelector('#arrow');
    var msg = document.querySelector('#msg');
    var form = document.querySelector('form');
    var confirm_btn = document.querySelector('#confirm');
    var menu = document.querySelector('.menu');
    var sidebar = document.querySelector('.sidebar');
    var sidebarel = sidebar.children[0];
    var sidebartable = sidebar.children[1];
    var listitem = document.querySelectorAll('.listItem');
    var savedtasks = document.querySelector('#savedtasks');
    let count, saved;
    let listrow = {};

    let store = () => {
        window.localStorage.myList = tasks.innerHTML;
    }
    
    let getLists = () => {
        saved = window.localStorage.myList;
        console.log(saved);
        if(!saved) {
            tasks.innerHTML = "<tr><th>Day</th><th>Date</th><th>Task</th></tr>";
            savedtasks.innerHTML = "<tr><th>Day</th><th>Date</th><th>Task</th></tr>";
        } else {
            tasks.innerHTML = saved;
            savedtasks.innerHTML = saved;
        }
    }

    // sidebarel..........................................
    menu.onclick = () => {
        console.log(sidebartable.innerHTML)
        if (menu.dataset.toggle === 'off') {
            sidebarel.style.display = 'flex';
            setTimeout(() => {
                sidebarel.children[0].style.opacity = '1';
                sidebarel.children[0].style.transitionDelay = '0.1s';
                sidebarel.children[1].style.opacity = '1';
                sidebarel.children[1].style.transitionDelay = '0.1s';
                sidebarel.style.width = '20%';
                menu.dataset.toggle = 'on';
            },250);
        }
        else {
            sidebarel.style.width = '0';
            sidebarel.children[0].style.opacity = '0';
            sidebarel.children[0].style.transitionDelay = '0s';
            sidebarel.children[1].style.opacity = '0';
            sidebarel.children[1].style.transitionDelay = '0s';
            menu.dataset.toggle = 'off';
            sidebartable.style.width = '0';
            sidebartable.style.opacity = '0';
            listitem.forEach(listitem => {
                listitem.dataset.visible = "no";
            });
            setTimeout(() => {
                sidebarel.style.display = 'none';
            },750);
        }
        menu.classList.toggle('active');
    }
    
    listitem.forEach(listitem => {
        listitem.onclick = function() {
            if (this.dataset.visible === "no") {
                savedtasks.style.display = 'flex';
                sidebarel.style.width = '100%';
                this.dataset.visible = "yes";
                sidebartable.style.width = '60%';
                sidebartable.style.opacity = '1';
                setTimeout(() => {
                    savedtasks.style.opacity = '1';
                },500);
            }
            else {
                savedtasks.style.opacity = '0';
                sidebarel.style.width = '20%';
                this.dataset.visible = "no";
                sidebartable.style.width = '0';
                sidebartable.style.opacity = '0';
                setTimeout(() => {
                    savedtasks.style.display = 'none';
                },100);
            }
        }
    });

    // Scroll Snap..........................................
    und.onmouseover = () => {
        msg.style.opacity = "1";
    }
    und.onmouseout = () => {
        msg.style.opacity = "0";
    }
    und.onclick = () => {
        if (und.dataset.toggle === "down") { 
            und.href = "#input-form";
            arrow.style.transform = "rotate(0deg)";
            und.dataset.toggle = "up";
            msg.style.opacity = "0";
            setTimeout(() => {
                msg.innerHTML = "See your List";
                msg.style.opacity = "1";
            },500);
        }
        else {
            und.href = "#list";
            arrow.style.transform = "rotate(180deg)";
            und.dataset.toggle = "down";
            msg.style.opacity = "0";
            setTimeout(() => {
                msg.innerHTML = "Back to Form";
                msg.style.opacity = "1";
            },500);
        }
    }

    // Submit Toggle..........................................
    submit.disabled = true;
    task.onkeyup = () => {
        if (task.value.length > 0) {
            submit.disabled = false;
            submit.style.opacity = "1";
            submit.style.cursor = "pointer";
            submit.onmouseover = () => {
                submit.style.boxShadow = "0 0 1px #fff, 0 0 2px #fff, 0 0 3px #f44336, 0 0 4px #f44336, 0 0 5px #f44336, 0 0 6px #f44336, 0 0 7px #f44336,0 0 8px #e91e63, 0 0 9px #e91e63, 0 0 10px #e91e63, 0 0 11px #e91e63, 0 0 12px #e91e63, 0 0 13px #e91e63";
            }
            submit.onmouseout = () => {
                submit.style.boxShadow = "none";
            }
        }
        else {
            submit.disabled = true;
            submit.style.opacity = "0.5";
            submit.style.cursor = "default";
            submit.onmouseover = () => {
                submit.style.boxShadow = "none";
            }
        }
    }

    // Task Addition..........................................
    form.onsubmit = (e) => {
        e.preventDefault();
        count = window.localStorage.counter;
        if(!count) {
            count = 0;
        }
        count++;
        window.localStorage.counter = count;
        var tr = document.createElement("tr");
        var button = document.createElement("td");
        button.style.backgroundImage = "url('./images/delete.svg')";
        button.style.backgroundSize = "cover";
        button.style.backgroundRepeat = "no-repeat";
        button.style.width = "1.5rem";
        button.style.height = "1.5rem";
        button.style.cursor = "pointer";
        button.style.marginLeft = "10%";
        button.style.transform = "scale(1) translateY(0.125rem)";
        button.style.transition = "all 0.5s";
        button.onmouseover = () => {
            button.style.transform = "scale(1.2) translateY(0.125rem)";
        }
        button.onmouseout = () => {
            button.style.transform = "scale(1) translateY(0.125rem)";
        }
        input.forEach((input) => {
            input_value.push(input.value[0].toUpperCase() + input.value.slice(1));
        });
        input_value.splice(input_value.length-1,1);
        for (let i = 0; i < 3; i++) {
            var td = document.createElement("td");
            td.innerHTML = input_value[i];
            tr.append(td);
        }
        tr.append(button);
        button.onclick = () => {
            button.parentElement.remove();
            tasknum--;
            console.log(tasknum);
            store();
        }
        tasks.append(tr);
        task.value = "";
        input_value = [];
        submit.disabled = true;
        submit.style.opacity = "0.5";
        submit.style.boxShadow = "none";
        submit.style.cursor = "default";
        store();
        
        // Confirm Button..........................................
        confirm_btn.disabled = true;
        if ((tasks.childElementCount-1) > 0) {
            confirm_btn.disabled = false;
            confirm_btn.style.opacity = "1";
            confirm_btn.style.cursor = "pointer";
            confirm_btn.onmouseover = () => {
                confirm_btn.style.boxShadow = "0 0 1px #fff, 0 0 2px #fff, 0 0 3px #f44336, 0 0 4px #f44336, 0 0 5px #f44336, 0 0 6px #f44336, 0 0 7px #f44336,0 0 8px #e91e63, 0 0 9px #e91e63, 0 0 10px #e91e63, 0 0 11px #e91e63, 0 0 12px #e91e63, 0 0 13px #e91e63";
            }
            confirm_btn.onmouseout = () => {
                confirm_btn.style.boxShadow = "none";
            }
            confirm_btn.onclick = () => {
                if(!saved) {
                    savedtasks.innerHTML = "<tr><th>Day</th><th>Date</th><th>Task</th></tr>";
                } else {
                    savedtasks.innerHTML = saved;
                }
                let listCount = window.localStorage.listCounter;
                if(!listCount) {
                    listCount = 0;
                }
                listCount++;
                window.localStorage.listCounter = listCount;
                tasks.innerHTML = "<tr><th>Day</th><th>Date</th><th>Task</th></tr>";
                window.localStorage.myList = "<tr><th>Day</th><th>Date</th><th>Task</th></tr>";
                window.localStorage.counter = 0;
            }
        }
        else {
            confirm_btn.disabled = true;
            confirm_btn.style.opacity = "0.5";
            confirm_btn.style.cursor = "default";
            confirm_btn.onmouseover = () => {
                confirm_btn.style.boxShadow = "none";
            }
        }
        
        return false;
    }
    
    getLists();
});
class ToDoList {
    constructor(username, index) {
        this.username = username;
        this.tasks = [];
        this.container = this.createContainer(index);
    }

    createContainer(index) {
        const container = document.createElement('div');
        container.classList.add('user-container');
    
        if (index === 4) {
            container.classList.add('center');
        } else {
            const row = Math.floor((index - 1) / 3) + 1;
            const column = (index - 1) % 3 + 1;
            container.style.gridColumn = column;
            container.style.gridRow = row;
        }

        const title = document.createElement('h2');
        title.textContent = this.username;

        const titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container');
        titleContainer.appendChild(title);

        const updateBtn = document.createElement('span');
        updateBtn.textContent = 'Update';
        updateBtn.classList.add('update-btn');
        updateBtn.onclick = () => this.update();
        titleContainer.appendChild(updateBtn);

        container.appendChild(titleContainer);
        container.appendChild(document.createElement('ul'));
        document.body.appendChild(container);
        return container;
    }

    add(task) {
        this.tasks.push(task);
        this.render();
    }

    delete(index) {
        if (this.tasks[index].deleted) {
            this.tasks.splice(index, 1);
        } else {
            this.tasks[index].deleted = true;
        }
        this.render();
    }

    restore(index) {
        this.tasks[index].deleted = false;
        this.render();
    }

    render() {
        const taskList = this.container.querySelector('ul');
        taskList.innerHTML = '';

        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = `${task.description} (Due: ${task.dueDate})`;

            if (task.isLate()) {
                const late = document.createElement('span');
                late.textContent = 'Late ';
                late.classList.add('late');
                li.prepend(late);
            }

            const restoreBtn = document.createElement('span');
            restoreBtn.textContent = 'Restore';
            restoreBtn.classList.add('restore-btn');
            restoreBtn.onclick = () => this.restore(index);
            li.appendChild(restoreBtn);

            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = task.deleted ? 'Remove' : 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.onclick = () => this.delete(index);
            li.appendChild(deleteBtn);

            if (task.deleted) {
                li.classList.add('deleted');
                restoreBtn.classList.add('visible');
                deleteBtn.classList.remove('deleted');
            } else {
                restoreBtn.classList.remove('visible');
            }

            taskList.appendChild(li);
        });
    }

    update() {
        this.tasks = this.tasks.filter(task => !task.deleted);
        this.render();
    }
}

class Task {
    constructor(username, description, dueDate) {
        this.username = username;
        this.description = description;
        this.createdDate = new Date();
        this.dueDate = dueDate;
    }

    isLate() {
        const currentDate = new Date();
        return currentDate > this.dueDate;
    }
}

const users = {};

const addButton = document.getElementById('addBtn');

addButton.addEventListener('click', () => {
    const usernameInput = document.getElementById('username');
    const taskInput = document.getElementById('newTask');
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    if (!users[usernameInput.value]) {
        const userIndex = Object.keys(users).length + 1;
        users[usernameInput.value] = new ToDoList(usernameInput.value, userIndex);
    }

    const task = new Task(usernameInput.value, taskInput.value, dueDate);
    users[usernameInput.value].add(task);

    taskInput.value = '';
});


this.tasks.forEach((task, index) => {

});

deleteBtn.onclick = () => this.delete(index);
const EventEmitter = require('events');

class Server extends EventEmitter {
    constructor(client) {
        super();
        this.tasks = {};
        this.taskId = 1;
        process.nextTick(() => {
            this.emit('response', 'Type a command (help to list commands)');
        })
        client.on('command', (command, args) => {
            switch (command) {
                case 'help':
                case 'add':
                case 'ls':
                case 'delete':
                case 'quit':
                    this[command](args);
                    break;
                default:
                    this.emit('response', 'Unknown command');
            }
        })
    }

    help() {
        this.emit('response', `Available commands:
    add <task>\t\t Adds a task
    ls\t\t\t List all tasks
    delete <id>\t Deletes a task
    quit\t\t Ends execution`);
    }
    add(args) {
        this.tasks[this.taskId] = args.join(' ');
        this.emit('response', `Added task ${this.taskId}`);
        this.taskId++;
    }
    ls() {
        const tasks = Object.keys(this.tasks).map(key =>
            `${key}: ${this.tasks[key]}`
        ).join('\n');
        this.emit('response', `Tasks:\n${tasks}`);
    }
    delete([taskId]) {
        delete this.tasks[taskId];
        this.emit('response', `Deleted task ${taskId}`)
    }
    quit() {
        process.exit(0);
    }
}

module.exports = (client) => new Server(client);
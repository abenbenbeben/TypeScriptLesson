//import { StatsLogging } from "../node_modules/webpack/types";
import { Task, Status } from "./Task";

export class TaskCollection {
  private tasks: Task[] = [];

  add(task: Task) {
    this.tasks.push(task);
  }

  delete(task: Task) {
    this.tasks = this.tasks.filter(({ id }) => id !== task.id);
  }

  find(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  update(task: Task) {
    this.tasks = this.tasks.map((item) => {
      if (item.id === task.id) return task;
      return item;
    });
  }

  filter(filterStatus: Status) {
    return this.tasks.filter(({ status }) => status === filterStatus);
  }
}

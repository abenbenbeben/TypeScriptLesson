import { EventListener } from "./EventListener";
import { sum } from "./sum";
import { Task, Status, statusMap } from "./Task";
import { TaskCollection } from "./TaskCollection";
import { TaskRenderer } from "./TaskRenderer";

console.log(sum(1, 2));

class Application {
  private readonly eventLisiener = new EventListener();
  private readonly taskCollection = new TaskCollection();
  private readonly taskRenderer = new TaskRenderer(
    document.getElementById("todoList") as HTMLElement,
    document.getElementById("doingList") as HTMLElement,
    document.getElementById("doneList") as HTMLElement
  );

  start() {
    const createForm = document.getElementById("createForm") as HTMLElement;
    const deleteAllDoneTaskButton = document.getElementById(
      "deleteAllDoneTask"
    ) as HTMLElement;

    this.eventLisiener.add(
      "submit-handler",
      "submit",
      createForm,
      this.handleSubmit
    );
    this.eventLisiener.add(
      "click-handler",
      "click",
      deleteAllDoneTaskButton,
      this.handleClickDeleteAllDoneTasks
    );
    this.taskRenderer.subscribeDragAndDrop(this.handleDropAndDrop);
  }
  private handleSubmit = (e: Event) => {
    e.preventDefault();
    const titleInput = document.getElementById("title") as HTMLInputElement;

    if (!titleInput) return;

    const task = new Task({ title: titleInput.value });
    this.taskCollection.add(task);
    const { deleteButtonEl } = this.taskRenderer.append(task);

    this.eventLisiener.add(task.id, "click", deleteButtonEl, () =>
      this.handleClickDeletetask(task)
    );

    titleInput.value = "";
  };

  private executeDeleteTask = (task: Task) => {
    this.eventLisiener.remove(task.id);
    this.taskCollection.delete(task);
    this.taskRenderer.remove(task);
  };

  private handleClickDeleteAllDoneTasks = () => {
    if (!window.confirm("DONEのタスクを一括削除してよろしいですか？")) return;

    console.log("delete");
    const doneTasks = this.taskCollection.filter(statusMap.done);

    console.log(doneTasks);
    doneTasks.forEach((task) => this.executeDeleteTask(task));
  };

  private handleClickDeletetask = (task: Task) => {
    if (!window.confirm(`「${task.title}を削除してよろしいですか？`)) return;

    this.executeDeleteTask(task);
  };

  private handleDropAndDrop = (
    el: Element,
    sibling: Element | null,
    newStatus: Status
  ) => {
    const taskId = this.taskRenderer.getId(el);

    if (!taskId) return;

    console.log(taskId);
    console.log(sibling);
    console.log(newStatus);
    const task = this.taskCollection.find(taskId);

    if (!task) return;

    task.update({ status: newStatus });
    this.taskCollection.update(task);

    console.log(sibling);
  };
}

window.addEventListener("load", () => {
  const app = new Application();
  app.start();
});

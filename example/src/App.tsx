import React from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import { ViewSwitcher } from "./components/view-switcher";
// import { getStartEndDateForProject, initTasks } from "./helper";
import { initTasks } from "./helper";
import moment from 'moment';
import "gantt-task-react/dist/index.css";

// Init
const App = () => {
  const [view, setView] = React.useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = React.useState<Task[]>(initTasks());
  const [isChecked, setIsChecked] = React.useState(false);
  let columnWidth = 65;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  } else if (view === ViewMode.DayWeek) {
    columnWidth = 45;
  }

  const handleTaskChange = (task: Task) => {
    console.log("On date change Id:" + task.id);
    // let newTasks = tasks.map(t => (t.id === task.id ? task : t));
    // if (task.project) {
    //   const [start, end] = getStartEndDateForProject(newTasks, task.project);
    //   const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
    //   if (
    //     project.start.getTime() !== start.getTime() ||
    //     project.end.getTime() !== end.getTime()
    //   ) {
    //     const changedProject = { ...project, start, end };
    //     newTasks = newTasks.map(t =>
    //       t.id === task.project ? changedProject : t
    //     );
    //   }
    // }
    // setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      setTasks(tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("On Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  const myTasks: Task[] = [
    {
      id: '1',
      type: 'task',
      name: `American History`,
      start: moment().startOf("day").toDate(),
      end: moment().startOf("day").add(21, "day").toDate(),
      progress: 100,
    },
    {
      id: '1-1',
      type: 'task',
      name: `Unit 1: Civil Rights and Social Justice`,
      start: moment().startOf("day").toDate(),
      end: moment().startOf("day").add(10, "day").toDate(),
      progress: 100,
    },
    {
      id: '1-1-1',
      type: 'task',
      name: `The Birth Of The United States`,
      start: moment().startOf("day").toDate(),
      end: moment().startOf("day").add(2, "day").toDate(),
      progress: 100,
    },
    {
      id: '1-1-2',
      type: 'task',
      name: `America's Economic Transformation`,
      start: moment().startOf("day").add(2, "day").toDate(),
      end: moment().startOf("day").add(5, "day").toDate(),
      progress: 100,
    },
    {
      id: '1-1-3',
      type: 'task',
      name: `The Civil Rights Movement`,
      start: moment().startOf("day").add(5, "day").toDate(),
      end: moment().startOf("day").add(10, "day").toDate(),
      progress: 100,
    },
    {
      id: '1-2',
      type: 'task',
      name: `Unit 2: Westward Expansion and the Frontier Experience`,
      start: moment().startOf("day").add(10, "day").toDate(),
      end: moment().startOf("day").add(17, "day").toDate(),
      progress: 100,
    },
    {
      id: '1-2-1',
      type: 'task',
      name: `Manifest Destiny and Westward Expansion`,
      start: moment().startOf("day").add(10, "day").toDate(),
      end: moment().startOf("day").add(16, "day").toDate(),
      progress: 100,
    },
    {
      id: '1-2-2',
      type: 'task',
      name: `Native American Perspective`,
      start: moment().startOf("day").add(16, "day").toDate(),
      end: moment().startOf("day").add(17, "day").toDate(),
      progress: 100,
    },
  ];

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={viewMode => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
      />
      <h3>Gantt With Unlimited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        columnWidth={columnWidth}
        rowHeight={40}
      />
      <h3>Gantt With Limited Height</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "155px" : ""}
        ganttHeight={300}
        columnWidth={columnWidth}
      />
      <Gantt
        tasks={myTasks}
        viewMode={ViewMode.DayWeek}
        timeStep={24*60*60*1000}
        listCellWidth={""}
        columnWidth={45}
        disableRangeChange={true}
        disableTooltip={true}
        onDateChange={(handleTaskChange)}
      />
    </div>
  );
};

export default App;

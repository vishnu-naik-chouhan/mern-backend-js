import React from 'react'
import { Check } from 'lucide-react'

const List = ({ tasks = [], param }) => {
  if (!tasks.length) {
    return (
      <div className="contents text-[15px] tracking-wide">
        <div className="py-4 text-xs font-mono text-muted-foreground uppercase tracking-widest text-right pr-6">
          AUG 10
        </div>
        <div className="py-4 pl-8 flex items-center gap-4">
          <div className="w-5 h-5 rounded-[4px] border border-border flex items-center justify-center">
            <Check className="w-3.5 h-3.5 stroke-[2.5] text-foreground" />
          </div>
          <span className="line-through text-muted-foreground">
            Pack birthday presents
          </span>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "TODAY";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", { month: "short", day: "numeric" })
      .toUpperCase();
  };

  return (
    <div className="contents text-[15px] tracking-wide">
      {tasks.map((task) => (
        <React.Fragment key={task._id}>
          {/* Left Date Axis */}
          <div className="py-4 text-xs font-mono text-muted-foreground uppercase tracking-widest text-right pr-6">
            {formatDate(task.createdAt)}
          </div>

          {/* Right Task Details */}
          <div className="py-4 pl-8 flex items-center gap-4">
            <div className="w-5 h-5 rounded-[4px] border border-border flex items-center justify-center shrink-0">
              {task.isCompleted && <Check className="w-3.5 h-3.5 stroke-[2.5] text-foreground" />}
            </div>
            <div className="flex flex-col">
              <span
                className={`${
                  task.isCompleted
                    ? "line-through text-muted-foreground"
                    : "text-foreground font-normal"
                }`}
              >
                {task.taskName}
              </span>
              {task.description && (
                <span className="text-xs text-muted-foreground font-light">
                  {task.description}
                </span>
              )}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default List;
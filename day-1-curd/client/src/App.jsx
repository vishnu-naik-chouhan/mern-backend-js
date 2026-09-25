import React, { useRef, useState, useEffect } from 'react'
import { Plus, Menu } from 'lucide-react'
import List from './components/List'

const App = () => {
  const listRef = useRef({});
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/list/");
      if (res.status === 200) {
        const result = await res.json();
        if (result.success && Array.isArray(result.data)) {
          setTasks(result.data);
        }
      }
    } catch (err) {
      console.error("Fetch list error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const taskName = listRef.current.taskName?.value?.trim();
    const description = listRef.current.description?.value?.trim();

    if (!taskName || !description) return;

    const obj = { taskName, description };

    try {
      const response = await fetch("http://localhost:3000/api/list/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setTasks((prev) => [result.data, ...prev]);
        }
        if (listRef.current.taskName) listRef.current.taskName.value = "";
        if (listRef.current.description) listRef.current.description.value = "";
      }
    } catch (err) {
      console.error("Create task error:", err);
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden bg-background text-foreground flex flex-col justify-between selection:bg-muted selection:text-foreground">

      {/* Top Header */}
      <header className="w-full px-8 sm:px-16 py-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Menu className="w-5 h-5 stroke-[1.5]" />
          </button>
          <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground font-mono">
            TODAY
          </span>
        </div>

        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Vishnu
        </span>
      </header>

      {/* Title */}
      <div className="w-full text-center py-2 shrink-0">
        <h1 
          className="text-6xl sm:text-7xl font-normal tracking-wide text-foreground italic select-none" 
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Tasks
        </h1>
      </div>

      {/* Scrollable Container (Only this section scrolls) */}
      <main className="w-full max-w-5xl mx-auto px-6 sm:px-12 flex-1 overflow-y-auto my-4 scrollbar-thin scrollbar-thumb-border">
        <div className="grid grid-cols-[100px_1fr] relative min-h-full">
          
          {/* Vertical Timeline Divider Rule */}
          <div className="absolute left-[100px] top-0 bottom-0 w-[1px] bg-border" />

          {/* Render List Component inside the timeline grid */}
          <List tasks={tasks} param="Vishnu" />

        </div>
      </main>

      {/* Bottom Form Console */}
      <footer className="w-full max-w-5xl mx-auto px-6 sm:px-12 py-6 shrink-0">
        <form
          onSubmit={handleFormSubmit}
          method="post"
          className="grid grid-cols-[100px_1fr_auto] items-center gap-6"
        >
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest text-right pr-2">
            NEW
          </span>

          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <input
              ref={(e) => {
                listRef.current.taskName = e;
              }}
              type="text"
              name="taskName"
              id="taskName"
              placeholder="Task Name"
              className="w-full bg-transparent border-b border-border focus:border-foreground py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 text-foreground"
            />
            <input
              ref={(e) => {
                listRef.current.description = e;
              }}
              type="text"
              name="description"
              id="description"
              placeholder="Description"
              className="w-full bg-transparent border-b border-border focus:border-foreground py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 text-foreground"
            />
          </div>

          <button
            type="submit"
            className="w-11 h-11 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-all cursor-pointer active:scale-95 shrink-0"
          >
            <Plus className="w-5 h-5 stroke-[1.25]" />
          </button>
        </form>
      </footer>

    </div>
  );
};

export default App;
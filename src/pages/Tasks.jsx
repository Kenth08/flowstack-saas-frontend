import { useMemo, useState } from 'react'
import { Plus, Calendar, Flag, User, Tag as TagIcon } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import Avatar from '../components/ui/Avatar'
import KanbanBoard from '../components/tasks/KanbanBoard'
import Modal, { Field, inputClass } from '../components/ui/Modal'
import { useToast } from '../components/ui/Toast'
import { cn } from '../lib/cn'
import {
  tasks as allTasks,
  taskColumns,
  assignees,
} from '../data/mockData'

// TODO(api): GET /api/v1/projects/{uuid}/tasks/ ; POST to create; PATCH to move.

const priorityOptions = ['All', 'High', 'Medium', 'Low']

// Small select-style filter chip group.
function FilterSelect({ label, value, options, onChange }) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm">
      <span className="text-slate-400">{label}:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="cursor-pointer bg-transparent font-medium text-slate-700 focus:outline-none"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  )
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}

export default function Tasks() {
  const [priority, setPriority] = useState('All')
  const [assignee, setAssignee] = useState('All')
  const [addOpen, setAddOpen] = useState(false)
  const [selected, setSelected] = useState(null)
  const toast = useToast()

  const assigneeOptions = ['All', ...assignees.map((a) => a.name)]

  const filtered = useMemo(() => {
    return allTasks.filter((t) => {
      const matchesPriority = priority === 'All' || t.priority === priority
      const matchesAssignee =
        assignee === 'All' || t.assignee.name === assignee
      return matchesPriority && matchesAssignee
    })
  }, [priority, assignee])

  const handleAdd = (e) => {
    e.preventDefault()
    // TODO(api): POST /api/v1/projects/{uuid}/tasks/
    setAddOpen(false)
    toast.success('Task added')
  }

  return (
    <div>
      <PageHeader
        title="Tasks"
        subtitle="A Kanban view of everything your team is working on."
      >
        <Button icon={Plus} onClick={() => setAddOpen(true)}>
          Add Task
        </Button>
      </PageHeader>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <FilterSelect
          label="Priority"
          value={priority}
          options={priorityOptions}
          onChange={setPriority}
        />
        <FilterSelect
          label="Assignee"
          value={assignee}
          options={assigneeOptions}
          onChange={setAssignee}
        />
        {/* Status + due date are represented by columns / sorting; kept as
            visual filters ready for wiring later. */}
        <FilterSelect
          label="Status"
          value="All"
          options={['All', 'Todo', 'In Progress', 'Review', 'Done']}
          onChange={() => {}}
        />
        <FilterSelect
          label="Due"
          value="Any time"
          options={['Any time', 'Today', 'This week', 'Overdue']}
          onChange={() => {}}
        />
      </div>

      {/* Board */}
      <KanbanBoard
        columns={taskColumns}
        tasks={filtered}
        onTaskClick={setSelected}
        onAddTask={() => setAddOpen(true)}
      />

      {/* Task detail modal (UI only) */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        description={selected?.project}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setSelected(null)}>
              Close
            </Button>
            <Button>Save changes</Button>
          </>
        }
      >
        {selected && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Flag className="h-3.5 w-3.5" /> Priority
                </p>
                <Badge>{selected.priority}</Badge>
              </div>
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <TagIcon className="h-3.5 w-3.5" /> Status
                </p>
                <Badge tone="brand">
                  {taskColumns.find((c) => c.key === selected.status)?.title}
                </Badge>
              </div>
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <Calendar className="h-3.5 w-3.5" /> Due date
                </p>
                <p className="text-sm font-medium text-slate-700">
                  {formatDate(selected.dueDate)}
                </p>
              </div>
              <div>
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-slate-400">
                  <User className="h-3.5 w-3.5" /> Assignee
                </p>
                <div className="flex items-center gap-2">
                  <Avatar
                    initials={selected.assignee.initials}
                    color={selected.assignee.avatarColor}
                    size="xs"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {selected.assignee.name}
                  </span>
                </div>
              </div>
            </div>

            <Field label="Description">
              <textarea
                rows={4}
                defaultValue={`Work item for “${selected.title}”. Add details, acceptance criteria, and context here.`}
                className={inputClass}
              />
            </Field>

            <div>
              <p className="mb-2 text-sm font-medium text-slate-700">Checklist</p>
              <div className="space-y-2">
                {['Define scope', 'Implement', 'Review & QA'].map((item, i) => (
                  <label
                    key={item}
                    className="flex items-center gap-2.5 rounded-lg border border-slate-100 px-3 py-2 text-sm text-slate-600"
                  >
                    <input
                      type="checkbox"
                      defaultChecked={i === 0}
                      className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    />
                    <span className={cn(i === 0 && 'text-slate-400 line-through')}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Add task modal (UI only) */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add task"
        description="Create a new task and drop it into a column."
        footer={
          <>
            <Button variant="secondary" onClick={() => setAddOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" form="add-task-form">
              Add task
            </Button>
          </>
        }
      >
        <form id="add-task-form" onSubmit={handleAdd} className="space-y-4">
          <Field label="Task title">
            <input required placeholder="e.g. Design the settings page" className={inputClass} />
          </Field>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Priority">
              <select className={inputClass}>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </Field>
            <Field label="Status">
              <select className={inputClass}>
                {taskColumns.map((c) => (
                  <option key={c.key}>{c.title}</option>
                ))}
              </select>
            </Field>
            <Field label="Assignee">
              <select className={inputClass}>
                {assignees.map((a) => (
                  <option key={a.id}>{a.name}</option>
                ))}
              </select>
            </Field>
            <Field label="Due date">
              <input type="date" className={inputClass} />
            </Field>
          </div>
        </form>
      </Modal>
    </div>
  )
}

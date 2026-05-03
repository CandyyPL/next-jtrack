import { Application, FullBoardData } from '@/lib/types';
import React, { useEffect, useState } from 'react';
import DroppableColumn from '@/components/dashboard/kanban/droppable-column';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import JobApplicationCardOverlay from '@/components/dashboard/kanban/job-application/job-application-card-overlay';
import { useColumns } from '@/lib/hooks/useColumns';
import { Plus } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import CreateColumnDialog from '@/components/dialogs/column/create-column-dialog';

type Props = {
  boardData: FullBoardData;
};

export default function KanbanBoard({ boardData }: Props) {
  const {
    columns,
    handleAddJob,
    handleAddJobAtIndex,
    handleDeleteJob,
    handleSwapJobs,
    handleRenewColumns,
    isAuthenticated,
  } = useColumns();
  const [activeItemId, setActiveItemId] = useState<UniqueIdentifier | null>(
    null
  );

  const [addColumnDialogOpen, setAddColumnDialogOpen] =
    useState<boolean>(false);

  const sortedColumns = columns.sort((a, b) => a.listOrder - b.listOrder);

  useEffect(() => {
    if (!isAuthenticated()) return;

    handleRenewColumns(boardData.columns);
  }, [boardData]);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveItemId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeItemId = active.id;
    const overId = over.id;

    const activeColumnId = getColumnId(activeItemId);
    const overColumnId = getColumnId(overId);

    if (!activeColumnId || !overColumnId) return;
    if (activeColumnId === overColumnId) return;

    const activeColumn = columns.find((col) => col.id === activeColumnId);
    if (!activeColumn) return;

    const activeItem = activeColumn.applications.find(
      (item) => item.id === activeItemId
    );
    if (!activeItem) return;

    columns.forEach((col) => {
      if (col.id === activeColumnId) {
        handleDeleteJob(activeItemId as string);

        return;
      }

      if (col.id === overColumnId) {
        if (overId === overColumnId) {
          handleAddJob(activeItem, col.id);
          return;
        }

        const overItemIndex = col.applications.findIndex(
          (item) => item.id === overId
        );

        if (overItemIndex !== -1) {
          handleAddJobAtIndex(activeItem, overColumnId, overItemIndex);
        }
      }
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveItemId(null);
      return;
    }

    const activeItemId = active.id;
    const overId = over.id;

    const activeColumnId = getColumnId(activeItemId);
    const overColumnId = getColumnId(overId);

    if (!activeColumnId || !overColumnId) {
      setActiveItemId(null);
      return;
    }

    if (activeColumnId === overColumnId && activeItemId !== overId) {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      if (activeColumnIndex === -1) {
        setActiveItemId(null);
        return;
      }

      const activeColumn = columns[activeColumnIndex];

      const activeIndex = activeColumn.applications.findIndex(
        (item) => item.id === activeItemId
      );
      const overIndex = activeColumn.applications.findIndex(
        (item) => item.id === overId
      );

      if (activeIndex !== -1 && overIndex !== -1) {
        handleSwapJobs(activeColumnId as string, activeIndex, overIndex);
      }
    }

    setActiveItemId(null);
  };

  const handleDragCancel = () => {
    setActiveItemId(null);
  };

  const getColumnId = (itemId: UniqueIdentifier): UniqueIdentifier | null => {
    if (columns.some((col) => col.id === itemId)) return itemId;
    return (
      columns.find((col) => col.applications.some((job) => job.id === itemId))
        ?.id ?? null
    );
  };

  const getActiveItem = (): Application | undefined => {
    for (const column of columns) {
      const item = column.applications.find((item) => item.id === activeItemId);
      if (item) return item;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 100,
      },
    })
  );

  return (
    <>
      <div className='overflow-x-auto p-2'>
        <DndContext
          id='kanban-dnd'
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}>
          <div className='flex flex-col gap-4 xl:flex-row'>
            {sortedColumns.map((col) => (
              <DroppableColumn
                key={col.id}
                columns={sortedColumns}
                col={col}
                boardId={boardData.id}
              />
            ))}
            <Button
              variant='ghost'
              className='text-muted-foreground flex min-h-150 min-w-100 flex-col border-2 border-dashed border-zinc-200 text-2xl'
              onClick={() => setAddColumnDialogOpen(true)}>
              <Plus />
              Add Column
            </Button>
          </div>
          <DragOverlay dropAnimation={{ duration: 200 }}>
            {activeItemId ? (
              <JobApplicationCardOverlay job={getActiveItem() ?? null} />
            ) : null}
          </DragOverlay>
        </DndContext>
        <CreateColumnDialog
          board={boardData}
          open={addColumnDialogOpen}
          setOpen={setAddColumnDialogOpen}
        />
      </div>
    </>
  );
}

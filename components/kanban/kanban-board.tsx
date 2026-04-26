'use client';

import { Application, ColumnWithApplication, FullBoardData } from '@/lib/types';
import React, { useState } from 'react';
import { Award, Calendar, CheckCircle, Mic, XCircle } from 'lucide-react';
import DroppableColumn from '@/components/kanban/droppable-column';
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
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import JobApplicationCardSkeleton from '@/components/kanban/job-application/job-application-card-skeleton';

type Props = {
  boardData: FullBoardData;
  userId: string;
};

export type ColumnConfig = {
  color: string;
  icon: React.ReactNode;
};

const columnConfig: Array<ColumnConfig> = [
  {
    color: 'bg-cyan-500',
    icon: <Calendar />,
  },
  {
    color: 'bg-purple-500',
    icon: <CheckCircle className='size-4' />,
  },
  {
    color: 'bg-green-500',
    icon: <Mic className='size-4' />,
  },
  {
    color: 'bg-yellow-500',
    icon: <Award className='size-4' />,
  },
  {
    color: 'bg-red-500',
    icon: <XCircle className='size-4' />,
  },
];

export default function KanbanBoard({ boardData, userId }: Props) {
  const [columns, setColumns] = useState<ColumnWithApplication[]>(
    boardData.columns
  );
  const [activeItemId, setActiveItemId] = useState<UniqueIdentifier | null>(
    null
  );

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

    setColumns((prev) => {
      const activeColumn = prev.find((col) => col.id === activeColumnId);
      if (!activeColumn) return prev;

      const activeItem = activeColumn.applications.find(
        (item) => item.id === activeItemId
      );
      if (!activeItem) return prev;

      return prev.map((col) => {
        if (col.id === activeColumnId) {
          return {
            ...col,
            applications: col.applications.filter(
              (item) => item.id !== activeItemId
            ),
          };
        }

        if (col.id === overColumnId) {
          if (overId === overColumnId) {
            return {
              ...col,
              applications: [...col.applications, activeItem],
            };
          }

          const overItemIndex = col.applications.findIndex(
            (item) => item.id === overId
          );

          if (overItemIndex !== -1) {
            return {
              ...col,
              applications: [
                ...col.applications.slice(0, overItemIndex + 1),
                activeItem,
                ...col.applications.slice(overItemIndex + 1),
              ],
            };
          }
        }

        return col;
      });
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
        const newApplications = arrayMove(
          activeColumn.applications,
          activeIndex,
          overIndex
        );

        setColumns((prev) => {
          return prev.map((col, idx) => {
            if (idx === activeColumnIndex) {
              return { ...col, applications: newApplications };
            }

            return col;
          });
        });
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
    useSensor(TouchSensor)
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
          <div className='flex justify-between gap-4'>
            {columns.map((col) => {
              const config = columnConfig[col.listOrder];

              return (
                <DroppableColumn
                  key={col.id}
                  columns={columns}
                  col={col}
                  config={config}
                  boardId={boardData.id}
                />
              );
            })}
          </div>
          <DragOverlay dropAnimation={{ duration: 200 }}>
            {activeItemId ? (
              <JobApplicationCardSkeleton job={getActiveItem() ?? null} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </>
  );
}

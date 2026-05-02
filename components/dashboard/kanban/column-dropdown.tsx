import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import { Button } from '@/components/shadcn/button';
import { CircleQuestionMark, Edit2, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { deleteColumn } from '@/lib/actions/delete-column';
import DeleteColumnDialog from '@/components/dialogs/column/delete-column-dialog';
import { Column } from '@/lib/types';
import EditColumnDialog from '@/components/dialogs/column/edit-column-dialog';
import { useColumns } from '@/lib/hooks/useColumns';
import HoverCardWrapper from '@/components/hover-card-wrapper';

type Props = {
  column: Column;
};

export default function ColumnDropdown({ column }: Props) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { isAuthenticated } = useColumns();

  const handleDeleteColumn = async () => {
    await deleteColumn(column.id);
    setDeleteDialogOpen(false);
  };

  return isAuthenticated() ? (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='size-8 text-white hover:bg-white/20'>
            <MoreVertical className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-fit'>
          <DropdownMenuItem
            className='cursor-pointer'
            onClick={() => setEditDialogOpen(true)}>
            <Edit2 className='mr-2 size-4 cursor-pointer' /> Edit Column
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-destructive cursor-pointer'
            onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className='mr-2 size-4' />
            Delete Column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditColumnDialog
        column={column}
        open={editDialogOpen}
        setOpen={setEditDialogOpen}
      />
      <DeleteColumnDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        confirmDelete={handleDeleteColumn}
      />
    </>
  ) : (
    <HoverCardWrapper
      trigger={
        <CircleQuestionMark className='size-8 cursor-pointer lg:size-6' />
      }>
      <p className='text-center text-sm font-medium'>
        Create an account to edit or delete columns.
      </p>
    </HoverCardWrapper>
  );
}

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn/dropdown-menu';
import { Button } from '@/components/shadcn/button';
import { MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { deleteColumn } from '@/lib/actions/delete-column';
import DeleteColumnDialog from '@/components/dialogs/delete-column-dialog';

type Props = {
  columnId: string;
};

export default function ColumnDropdown({ columnId }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const handleDeleteColumn = async () => {
    await deleteColumn(columnId);
    setDeleteDialogOpen(false);
  };

  return (
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
            className='text-destructive cursor-pointer'
            onClick={() => setDeleteDialogOpen(true)}>
            <Trash2 className='mr-2 size-4' />
            Delete Column
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteColumnDialog
        open={deleteDialogOpen}
        setOpen={setDeleteDialogOpen}
        confirmDelete={handleDeleteColumn}
      />
    </>
  );
}

'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/dialog';
import { Button } from '@/components/shadcn/button';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  confirmDelete: () => void;
};

export default function DeleteColumnDialog({
  open,
  setOpen,
  confirmDelete,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogContent className='min-w-120'>
        <DialogHeader>
          <DialogTitle>Delete Column</DialogTitle>
          <DialogDescription>
            Decide whether you want to keep this column
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='grid grid-cols-2'>
          <DialogClose asChild>
            <Button
              variant='outline'
              className='cursor-pointer'>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant='destructive'
            onClick={confirmDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

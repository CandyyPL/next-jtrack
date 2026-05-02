import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Board, BoardFormSchema, BoardFormType } from '@/lib/types';
import BoardForm from '@/components/forms/board/board-form';
import { updateBoard } from '@/lib/actions/update-board';

type Props = {
  board: Board;
  closeDialog: () => void;
};

export default function EditBoardForm({ board, closeDialog }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const form = useForm({
    resolver: zodResolver(BoardFormSchema),
    defaultValues: {
      name: board.name,
      desc: board.desc,
    },
  });

  const onSubmit = async (data: BoardFormType) => {
    setLoading(true);

    await updateBoard(board.id, data);

    setLoading(false);
    closeDialog();
  };

  return (
    <BoardForm
      form={form}
      onSubmit={onSubmit}
      loading={loading}
      error={error}
    />
  );
}

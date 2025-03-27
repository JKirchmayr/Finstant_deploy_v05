'use client';

import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const MyListModal = () => {
  const [lists, setLists] = useState([
    { id: 1, name: 'List Name 1', type: 'investors', count: 15 },
    { id: 2, name: 'List Name 2', type: 'companies', count: 25 },
    { id: 3, name: 'List Name 3', type: 'companies', count: 17 },
  ]);
  const [newListName, setNewListName] = useState('');
  const [listType, setListType] = useState('investors');
  const [newListCount, setNewListCount] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const addList = () => {
    if (newListName.trim() === '') return;
    const newList = { id: Date.now(), name: newListName, type: listType, count: newListCount };
    setLists([...lists, newList]);
    setNewListName('');
    setNewListCount(0);
  };

  const deleteList = (id: number) => {
    setLists(lists.filter((list) => list.id !== id));
  };

  return (
    <>
      <button className="hover:text-gray-900 cursor-pointer" onClick={() => setIsDialogOpen(true)}>
        My Lists
      </button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>My Lists</DialogTitle>
          </DialogHeader>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lists.map((list) => (
                <TableRow key={list.id}>
                  <TableCell>{list.name}</TableCell>
                  <TableCell>{list.type}</TableCell>
                  <TableCell>{list.count}</TableCell>
                  <TableCell>
                    <Trash2
                      size={18}
                      className="text-red-500 cursor-pointer"
                      onClick={() => deleteList(list.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <DialogFooter>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus size={14} className="mr-2" /> Add List
            </Button>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close Modal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add List Modal */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New List</DialogTitle>
          </DialogHeader>
          <label className="block text-sm font-medium text-gray-700">List Name</label>
          <Input
            type="text"
            placeholder="List Name"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <label className="block text-sm font-medium text-gray-700">Count</label>
          <Input
            type="number"
            placeholder="Count"
            value={newListCount}
            onChange={(e) => setNewListCount(Number(e.target.value))}
          />
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            className="border p-2"
            value={listType}
            onChange={(e) => setListType(e.target.value)}
          >
            <option value="investors">Investors</option>
            <option value="companies">Companies</option>
          </select>
          <DialogFooter>
            <Button onClick={addList}>
              <Plus size={14} className="mr-2" /> Add
            </Button>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MyListModal;

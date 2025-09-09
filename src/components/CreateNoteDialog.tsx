/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React from 'react'
import { Loader2, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'   
import { useRouter } from 'next/navigation'


type Props = {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CreateNoteDialog = (props: Props) => {
    const router = useRouter()
    const [input, setInput] = React.useState('')
    const uploadToFirebase = useMutation({
        mutationFn: async (noteId: string) => {
            const response = await axios.post("/api/uploadToFIrebase", {
              noteId,
            });
            return response.data;
        },
    });
    const createNotebook = useMutation({
        mutationFn: async () => {
        const response = await axios.post('/api/createNotebook', { name: input})
            return response.data
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (input === ''){
            window.alert('Please enter a name for your notebook')
            return  
        }

        
        createNotebook.mutate(undefined, {
            onSuccess: ({note_id}) => {
                console.log("created new note", {note_id})
                // hit another endpoint to upload the temp dalle url to permanent firebase storage
                uploadToFirebase.mutate(note_id)
                router.push(`/notebook/${note_id}`)  // Redirect to the new note page when created
            },

            onError: (error) => {
                console.error(error);
                window.alert('Something went wrong while creating the notebook. Please try again.');
            }
        })

    }
  return (
    <Dialog>
        <DialogTrigger>
            <div className='border-dashed border-2 flex border-indigo-600 h-full rounded-lg items-center justify-center sm:flex-col hover
            shadow-xl transition hover:-translate-y-1 flex-row p-4'>
                <Plus className='w-6 h-6 text-indigo-600' strokeWidth={3}/>
                <h2 className='font-semibold text-indigo-600 sm:mt-2'>New notebook</h2>
            </div>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className='text-center'>New notebook</DialogTitle>
                <DialogDescription>
                    you can create a new notebook by clicking the button below
                </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
                <Input value={input} onChange= {(e) => setInput(e.target.value)}placeholder='Name....'/>
                <div className='h-4'></div>
                <div className="flex items-center gap-2"></div>
                <Button type="reset" variant={"secondary"}>
                    Cancel
                </Button>
                <Button type="submit" className="cursor-pointer bg-indigo-600" disabled={createNotebook.isPending}>
                    {createNotebook.isPending && (<Loader2 className="w-4 h-4 mr-2 animate-spin" /> )}
                    Create
                </Button>
            </form>
        </DialogContent>
    </Dialog>
  )
}


export default CreateNoteDialog

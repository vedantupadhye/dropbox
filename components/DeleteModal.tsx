'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { db, storage } from "@/firebase"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"


export function DeleteModal() {
    const { user } = useUser()
    const [isDeleteModalOpen , setIsDeleteModalOpen , fileId , setFileId] = 
    useAppStore((state) =>[
        state.isDeleteModalOpen,
        state.setIsDeleteModalOpen,
        state.fileId,
        state.setFileId,
    ]);

    // async function deleteFile(){
    //     if( !user || !fileId) return;
    //     const fileRef = ref(storage , `users/${user.id}/files/${fileId}`);
        
    //     try {
            
    //         deleteObject(fileRef).then(async () => {
               
    //         deleteDoc(doc(db,"users",user.id,"files",fileId)).then(() =>{
    //             console.log("deleted")
    //         })
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     setIsDeleteModalOpen(false)
    // }
    
    async function deleteFile() {
        try {
            if (!user || !fileId) throw new Error("User or fileId not available");
    
            const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);
    
            // Delete from storage
            await deleteObject(fileRef);
            console.log("File deleted from storage");
    
            // Delete from Firestore
            const firestoreDocRef = doc(db, "users", user.id, "files", fileId);
            await deleteDoc(firestoreDocRef);
            console.log("File deleted from Firestore");
    
            setIsDeleteModalOpen(false);
            console.log("Deletion process completed successfully");
        } catch (error) {
            console.error("Error deleting file:", error);
            // Handle the error, show a message, or perform other actions as needed
        }
    }
    
  return (
    <Dialog
    open ={isDeleteModalOpen}
    onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen)
    }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete ?</DialogTitle>
          <DialogDescription>
            This will permanently delete your file!
          </DialogDescription>
        </DialogHeader>
    
        <div className="flex space-x-2 py-3">
            <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}>
                <span className="sr-only">Cancel</span>
                <span>cancel</span>
            </Button>

            <Button
            type="submit"
            size='sm'
            className="px-3 flex-1"
            onClick={() => deleteFile()}>
                <span className="sr-only">Delete</span>
                <span>delete</span>
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

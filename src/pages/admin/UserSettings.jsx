import { useCallback, useState } from "react"
import Button from "../../components/Button"
import DeleteModal from "../../components/modal/restaurant/DeleteModal"
import { useDeleteUser } from "../../components/brokers/apicalls"

const ChangeContact = () => {
    return <div></div>
}



const UserSettings = () => {
    const [open, setOpen] = useState(false)
    const handleOpenDeleteModal = useCallback(()=> {
        setOpen(true)
    }, [])
    const handleCloseDeleteModal = useCallback(()=> {
        setOpen(false)
    }, [])

    const {mutationFn} = useDeleteUser()

  return (
    <>
    <DeleteModal
    isOpen={open}
    handleCancel={handleCloseDeleteModal}
    width='400px'
    action={'USER'}
    mutationFn={mutationFn}

    />
    <div className="border border-red-300">
        <Button className="px-4 py-2 rounded-md text-sm" variant="danger" onClick={()=> handleOpenDeleteModal()}> Delete User</Button>
        <ChangeContact/>
    </div>
    </>
    
  )
}

export default UserSettings
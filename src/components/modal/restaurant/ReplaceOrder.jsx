import { Modal } from "../modal";
import { showErrorToast, showSuccessToast } from "../../../toast/Toast";
import Button from "../../Button";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../loaders/Spinner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router";
import PropTypes from 'prop-types';

const ReplaceOrder = (props) => {

    const {auth, setAuth} = useAuth()
    const {resID, id} = useParams()
    const {orderItems} = props

    const { mutate, isPending } = useMutation({
    mutationKey: ["addExtras"],
    mutationFn: async (data) => {
      const response = await axios.post(`/item`, data);
      return response?.data;
    },
    onSuccess:  (data) => {
        showSuccessToast("Order Added Successfully");
        props.handleCancel()
       return setAuth((prevAuth) => ({
        ...prevAuth,
        open: true,
        restaurant: { id: resID, name: orderItems.restaurant},
        orders: [data], // Initialize with the new data
       
      }));
    },
    onError: (error) => {
      showErrorToast(error.message);
        props.handleCancel()
    },
  });


  const handleReplaceOrder = () => {
    try {
        if(orderItems.orderType == 'menu'){
          mutate({
            menu: orderItems.menu,
            quantity: orderItems.quantity
         })
        } else mutate({
            extra: orderItems.extra,
             quantity: orderItems.quantity
        })


       
    } catch (error) {
      showErrorToast(error.message);
    }
  };

  return (
      <Modal {...props}>
        <div className="p-2 flex flex-col">
          <div className="p-2 flex flex-col pb-4">
            <div className="flex justify-center">
              <p className="font-bold text-red-600">DO YOU WANT TO REPLACE THIS ORDER?</p>
             
            </div>
         <p className='text-center text-sm'>You have added items from {auth?.restaurant?.name } to your cart. Replacing these orders will remove them from your cart</p>
          </div>

            <div className="flex justify-center">
              <div className="flex items-center mr-2">
                <Button className="px-8 py-2 w-full bg-red-600 rounded-md" onClick={handleReplaceOrder} disabled={isPending}>
                   {isPending ? <Spinner size='20px'/> : <p className="font-bold text-sm text-white">Replace Order</p>} 
                </Button>
              </div>
              <div className="flex items-center">
                <button
                  className="px-8 py-2 w-full bg-gray-100 rounded border"
                  type="button"
                  onClick={props.handleCancel}
                >
                  <p className="font-bold text-sm text-gray-500">Exit</p>
                </button>
              </div>
            </div>
        </div>
      </Modal>
  );
};

export default ReplaceOrder;

ReplaceOrder.propTypes = {
   orderItems: PropTypes.object.isRequired,
    handleCancel: PropTypes.func
}



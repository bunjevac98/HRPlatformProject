import Swal from "sweetalert2";

export default function customConfirm(
  onConfirm: any,
  title: string = "Are you sure?",
  confirmButtonText: string = "Delete"
) {

    Swal.fire({title, confirmButtonText, icon:"warning", confirmButtonColor:'#3085d6',showCancelButton:true, cancelButtonColor:'#d33'})
    .then(resault=>{
        if(resault.isConfirmed){
            onConfirm();
        }
    })
}
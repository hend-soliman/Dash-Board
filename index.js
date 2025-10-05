
// let products =[
//     {name: 'iphone11' , price:500 , qty:8},
//     {name: 'iphone12' , price:600 , qty:10},
//     {name: 'iphone13' , price:700 , qty:4},
// ];

let productJ = localStorage.getItem('products');
let products = productJ ?  JSON.parse(productJ) : [];
let table = document.querySelector('table tbody');
let productIndexToEdit = null;
//add modal
let modal = document.querySelector('#modal');
let productName = document.querySelector('#productName');
let productPrice = document.querySelector('#productPrice');
let productQty = document.querySelector('#productQty');
//edit modal
let modal2 = document.querySelector('#modal2');
let productName2 = document.querySelector('#productName2');
let productPrice2 = document.querySelector('#productPrice2');
let productQty2 = document.querySelector('#productQty2');

 let showProducts = () =>{
    table.innerHTML = '';
 products.forEach((el, index) => {
   let row = `
    <tr>
       <th>${index + 1}</th>
       <th>${el.name}</th>
       <th>${el.price}</th>
       <th>${el.qty}</th>
       <th>
       <div class="col-12 d-flex align-items-center justify-content-center gap-2">
        <button onclick="removePhone(${index})" class=" btn btn-danger">Del</button>
        <button onclick="openModal2(${index})" class="btn btn-warning">Edit</button>
       </div>
       </th>
    </tr>
   `;
   table.innerHTML += row;
 });
};
showProducts();


let removePhone =(index) => {

     swal
     .fire({
        icon:"question",
        title:"Are You Sure ? ",
        text:"the item will be deleted",
        confirmButtonText: "yes delet it",
        showDenyButton:"true",
        denyButtonText:"no not now",
    })
    .then((result) => {
      if (result.isConfirmed){
      products.splice(index,1);
      localStorage.setItem('products',JSON.stringify(products));
      showProducts();
     
      }
    });
};
  
let makeAlert =() =>{
    swal.fire({
        icon:"success",
        title:"removed successfully",
        text:"product removed"
    })
};

let openModal = () => {
    modal.classList.replace('d-none','d-flex');
};

let closeModal = () => {
    modal.classList.replace('d-flex','d-none');
};

let openModal2 = (index) => {
    productIndexToEdit = index ;
    let phoneToEdit = products[index];
    productName2.value = phoneToEdit.name;
    productPrice2.value = phoneToEdit.price;
    productQty2.value = phoneToEdit.qty;
    modal2.classList.replace('d-none','d-flex');
};
let EditPhoneData = () =>{
     let newPhoneObje = {
    name: productName2.value,
    price: +productPrice2.value,
    qty: +productQty2.value,
  };
  products[productIndexToEdit] = newPhoneObje;
  closeModal2();
  localStorage.setItem('products',JSON.stringify(products));
  showProducts();
};

let closeModal2 = () => {
    modal2.classList.replace('d-flex','d-none');
};

let addNewPhone = () => {
   
  let newPhoneObje = {
    name: productName.value,
    price: +productPrice.value,
    qty: +productQty.value,
  };
   productName.value = '';
   productPrice.value = '';
   productQty.value = ''; 
   products.push(newPhoneObje);
  localStorage.setItem('products',JSON.stringify(products));
  showProducts();
  closeModal();
  swal.fire({
    icon: 'success',
    text: 'new product add', 

  

  });
};

let keranjang = [];

function tambah(id){

let qty = document.getElementById(id);

qty.value = parseInt(qty.value) + 1;

}

function kurang(id){

let qty = document.getElementById(id);

if(parseInt(qty.value) > 1){

qty.value = parseInt(qty.value) - 1;

}

}

function hapusItem(index){

keranjang.splice(index,1);

simpanKeranjang();

renderCart();

}

function simpanKeranjang(){

localStorage.setItem(
"keranjangCIKGU",
JSON.stringify(keranjang)
);

}

function loadKeranjang(){

let data =
localStorage.getItem("keranjangCIKGU");

if(data){

keranjang = JSON.parse(data);

renderCart();

}

}

function tambahKeranjang(nama,harga,idQty){

let qty =
parseInt(document.getElementById(idQty).value);

let item = {

nama:nama,
harga:harga,
qty:qty

};

keranjang.push(item);

simpanKeranjang();

renderCart();

alert("Produk masuk ke keranjang");
}

function renderCart(){

let cart =
document.getElementById("cart-list");

let total = 0;

if(keranjang.length === 0){

cart.innerHTML =
"<p>Belum ada pesanan</p>";

document.getElementById("cart-total")
.innerHTML = "Rp 0";

document.getElementById("cart-badge")
.innerHTML = "🛒 0";

return;


}

let html = "";

keranjang.forEach((item,index)=>{

let subtotal =
item.harga * item.qty;

total += subtotal;

html += `

<div class="cart-item">

<div>

<b>${item.nama}</b><br>
Qty : ${item.qty}

</div>

<div>

Rp ${subtotal.toLocaleString('id-ID')}

<button
class="btn btn-sm btn-danger ms-2"
onclick="hapusItem(${index})">

❌

</button>

</div>

</div>

`;

});

cart.innerHTML = html;

document.getElementById("cart-total")
.innerHTML =
"Rp " + total.toLocaleString('id-ID');

updateBadge();

}

function updateBadge(){

let totalItem = 0;

keranjang.forEach(item=>{

totalItem += item.qty;

});

document.getElementById("cart-badge")
.innerHTML =
"🛒 " + totalItem;

}

function checkoutWA(){

if(keranjang.length === 0){

alert("Keranjang masih kosong");

return;

}

let nama =
prompt("Masukkan Nama Anda");

if(!nama) return;

let alamat =
prompt("Masukkan Alamat Anda");

if(!alamat) return;

let nomor =
"6282253341933";

let pesan =
`Halo Admin,

Saya ingin memesan:

Nama : ${nama}

Alamat : ${alamat}

`;

let total = 0;

keranjang.forEach((item,index)=>{

let subtotal =
item.harga * item.qty;

total += subtotal;

pesan +=

`${index+1}. ${item.nama}
Qty : ${item.qty}
Subtotal : Rp ${subtotal.toLocaleString('id-ID')}

`;

});

pesan +=
`-------------------------

TOTAL : Rp ${total.toLocaleString('id-ID')}`;

window.open(
`https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`,
'_blank'
);

}

window.onload = function(){

loadKeranjang();

}
import{r as n,j as t,F as p}from"./index-ubg0dVgB.js";const N=()=>{const e=["bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500","bg-gradient-to-r from-green-400 via-blue-500 to-purple-600","bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600","bg-gradient-to-r from-red-400 via-yellow-500 to-orange-600","bg-gradient-to-r from-pink-400 via-red-500 to-yellow-500"];return e[Math.floor(Math.random()*e.length)]},w=e=>e.split(" ").map(l=>l[0]).join("").toUpperCase(),S=({product:e})=>{var x;const[l,h]=n.useState(0),[r,b]=n.useState(null),[o,f]=n.useState(!1),[i,u]=n.useState(1),c=(e==null?void 0:e.photos)||[],m=(r==null?void 0:r.price)||((x=e==null?void 0:e.variants[0])==null?void 0:x.price)||0,d=(e==null?void 0:e.variants)||[],j=w(e.name),v=a=>{b(a)},y=()=>{const a=JSON.parse(localStorage.getItem("cart")||"[]");a.push({id:e.id,orderId:Date.now(),productCategory:e.category,productName:e.name,price:m,variant:r?r.name:e.variants[0].name,quantity:i}),localStorage.setItem("cart",JSON.stringify(a)),alert("Product added to cart!"),console.log(JSON.parse(localStorage.getItem("cart")||"[]"))},g=a=>{u(s=>Math.max(1,s+a))};return t.jsxs("div",{className:"max-w-sm bg-white shadow-lg rounded-lg overflow-hidden relative",children:[t.jsxs("div",{className:"relative",children:[t.jsxs("div",{className:`w-full h-64 ${o?N():""} bg-cover bg-center flex items-center justify-center`,children:[!o&&t.jsx("img",{className:"w-full h-full object-cover",src:c[l],alt:e.name,onError:()=>f(!0)}),o&&t.jsx("div",{className:"text-white font-bold text-4xl",children:j})]}),t.jsx("div",{className:"absolute bottom-0 left-0 right-0 flex justify-center pb-2",children:c.map((a,s)=>t.jsx("button",{className:`h-2 w-2 mx-1 rounded-full ${s===l?"bg-gray-800":"bg-gray-400"}`,onClick:()=>h(s)},s))}),t.jsxs("button",{onClick:y,className:"absolute top-2 right-2 p-2 gap-2 flex items-center bg-blue-500 rounded-full text-white hover:bg-blue-600","aria-label":"Add to cart",children:["Add to cart ",t.jsx(p,{})]})]}),t.jsxs("div",{className:"p-4",children:[t.jsx("h3",{className:"text-lg font-bold text-gray-800 border-b",children:e.name}),t.jsxs("div",{className:"flex gap-2",children:[t.jsx("p",{className:"text-gray-500 mt-2 text-xs border rounded-full w-fit px-2 py-1",children:e.category}),e.subcategory==="b1t1"&&t.jsx("p",{className:"text-amber-600 mt-2 bg-amber-200 font-semibold text-xs border rounded-full w-fit px-2 py-1",children:"BUY 1 TAKE 1"})]}),t.jsxs("p",{className:"text-gray-800 font-semibold mt-2",children:["₱",(m*i).toFixed(2)]}),t.jsx("p",{className:"text-gray-500 mt-2 uppercase",children:e.status}),t.jsxs("div",{className:"mt-4 flex items-center justify-between",children:[t.jsx("button",{className:"p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300",onClick:()=>g(-1),children:"-"}),t.jsx("span",{className:"text-lg font-semibold",children:i}),t.jsx("button",{className:"p-2 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300",onClick:()=>g(1),children:"+"})]}),d.length>0&&t.jsx("div",{className:"mt-4",children:t.jsx("div",{className:"mt-2 flex gap-2",children:d.map((a,s)=>t.jsx("button",{className:"w-fit bg-blue-500 p-2 text-white rounded-md hover:bg-blue-600 focus:outline-none text-nowrap",onClick:()=>v(a),children:a.size},s))})})]})]})};export{S as ProductCard};
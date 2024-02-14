const bookData = JSON.parse(localStorage.getItem("books")) || [];
const submitData = (e) => {
  e.preventDefault();
  console.log(e);
  const bookId = JSON.parse(sessionStorage.getItem("bid"));
  const books = {};
  for (let index = 0; index < e.target.elements.length; index++) {
    const el = e.target.elements[index];
    console.log(el.name);
    if (el.name) {
      if (
        el.name === "bpageno" ||
        el.name === "byear" ||
        el.name === "bprice"
      ) {
        books[el.name] = Number(el.value);
      } else {
        books[el.name] = formet(el.value);
      }
    }
  }
  books.bid = !bookData.length ? 1 : bookData[bookData.length - 1].bid + 1;

  console.log(books);
  if (!bookId) {
    addData(books);
  } else {
    updateData(bookIndex);
  }
};

const formet = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const addData = (books) => {
  const checkData = bookData.find((book) => book.bname === books.bname);
  if (checkData) {
    alert("data already exist");
    document.querySelector("form").reset();
    return;
  }

  console.log(books);
  bookData.push(books);
  localStorage.setItem("books", JSON.stringify(bookData));
  renderData(bookData);
  document.querySelector("form").reset();
};

const renderData = (bookData) => {
  document.getElementById("bookData").innerHTML = "";
  if (!bookData.length) {
    document.getElementById("bookData").innerHTML = "No Data";
    return;
  }
  const table = document.getElementById("bookData");
  bookData.forEach((book) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${book.bid}</td>
    <td>${book.bname}</td>
    <td>${book.bauthor}</td>
    <td>${book.bdesc}</td>
    <td>${book.bpageno}</td>
    <td>${book.bcategory}</td>
    <td>${book.bprice}</td>
    <td>${book.byear}</td>`;
    table.append(tr);
  });
};

const showById = () => {
  const id = prompt("enter book id");
  if (!id) return;
  const foundItem = bookData.find((book) => book.bid === Number(id));
  renderData([foundItem]);
};

const showByName = () => {
  const name = prompt("enter book name");
  if (!name) return;
  const foundItem = bookData.find((book) => book.bname.toLowerCase() === name.toLowerCase());
  renderData([foundItem]);
};

const showByAuthorBName = () => {
  const bookname = prompt("enter book name");
  const author = prompt("enter book author name");
  if (!bookname || !author) return;
  const foundItem = bookData.find(
    (book) =>
      book.bname.toLowerCase() === bookname.toLowerCase() &&
      book.bauthor.toLowerCase() === author.toLowerCase()
  );
  renderData([foundItem]);
};

const showByRelease = () => {
  const releaseYear = prompt("enter release year");
  if (!releaseYear) return;
  const foundItem = bookData.filter((book) => book.byear === releaseYear);
  renderData(foundItem);
};

const showByHighPrice = () => {
  const highprice = bookData.reduce(
    (acc, book) => (acc > book.bprice ? acc : book.bprice),
    0
  );
  const filterData = bookData.filter((book) => book.bprice === highprice);
  renderData(filterData);
};

const searchExist = () => {
  const searchItem = prompt("enter name for search");
  const filterData = bookData.filter(
    (book) =>
      book.bid === Number(searchItem) ||
      book.bpageno === searchItem ||
      book.bprice === searchItem ||
      book.byear === searchItem ||
      book.bname.toLowerCase() === searchItem.toLowerCase() ||
      book.bauthor.toLowerCase() === searchItem.toLowerCase() ||
      book.bdesc.toLowerCase() === searchItem.toLowerCase() ||
      book.bcategory.toLowerCase() === searchItem.toLowerCase()
  );
  renderData(filterData);
};

const showByPage100 = () => {
  const filterData = bookData.filter((book) => book.bpageno < 100);
  renderData(filterData);
};

const showByPage25 = () => {
  const filterData = bookData.filter(
    (book) => book.bpageno > 25 && book.bpageno < 90
  );
  renderData(filterData);
};

const showByPage80 = () => {
  const filterData = bookData.filter(
    (book) => book.bpageno > 25 && book.bpageno < 90 && book.bpageno != 80
  );
  renderData(filterData);
};

const showByPage0 = () => {
  const filterData = bookData.filter((book) => Number(book.bpageno) === 0);
  renderData(filterData);
};

const deleteById = () => {
  const id = prompt("enter book id");
  if (!id) return;
  const foundIndex = bookData.findIndex((book) => book.bid === Number(id));
  if (foundIndex === -1) return;
  bookData.splice(foundIndex, 1);
  localStorage.setItem("books", JSON.stringify(bookData));
  renderData(bookData);
};

const deleteByName = () => {
  const name = prompt("enter book Name");
  if (!name) return;
  const foundIndex = bookData.findIndex(
    (book) => book.bname.toLowerCase() === name.toLowerCase()
  );
  if (foundIndex === -1) return;
  bookData.splice(foundIndex, 1);
  localStorage.setItem("books", JSON.stringify(bookData));
  renderData(bookData);
};

const deleteByAuthor = () => {
  const author = prompt("enter author name");
  const desc = prompt("enter descripation");
  const foundItem = bookData.filter(
    (book) =>
      book.bauthor.toLowerCase() !== author.toLowerCase() && book.bdesc.toLowerCase() !== desc.toLowerCase()
  );
  console.log(foundItem);
  localStorage.setItem("books", JSON.stringify(foundItem));
  renderData(foundItem);
};

const deleteByBook = () => {
  const bookName = prompt("enter book name");
  const category = prompt("enter book category");
  const foundIndex = bookData.findIndex(
    (book) =>
      book.bname.toLowerCase() === bookName.toLowerCase() &&
      book.bcategory.toLowerCase() === category.toLowerCase()
  );
  console.log(foundIndex);
  if (foundIndex === -1) return;
  console.log(foundIndex);
  bookData.splice(foundIndex, 1);
  localStorage.setItem("books", JSON.stringify(bookData));
  renderData(bookData);
};

const updateData = (bookIndex) => {
  const bid = JSON.parse(sessionStorage.getItem("bid"));
  const updateBook = {
    bid,
    bname: document.getElementById("bname").value.toLowerCase(),
    bauthor: document.getElementById("bauthor").value.toLowerCase(),
    bdesc: document.getElementById("bdesc").value.toLowerCase(),
    bpageno: document.getElementById("bpageno").value,
    bcategory: document.getElementById("bcategory").value.toLowerCase(),
    bprice: document.getElementById("bprice").value,
    byear: document.getElementById("byear").value,
  };
  bookData.splice(bookIndex, 1, updateBook);
  localStorage.setItem("books", JSON.stringify(bookData));
  renderData(bookData);
  sessionStorage.clear("bid");
  document.querySelector("form").reset();
};

let bookIndex = null;
const updateById = () => {
  const id = prompt("enter book Id");
  if (!id) return;
  const foundIndex = bookData.findIndex((book) => book.bid === Number(id));
  if (foundIndex === -1) return;
  displayData(foundIndex);
  sessionStorage.setItem("bid", id);
  bookIndex = foundIndex;
};

const updateByName = () => {
  const Name = prompt("enter book name");
  if (!Name) return;
  const foundIndex = bookData.findIndex(
    (book) => book.bname.toLowerCase() === Name.toLowerCase()
  );
  console.log(foundIndex);
  if (foundIndex === -1) return;
  displayData(foundIndex);
  bookIndex = foundIndex;
};

const updateByBookName = () => {
  const name = prompt("enter book name");
  const author = prompt("enter book Author Name");
  if (!name) return;
  const foundIndex = bookData.findIndex(
    (book) =>
      book.bauthor.toLowerCase() === author.toLowerCase() && book.bname.toLowerCase() === name.toLowerCase()
  );
  console.log(foundIndex);
  if (foundIndex === -1) return;
  displayData(foundIndex);
  bookIndex = foundIndex;
};

const displayData = (foundIndex) => {
  const form = document.querySelector("form");
  for (let index = 0; index < form.elements.length; index++) {
    if (form[index].nodeName === "INPUT") {
      form.elements[index].value =
        bookData[foundIndex][form.elements[index].name];
    }
  }
};

let order = false;
const sortData = (data) => {
  order = !order;
  console.log(order);
  const sortBData = bookData.sort((a, b) => {
    return order ? (a[data] > b[data] ? -1 : 1) : a[data] < b[data] ? -1 : 1;
  });
  renderData(sortBData);
};

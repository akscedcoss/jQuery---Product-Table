products = []

// Function for searching the product in  product array
function searchInArray (id) {
  jsonObj = products.find(item => {
    if (item.product_sku == id) {
      return item
    }
  })
  return jsonObj
}
function delData (id) {
  index = products.findIndex(item => item.product_sku == id)
  console.log(index)
  products.splice(index, 1)
}
// Function to Edit Data
function editData (data) {
  console.log('i am in edit Function')
  item = searchInArray(data)
  //making id field unclickable
  //Assigning values in the form
  $('#product_sku')
    .val(item.product_sku)
    .css('pointer-events', 'none')
  $('#product_name').val(item.product_name)
  $('#product_price').val(item.product_price)
  $('#product_quantity').val(item.product_quantity)
  delData(data)
}
// Fucntion to Display Data
function dispalyData () {
  $('#my-table').html(
    '<tr><th>SKU</th><th>Name</th><th>Price</th><th>Quantity</th><th>Action</th></tr>'
  )
  products.forEach(e => {
    $('#my-table').append(
      `<tr > <td> ${e.product_sku} </td><td>${e.product_name}</td><td>$${e.product_price}</td><td>${e.product_quantity}</td><td><a href="#" class="edit" data-id="${e.product_sku}">Edit</a><a href="#" class="delete" data-id="${e.product_sku}">Delete</a></td></tr>`
    )
  })
}

// Add  data to array on Click...
$('#add_product').click(function () {
  flag = 'pass'

  let productData = {
    product_sku: $('#product_sku').val(),
    product_name: $('#product_name').val(),
    product_price: $('#product_price').val(),
    product_quantity: $('#product_quantity').val()
  }
  // to Check Name is String or Not
  if (typeof productData.product_name != 'string') {
    console.log('Name is Not a String')
  }
  // To check alpha Numeric Values in SKid
  if (productData.product_sku != parseInt(productData.product_sku)) {
    console.log('alphanumeric valuues in skid')
    flag = 'fail'
    $('#notification').append(
      `<div class="error"> Skid cannot be Alpha Numeric<a href="#" class="close">X</a></div>`
    )
    $('.error').hide(5000)
  }
  //   if any of the entries is empty we will set msg to fail
  Object.entries(productData).forEach(([key, value]) => {
    if (value === '') {
      flag = 'fail'
      $('#notification').append(
        `<div class="error">${key} cant be Empty.<a href="#" class="close">X</a></div>`
      )
      $('.error').hide(5000)
    }
  })

  //   if any of the fields are not blank we will push the Json data to array
  if (flag == 'pass') {
    products.push(productData)
    $('#product_sku').val('')
    $('#product_name').val('')
    $('#product_price').val('')
    $('#product_quantity').val('')
    $('#notification').append(
      `<div class="success">Product Added Successfully.<a href="#" class="close">X</a></div>`
    )
    $('.success').hide(5000)

    // Display table
    dispalyData()
  } else {
    console.log('All not gooodd')
  }
})

// When any Edit Button Is Clicked
$('#my-table').on('click', '.edit', function () {
  skId = $(this).data('id')
  editData(skId)
  dispalyData()
})

// When any Delete Button Is Clicked
$('#my-table').on('click', '.delete', function () {
  skId = $(this).data('id')
  delData(skId)
  dispalyData()
})

// dispalyData()
